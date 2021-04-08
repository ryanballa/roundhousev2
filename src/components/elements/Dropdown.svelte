<script>
  import Arrow from '../icons/Arrow.svelte';

  let isOpen = false;
  export let title;
  export let direction = 'right';

  window.addEventListener(
    'overlayClick',
    function (e) {
      isOpen = false;
    },
    false,
  );

  const handleClick = () => {
    if (!isOpen) {
      const event = new Event('showOverlay');
      window.dispatchEvent(event);
    }
    isOpen = !isOpen;
  };
</script>

<div class="dropdownwrapper">
  <button on:click={handleClick}>
    <span class="textWrapper">{title}</span>
    <span class="arrowWrapper"
      ><Arrow direction={isOpen ? 'up' : 'down'} /></span
    >
  </button>
  {#if isOpen}
    <nav
      class={direction === 'right' ? 'right' : 'left'}
      on:click={() => {
        isOpen = false;
      }}
    >
      <slot />
    </nav>
  {/if}
</div>

<style>
  .arrowWrapper {
    position: relative;
  }
  .arrowWrapper :global(.arrow) {
    border-color: #797979;
    position: absolute;
    top: -5px;
    right: 0;
  }
  .dropdownwrapper {
    position: relative;
  }
  button {
    align-items: center;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #797979;
    font-size: var(--size-button);
    display: flex;
    justify-content: space-between;
    margin: 0 16px 0 0;
    padding: 8px 10px;
    width: 200px;
  }
  .textWrapper {
    display: inline-block;
    margin-right: 8px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 170px;
  }

  nav {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    top: 35px;
    position: absolute;
    width: 300px;
    z-index: 10001;
  }

  nav.right {
    right: 16px;
  }

  nav.left {
    left: 0px;
  }

  nav :global(a:link, a:visited) {
    color: var(--color-links);
    font-size: var(--size-button);
    display: block;
    text-decoration: none;
    width: 100%;
  }

  nav :global(a:hover) {
    color: var(--color-links);
    text-decoration: underline;
  }

  nav :global(button) {
    background: none;
    border: none;
    color: var(--color-links);
    display: block;
    font-size: var(--size-button);
    text-align: left;
    padding: 0;
    width: 100%;
  }

  nav :global(button:hover) {
    cursor: pointer;
    text-decoration: underline;
  }

  nav :global(ul) {
    list-style: none;
    margin: 8px;
    padding: 0;
  }

  nav :global(li) {
    border-bottom: 1px solid #f6f0f7;
    color: #797979;
    font-size: var(--size-button);
    padding: 8px 0;
  }

  nav :global(li:last-child) {
    border-bottom: none;
  }
</style>
