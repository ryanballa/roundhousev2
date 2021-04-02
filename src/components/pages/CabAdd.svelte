<script>
  import { navigate } from 'svelte-navigator';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Button from '../elements/Button.svelte';
  import {
    useForm,
    required,
    minLength,
    maxLength,
    Hint,
    HintGroup,
  } from 'svelte-use-form';
  import apiService from '../../lib/API';
  import { user } from '../../store/user';

  let usersReq = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      _type: 'cabs',
      number: parseFloat($form.number._value),
      owner: {
        _ref: $user.isAdmin ? $form.user._value : $user._id,
        _type: 'reference',
      },
    };

    apiService.cabPost(doc).then((res) => {
      navigate(`/tracking/cabs`);
    });
  };

  const validateUser = (value) => {
    return value !== '' ? null : { validateUser: `${value} is not a user` };
  };

  const userValidations = $user.isAdmin ? [validateUser, required] : [];

  const form = useForm({
    number: { validators: [minLength(1), maxLength(2)] },
    user: { validators: userValidations },
  });

  const fetchUsers = async function () {
    try {
      usersReq = await apiService.usersGet(
        '3370bbfc-6edc-45ab-986e-8362118bdb08',
      );
    } catch (e) {
      hasError = true;
    }
  };

  if (!usersReq) {
    fetchUsers();
  }
</script>

<SingleColumn title="Add Cab">
  <form id="addCabForm" use:form on:submit={handleSubmit}>
    <Forms>
      <li>
        <label for="number">
          <span class="labelWrapper">Number</span>
          <input id="number" name="number" />
        </label>
        <HintGroup for="number">
          <Hint name="number" on="minLength" let:value>
            The number requires at least {value} characters.
          </Hint>
          <Hint name="number" on="maxLength" let:value>
            The number requires cannot be grater than {value} characters.
          </Hint>
        </HintGroup>
      </li>
      {#if $user.isAdmin}
        <li>
          <label for="user">
            <span class="labelWrapper">User</span>
            <select id="user" name="user">
              <option value="">-- Select --</option>
              {#if usersReq}
                {#each usersReq as user}
                  <option value={user._id}>{user.name}</option>
                {/each}
              {/if}
            </select>
          </label>
          <Hint name="user" on="validateUser" let:value
            >You must select a user.</Hint
          >
        </li>
      {/if}
      <li>
        <Button disabled={!$form.valid} actionText="Add Cab" />
      </li>
    </Forms>
  </form>
</SingleColumn>
