<script>
  import Work from '../icons/Work.svelte';
  import Tracking from '../icons/Tracking.svelte';
  import Train from '../icons/Train.svelte';
</script>

<nav>
  <ul>
    <li>
      <a href="#"><Work size={20} /><span>Work Orders</span></a>
    </li>
    <li>
      <a href="#"
        ><span class="iconWrapper"><Train size={20} /></span><span
          >Inventory</span
        ></a
      >
    </li>
    <li>
      <a href="#"><Tracking size={20} /><span>Tracking</span></a>
    </li>
  </ul>
</nav>

<style>
  .iconWrapper {
    display: inline-block;
    width: 20px;
    margin-left: 0;
  }
  a,
  a:link,
  a:visited {
    color: var(--color-links);
    text-decoration: none;
  }
  nav {
    background: var(--color-navBg);
    font-family: 'TofinoProBook';
    padding: 1%;
    width: 29%;
  }
  li {
    align-items: center;
    align-content: center;
    display: flex;
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
