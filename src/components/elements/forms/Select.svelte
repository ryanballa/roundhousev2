<script>
  export let name;
  export let label;
  export let value = '';
  export let includeEmptyOption = true;
</script>

<div class="selectWrapper">
  <label for={name}>{label}</label>
  <div class="select">
    <select id={name} {name} {value}>
      {#if includeEmptyOption}
        <option value="">--- Select One ---</option>
      {/if}
      <slot />
    </select>
  </div>
</div>

<style>
  .selectWrapper label {
    display: block;
    font-size: var(--size-p);
    margin-bottom: 8px;
  }
</style>
