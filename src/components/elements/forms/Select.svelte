<script>
  export let name;
  export let label;
  export let value = '';
  export let includeEmptyOption = true;
</script>

<label for={name}>
  <span>{label}</span>
  <select id={name} {value}>
    {#if includeEmptyOption}
      <option value="">--- Select One ---</option>
    {/if}
    <slot />
  </select>
</label>
