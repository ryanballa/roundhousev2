<script>
  import Button from './Button.svelte';
  export let row;
  export let deleteAction = () => {};
</script>

<Button
  actionText="Delete"
  variant="secondary"
  actionEvent={() => deleteAction(row._id)}>Delete</Button
>
