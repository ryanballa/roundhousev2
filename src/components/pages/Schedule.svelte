<script>
  import { add, format, toDate } from 'date-fns';
  import { user } from '../../store/user';
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';

  let dateRange = [];
  let dateRangeOffset = 0;
  let scheduleReq;
  let usersByDate = {};
  let addingDate = null;
  let selectedButton = false;
  let working = false;

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
      await sanity.delete(id, dateItem);
      usersByDate[dateItem] = usersByDate[dateItem].filter(
        (item) => item._id !== id,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = (time) => {
    if (!working) {
      working = true;
      const doc = {
        _type: 'schedule',
        date: `${addingDate}T${time}:00Z`,
        membership: {
          _ref: '3370bbfc-6edc-45ab-986e-8362118bdb08',
          _type: 'reference',
        },
        owner: {
          _ref: $user._id,
          _type: 'reference',
        },
      };
      sanity.create(doc).then((res) => {
        scheduleReq.push(res);
        addingDate = null;
        selectedButton = null;
        fetchData();
      });
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
      if (usersByDate[key].length >= 8) {
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
      if (nonUserElement && !quotaLimit) {
        nonUserElement.showAdd = !userElement ? true : false;
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
    const query = `*[_type == 'schedule']{ _id, date, "membership": membership->name, "owner": owner->{name, _id} }`;
    try {
      scheduleReq = await sanity.fetch(query);
      addUsersTodateRange();
      working = false;
    } catch (e) {
      console.log(`Error: ${e}`);
      working = false;
    }
  };

  user.subscribe((value) => {
    if (value && value._id) {
      console.log('fetch data');
      fetchData();
      caculateDate(dateRangeOffset);
    }
  });
</script>

<SingleColumn title="Schedule">
  <ul class="dayRange">
    <li class="arrow">
      <button class="arrowButton" on:click={() => handleAdjust('down')}
        >&lt;</button
      >
    </li>
    {#each dateRange as date}
      <li>
        <span class="date">{format(date, 'E, MMM do')}</span>
        <div class="scheduled">
          {#if usersByDate && !usersByDate[format(date, 'yyyy-MM-dd')]}
            <span class="empty">No one scheduled</span>
          {/if}
          {#if usersByDate && usersByDate[format(date, 'yyyy-MM-dd')]}
            <ul class="users">
              {#each usersByDate[format(date, 'yyyy-MM-dd')] as user}
                <li>
                  {user.owner.name} : {format(
                    add(new Date(user.date), { hours: 6 }),
                    'kk:mm',
                  )} - {format(add(new Date(user.date), { hours: 9 }), 'kk:mm')}
                </li>
              {/each}
            </ul>
          {/if}
        </div>
        <div class="actions">
          {#if (usersByDate && !usersByDate[format(date, 'yyyy-MM-dd')]) || (usersByDate && usersByDate[format(date, 'yyyy-MM-dd')].find((item) => item.showAdd === true))}
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
                      handleAdd('10:00');
                    }}
                  >
                    <button
                      class={selectedButton === '10-1' ? 'selected' : ''}
                      on:click={() => {
                        selectedButton = '10-1';
                        handleAdd('10:00');
                      }}>&nbsp;</button
                    >
                    <span>10AM - 1PM</span>
                  </li>
                  <li
                    on:click={() => {
                      selectedButton = '1-4';
                      handleAdd('13:00');
                    }}
                  >
                    <button
                      class={selectedButton === '1-4' ? 'selected' : ''}
                      on:click={() => {
                        selectedButton = '1-4';
                        handleAdd('13:00');
                      }}>&nbsp;</button
                    >
                    <span>1PM - 4PM</span>
                  </li>
                  <li
                    on:click={() => {
                      selectedButton = '4-7';
                      handleAdd('16:00');
                    }}
                  >
                    <button
                      class={selectedButton === '4-7' ? 'selected' : ''}
                      on:click={() => {
                        selectedButton = '4-7';
                        handleAdd('16:00');
                      }}>&nbsp;</button
                    >
                    <span>4PM - 7PM</span>
                  </li>
                  <li
                    on:click={() => {
                      selectedButton = '7-10';
                      handleAdd('19:00');
                    }}
                  >
                    <button
                      class={selectedButton === '7-10' ? 'selected' : ''}
                      on:click={() => {
                        selectedButton = '7-10';
                        handleAdd('19:00');
                      }}>&nbsp;</button
                    >
                    <span>7PM - 10PM</span>
                  </li>
                </ul>
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
        </div>
      </li>
    {/each}
    <li class="arrow">
      <button class="arrowButton" on:click={() => handleAdjust('up')}
        >&gt;</button
      >
    </li>
  </ul>
</SingleColumn>

<style>
  .addWrapper.hidden {
    display: none;
  }
  .dayRange h4 {
    margin: 16px 0 16px 0;
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
    margin-top: 50px;
  }
  .arrowButton:hover {
    cursor: pointer;
  }
  .dayRange {
    display: flex;
    margin: 0;
    padding: 0;
  }
  .dayRange li {
    border-left: 1px solid var(--color-steel);
    list-style: none;
    padding: 0 16px;
  }
  .dayRange .arrow {
    border: none;
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
    padding: 0;
    margin: 0;
  }
</style>
