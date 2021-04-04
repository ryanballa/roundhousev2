<script>
  import { onMount } from 'svelte';
  import SingleColumn from '../../layout/SingleColumn.svelte';
  import apiService from '../../../lib/API';
  import Block from '../../elements/Block.svelte';
  import Table from '../../elements/Table.svelte';
  import Indicators from '../../elements/tables/Indicators.svelte';
  import Users from '../../elements/tables/Users.svelte';
  import conditionalStores from '../../../utils/conditionalStores';
  import AddIssue from './AddIssue.svelte';

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

  const fetchData = async function (token, clubId) {
    try {
      towersReq = await apiService.towersGet(token, clubId);
      console.log(towersReq);
      issuesReq = await apiService.issuesGet(token, clubId);
      issuesGroupedByTower = filterDataByIssueType(issuesReq, towersReq);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  onMount(async () => {
    conditionalStores.subscribe((value) => {
      if (value && value.user._id && value.club._id) {
        fetchData(value.user.token, value.club._id);
      }
    });
  });
</script>

<SingleColumn title="Towers">
  {#if towersReq && issuesReq}
    <div class="columns is-multiline">
      {#each towersReq as tower}
        <div class="column is-half">
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
            <p>
              {#if tower.maintainer && tower.maintainer.length}
                Owners: {#each tower.maintainer as maintainer}
                  <span>{maintainer.name}</span>
                {/each}
              {:else}
                <em>Maintainer needed</em>
              {/if}
            </p>
            <div class="imageWrapper">
              {#if tower.imageUrl}
                <img src={`${tower.imageUrl}`} alt={tower.imageCaption} />
              {/if}
              <p>{tower.description}</p>
            </div>
            <h4>Issues</h4>
            {#if issuesReq.filter((iss) => iss.membership._id === tower._id).length > 0}
              <Table
                {columns}
                rows={issuesReq.filter(
                  (iss) => iss.membership._id === tower._id,
                )}
              />
            {/if}
            {#if issuesReq.filter((iss) => iss.membership._id === tower._id).length === 0}
              <div class="noIssues">None Reported</div>
            {/if}
            <div class="actions">
              <AddIssue />
            </div>
          </Block>
        </div>
      {/each}
    </div>
  {/if}
</SingleColumn>

<style>
  .actions {
    margin-bottom: 16px;
  }
  h3 {
    display: flex;
    align-items: center;
  }
  :global(table) {
    margin-bottom: 16px;
  }
  .imageWrapper {
    border: 1px solid #dbdddd;
    height: 200px;
    overflow: hidden;
    position: relative;
  }
  .imageWrapper:hover:before {
    opacity: 0;
  }
  .imageWrapper img {
    position: absolute;
    z-index: 2;
  }
  .imageWrapper p {
    background-color: rgba(255, 255, 255, 0.8);
    bottom: 0;
    height: 30px;
    margin: 0;
    padding-top: 4px;
    position: absolute;
    text-align: center;
    width: 100%;
    z-index: 5;
  }
  .imageWrapper:before {
    background-color: rgba(255, 255, 255, 0.4);
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    transition: opacity 0.3s;
    width: 100%;
    z-index: 4;
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
  .noIssues {
    background: #ffffff;
    border: 1px solid #dbdddd;
    margin-bottom: 16px;
    padding: 12px;
    text-align: center;
  }
</style>
