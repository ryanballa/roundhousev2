<!-- App.svelte -->
<script>
  import { Router } from 'svelte-navigator';
  import { colors, sizes, forms } from './utils/styling';
  import Header from './components/core/Header.svelte';
  import Navigation from './components/core/Navigation.svelte';
  import Routes from './Routes.svelte';

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

  const setFormSettings = () => {
    for (let [prop, size] of Object.entries(forms)) {
      let varString = `--forms-${prop}`;
      document.documentElement.style.setProperty(varString, size);
    }
  };

  const handleOverlayClick = () => {
    const event = new Event('overlayClick');
    window.dispatchEvent(event);
  };

  const init = async () => {
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

  init();
  setRootColors();
  setSizes();
  setFormSettings();
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
