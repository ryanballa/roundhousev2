<script>
  import { Circle2 } from 'svelte-loading-spinners';
  import Button from '../elements/Button.svelte';
  export let isLoading = true;
  export let error = false;
  export let isEmpty = false;
  export let addMessage = 'Add new item.';
  export let addRoute = '/';
  export let shouldShowAdd = true;
</script>

<div class="dynamicContentWrapper">
  {#if (!isLoading && isEmpty) || (!isLoading && shouldShowAdd)}
    <div class="actionsWrapper">
      <Button action={addRoute} actionText={addMessage} />
    </div>{/if}
  {#if isLoading}
    <div class="loadingWrapper">
      <Circle2 />
    </div>{/if}
  {#if error}<p>
      An error has occurred, please try again. More details: {error}
    </p>{/if}
</div>

<style>
  .actionsWrapper {
    margin-bottom: 16px;
  }
  .loadingWrapper {
    margin: 60px auto;
  }

  .loadingWrapper :global(div) {
    margin: 60px auto;
    width: 60px;
  }
</style>
