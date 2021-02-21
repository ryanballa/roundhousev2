<script>
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import DynamicContent from '../core/DynamicContent.svelte';
  import TableButton from '../elements/TableButton.svelte';
  import Table from '../elements/Table.svelte';
  let rows = [];

  // define column configs
  const columns = [
    {
      key: 'concistOwner',
      title: 'Owner',
      value: (v) => v.concistOwner,
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
      renderComponent: TableButton,
    },
  ];

  let consitsReq = null;
  let consistReqError = false;

  const fetchData = async function () {
    const query = `*[_type == 'concists']{ _id, number, "concistOwner": owner->name }`;
    try {
      consitsReq = await sanity.fetch(query);
      rows = consitsReq;
    } catch (e) {
      console.log(`Error: ${e}`);
      consistReqError = e;
    }
  };

  fetchData();
</script>

<SingleColumn title="Concists">
  <DynamicContent
    addRoute="/tracking/concists/add"
    addMessage="Add new Concist"
    isEmpty={rows.length === 0}
    isLoading={!consitsReq}
    error={consistReqError}
  />
  {#if rows.length > 0}<Table {columns} {rows} />{/if}
</SingleColumn>
