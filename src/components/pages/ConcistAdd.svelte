<script>
  import { navigate } from 'svelte-navigator';
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';
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
      navigate(`/tracking/concists`);
      //todo:  navigate(`/tracking/concist/${res._id}`);
    });
  };

  const validateUser = (value) => {
    return value !== '' ? null : 'A user must be selected';
  };

  const form = useForm({
    number: { validators: [minLength(1)] },
    user: { validators: [validateUser] },
  });

  const fetchUsers = async function () {
    const query = `*[_type == 'user']{ _id, name }`;
    try {
      usersReq = await sanity.fetch(query);
      console.log(usersReq);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  if (!usersReq) {
    fetchUsers();
  }
</script>

<SingleColumn title="Add Concist">
  <form use:form on:submit={handleSubmit}>
    <label for="number">
      Number
      <input id="number" name="number" />
    </label>
    <label for="user">
      User
      <select id="user" name="user">
        <option value="">-- Select --</option>
        {#if usersReq}
          {#each usersReq as user}
            <option value={user._id}>{user.name}</option>
          {/each}
        {/if}
      </select>
    </label>
    <button disabled={!$form.valid}>Submit</button> <br />

    <Hint name="number" on="minLength" let:value>
      The title requires at least {value} characters.
    </Hint>

    <Hint name="user" on="validateUser" let:value>You must select a user.</Hint>
  </form>
</SingleColumn>
