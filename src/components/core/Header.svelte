<header class="App-header">
  <div class="topBar">
    <div class="leftBar">
      <h1>
        <a href="/"> Roundhouse </a>
      </h1>
    </div>
    <div class="rightMenu">
      <div class="userMenu">
        <span>Ryan</span>
      </div>
    </div>
  </div>
</header>

<style>
  .leftBar {
    background: var(--color-navBg);
    width: 29%;
    padding: 1%;
  }
  .topBar {
    display: flex;
    justify-content: space-between;
  }
  a,
  a:link,
  a:visited {
    color: var(--color-links);
    text-decoration: none;
  }
  h1 {
    font-family: 'TofinoProBold';
    margin-left: 8px;
  }
  .rightMenu {
    background-color: var(--color-bgHighlight);
    width: 69%;
  }
  .userMenu {
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #797979;
    float: right;
    margin: 16px 16px 0 0;
    padding: 8px;
  }
</style>
