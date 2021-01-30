<!-- App.svelte -->
<script>
  import { colors } from './utils/styling';
  import Header from './components/core/Header.svelte';
  import Navigation from './components/core/Navigation.svelte';

  // sets CSS vars for easy use in components
  const setRootColors = (theme) => {
    for (let [prop, color] of Object.entries(colors)) {
      let varString = `--color-${prop}`;
      console.log(varString, color);
      document.documentElement.style.setProperty(varString, color);
    }
  };

  setRootColors();
</script>

<div class="app">
  <Header />
  <main>
    <Navigation />
    <section>
      <h2>This is a sub page</h2>
    </section>
  </main>
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
</style>
