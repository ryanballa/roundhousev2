<script>
  export let title = 'Page Tile';
  export let description = null;
</script>

<section>
  <h2>{title}</h2>
  {#if description}
    <p class="pageDescription">{description}</p>
  {/if}
  <slot />
</section>

<style>
  h2 {
    color: var(--color-titles);
    font-size: var(--size-h2);
    margin-top: 0;
    margin-bottom: 8px;
  }
  h2:focus {
    outline: none;
  }
  .pageDescription {
    color: var(--color-body);
    padding-top: 0;
    margin-top: 0;
  }
  section {
    color: var(--color-body);
    font-size: var(--size-p);
    padding: 16px 2%;
    width: 75%;
  }
</style>
