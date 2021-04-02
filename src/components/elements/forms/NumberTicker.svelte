<script>
  import Arrow from '../../icons/Arrow.svelte';

  export let name;
  export let value = 0;
  export let handleUpdate = () => {
    return value;
  };

  const handleNumberUpdate = (e) => {
    if (e && e.target) {
      value = e.target.value;
    }

    handleUpdate(value);
  };

  const handleClick = (direction) => {
    value = direction == 'up' ? (value += 0.25) : (value -= 0.25);
    handleNumberUpdate();
  };
</script>

<div class="numberTickerWrapper">
  <button
    type="button"
    on:click={() => {
      handleClick('up');
    }}><Arrow direction="up" /></button
  >
  <label for={name}>
    <input
      class="numberTicker"
      id={name}
      type="text"
      {name}
      {value}
      on:change={handleNumberUpdate}
    />
  </label>
  <button
    type="button"
    on:click={() => {
      handleClick('down');
    }}><Arrow direction="down" /></button
  >
</div>

<style>
  input[type='text'] {
    background: transparent;
    border: none;
    width: 100%;
    margin: 0 35px 0 25px;
    text-align: center;
    padding: var(--forms-padding) 0 var(--forms-padding) 0;
    width: 50px;
  }

  input[type='text']::-webkit-inner-spin-button,
  input[type='text']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  .numberTickerWrapper {
    background-color: #fff;
    border: var(--forms-border);
    border-radius: var(--forms-borderRadius);
    position: relative;
    width: 100px;
  }
  .numberTickerWrapper :global(button) {
    border: 1px solid var(--color-buttonsSecondary);
    border-radius: var(--forms-borderRadius);
    padding: 11px var(--forms-padding);
    position: absolute;
    top: -2px;
  }
  .numberTickerWrapper :global(.arrow) {
    border: solid var(--color-buttonsSecondaryText);
    border-width: 0 3px 3px 0;
  }
  .numberTickerWrapper :global(button:first-child) {
    left: -3px;
    top: -3px;
  }
  .numberTickerWrapper :global(button:last-child) {
    right: -3px;
    top: -3px;
  }
</style>
