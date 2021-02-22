<script>
  import { navigate } from 'svelte-navigator';
  export let actionText = 'Add';
  export let action;
  export let disabled = false;
  export let type = 'submit';

  const handleClick = () => {
    if (action) {
      navigate(action, { replace: true });
    }
  };
</script>

<button {disabled} {type} on:click={handleClick}>{actionText}</button>

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
  button:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
</style>
