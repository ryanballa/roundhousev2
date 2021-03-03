<script>
  import { navigate } from 'svelte-navigator';
  export let actionText = 'Add';
  export let action = null;
  export let actionEvent = null;
  export let disabled = false;
  export let type = 'submit';
  export let variant = 'primary';

  const handleClick = () => {
    if (action) {
      navigate(action, { replace: true });
    }
    if (actionEvent) {
      actionEvent();
    }
  };
</script>

<button class={variant} {disabled} {type} on:click={handleClick}
  >{actionText}</button
>

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
  button:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
</style>
