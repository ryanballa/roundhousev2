<script>
  import { Circle2 } from 'svelte-loading-spinners';

  export let isLoading = false;
</script>

<div class="loadingWrapper">
  {#if isLoading}<Circle2 />{/if}
</div>

<style>
  .loadingWrapper {
    margin: 60px auto;
  }

  .loadingWrapper :global(div) {
    margin: 60px auto;
    width: 60px;
  }
</style>
