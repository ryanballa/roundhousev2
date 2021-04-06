<script>
  import { navigate } from 'svelte-navigator';
  export let actionText = 'Add';
  export let additionalClasses = '';
  export let action = null;
  export let actionEvent = null;
  export let disabled = false;
  export let type = 'submit';
  export let variant = 'primary';

  const handleClick = (e) => {
    if (action) {
      navigate(action, { replace: true });
    }
    if (actionEvent) {
      actionEvent(e);
    }
  };
</script>

<button
  class={`${variant} ${additionalClasses}`}
  {disabled}
  {type}
  on:click={handleClick}
>
  {#if variant !== 'empty'}
    {actionText}
  {/if}
  <slot />
</button>

<style>
  button {
    background-color: var(--color-buttons);
    border: none;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: var(--color-bgHighlight);
    font-size: var(--size-button);
    padding: 10px 15px;
  }
  button.secondary {
    background-color: var(--color-buttonsSecondary);
  }
  button.empty {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
  }
  button.linkLike {
    background: transparent;
    border: none;
    box-shadow: none;
    color: var(--color-buttons);
    font-size: var(--size-p);
    padding: 0;
    text-decoration: underline;
  }
  button.linkLike:hover {
    text-decoration: none;
  }
  button:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
  button:disabled {
    background-color: var(--color-buttonsSecondaryDisabled);
    box-shadow: none;
    border: 1px solid var(--color-buttonsSecondary);
    color: var(--color-buttonsSecondary);
  }
  button:disabled:hover {
    cursor: default;
    filter: none;
  }
</style>
