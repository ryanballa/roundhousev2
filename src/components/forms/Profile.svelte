<script>
  import { Hint } from 'svelte-use-form';
  import NumberTicker from '../elements/forms/NumberTicker.svelte';

  export let handleFontSizeUpdate = (value) => {
    return value;
  };
  export let values = {};
</script>

<li>
  <input type="hidden" name="_id" value={values._id} />
</li>
<li>
  <label for="bio">
    <span class="labelWrapper">Bio</span>
    <textarea class="textarea" id="bio" name="bio" value={values.profile.bio} />
  </label>
</li>
<li>
  <div>
    Time Preference
    <div>
      <input
        checked={!values.profile.timePreference}
        type="radio"
        id="time12HR"
        name="timePreference"
        value="false"
      />
      <label for="time12HR">12 HR</label>
    </div>
    <div>
      <input
        checked={values.profile.timePreference}
        type="radio"
        id="time24HR"
        name="timePreference"
        value="true"
      /><label for="time24HR">24 HR</label>
    </div>
  </div>
  <Hint name="timePreference" on="validateTime">You must select an option.</Hint
  >
</li>
<li>
  <NumberTicker
    name="fontSize"
    value={parseFloat(values.profile.fontSize)}
    handleUpdate={(value) => {
      handleFontSizeUpdate(value);
    }}
  />
</li>
