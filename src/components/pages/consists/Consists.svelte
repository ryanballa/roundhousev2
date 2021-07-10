<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { format } from 'date-fns';
  import consists from '../../../store/consists';
  import SingleColumn from '../../layout/SingleColumn.svelte';
  import DynamicContent from '../../core/DynamicContent.svelte';
  import TableActions from './TableActions.svelte';
  import Table from '../../elements/Table.svelte';
  import apiService from '../../../lib/API';
  import { user } from '../../../store/user';
  import clubs from '../../../store/clubs';
  let rows = [];

  const handleRemoveConcist = async (row) => {
    try {
      await apiService.consistsDelete(row._id, $user.token);
      const updatedRows = rows.filter((r) => r._id !== row._id);
      consists.addConsists(updatedRows);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const handleEditConcist = (row) => {
    navigate(`/tracking/consists/edit/${row._id}`);
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
        component: TableActions,
        props: {
          handleDelete: (row) => {
            handleRemoveConcist(row);
          },
          handleEdit: (row) => {
            handleEditConcist(row);
          },
        },
      },
    },
  ];

  let consitsReq = null;
  let consistReqError = false;

  const fetchData = async function (clubId) {
    try {
      consitsReq = await apiService.consistsGet(clubId, $user.token);
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
    clubs.subscribe((value) => {
      fetchData(value._id);
    });
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
