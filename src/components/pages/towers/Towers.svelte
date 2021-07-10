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
  import towers from '../../../store/towers';
  import TableActions from './TableActions.svelte';
  import Loader from '../../elements/Loader.svelte';

  let clubId = null;
  let towersReq = null;
  let issuesReq = null;
  let issuesGroupedByTower = {};
  let isLoading = true;

  const handleAddUser = async (row) => {
    const issueRes = await apiService.issuesPost({
      _id: row._id,
      name: row.name,
      status: row.status,
      urgency: row.urgency,
      responder: [
        {
          _key: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5),
          _ref: $conditionalStores.user._id,
          _type: 'reference',
        },
      ],
    });
    towers.reset();
    fetchData($conditionalStores.user.token, $conditionalStores.club._id);
  };

  const handleRemoveUser = async (row) => {
    const issueRes = await apiService.issuesPost({
      _id: row._id,
      name: row.name,
      status: row.status,
      urgency: row.urgency,
      responder: [],
    });
    towers.reset();
    fetchData($conditionalStores.user.token, $conditionalStores.club._id);
  };

  const handleRemoveIssue = async (row) => {
    const issueRes = await apiService.issueDelete(
      row._id,
      $conditionalStores.user.token,
    );
    towers.reset();
    fetchData($conditionalStores.user.token, $conditionalStores.club._id);
  };

  const handleCompleteIssue = async (row) => {
    const issueRes = await apiService.issueClose(
      row,
      $conditionalStores.user.token,
    );
    towers.reset();
    fetchData($conditionalStores.user.token, $conditionalStores.club._id);
  };

  let columns = [];

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

  const issuesByTowerId = (towers, issues) => {
    const theIssues = {};
    towers.forEach((tower) => {
      let items = issues.filter((iss) => iss.membership._id === tower._id);
      items = items.filter((iss) => iss.status !== 'Complete');
      theIssues[tower._id] = items;
    });
    return theIssues;
  };

  const fetchData = async function (token, clubId) {
    try {
      towersReq = await apiService.towersGet(token, clubId);
      issuesReq = await apiService.issuesGet(token, clubId);
      issuesGroupedByTower = filterDataByIssueType(issuesReq, towersReq);
      towers.addTowers({
        towers: towersReq,
        issues: issuesReq,
        issuesGroupedByTower,
        issuesByTowerId: issuesByTowerId(towersReq, issuesReq),
      });
      isLoading = false;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  onMount(async () => {
    conditionalStores.subscribe((value) => {
      if (value && value.user._id && value.club._id) {
        clubId = value.club._id;
        fetchData(value.user.token, value.club._id);
      }

      if (columns.length === 0) {
        columns.push(
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
              props: {
                handleAddUser,
              },
            },
            sortable: true,
          },
          {
            key: 'status',
            title: 'Status',
            value: (v) => v.status,
            sortable: true,
          },
          {
            key: 'actions',
            title: 'Actions',
            sortable: false,
            renderComponent: {
              component: TableActions,
              props: {
                userId: value.user._id,
                handleDelete: (row) => {
                  handleRemoveIssue(row);
                },
                handleLeave: (row) => {
                  handleRemoveUser(row);
                },
                handleComplete: (row) => {
                  handleCompleteIssue(row);
                },
              },
            },
          },
        );
      }
    });
  });

</script>

<SingleColumn title="Towers">
  {#if isLoading}
    <Loader {isLoading} />
  {/if}
  {#if !isLoading && $towers.issuesByTowerId}
    <div class="columns is-multiline">
      {#each $towers.towers as tower}
        <div class="column is-full">
          <Block>
            <h3>
              {#if $towers.issuesGroupedByTower[tower._id].urgent.length}
                <span class="light red" />
              {:else if $towers.issuesGroupedByTower[tower._id].important.length}
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
            {#if $towers.issuesByTowerId && $towers.issuesByTowerId[tower._id]}
              <h4>
                Issues ({$towers.issuesByTowerId[tower._id] &&
                  $towers.issuesByTowerId[tower._id].length})
              </h4>
              {#if $towers.issuesByTowerId[tower._id] && $towers.issuesByTowerId[tower._id].length > 0}
                <Table {columns} rows={$towers.issuesByTowerId[tower._id]} />
              {/if}
              {#if $towers.issues.filter((iss) => iss.membership._id === tower._id).length === 0}
                <div class="noIssues">None Reported</div>
              {/if}
              <div class="actions">
                <AddIssue
                  {clubId}
                  user={$conditionalStores.user}
                  towerId={tower._id}
                  handleUpdate={(res) => {
                    towers.reset();
                    fetchData(
                      $conditionalStores.user.token,
                      $conditionalStores.club._id,
                    );
                  }}
                />
              </div>
            {/if}
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
