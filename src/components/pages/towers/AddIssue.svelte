<script>
  import Button from '../../elements/Button.svelte';
  import Input from '../../elements/forms/Input.svelte';
  import Select from '../../elements/forms/Select.svelte';
  import Close from '../../icons/Close.svelte';
  import apiService from '../../../lib/API';
  import { useForm, required, Hint, HintGroup } from 'svelte-use-form';

  export let clubId;
  export let towerId;
  export let user;
  export let handleUpdate;

  let isOpen = false;

  const handleClick = () => {
    isOpen = !isOpen;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      _type: 'issue',
      name: $form.title._value,
      description: $form.description._value,
      status: $form.status._value,
      urgency: $form.urgency._value,
      membership: {
        _ref: towerId,
        _type: 'reference',
      },
    };

    apiService.issuesPost(doc, user.token, clubId).then((res) => {
      isOpen = false;
      handleUpdate(res);
    });
  };

  const form = useForm({
    urgency: { validators: [required] },
    status: { validators: [required] },
    title: { validators: [required] },
    description: { validators: [] },
  });
</script>

<section>
  <header>
    {#if !isOpen}
      <Button
        actionText="Add Issue"
        variant="secondary"
        actionEvent={handleClick}
      />
    {/if}
  </header>
  {#if isOpen}
    <section class="togglePanel">
      <header>
        <button class="close" on:click={handleClick}>
          <Close />
        </button>
      </header>
      <section>
        <form id="addIssueForm" use:form on:submit={handleSubmit}>
          <ul class="formItems">
            <li>
              <Input name="title" label="Title" />
              <HintGroup for="title">
                <Hint on="required">Provide a title.</Hint>
              </HintGroup>
            </li>
            <li><Input name="description" label="Description" /></li>
            <li>
              <Select name="urgency" label="Urgency">
                <option value="Low">Low</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </Select>
              <HintGroup for="title">
                <Hint on="required">Select an urgency.</Hint>
              </HintGroup>
            </li>
            <li>
              <Select name="status" label="Status">
                <option value="Incomplete">Incomplete</option>
                <option value="Open">Open</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
              </Select>
              <HintGroup for="title">
                <Hint on="required">Select a status.</Hint>
              </HintGroup>
            </li>
            <li>
              <Button disabled={!$form.valid} actionText="Add" />
            </li>
          </ul>
        </form>
      </section>
    </section>
  {/if}
</section>

<style>
  .close {
    background: none;
    border: none;
    height: 30px;
    width: 30px;
    margin: 8px;
  }
  .togglePanel {
    background-color: var(--color-bgHighlight);
    border: 1px solid #dbdddd;
    border-radius: 6px;
  }
  .togglePanel header {
    display: flex;
  }
  .togglePanel header .close {
    margin-left: auto;
  }
  .togglePanel > section {
    padding: 0 16px 16px 16px;
  }
  .togglePanel .formItems li {
    margin-bottom: 8px;
  }
</style>
