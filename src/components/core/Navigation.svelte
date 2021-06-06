<script>
  import { isAuthenticated } from '../../store/user';
  import { Link } from 'svelte-navigator';
  import Work from '../icons/Work.svelte';
  import Tracking from '../icons/Tracking.svelte';
  import Train from '../icons/Train.svelte';
  import Schedule from '../icons/Schedule.svelte';
  import Hamburger from '../icons/Hamburger.svelte';

  let isMenuOpen = false;

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'active' };
    }
    return {};
  }

  function handleMenuOpen() {
    isMenuOpen = !isMenuOpen;
  }

  function handleMenuClose() {
    isMenuOpen = false;
  }

</script>

<nav>
  {#if $isAuthenticated}
    <button class="hamburgerMenu" on:click={handleMenuOpen}>
      <Hamburger />
    </button>
    <ul class={`menuWrapper ${isMenuOpen ? 'open' : ''}`}>
      <li>
        <span class="linkWrapper">
          <Link {getProps} class="link" to="towers" on:click={handleMenuClose}
            ><Work size={20} /><span>Towers</span></Link
          >
        </span>
      </li>
      <li>
        <span class="linkWrapper">
          <Link
            {getProps}
            class="link"
            to="inventory"
            on:click={handleMenuClose}
          >
            <span class="iconWrapper"><Train size={20} /></span><span
              >Inventory</span
            >
          </Link>
        </span>
      </li>
      <li>
        <span class="linkWrapper">
          <Link {getProps} class="link" to="tracking"
            ><Tracking size={20} /><span>Tracking</span></Link
          >
        </span>
        <ul class="sub">
          <li>
            <Link
              {getProps}
              class="link"
              to="tracking/consists"
              on:click={handleMenuClose}>Consists</Link
            >
          </li>
          <li>
            <Link
              {getProps}
              class="link"
              to="tracking/cabs"
              on:click={handleMenuClose}>Cabs</Link
            >
          </li>
          <li>
            <Link
              {getProps}
              class="link"
              to="tracking/locomotives"
              on:click={handleMenuClose}>Locomotives</Link
            >
          </li>
        </ul>
      </li>
      <li>
        <span class="linkWrapper">
          <Link
            {getProps}
            class="link"
            to="schedule"
            on:click={handleMenuClose}
          >
            <span class="iconWrapper"><Schedule size={20} /></span><span
              >Schedule</span
            >
          </Link>
        </span>
      </li>
    </ul>
  {/if}
</nav>

<style>
  .hamburgerMenu {
    background: none;
    display: none;
    border: none;
    margin: 0 auto;
    width: auto;
  }
  .hamburgerMenu :global(svg) {
    fill: var(--color-navLinks);
    height: 30px;
  }
  .iconWrapper {
    display: inline-block;
    width: 20px;
    margin-left: 0;
  }
  .linkWrapper {
    display: flex;
  }
  .linkWrapper :global(.link) {
    color: var(--color-navLinks);
    font-weight: bold;
    text-decoration: none;
  }
  .linkWrapper :global(.active) {
    color: var(--color-navLinksActive);
    font-weight: bold;
  }
  .linkWrapper :global(svg) {
    fill: var(--color-navLinks);
  }
  .linkWrapper :global(.active svg) {
    fill: var(--color-navLinksActive);
  }
  .sub {
    margin: 0 0 0 35px;
  }
  .sub li {
    margin: 0;
  }
  .sub :global(.link) {
    color: var(--color-navLinks);
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
  }
  .sub :global(.active) {
    color: var(--color-navLinksActive);
    font-size: 16px;
    text-decoration: none;
  }
  nav {
    background: var(--color-navBg);
    font-family: 'TofinoProBook';
    min-height: 400px;
    padding: 1%;
    width: 15%;
  }
  .menuWrapper.open {
    background: var(--color-navBg);
    display: block;
    padding: 32px 0;
    position: absolute;
    text-align: center;
    height: 100vh;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--zIndex-menu);
  }
  .menuWrapper.open .linkWrapper {
    display: block;
  }
  li {
    align-items: center;
    align-content: center;
    font-size: 20px;
    list-style: none;
    margin: 0 8px 8px 8px;
    padding: 0;
  }
  li span {
    display: inline-block;
    margin-left: 8px;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  @media (max-width: 1100px) {
    .menuWrapper {
      display: none;
    }
    .hamburgerMenu {
      display: block;
    }
    nav {
      width: 50px;
      padding: 0;
    }
  }

</style>
