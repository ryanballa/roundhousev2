<script>
  export let name;
  export let label;
  export let type = 'text';
  export let value = '';
</script>

<label for={name}>
  <span>{label}</span>
  <input class="input" id={name} {name} {type} {value} />
</label>

<style>
  label span {
    display: block;
    font-size: var(--size-p);
    margin-bottom: 8px;
  }
</style>
