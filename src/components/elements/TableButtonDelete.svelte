<script>
  import { navigate } from 'svelte-navigator';
  import sanity from '../../lib/sanity';
  import Button from './Button.svelte';
  export let row;
  export let col;

  const deleteData = async (id) => {
    try {
      await sanity.delete(id);
      navigate(`/`);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<Button
  actionText="Delete"
  variant="secondary"
  actionEvent={() => deleteData(row._id)}>Delete</Button
>
