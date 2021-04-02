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
    border: 1px solid #dbdddd;
    border-collapse: collapse;
    border-radius: 6px;
    text-align: left;
    width: 100%;
  }

  .tableWrapper :global(table th) {
    background-color: #f1f1f1;
    padding: 12px;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.7);
  }
  .tableWrapper :global(table td) {
    border-top: 1px solid #dbdddd;
    padding: 16px;
  }
</style>
