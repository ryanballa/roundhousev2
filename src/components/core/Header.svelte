<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import auth from '../../utils/auth';
  import { isAuthenticated, user } from '../../store/user';
  import Dropdown from '../elements/Dropdown.svelte';
  import apiService from '../../lib/API';
  import Logo from '../icons/Logo.svelte';

  const setFontSize = (userProfile) => {
    const bodyTag = document.querySelector('.app');
    bodyTag.style.fontSize = `${userProfile.fontSize}em`;
  };

  onMount(async () => {
    auth.checkAuthUser();
  });
</script>

<header class="appHeader">
  <div class="topBar">
    <div class="leftBar">
      <h1>
        <span class="linkWrapper">
          <Link class="link" to="/"><Logo /></Link>
        </span>
      </h1>
    </div>
    <div class="rightMenu">
      <div class="clubContext">
        {#if $isAuthenticated && $user.clubs && $user.clubs.length > 1}
          <Dropdown title={$user.clubs[0].name}>
            <ul>
              {#each $user.clubs as club}
                <li>{club.name}</li>
              {/each}
            </ul>
          </Dropdown>
        {/if}
      </div>
      <div class="accountContext">
        {#if $isAuthenticated}
          <span class="accountLinkWrapper">
            <Link class="changelog" to="/changelog">What's New</Link>
          </span>
        {/if}
        <Dropdown
          title={$isAuthenticated && $user.name ? $user.name : 'Log In'}
        >
          <ul>
            {#if $isAuthenticated}
              <li>
                <Link to="/profile/edit">Profile</Link>
              </li>
            {/if}
            {#if $isAuthenticated}<li>
                <button on:click={auth.handleLogout}>Logout</button>
              </li>{/if}
            {#if !$isAuthenticated}<li>
                <button on:click={auth.handleLogin}>Login</button>
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
    display: flex;
    float: right;
    margin-top: 8px;
  }
  .accountLinkWrapper {
    display: block;
    margin-top: 8px;
    margin-right: 16px;
  }
  .accountLinkWrapper :global(a:link, a:visited) {
    color: var(--color-links);
    text-decoration: none;
  }
  .accountLinkWrapper :global(a:hover) {
    color: var(--color-links);
    text-decoration: underline;
  }
  .clubContext {
    margin-left: 2%;
  }
  .leftBar {
    background: var(--color-navBg);
    width: 15%;
    padding: 1% 0 0 0;
  }
  .topBar {
    display: flex;
    justify-content: space-between;
  }
  .linkWrapper :global(.link) {
    color: var(--color-links);
    text-decoration: none;
  }
  .linkWrapper :global(svg) {
    overflow: hidden;
    width: 150px;
  }
  h1 {
    font-family: 'TofinoProBold';
    font-size: 30px;
    margin: 0;
    text-align: center;
  }
  .rightMenu {
    align-items: center;
    background-color: var(--color-bgHighlight);
    display: flex;
    justify-content: space-between;
    width: 85%;
  }
</style>
