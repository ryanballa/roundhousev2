<script>
  import { onMount } from 'svelte';
  import locomotives from '../../store/locomotives';
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
      locomotives.addLocomotives(updatedRows);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const columns = [
    {
      key: 'cabOwner',
      title: 'Owner',
      value: (v) => v.locomotiveOwner.name,
      sortable: true,
    },
    {
      key: 'address',
      title: 'Addresss',
      value: (v) => v.address,
      sortable: true,
    },
    {
      key: 'engineType',
      title: 'Engine Type',
      value: (v) => v.engineType,
      sortable: true,
    },
    {
      key: 'road',
      title: 'Road',
      value: (v) => v.road,
      sortable: true,
    },
    {
      key: 'roadNumber',
      title: 'Road Number',
      value: (v) => v.roadNumber,
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
          rowOwner: 'locomotiveOwner',
        },
      },
    },
  ];

  let locomotivesReq = null;
  let locomotivesReqError = false;

  const fetchData = async function () {
    const query = `*[_type == 'locomotive']{ _id, address, engineType, road, roadNumber, "locomotiveOwner": owner->{_id, name} }`;
    try {
      locomotivesReq = await sanity.fetch(query);
      locomotives.addLocomotives(locomotivesReq);
    } catch (e) {
      console.log(`Error: ${e}`);
      locomotivesReqError = e;
    }
  };

  locomotives.subscribe((value) => {
    rows = value;
  });

  onMount(async () => {
    fetchData();
  });
</script>

<SingleColumn title="Locomotives">
  <DynamicContent
    addRoute="/tracking/locomotives/add"
    addMessage="Add New Locomotive"
    isEmpty={rows.length === 0}
    isLoading={!locomotivesReq}
    error={locomotivesReqError}
  />
  {#if rows.length > 0}<Table {columns} {rows} />{/if}
</SingleColumn>
