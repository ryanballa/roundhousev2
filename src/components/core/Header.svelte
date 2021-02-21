<script>
  import { Link } from 'svelte-navigator';
  import Dropdown from '../elements/Dropdown.svelte';
</script>

<header class="appHeader">
  <div class="topBar">
    <div class="leftBar">
      <h1>
        <span class="linkWrapper">
          <Link class="link" to="/">Roundhouse</Link>
        </span>
      </h1>
    </div>
    <div class="rightMenu">
      <div class="accountContext">
        <Dropdown title="Ryan">
          <ul>
            <li><span>Logout</span></li>
          </ul>
        </Dropdown>
      </div>
    </div>
  </div>
</header>

<style>
  .appHeader {
    box-shadow: 1px 1px 1px #ccc;
  }
  .accountContext {
    float: right;
  }
  .leftBar {
    background: var(--color-navBg);
    width: 19%;
    padding: 1%;
  }
  .topBar {
    display: flex;
    justify-content: space-between;
  }
  .linkWrapper :global(.link) {
    color: var(--color-links);
    text-decoration: none;
  }
  h1 {
    font-family: 'TofinoProBold';
    margin: 0;
    text-align: center;
  }
  .rightMenu {
    background-color: var(--color-bgHighlight);
    width: 79%;
  }
</style>
