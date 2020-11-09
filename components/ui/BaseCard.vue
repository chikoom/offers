<template>
  <div class="base-card" @click.stop>
    <slot />
  </div>
</template>
<style scoped>
  .base-card {
    display: flex;
    align-items: center;
    justify-items: center;
    border-radius: 5px;
    box-shadow: 1px 1px 3px var(--shadow-color);
    padding: 1em;
    margin: 0.5em 0;
    width: 80%;
    max-width: 500px;
  }
</style>
