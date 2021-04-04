<script>
  export let name;
  export let label;
  export let type = 'text';
  export let value = '';
</script>

<label for={name}>
  <span>{label}</span>
  <input id={name} {type} {value} />
</label>
