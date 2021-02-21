<script>
  import SvelteTable from 'svelte-table';

  export let columns = [];
  export let rows = [];
</script>

<div class="tableWrapper">
  <SvelteTable {columns} {rows} />
</div>

<style>
  .tableWrapper :global(table) {
    background: #ffffff;
    border-collapse: collapse;
    border-radius: 4px;
    text-align: left;
    width: 100%;
  }
  .tableWrapper :global(table th) {
    background-color: #f1f1f1;
    padding: 16px;
  }
  .tableWrapper :global(table td) {
    padding: 16px;
  }
</style>
