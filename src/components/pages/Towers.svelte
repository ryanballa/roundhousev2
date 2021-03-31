<script>
  import { onMount } from 'svelte';
  import { user } from '../../store/user';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import apiService from '../../lib/API';
  import Block from '../elements/Block.svelte';
  import Table from '../elements/Table.svelte';
  import Indicators from '../elements/tables/Indicators.svelte';
  import Users from '../elements/tables/Users.svelte';

  let towersReq = null;
  let issuesReq = null;
  let issuesGroupedByTower = {};

  const columns = [
    {
      key: 'urgency',
      title: 'Urgency',
      sortable: true,
      renderComponent: {
        component: Indicators,
      },
    },
    {
      key: 'name',
      title: 'Title',
      value: (v) => v.name,
      sortable: true,
    },
    {
      key: 'name',
      title: 'Responders',
      renderComponent: {
        component: Users,
      },
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      value: (v) => v.status,
      sortable: true,
    },
    // {
    //   key: 'actions',
    //   title: 'Actions',
    //   sortable: false,
    //   renderComponent: {
    //     component: TableButtonDelete,
    //     props: {
    //       deleteAction: handleDelete,
    //       rowOwner: 'locomotiveOwner',
    //     },
    //   },
    // },
  ];

  const filterDataByIssueType = (issues, towers) => {
    let issuesByTower = {};
    towers.forEach((tower) => {
      const issuesForTower = issues.filter(
        (iss) => iss.membership._id === tower._id,
      );
      issuesByTower[tower._id] = {
        urgent: issuesForTower.filter((iss) => iss.urgency === 'Urgent'),
        important: issuesForTower.filter((iss) => iss.urgency === 'High'),
        low: issuesForTower.filter((iss) => iss.urgency === 'Low'),
      };
    });
    return issuesByTower;
  };

  const fetchData = async function (token) {
    try {
      // TODO: Don't hard-code club ID
      towersReq = await apiService.towersGet(
        token,
        '3370bbfc-6edc-45ab-986e-8362118bdb08',
      );
      issuesReq = await apiService.issuesGet(
        token,
        '3370bbfc-6edc-45ab-986e-8362118bdb08',
      );
      issuesGroupedByTower = filterDataByIssueType(issuesReq, towersReq);
      console.log(issuesGroupedByTower);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  onMount(async () => {
    user.subscribe((value) => {
      fetchData(value.token);
    });
  });
</script>

<SingleColumn title="Towers">
  {#if towersReq && issuesReq}
    <div class="columns">
      {#each towersReq as tower}
        <div class="column">
          <Block>
            <h3>
              {#if issuesGroupedByTower[tower._id].urgent.length}
                <span class="light red" />
              {:else if issuesGroupedByTower[tower._id].important.length}
                <span class="light yellow" />
              {:else}
                <span class="light green" />
              {/if}
              <span>{tower.name}</span>
            </h3>
            <p>{tower.description}</p>
            <h4>Issues</h4>
            <Table
              {columns}
              rows={issuesReq.filter((iss) => iss.membership._id === tower._id)}
            />
          </Block>
        </div>
      {/each}
    </div>
  {/if}
</SingleColumn>

<style>
  h3 {
    display: flex;
    align-items: center;
  }
  .light {
    border-radius: 10px;
    display: inline-block;
    margin-right: 8px;
    height: 20px;
    width: 20px;
  }
  .light.red {
    background-color: var(--color-terraCotta);
  }
  .light.yellow {
    background-color: var(--color-caution);
  }
  .light.green {
    background-color: var(--color-success);
  }
</style>
