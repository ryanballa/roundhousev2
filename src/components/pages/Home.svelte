<script>
  import SingleColumn from '../layout/SingleColumn.svelte';
  import { Link } from 'svelte-navigator';

</script>

<SingleColumn title="Locomotive House">
  <div class="columns">
    <div class="column is-three-fifths">
      <h3>Schedule</h3>
      <p>
        Schedule time for the club. All time in the layout room must be booked
        in advance.
      </p>
      <p>
        <Link class="button" to="/schedule">Schedule Time</Link>
      </p>
    </div>
    <div class="column">
      <h3>Manage Locomotives</h3>
      <p>
        Track your locomotive numbers and roster using the locomotives section
        of the site.
      </p>
      <p>
        <Link class="button" to="/tracking/locomotives">Manage Locomoties</Link>
      </p>
    </div>
  </div>
</SingleColumn>
