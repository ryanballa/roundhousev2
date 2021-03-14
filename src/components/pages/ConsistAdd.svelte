<script>
  import { navigate } from 'svelte-navigator';
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Button from '../elements/Button.svelte';
  import { useForm, required, minLength, Hint } from 'svelte-use-form';
  let usersReq = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      _type: 'concists',
      number: parseFloat($form.number._value),
      owner: {
        _ref: $form.user._value,
        _type: 'reference',
      },
    };

    sanity.create(doc).then((res) => {
      navigate(`/tracking/consists`);
      //todo:  navigate(`/tracking/concist/${res._id}`);
    });
  };

  const validateUser = (value) => {
    console.log(value);
    return value !== '' ? null : { validateUser: `${value} is not a user` };
  };

  const form = useForm({
    number: { validators: [minLength(1)] },
    user: { validators: [validateUser, required] },
  });

  const fetchUsers = async function () {
    const query = `*[_type == 'user']{ _id, name }`;
    try {
      usersReq = await sanity.fetch(query);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  if (!usersReq) {
    fetchUsers();
  }
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
