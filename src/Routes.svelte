<script>
  import { Route } from 'svelte-navigator';
  import Home from './components/pages/Home.svelte';
  import Consists from './components/pages/Consists.svelte';
  import ConsistAdd from './components/pages/ConsistAdd.svelte';
  import Schedule from './components/pages/Schedule.svelte';
  import Login from './components/pages/Login.svelte';
  import Cabs from './components/pages/Cabs.svelte';
  import CabAdd from './components/pages/CabAdd.svelte';
  import ComingSoon from './components/pages/ComingSoon.svelte';
  import Locomotives from './components/pages/Locomotives.svelte';
  import LocomotiveAdd from './components/pages/LocomotiveAdd.svelte';
  import ProfileAdd from './components/pages/ProfileAdd.svelte';
  import UserAdd from './components/pages/UserAdd.svelte';
  import Changelog from './components/pages/Changelog.svelte';
</script>

<Route path="login">
  <Login />
</Route>
<Route path="changelog">
  <Changelog />
</Route>
<Route path="/">
  <Home />
</Route>
<Route path="work-orders">
  <ComingSoon />
</Route>
<Route path="inventory">
  <ComingSoon />
</Route>
<Route path="tracking/*">
  <Route path="/">
    <ComingSoon />
  </Route>
  <Route path="cabs/*">
    <Route path="/">
      <Cabs />
    </Route>
    <Route path="/add" component={CabAdd} />
  </Route>
  <Route path="locomotives/*">
    <Route path="/">
      <Locomotives />
    </Route>
    <Route path="/add" component={LocomotiveAdd} />
  </Route>
  <Route path="consists/*">
    <Route path="/">
      <Consists />
    </Route>
    <Route path="/add" component={ConsistAdd} />
  </Route>
</Route>
<Route path="schedule">
  <Schedule />
</Route>
<Route path="profile/*">
  <Route path="/add">
    <ProfileAdd />
  </Route>
</Route>
<Route path="user/*">
  <Route path="/add">
    <UserAdd />
  </Route>
</Route>
