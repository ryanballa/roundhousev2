<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Button from '../elements/Button.svelte';
  import { useForm, required, minLength, Hint } from 'svelte-use-form';
  import apiService from '../../lib/API';
  import { user } from '../../store/user';
  import clubs from '../../store/clubs';

  let usersReq = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      _type: 'concists',
      number: parseFloat($form.number._value),
      locomotiveAddresses: $form.locomotiveAddresses._value,
      owner: {
        _ref: $user.isAdmin ? $form.user._value : $user._id,
        _type: 'reference',
      },
    };

    apiService.consistPost(doc).then((res) => {
      navigate(`/tracking/consists`);
    });
  };

  const validateUser = (value) => {
    console.log(value);
    return value !== '' ? null : { validateUser: `${value} is not a user` };
  };

  const userValidations = $user.isAdmin ? [validateUser, required] : [];

  const form = useForm({
    number: { validators: [minLength(1)] },
    user: { validators: userValidations },
  });

  const fetchUsers = async function (clubId) {
    try {
      usersReq = await apiService.usersGet(clubId);
    } catch (e) {
      hasError = true;
    }
  };

  onMount(async () => {
    clubs.subscribe((value) => {
      if (!usersReq) {
        fetchUsers(value._id);
      }
    });
  });
</script>

<SingleColumn title="Add Consist">
  <form id="addConcistForm" use:form on:submit={handleSubmit}>
    <Forms>
      <li>
        <label for="number">
          <span class="labelWrapper">Number</span>
          <input id="number" name="number" />
        </label>
      </li>
      <li>
        <label for="locomotiveAddresses">
          <span class="labelWrapper">Locomotive Addresses</span>
          <input id="locomotiveAddresses" name="locomotiveAddresses" />
        </label>
      </li>
      {#if $user.isAdmin}
        <li>
          <label for="user">
            <span class="labelWrapper">User</span>
            <select id="user" name="user">
              <option value="">-- Select --</option>
              <option value="Unassigned">Unassigned</option>
              {#if usersReq}
                {#each usersReq as user}
                  <option value={user._id}>{user.name}</option>
                {/each}
              {/if}
            </select>
          </label>
        </li>
      {/if}
      <li>
        <Hint name="number" on="minLength" let:value>
          The number requires at least {value} characters.
        </Hint>

        <Hint name="user" on="validateUser" let:value
          >You must select a user.</Hint
        >
      </li>
      <li>
        <Button disabled={!$form.valid} actionText="Add Concist" />
      </li>
    </Forms>
  </form>
</SingleColumn>
