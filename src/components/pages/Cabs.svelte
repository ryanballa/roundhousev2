<script>
  import { onMount } from 'svelte';
  import cabs from '../../store/cabs';
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import DynamicContent from '../core/DynamicContent.svelte';
  import TableButtonDelete from '../elements/TableButtonDelete.svelte';
  import Table from '../elements/Table.svelte';
  let rows = [];

  const handleDelete = async (id) => {
    try {
      await sanity.delete(id);
      const updatedRows = rows.filter((r) => r._id !== id);
      cabs.addCabs(updatedRows);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const columns = [
    {
      key: 'cabOwner',
      title: 'Owner',
      value: (v) => v.cabOwner,
      sortable: true,
    },
    {
      key: 'number',
      title: 'Number',
      value: (v) => v.number,
      sortable: true,
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      renderComponent: {
        component: TableButtonDelete,
        props: {
          deleteAction: handleDelete,
        },
      },
    },
  ];

  let cabsReq = null;
  let cabsReqError = false;

  const fetchData = async function () {
    const query = `*[_type == 'cabs']{ _id, number, "cabOwner": owner->name }`;
    try {
      cabsReq = await sanity.fetch(query);
      console.log(cabsReq);
      cabs.addCabs(cabsReq);
    } catch (e) {
      console.log(`Error: ${e}`);
      cabsReqError = e;
    }
  };

  cabs.subscribe((value) => {
    rows = value;
  });

  onMount(async () => {
    fetchData();
  });
</script>

<SingleColumn title="Cabs">
  <DynamicContent
    addRoute="/tracking/cabs/add"
    addMessage="Add New Cab"
    isEmpty={rows.length === 0}
    isLoading={!cabsReq}
    error={cabsReqError}
  />
  {#if rows.length > 0}<Table {columns} {rows} />{/if}
</SingleColumn>
