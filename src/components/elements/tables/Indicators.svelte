<script>
  export let variant = 'green';
  export let row;

  if (row.urgency === 'Urgent') {
    variant = 'red';
  }
  if (row.urgency === 'High') {
    variant = 'yellow';
  }
</script>

<div>
  <span class={`indicator ${variant}`} />
  <span>{row.urgency}</span>
</div>

<style>
  .indicator {
    border-radius: 10px;
    display: inline-block;
    margin-right: 8px;
    height: 10px;
    width: 10px;
  }
  .indicator.green {
    background-color: var(--color-success);
  }
  .indicator.yellow {
    background-color: var(--color-caution);
  }
  .indicator.red {
    background-color: var(--color-terraCotta);
  }
</style>
