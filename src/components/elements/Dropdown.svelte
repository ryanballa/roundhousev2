<script>
  import Arrow from '../icons/Arrow.svelte';
  let isOpen = false;
  export let title;

  const handleClick = () => {
    isOpen = !isOpen;
  };
</script>

<div class="dropdownwrapper">
  <button on:click={handleClick}>
    {title}
    <span class="arrowWrapper"
      ><Arrow direction={isOpen ? 'down' : 'up'} /></span
    >
  </button>
  {#if isOpen}
    <nav>
      <slot />
    </nav>
  {/if}
</div>

<style>
  .arrowWrapper :global(.arrow) {
    border-color: #797979;
  }
  .dropdownwrapper {
    position: relative;
  }
  button {
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #797979;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 16px 16px 0 0;
    padding: 8px 10px;
    width: 100px;
  }
  nav {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    top: 36px;
    position: absolute;
    right: 16px;
    width: 300px;
  }

  nav :global(ul) {
    list-style: none;
    margin: 8px;
    padding: 0;
  }

  nav :global(li) {
    color: #797979;
    font-size: 14px;
  }
</style>
