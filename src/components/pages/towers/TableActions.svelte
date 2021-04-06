<script>
  import Trash from '../../icons/Trash.svelte';
  import Doorway from '../../icons/Doorway.svelte';
  import Button from '../../elements/Button.svelte';

  export let row;
  export let userId;
  export let handleLeave = () => {};
  export let handleDelete = () => {};

  const isUserAssigned =
    row.responder && row.responder.filter((resp) => resp._id === userId);
</script>

<ul class="actions">
  <li>
    <Button
      actionEvent={() => {
        handleDelete(row);
      }}
      variant="empty"><Trash /></Button
    >
  </li>
  {#if isUserAssigned && isUserAssigned.length}
    <li>
      <Button
        actionEvent={() => {
          handleLeave(row);
        }}
        variant="empty"><Doorway /></Button
      >
    </li>
  {/if}
</ul>

<style>
  .actions {
    display: flex;
  }
  .actions li {
    margin: 0 8px 0 0;
    padding: 0;
  }
  :global(button.empty svg) {
    height: 25px;
    width: 25px;
  }
</style>
