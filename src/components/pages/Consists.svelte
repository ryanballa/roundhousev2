<script>
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import consists from '../../store/consists';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import DynamicContent from '../core/DynamicContent.svelte';
  import TableButtonDelete from '../elements/TableButtonDelete.svelte';
  import Table from '../elements/Table.svelte';
  import apiService from '../../lib/API';
  import { user } from '../../store/user';
  let rows = [];

  const handleDelete = async (id) => {
    try {
      await apiService.consistsDelete(id, $user.token);
      const updatedRows = rows.filter((r) => r._id !== id);
      consists.addConsists(updatedRows);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const columns = [
    {
      key: 'number',
      title: 'Number',
      value: (v) => v.number,
      sortable: true,
    },
    {
      key: 'concistOwner',
      title: 'Owner',
      value: (v) => v.concistOwner.name,
      sortable: true,
    },
    {
      key: 'locomotiveAddresses',
      title: 'Locomotive Addresses',
      value: (v) => v.locomotiveAddresses || '',
      sortable: true,
    },
    {
      key: 'lastUsed',
      title: 'Last Used',
      value: (v) => format(new Date(v._updatedAt), 'yyyy-MM-dd'),
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
          rowOwner: 'concistOwner',
        },
      },
    },
  ];

  let consitsReq = null;
  let consistReqError = false;

  const fetchData = async function () {
    try {
      consitsReq = await apiService.consistsGet(
        '3370bbfc-6edc-45ab-986e-8362118bdb08',
        $user.token,
      );
      consists.addConsists(consitsReq);
    } catch (e) {
      console.log(`Error: ${e}`);
      consistReqError = e;
    }
  };

  consists.subscribe((value) => {
    rows = value;
  });

  onMount(async () => {
    fetchData();
  });
</script>

<SingleColumn title="Consists">
  <DynamicContent
    addRoute="/tracking/consists/add"
    addMessage="Add new Consist"
    isEmpty={rows.length === 0}
    isLoading={!consitsReq}
    error={consistReqError}
  />
  {#if rows.length > 0}<Table {columns} {rows} />{/if}
</SingleColumn>
