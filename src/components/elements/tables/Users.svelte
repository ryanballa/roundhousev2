<script>
  export let row;
</script>

<div>
  <ul>
    {#if row && row.responder}
      {#each row.responder as responder}
        <li class="user-wrapper">
          <span class="user">{responder.name[0]}</span>
          <span class="name">{responder.name}</span>
        </li>
      {/each}
    {/if}
  </ul>
</div>

<style>
  .user {
    align-items: center;
    background: var(--color-avatarBg);
    border-radius: 20px;
    color: var(--color-snow);
    display: flex;
    justify-content: center;
    height: 35px;
    width: 35px;
    margin: 0 8px 8px 0;
    text-align: center;
  }
  .name {
    display: inline-block;
    margin-bottom: 10px;
  }
  .user-wrapper {
    align-items: center;
    display: flex;
  }
</style>
