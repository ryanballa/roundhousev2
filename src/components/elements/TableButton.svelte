<script>
  import sanity from '../../lib/sanity';
  export let row;
  export let col;

  const deleteData = async (id) => {
    try {
      await sanity.delete(id);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<button on:click={() => deleteData(row._id)}>Delete</button>
