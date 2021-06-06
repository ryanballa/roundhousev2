<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { user } from '../../store/user';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Loader from '../elements/Loader.svelte';
  import Button from '../elements/Button.svelte';
  import Banner from '../elements/Banner.svelte';
  import { useForm, Hint, required } from 'svelte-use-form';
  import apiService from '../../lib/API';

  let isLoading = true;
  let hasError = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    const doc = {
      _type: 'profile',
      bio: $form.bio._value,
      timePreference: $form.timePreference._value === 'true',
      fontSize: $form.fontSize._value,
      owner: {
        _ref: $user._id,
        _type: 'reference',
      },
    };

    apiService.profilePost(doc, $user.token).then((res) => {
      user.set({ ...$user, profile: res });
      navigate(`/`);
    });
  };

  const validateTime = (value) => {
    return value !== '' ? null : { validateTime: 'A value must be selected.' };
  };

  const form = useForm({
    timePreference: { validators: [validateTime] },
    fontSize: { validators: [required] },
  });

  onMount(async () => {
    user.subscribe((value) => {
      if (value && value._id) {
        isLoading = false;
        if (value.profile || value.profile.length > 0) {
          hasError = true;
        }
      }
    });
  });

</script>

<SingleColumn title="Create Your Profile">
  {#if isLoading && !hasError}<Loader />{/if}
  {#if hasError}<Banner text="An error has occured." />{/if}
  {#if !isLoading && !hasError}
    <form id="addProfileForm" use:form on:submit={handleSubmit}>
      <Forms>
        <li>
          <label for="bio">
            <span class="labelWrapper">Bio</span>
            <textarea id="bio" name="bio" />
          </label>
        </li>
        <li>
          <div>
            Time Preference
            <div>
              <input
                type="radio"
                id="time12HR"
                name="timePreference"
                value="false"
              />
              <label for="time12HR">12 HR</label>
            </div>
            <div>
              <input
                type="radio"
                id="time24HR"
                name="timePreference"
                value="true"
              /><label for="time24HR">24 HR</label>
            </div>
          </div>
          <Hint name="timePreference" on="validateTime"
            >You must select an option.</Hint
          >
        </li>
        <li>
          <label for="fontSize">
            <span class="labelWrapper">Font Size</span>
            <input id="fontSize" name="fontSize" value="1" />
          </label>
        </li>
        <li>
          <Button disabled={!$form.valid} actionText="Add Profile" />
        </li>
      </Forms>
    </form>{/if}
</SingleColumn>
