<script>
  import { navigate } from 'svelte-navigator';
  import locomotives from '../../store/locomotives';
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Button from '../elements/Button.svelte';
  import {
    useForm,
    required,
    minLength,
    Hint,
    HintGroup,
  } from 'svelte-use-form';
  import { user } from '../../store/user';
  let usersReq = null;

  const handleSubmit = (e) => {
    $form.touched = true;

    const doc = {
      _type: 'locomotive',
      address: parseFloat($form.address._value),
      engineType: $form.engineType._value,
      road: $form.road._value,
      roadNumber: $form.roadNumber._value,
      owner: {
        _ref: $form.user._value,
        _type: 'reference',
      },
    };

    if ($form.valid) {
      sanity.create(doc).then((res) => {
        navigate(`/tracking/locomotives`);
        //todo:  navigate(`/tracking/concist/${res._id}`);
      });
    }
  };

  const validateUser = (value) => {
    return value !== '' ? null : { validateUser: `${value} is not a user` };
  };

  const validateAddress = (value) => {
    const existingAddresses = $locomotives.filter(
      (val) =>
        val.address === parseInt(value) &&
        val.locomotiveOwner._id !== $user._id,
    );
    return existingAddresses.length === 0
      ? null
      : { validateAddress: `${value} is already used` };
  };

  const form = useForm({
    address: { validators: [validateAddress, minLength(3)] },
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

<SingleColumn title="Add Locomotive">
  <form id="addConcistForm" use:form>
    <Forms>
      <li>
        <label for="address">
          <span class="labelWrapper">Address</span>
          <input id="address" name="address" />
        </label>
        <HintGroup for="address">
          <Hint on="validateAddress" let:value>
            {value}.
          </Hint>
          <Hint on="minLength" let:value>Needs to be at least 3 numbers.</Hint>
        </HintGroup>
      </li>
      <li>
        <label for="engineType">
          <span class="labelWrapper">Engine Type</span>
          <select id="engineType" name="engineType">
            <option value="">-- Select --</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Trolley">Trolley</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </li>
      <li>
        <label for="road">
          <span class="labelWrapper">Road</span>
          <input id="road" name="road" />
        </label>
      </li>
      <li>
        <label for="roadNumber">
          <span class="labelWrapper">Road Number</span>
          <input id="roadNumber" name="roadNumber" />
        </label>
      </li>
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
        <HintGroup for="user">
          <Hint name="user" on="validateUser" let:value
            >You must select a user.</Hint
          >
        </HintGroup>
      </li>
      <li>
        <Button
          actionEvent={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          actionText="Add Locomotive"
          type="button"
        />
      </li>
    </Forms>
  </form>
</SingleColumn>