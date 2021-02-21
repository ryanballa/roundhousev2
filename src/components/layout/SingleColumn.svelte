<script>
  export let title = 'Page Tile';
</script>

<section>
  <h2>{title}</h2>
  <slot />
</section>

<style>
  h2 {
    color: var(--color-titles);
    font-size: var(--size-h2);
    margin-top: 0;
  }
  h2:focus {
    outline: none;
  }
  section {
    color: var(--color-body);
    font-size: var(--size-p);
    padding: 16px 2%;
    width: 75%;
  }
</style>
