<script>
  import Button from '../../elements/Button.svelte';
  import Input from '../../elements/forms/Input.svelte';
  import Select from '../../elements/forms/Select.svelte';

  let isOpen = false;

  const handleClick = () => {
    isOpen = !isOpen;
  };
</script>

<section>
  <header>
    {#if !isOpen}
      <Button
        actionText="Add Issue"
        variant="secondary"
        actionEvent={handleClick}
      />
    {:else}
      <Button
        actionText="Close"
        variant="secondary"
        actionEvent={handleClick}
      />
    {/if}
  </header>
  {#if isOpen}
    <section>
      <ul>
        <li><Input name="title" label="Title" /></li>
        <li><Input name="description" label="Description" /></li>
        <li>
          <Select name="urgency" label="Urgency">
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </Select>
        </li>
        <li>
          <Select name="status" label="Status">
            <option value="Incomplete">Incomplete</option>
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Done">Done</option>
          </Select>
        </li>
      </ul>
    </section>
  {/if}
</section>
