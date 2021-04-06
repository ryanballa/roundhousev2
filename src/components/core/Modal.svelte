<script>
  export let isOpen = false;
</script>

<div class={isOpen ? 'is-active  modal' : 'modal'}>
  <div class="modal-background" />
  <div class="modal-content">
    <slot />
  </div>
  <button class="modal-close is-large" aria-label="close" />
</div>
