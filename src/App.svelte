<!-- App.svelte -->
<script>
  import { Router } from 'svelte-navigator';
  import * as Sentry from '@sentry/browser';
  import { Integrations } from '@sentry/tracing';
  import { colors, sizes, forms, zIndexes } from './utils/styling';
  import Header from './components/core/Header.svelte';
  import Footer from './components/core/Footer.svelte';
  import Navigation from './components/core/Navigation.svelte';
  import Routes from './Routes.svelte';
  import { user } from './store/user';

  let shouldShowOverlay = false;

  // sets CSS vars for easy use in components
  const setRootColors = () => {
    for (let [prop, color] of Object.entries(colors)) {
      let varString = `--color-${prop}`;
      document.documentElement.style.setProperty(varString, color);
    }
  };

  const setSizes = () => {
    for (let [prop, size] of Object.entries(sizes)) {
      let varString = `--size-${prop}`;
      document.documentElement.style.setProperty(varString, size);
    }
  };

  const setZIndexes = () => {
    for (let [prop, zIndex] of Object.entries(zIndexes)) {
      let varString = `--zIndex-${prop}`;
      document.documentElement.style.setProperty(varString, zIndex);
    }
  };

  const setFormSettings = () => {
    for (let [prop, size] of Object.entries(forms)) {
      let varString = `--forms-${prop}`;
      document.documentElement.style.setProperty(varString, size);
    }
  };

  const setFontSize = (userProfile) => {
    const bodyTag = document.querySelector('.app');
    bodyTag.style.fontSize = `${userProfile.fontSize}em`;
  };

  const handleOverlayClick = () => {
    const event = new Event('overlayClick');
    window.dispatchEvent(event);
  };

  const init = async () => {
    // if (__SNOWPACK_ENV__.MODE !== 'development') {
    //   Sentry.init({
    //     dsn:
    //       'https://dbe0f009be9647e1878b4452adaa2694@o820586.ingest.sentry.io/5809225',
    //     integrations: [new Integrations.BrowserTracing()],

    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    //   });
    // }

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
  };

  user.subscribe((value) => {
    if (value.profile) {
      setFontSize(value.profile);
    }
  });

  init();
  setRootColors();
  setSizes();
  setFormSettings();
  setZIndexes();

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
    <Footer />
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
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  .overlay.display {
    display: block;
  }

</style>
