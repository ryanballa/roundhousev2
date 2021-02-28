<script>
  import { Route } from 'svelte-navigator';
  import Home from './components/pages/Home.svelte';
  import Tracking from './components/pages/Tracking.svelte';
  import Concists from './components/pages/Concists.svelte';
  import ConcistAdd from './components/pages/ConcistAdd.svelte';
  import Schedule from './components/pages/Schedule.svelte';
  import Login from './components/pages/Login.svelte';
</script>

<Route path="login">
  <Login />
</Route>
<Route path="home">
  <Home />
</Route>
<Route path="tracking/*">
  <Route path="/">
    <Tracking />
  </Route>
  <Route path="concists/*">
    <Route path="/">
      <Concists />
    </Route>
    <Route path="/add" component={ConcistAdd} />
  </Route>
</Route>
<Route path="schedule">
  <Schedule />
</Route>
