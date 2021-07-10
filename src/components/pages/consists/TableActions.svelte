<script>
  import Trash from '../../icons/Trash.svelte';
  import Edit from '../../icons/Edit.svelte';
  import Button from '../../elements/Button.svelte';
  import Dropdown from '../../elements/Dropdown.svelte';

  export let row;
  export let handleEdit = () => {};
  export let handleDelete = () => {};
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
    <li>
      <Button
        actionEvent={() => {
          handleEdit(row);
        }}
        variant="empty"
      >
        <Edit />
        <span>Edit</span>
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
