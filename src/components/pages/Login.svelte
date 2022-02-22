<script>
  import { Link } from 'svelte-navigator';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import Forms from '../layout/Forms.svelte';
  import Button from '../elements/Button.svelte';
  import auth from '../../utils/auth';
  import { useForm, Hint, required, email, HintGroup } from 'svelte-use-form';

  let selectedEmail = null;
  let loggedIn = false;
  let usersReq = null;

  const form = useForm({
    email: { validators: [required, email] },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedEmail = $form.email._value;
    auth.loginWithRedirect({ selectedEmail })
   
  };

  auth.checkAuthUser();

</script>

<SingleColumn title="Log In">
  <section>
    <form id="logInUser" use:form on:submit={handleSubmit}>
      <Forms>
        {#if !selectedEmail && !loggedIn}<li>
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
          </li>{/if}
        {#if selectedEmail}
          <li>
            <span class="formSuccess"
              >Please check your email. If registered, please follow the
              instructions in your email to log in.</span
            >
          </li>
        {/if}
        {#if loggedIn}
          <li>
            <span class="formSuccess">You are already logged in.</span>
            <Link to="/">Home</Link>
          </li>
        {/if}
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
  .formSuccess {
    display: block;
    margin-top: 64px;
  }
</style>
