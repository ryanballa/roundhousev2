<script>
  import { isAuthenticated } from '../../store/user';
  import { Link } from 'svelte-navigator';
  import Work from '../icons/Work.svelte';
  import Tracking from '../icons/Tracking.svelte';
  import Train from '../icons/Train.svelte';
  import Schedule from '../icons/Schedule.svelte';

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'active' };
    }
    return {};
  }
</script>

<nav>
  {#if $isAuthenticated}
    <ul>
      <li>
        <span class="linkWrapper">
          <Link {getProps} class="link" to="towers"
            ><Work size={20} /><span>Towers</span></Link
          >
        </span>
      </li>
      <li>
        <span class="linkWrapper">
          <Link {getProps} class="link" to="inventory">
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
            <Link {getProps} class="link" to="tracking/consists">Consists</Link>
          </li>
          <li>
            <Link {getProps} class="link" to="tracking/cabs">Cabs</Link>
          </li>
          <li>
            <Link {getProps} class="link" to="tracking/locomotives"
              >Locomotives</Link
            >
          </li>
        </ul>
      </li>
      <li>
        <span class="linkWrapper">
          <Link {getProps} class="link" to="schedule">
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
  .iconWrapper {
    display: inline-block;
    width: 20px;
    margin-left: 0;
  }
  .linkWrapper {
    display: flex;
  }
  .linkWrapper :global(.link) {
    color: var(--color-links);
    text-decoration: none;
  }
  .linkWrapper :global(.active) {
    color: var(--color-activeLinks);
  }
  .linkWrapper :global(.active svg) {
    fill: var(--color-activeLinks);
  }
  .sub {
    margin: 0 0 0 35px;
  }
  .sub li {
    margin: 0;
  }
  .sub :global(.link) {
    color: var(--color-links);
    font-size: 16px;
    text-decoration: none;
  }
  .sub :global(.active) {
    color: var(--color-links);
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
</style>
