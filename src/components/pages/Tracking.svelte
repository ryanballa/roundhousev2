<script>
  import SvelteTable from 'svelte-table';
  import sanity from '../../lib/sanity';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import DynamicContent from '../core/DynamicContent.svelte';
  let rows = [];

  // define column configs
  const columns = [
    {
      key: 'concistOwner',
      title: 'Owner',
      value: (v) => v.concistOwner,
      sortable: true,
      // filterOptions: (rows) => {
      //   // use first letter of first_name to generate filter
      //   let letrs = {};
      //   rows.forEach((row) => {
      //     let letr = row.first_name.charAt(0);
      //     if (letrs[letr] === undefined)
      //       letrs[letr] = {
      //         name: `${letr.toUpperCase()}`,
      //         value: letr.toLowerCase(),
      //       };
      //   });
      //   // fix order
      //   letrs = Object.entries(letrs)
      //     .sort()
      //     .reduce((o, [k, v]) => ((o[k] = v), o), {});
      //   return Object.values(letrs);
      // },
      // filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
    },
    {
      key: 'number',
      title: 'Number',
      value: (v) => v.number,
      sortable: true,
      // filterOptions: (rows) => {
      //   // use first letter of last_name to generate filter
      //   let letrs = {};
      //   rows.forEach((row) => {
      //     let letr = row.last_name.charAt(0);
      //     if (letrs[letr] === undefined)
      //       letrs[letr] = {
      //         name: `${letr.toUpperCase()}`,
      //         value: letr.toLowerCase(),
      //       };
      //   });
      //   // fix order
      //   letrs = Object.entries(letrs)
      //     .sort()
      //     .reduce((o, [k, v]) => ((o[k] = v), o), {});
      //   return Object.values(letrs);
      // },
      // filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
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

<SingleColumn title="Tracking">
  <DynamicContent isLoading={!consitsReq} error={consistReqError} />
  <SvelteTable {columns} {rows} />
</SingleColumn>
