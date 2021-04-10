<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { user } from '../../store/user';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Loader from '../elements/Loader.svelte';
  import Button from '../elements/Button.svelte';
  import { useForm, Hint, required, HintGroup } from 'svelte-use-form';
  import clubs from '../../store/clubs';
  import apiService from '../../lib/API';

  let isLoading = true;
  let clubsReq = null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      _type: 'user',
      name: $form.name._value,
      email: $user.email,
      membership: [
        {
          _key: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5),
          _ref: $form.club._value,
          _type: 'reference',
        },
      ],
    };
    const userReq = await apiService.userPost(doc, $user.token);
    user.set(userReq);
    clubs.addClubs({ _id: $form.club._value });
    navigate('/profile/add');
  };

  const validateClub = (value) => {
    return value !== '' ? null : { validateClub: 'A club must be selected.' };
  };

  const form = useForm({
    name: { validators: [required] },
    club: { validators: [validateClub] },
  });

  onMount(async () => {
    clubsReq = await apiService.clubsGet();
    user.subscribe((value) => {
      // The user shouldn't be on this page
      if (value && value._id) {
        navigate('/');
      } else {
        isLoading = false;
      }
    });
  });
</script>

<SingleColumn title="Finish Setting Up Your Account">
  {#if isLoading || !clubsReq}<Loader />{/if}
  {#if !isLoading && clubsReq}
    <form id="addUserForm" use:form on:submit={handleSubmit}>
      <Forms>
        <li>
          <label for="name">
            <span class="labelWrapper">Name</span>
            <input id="name" name="name" type="text" />
          </label>
          <HintGroup for="name">
            <Hint on="required" let:value>You must enter your name.</Hint>
          </HintGroup>
        </li>
        <li>
          <label for="club">
            <span class="labelWrapper">Club</span>
            <select id="club" name="club">
              <option value="">-- Select --</option>
              {#if clubsReq}
                {#each clubsReq as club}
                  <option value={club._id}>{club.name}</option>
                {/each}
              {/if}
            </select>
          </label>
          <HintGroup for="club">
            <Hint name="club" on="validateClub" let:value
              >You must select a club.</Hint
            >
          </HintGroup>
        </li>
        <li>
          <Button disabled={!$form.valid} actionText="Finish" />
        </li>
      </Forms>
    </form>
  {/if}
</SingleColumn>
