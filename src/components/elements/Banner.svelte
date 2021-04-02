<script>
  import { Link } from 'svelte-navigator';

  export let variant = 'error';
  export let actionUrl = '/';
  export let actionText = 'Vist Home';
  export let text = '';
</script>

<div class={`banner ${variant}`}>
  <span>{text}</span>
  {#if actionUrl}<Link to={actionUrl}>{actionText}</Link>{/if}
</div>

<style>
  .banner {
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
  }
  .error {
    color: var(--color-terraCotta);
  }
  .error :global(a:link),
  .error :global(a:visited) {
    color: var(--color-links);
  }
</style>
