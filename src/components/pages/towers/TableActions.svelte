<script>
  import Trash from '../../icons/Trash.svelte';
  import Doorway from '../../icons/Doorway.svelte';
  import Button from '../../elements/Button.svelte';
  import Dropdown from '../../elements/Dropdown.svelte';
  import Complete from '../../icons/Complete.svelte';

  export let row;
  export let userId;
  export let handleLeave = () => {};
  export let handleDelete = () => {};
  export let handleComplete = () => {};

  const isUserAssigned =
    row.responder && row.responder.filter((resp) => resp._id === userId);

</script>

<Dropdown title="Actions" direction="left">
  <ul class="actionItems">
    <li>
      <Button
        actionEvent={() => {
          handleDelete(row);
        }}
        variant="empty"
      >
        <Trash />
        <span>Delete</span>
      </Button>
    </li>
    {#if isUserAssigned && isUserAssigned.length}
      <li>
        <Button
          actionEvent={() => {
            handleLeave(row);
          }}
          variant="empty"
        >
          <Doorway />
          <span>Unassign</span>
        </Button>
      </li>
    {/if}
    <li>
      <Button
        actionEvent={() => {
          handleComplete(row);
        }}
        additionalClasses="complete"
        variant="empty"
      >
        <Complete />
        <span>Complete</span>
      </Button>
    </li>
  </ul>
</Dropdown>

<ul class="actions" />

<style>
  .actionItems :global(button) {
    align-items: center;
    display: flex;
  }
  .actionItems :global(span) {
    font-size: 100%;
  }
  .actionItems li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  :global(button.empty svg) {
    margin-right: 8px;
    height: 25px;
    width: 25px;
  }
  :global(button.complete svg) {
    margin-top: 8px;
    height: 28px;
    width: 28px;
  }

</style>
