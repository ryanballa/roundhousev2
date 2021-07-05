<script>
  import { Hint } from 'svelte-use-form';
  import FontSize from '../icons/FontSize.svelte';

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
    <div class="fieldTitle">Time Preference</div>
    <div>
      <input
        checked={!values.profile.timePreference}
        type="radio"
        id="time12HR"
        name="timePreference"
        value="false"
      />
      <label for="time12HR">24 HR</label>
    </div>
    <div>
      <input
        checked={values.profile.timePreference}
        type="radio"
        id="time24HR"
        name="timePreference"
        value="true"
      /><label for="time24HR">12 HR</label>
    </div>
  </div>
  <Hint name="timePreference" on="validateTime">You must select an option.</Hint
  >
</li>
<li class="fontSizeOption">
  <div class="fieldTitle">Font Size Selection</div>
  <label for="fontSizeNormal">
    <input
      checked={values.profile.fontSize === 1}
      type="radio"
      id="fontSizeNormal"
      name="fontSize"
      value="1"
    />
    <span>Normal</span>
    <div class="fontSize fontSizeNormal">
      <FontSize />
    </div>
  </label>
  <label for="fontSizeLarge">
    <input
      checked={values.profile.fontSize === 1.25}
      type="radio"
      id="fontSizeLarge"
      name="fontSize"
      value="1.25"
    />
    <span>Large</span>
    <div class="fontSize fontSizeLarge">
      <FontSize />
    </div>
  </label>
  <label for="fontSizeLarger">
    <input
      checked={values.profile.fontSize === 1.5}
      type="radio"
      id="fontSizeLarger"
      name="fontSize"
      value="1.5"
    />
    <span>Larger</span>
    <div class="fontSize fontSizeLarger">
      <FontSize />
    </div>
  </label>
</li>

<style>
  .fieldTitle {
    font-size: 100%;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .fontSizeOption :global(label) {
    align-items: center;
    display: flex;
  }
  .fontSizeOption :global(span) {
    display: block;
    margin-left: 10px;
    width: 90px;
  }
  .fontSize {
    display: inline;
  }
  .fontSize :global(svg) {
    height: 20px;
    position: relative;
    top: 3px;
    width: auto;
  }

</style>
