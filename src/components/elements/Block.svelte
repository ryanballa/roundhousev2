<div class="block">
  <slot />
</div>

<style>
  .block :global(h3) {
    font-size: var(--size-h2);
  }
  .block :global(h4) {
    font-size: var(--size-h3);
    margin-bottom: 8px;
  }
  .block :global(p) {
    margin-bottom: 8px;
  }
</style>
