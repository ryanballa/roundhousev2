<script>
  import Button from './Button.svelte';
  export let row;
  export let col;
  export let rowOwner = '';
  export let deleteAction = () => {};
  import { user } from '../../store/user';
</script>

<Button
  disabled={$user.isAdmin ? false : row[rowOwner]._id !== $user._id}
  actionText="Delete"
  variant="secondary"
  actionEvent={() => deleteAction(row._id)}>Delete</Button
>
