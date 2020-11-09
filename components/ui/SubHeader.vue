<template>
  <h2><slot /></h2>
</template>
<style scoped>
  h2{
    max-width: 250px;
    display: block;
    font-size: 1.5em;
    text-align: center;
    margin: 1em auto;
    border-bottom: 2px solid var(--border-color);
  }
</style>
