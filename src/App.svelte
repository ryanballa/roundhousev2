<!-- App.svelte -->
<script>
  import { Router } from 'svelte-navigator';
  import { colors, sizes } from './utils/styling';
  import Header from './components/core/Header.svelte';
  import Navigation from './components/core/Navigation.svelte';
  import Routes from './Routes.svelte';
  // import { Magic } from 'magic-sdk';

  //const m = new Magic('pk_test_7326C844E2E9CDF1');
  let shouldShowOverlay = false;
  let isLoggedIn = false;

  // sets CSS vars for easy use in components
  const setRootColors = (theme) => {
    for (let [prop, color] of Object.entries(colors)) {
      let varString = `--color-${prop}`;
      document.documentElement.style.setProperty(varString, color);
    }
  };

  const setSizes = (theme) => {
    for (let [prop, size] of Object.entries(sizes)) {
      let varString = `--size-${prop}`;
      document.documentElement.style.setProperty(varString, size);
    }
  };

  const handleOverlayClick = () => {
    const event = new Event('overlayClick');
    window.dispatchEvent(event);
  };

  const init = async () => {
    const email = 'ryan@ryanballa.com';

    window.addEventListener(
      'showOverlay',
      function (e) {
        shouldShowOverlay = true;
      },
      false,
    );

    window.addEventListener(
      'overlayClick',
      function (e) {
        shouldShowOverlay = false;
      },
      false,
    );

    // if (await m.user.isLoggedIn()) {
    //   const didToken = await m.user.getIdToken();

    //   // Do something with the DID token.
    //   // For instance, this could be a `fetch` call
    //   // to a protected backend endpoint.
    //   // document.getElementById('your-access-token').innerHTML = didToken;
    //   console.log('user is logged in');
    // } else {
    //   console.log('user is not logged in');
    //   // Log in the user
    //   const user = await m.auth.loginWithMagicLink({ email });
    // }
  };

  init();
  setRootColors();
  setSizes();
</script>

<div class="app">
  <div
    class="overlay {shouldShowOverlay ? 'display' : ''}"
    on:click={handleOverlayClick}
  />
  <Router>
    <Header />
    <main>
      <Navigation />
      <Routes />
    </main>
  </Router>
</div>

<style>
  main {
    font-family: 'TofinoProRegular';
    display: flex;
  }
  .app {
    background-color: var(--color-bg);
    height: 100%;
    margin: 0 auto;
  }
  .overlay {
    background-color: transparent;
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  .overlay.display {
    display: block;
  }
</style>
