<script>
  import { onMount } from 'svelte';
  import { format, toDate } from 'date-fns';
  import SingleColumn from '../layout/SingleColumn.svelte';
  import apiService from '../../lib/API';

  let changelogRes = null;

  const fetchData = async function () {
    try {
      changelogRes = await apiService.changelogGet();
    } catch (e) {
      console.log(`Error: ${e}`);
      changelogRes = e;
    }
  };

  onMount(async () => {
    fetchData();
  });
</script>

<SingleColumn
  title="What's New"
  description="This page lists all the changes we've made to the website and when they occurred."
>
  {#if changelogRes}
    <ul>
      {#each changelogRes as logItem}
        <li>
          <h2>{format(toDate(new Date(logItem._updatedAt)), 'yyyy-MM-dd')}</h2>
          <p>{logItem.description}</p>
        </li>
      {/each}
    </ul>
  {/if}
</SingleColumn>
