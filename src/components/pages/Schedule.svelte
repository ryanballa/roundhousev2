<script>
  import { onMount } from 'svelte';
  import { add, format, toDate } from 'date-fns';
  import Loader from '../elements/Loader.svelte';
  import { user } from '../../store/user';
  import Button from '../elements/Button.svelte';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import apiService from '../../lib/API';

  let dateRange = [];
  let dateRangeOffset = 0;
  let scheduleReq;
  let usersByDate = {};
  let addingDate = null;
  let selectedButton = false;
  let selectedTime = null;
  let working = true;
  let error = null;
  let notes = null;
  let twentyFourHRTime = false;

  const quota = 8;

  onMount(async () => {
    twentyFourHRTime = $user.profile.timePreference;
  });

  window.addEventListener(
    'overlayClick',
    function (e) {
      addingDate = null;
      selectedButton = null;
    },
    false,
  );

  const handleRemove = async (id, dateItem) => {
    try {
      await apiService.scheduleDelete(id, $user.token);
      usersByDate[dateItem] = usersByDate[dateItem].filter(
        (item) => item._id !== id,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = async () => {
    error = null;
    if (!working) {
      working = true;
      const doc = {
        _type: 'schedule',
        date: `${addingDate}T${selectedTime}:00Z`,
        membership: {
          _ref: '3370bbfc-6edc-45ab-986e-8362118bdb08',
          _type: 'reference',
        },
        notes,
        owner: {
          _ref: $user._id,
          _type: 'reference',
        },
      };

      const addingDateFormat = `${addingDate}T${selectedTime}:00Z`;
      const usersOnAddingDate = await apiService.scheduleGetUsersByDate(
        '3370bbfc-6edc-45ab-986e-8362118bdb08',
        $user.token,
        addingDateFormat,
      );
      if (usersOnAddingDate.length >= quota) {
        error = 'Oops, a user beat you and this day is now full.';
      } else {
        apiService.schedulePost(doc).then((res) => {
          scheduleReq.push(res);
          addingDate = null;
          selectedButton = null;
          fetchData();
        });
      }
    }
  };

  const handleSubmit = (date) => {
    const event = new Event('showOverlay');
    window.dispatchEvent(event);
    addingDate = format(date, 'yyyy-MM-dd');
  };

  function caculateButtonRules() {
    // figure out if the user is present and if the qutoa is exceeded
    for (const key in usersByDate) {
      let quotaLimit = false;
      if (
        format(new Date(key), 'EEEE') === 'Wednesday' &&
        usersByDate[key].length > 3
      ) {
        quotaLimit = true;
      }
      if (usersByDate[key].length >= quota) {
        quotaLimit = true;
      }
      const userElement = usersByDate[key].find(
        (item) => item.owner._id === $user._id,
      );
      if (userElement) {
        userElement.showRemove = true;
        userElement.showAdd = false;
      }
      const nonUserElement = usersByDate[key].find(
        (item) => item.owner._id !== $user._id,
      );
      if (nonUserElement) {
        nonUserElement.showAdd = !userElement ? true : false;
        nonUserElement.quotaReached = quotaLimit;
      }
    }
  }

  function addUsersTodateRange() {
    usersByDate = {};
    scheduleReq.forEach((element) => {
      const elementDate = toDate(new Date(element.date));
      if (!usersByDate[format(elementDate, 'yyyy-MM-dd')]) {
        usersByDate[format(elementDate, 'yyyy-MM-dd')] = [];
      }
      usersByDate[format(elementDate, 'yyyy-MM-dd')].push(element);
      caculateButtonRules();
    });
  }

  function caculateDate(offset) {
    const limit = offset + 7;
    dateRange.length = 0;
    for (offset; offset < limit; offset++) {
      dateRange.push(add(new Date(), { days: offset }));
    }
  }

  function handleAdjust(type) {
    let newOffset = dateRangeOffset;
    if (type === 'down') {
      newOffset = newOffset - 7;
    } else {
      newOffset = newOffset + 7;
    }
    dateRangeOffset = newOffset;
    caculateDate(newOffset);
  }

  const fetchData = async function () {
    try {
      scheduleReq = await apiService.scheduleGet(
        '3370bbfc-6edc-45ab-986e-8362118bdb08',
        $user.token,
      );
      addUsersTodateRange();
      working = false;
    } catch (e) {
      console.log(`Error: ${e}`);
      working = false;
    }
  };

  user.subscribe((value) => {
    if (value && value._id) {
      fetchData();
      caculateDate(dateRangeOffset);
    }
  });
</script>

<SingleColumn
  description="Reserve time at the club and coordinate visits with others."
  title="Schedule"
>
  {#if working}
    <Loader isLoading={working} />
  {/if}
  {#if error}
    <div class="errorMessage">{error}</div>
  {/if}
  {#if !working}
    <div class="refresh">
      <button
        on:click={() => {
          working = true;
          fetchData();
        }}>Refresh</button
      >
    </div>
    <div class="dayRangeActions">
      {#if dateRangeOffset > 0}<button
          class="arrowButton"
          on:click={() => handleAdjust('down')}>&lt;</button
        >
      {/if}
      {#if dateRangeOffset <= 0}
        <div />
      {/if}
      {#if dateRangeOffset < 21}
        <button class="arrowButton" on:click={() => handleAdjust('up')}
          >&gt;</button
        >
      {/if}
    </div>
    <ul class="dayRange">
      {#each dateRange as date}
        <li
          class={format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
            ? 'currentDay'
            : ''}
        >
          <span class="date">{format(date, 'E, MMM do')}</span>
          <div class="scheduled">
            {#if usersByDate && !usersByDate[format(date, 'yyyy-MM-dd')]}
              <span class="empty">No one scheduled</span>
            {/if}
            {#if usersByDate && usersByDate[format(date, 'yyyy-MM-dd')]}
              <ul class="users">
                {#each usersByDate[format(date, 'yyyy-MM-dd')].sort((a, b) =>
                  a.date > b.date ? 1 : -1,
                ) as user}
                  <li title={user.notes}>
                    {user.owner.name} : {format(
                      add(new Date(user.date), { hours: 6 }),
                      twentyFourHRTime ? 'hh:mm a' : 'kk:mm',
                    )} - {format(
                      add(new Date(user.date), { hours: 9 }),
                      twentyFourHRTime ? 'hh:mm a' : 'kk:mm',
                    )}
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
          <div class="actions">
            {#if (usersByDate && !usersByDate[format(date, 'yyyy-MM-dd')]) || (usersByDate && usersByDate[format(date, 'yyyy-MM-dd')].find((item) => item.showAdd === true && !usersByDate[format(date, 'yyyy-MM-dd')].find((item) => item.quotaReached)))}
              <div
                class="addWrapper {addingDate === format(date, 'yyyy-MM-dd')
                  ? 'adding'
                  : 'hidden'}"
              >
                <div class="addOptions">
                  <h4>Pick a Time</h4>
                  <ul>
                    <li
                      on:click={() => {
                        selectedButton = '10-1';
                        selectedTime = '10:00';
                      }}
                    >
                      <button
                        class={selectedButton === '10-1' ? 'selected' : ''}
                        on:click={() => {
                          selectedButton = '10-1';
                          selectedTime = '10:00';
                        }}>&nbsp;</button
                      >
                      <span>10AM - 1PM</span>
                    </li>
                    <li
                      on:click={() => {
                        selectedButton = '1-4';
                        selectedTime = '13:00';
                      }}
                    >
                      <button
                        class={selectedButton === '1-4' ? 'selected' : ''}
                        on:click={() => {
                          selectedButton = '1-4';
                          selectedTime = '13:00';
                        }}>&nbsp;</button
                      >
                      <span>1PM - 4PM</span>
                    </li>
                    <li
                      on:click={() => {
                        selectedButton = '4-7';
                        selectedTime = '16:00';
                      }}
                    >
                      <button
                        class={selectedButton === '4-7' ? 'selected' : ''}
                        on:click={() => {
                          selectedButton = '4-7';
                          selectedTime = '16:00';
                        }}>&nbsp;</button
                      >
                      <span>4PM - 7PM</span>
                    </li>
                    <li
                      on:click={() => {
                        selectedButton = '7-10';
                        selectedTime = '19:00';
                      }}
                    >
                      <button
                        class={selectedButton === '7-10' ? 'selected' : ''}
                        on:click={() => {
                          selectedButton = '7-10';
                          selectedTime = '19:00';
                        }}>&nbsp;</button
                      >
                      <span>7PM - 10PM</span>
                    </li>
                  </ul>
                  <div class="notesWrapper">
                    <h4>Add Notes</h4>
                    <input
                      type="text"
                      on:change={(e) => {
                        notes = e.target.value;
                      }}
                    />
                    <Button actionEvent={handleAdd} actionText="Schedule" />
                  </div>
                </div>
              </div>
              <button
                class="add"
                on:click={() => {
                  handleSubmit(add(date, { days: 0 }));
                }}>+</button
              >
            {/if}
            {#if usersByDate && usersByDate[format(date, 'yyyy-MM-dd')] && usersByDate[format(date, 'yyyy-MM-dd')].find((item) => item.showRemove === true)}
              <button
                class="remove"
                on:click={() => {
                  handleRemove(
                    usersByDate[format(date, 'yyyy-MM-dd')].find(
                      (item) => item.owner._id === $user._id,
                    )._id,
                    format(date, 'yyyy-MM-dd'),
                  );
                }}>-</button
              >
            {/if}
            {#if usersByDate && usersByDate[format(date, 'yyyy-MM-dd')] && !usersByDate[format(date, 'yyyy-MM-dd')].find((item) => item.showRemove === true) && usersByDate[format(date, 'yyyy-MM-dd')].find(
                (item) => {
                  return item.quotaReached == true;
                },
              )}
              <span>Capacity Reached</span>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</SingleColumn>

<style>
  .addWrapper.hidden {
    display: none;
  }
  .dayRange h4 {
    margin: 16px 0 16px 0;
  }
  .dayRangeActions {
    display: flex;
    justify-content: space-between;
    margin: 0 0 16px 0;
  }
  .addWrapper.adding {
    display: block;
    position: relative;
  }
  .dayRange .addOptions {
    background: var(--color-snow);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    bottom: 20px;
    left: -100px;
    position: absolute;
    width: 300px;
    z-index: 1001;
  }
  .dayRange .addOptions button {
    background-color: transparent;
    border: 2px solid var(--color-activeLinks);
    border-radius: 12px;
    margin-right: 8px;
    width: 22px;
  }
  .dayRange .addOptions button.selected {
    background-color: var(--color-activeLinks);
    border: 2px solid var(--color-activeLinks);
    border-radius: 12px;
    margin-right: 8px;
    width: 22px;
  }
  .dayRange .addOptions ul {
    font-size: 14px;
    margin: 0 auto 16px auto;
    padding: 0;
    text-align: left;
    width: 150px;
  }
  .dayRange .addOptions li {
    border: none;
    list-style: none;
    margin: 0 0 8px 0;
    padding: 16px;
  }
  .dayRange .addOptions li:hover {
    background-color: var(--color-bgHighlightLight);
    cursor: pointer;
  }
  .add {
    align-items: center;
    background-color: var(--color-buttons);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border: none;
    border-radius: 20px;
    color: var(--color-snow);
    display: inline-flex;
    font-size: 20px;
    padding: 1px 8px 3px 8px;
  }
  .add:hover {
    cursor: pointer;
  }
  .remove {
    align-items: center;
    background-color: var(--color-terraCotta);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border: none;
    border-radius: 20px;
    color: var(--color-snow);
    display: inline-flex;
    font-size: 20px;
    padding: 0px 8px 3px 8px;
  }
  .remove:hover {
    cursor: pointer;
  }
  .actions {
    text-align: center;
  }
  .arrowButton {
    background-color: var(--color-buttonsSecondary);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border: none;
    border-radius: 4px;
    color: var(--color-snow);
    font-size: 20px;
    padding: 10px 15px;
  }
  .arrowButton:hover {
    cursor: pointer;
  }
  .dayRange {
    display: flex;
    margin: 0;
    padding: 0;
  }
  .dayRange > li {
    border-left: 1px solid var(--color-steel);
    list-style: none;
    padding: 0 16px 8px 16px;
    width: 14%;
  }
  .currentDay {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .date {
    font-weight: bold;
    display: block;
    height: 50px;
    margin-bottom: 16px;
  }
  .scheduled {
    margin-bottom: 16px;
    height: 300px;
  }
  .scheduled .empty {
    font-size: var(--size-small);
    font-style: italic;
  }
  .users {
    margin: 0;
    padding: 0;
  }
  .users li {
    border: none;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .refresh button {
    background-color: var(--color-buttonsSecondary);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border: none;
    border-radius: 4px;
    color: var(--color-snow);
    font-size: 14px;
    padding: 10px 15px;
    margin-left: auto;
  }
  .refresh {
    clear: both;
    display: flex;
    margin-bottom: 16px;
  }
  .errorMessage {
    color: var(--color-terraCotta);
  }
  .notesWrapper {
    margin-bottom: 16px;
    text-align: center;
  }
  .notesWrapper input {
    border: 1px solid var(--color-steel);
    border-radius: 4px;
    padding: 8px;
    width: 200px;
  }
  .notesWrapper :global(button) {
    display: block;
    margin: 16px auto 8px auto;
  }
</style>
