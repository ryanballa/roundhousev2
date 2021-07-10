<script>
  import Button from '../Button.svelte';

  export let row;
  export let handleAddUser;

</script>

<div>
  <ul>
    {#if row && row.responder && row.responder.length > 0}
      {#each row.responder as responder}
        <li class="user-wrapper">
          <span class="user"
            >{responder && responder.name ? responder.name[0] : ''}</span
          >
          <span class="name">{responder?.name}</span>
        </li>
      {/each}
    {:else}
      <Button
        actionEvent={() => handleAddUser(row)}
        actionText="Help Out"
        variant="linkLike"
      />
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
  .user-wrapper:last-child .name {
    margin-bottom: 0;
  }
  .user-wrapper:last-child .user {
    margin-bottom: 0;
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
