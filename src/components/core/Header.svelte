<script>
  import { navigate } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import auth from '../../utils/auth';
  import { isAuthenticated, user } from '../../store/user';
  import Dropdown from '../elements/Dropdown.svelte';
  import apiService from '../../lib/API';

  const {
    SNOWPACK_PUBLIC_LOGGED_IN_USER_ID,
    SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
    SNOWPACK_PUBLIC_LOGGED_IN_USER_NAME,
    SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
  } = import.meta.env;

  let auth0Client;
  let usersReq = null;
  let accessToken = null;

  const fetchUser = async function (email, token) {
    try {
      if (!token) {
        accessToken = await auth0Client.getIdTokenClaims();
        accessToken = accessToken.__raw;
      }
      usersReq = await apiService.userGet(email, token || accessToken);
    } catch (e) {
      console.log(`Fetch User Error: ${e}`);
    }
  };

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());

    const authUser = await auth0Client.getUser();

    // In DEV we load the user from settings
    if (SNOWPACK_PUBLIC_LOGGED_IN_USER_ID) {
      isAuthenticated.set(true);
      await fetchUser(
        SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
        SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
      );
      user.set({
        _id: SNOWPACK_PUBLIC_LOGGED_IN_USER_ID,
        email: SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
        name: SNOWPACK_PUBLIC_LOGGED_IN_USER_NAME,
        isAdmin: true,
        profile: {
          timePreference: true,
        },
        token: SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
      });
    }

    if (authUser && !$user._id) {
      await fetchUser(authUser.email, accessToken);
      if (!usersReq._id) {
        user.set({
          email: authUser.email,
        });
        navigate('/user/add');
      } else if (!usersReq.profile) {
        navigate('/profile/add');
      } else {
        usersReq.token = accessToken;
        user.set(usersReq);
      }
    }
  });

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }
</script>

<header class="appHeader">
  <div class="topBar">
    <div class="leftBar">
      <h1>
        <span class="linkWrapper">
          <Link class="link" to="/">LocomotiveHouse</Link>
        </span>
      </h1>
    </div>
    <div class="rightMenu">
      <div class="accountContext">
        <Dropdown title={$isAuthenticated && $user ? $user.name : 'Log In'}>
          <ul>
            {#if $isAuthenticated}<li on:click={logout}>
                <span>Logout</span>
              </li>{/if}
            {#if !$isAuthenticated}<li on:click={login}>
                <span>Login</span>
              </li>{/if}
          </ul>
        </Dropdown>
      </div>
    </div>
  </div>
</header>

<style>
  .appHeader {
    box-shadow: 1px 1px 1px #ccc;
  }
  .accountContext {
    float: right;
  }
  .leftBar {
    background: var(--color-navBg);
    width: 19%;
    padding: 1%;
  }
  .topBar {
    display: flex;
    justify-content: space-between;
  }
  .linkWrapper :global(.link) {
    color: var(--color-links);
    text-decoration: none;
  }
  h1 {
    font-family: 'TofinoProBold';
    font-size: 30px;
    margin: 0;
    text-align: center;
  }
  .rightMenu {
    background-color: var(--color-bgHighlight);
    width: 79%;
  }
</style>
