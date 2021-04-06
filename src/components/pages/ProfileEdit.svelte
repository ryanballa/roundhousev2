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
  import Profile from '../forms/Profile.svelte';

  let isLoading = true;
  let hasError = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      _id: $form._id._value,
      bio: $form.bio._value,
      timePreference: $form.timePreference._value === 'true',
      fontSize: JSON.stringify($form.fontSize._value),
      owner: {
        _ref: $user._id,
        _type: 'reference',
      },
    };

    apiService.profilePost(doc, $user.token).then((res) => {
      if (res) {
        user.set({
          ...$user,
          profile: {
            bio: res.bio,
            fontSize: res.fontSize,
            timePreference: res.timePreference,
          },
        });
      }
      navigate(`/`);
    });
  };

  const validateTime = (value) => {
    return value !== '' ? null : { validateTime: 'A value must be selected.' };
  };

  let form = useForm({
    _id: {
      initial: $user && $user.profile ? $user.profile._id : null,
      validators: [],
    },
    bio: {
      initial: $user ? $user.bio : '',
    },
    timePreference: {
      initial: $user.profile ? $user.profile.timePreference : true,
      validators: [validateTime],
    },
    fontSize: {
      validators: [required],
    },
  });

  onMount(async () => {
    user.subscribe((value) => {
      if (value && value._id && value.profile) {
        isLoading = false;
        if (!value.profile) {
          hasError = true;
        }
      }
    });
  });
</script>

<SingleColumn title="Edit Your Profile">
  {#if isLoading && !hasError}<Loader />{/if}
  {#if hasError}<Banner text="An error has occured." />{/if}
  {#if !isLoading && !hasError}
    <form id="editProfileForm" use:form on:submit={handleSubmit}>
      <Forms>
        <Profile
          values={$user}
          handleFontSizeUpdate={(value) => {
            $form.fontSize._value = value;
            $form.touched = true;
          }}
        />
        <li>
          <Button disabled={!$form.valid} actionText="Edit Profile" />
        </li>
      </Forms>
    </form>{/if}
</SingleColumn>
