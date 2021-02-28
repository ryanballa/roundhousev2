<script>
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Button from '../elements/Button.svelte';
  import { useForm, Hint, required, email, HintGroup } from 'svelte-use-form';

  const form = useForm({
    email: { validators: [required, email] },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
</script>

<SingleColumn title="Log In">
  <section>
    <form id="logInUser" use:form on:submit={handleSubmit}>
      <Forms>
        <li>
          <label for="email">
            <span class="labelWrapper">Email</span>
            <input id="email" name="email" required />
          </label>
        </li>
        <li>
          <HintGroup name="email">
            <Hint on="required">This is a mandatory field</Hint>
            <Hint on="email" hideWhenRequired>Email is not valid</Hint>
          </HintGroup>
        </li>
        <li>
          <Button disabled={!$form.valid} actionText="Log In" />
        </li>
      </Forms>
    </form>
  </section>
</SingleColumn>

<style>
  section {
    height: 300px;
    margin: 0 auto;
    width: 500px;
  }
</style>
