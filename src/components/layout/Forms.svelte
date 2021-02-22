<ul class="formWrapper">
  <slot />
</ul>

<style>
  .formWrapper {
    margin: 0;
    padding: 0;
  }
  .formWrapper :global(input) {
    border: 1px solid var(--color-formBg);
    border-radius: 4px;
    font-size: var(--size-p);
    padding: 8px;
  }
  .formWrapper :global(select) {
    background: #fff;
    border: 1px solid var(--color-formBg);
    border-radius: 4px;
    font-size: var(--size-p);
    padding: 8px;
  }
  .formWrapper :global(li) {
    list-style: none;
    margin-bottom: 16px;
  }
  .formWrapper :global(.labelWrapper) {
    display: block;
    margin-bottom: 8px;
  }
  .formWrapper :global(.svelte-use-form-hint) {
    color: var(--color-terraCotta);
    margin-bottom: 16px;
  }
</style>
