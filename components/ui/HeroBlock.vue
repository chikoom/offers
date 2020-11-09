<template>
  <div class="hero-block">
    <h1><slot /></h1>
  </div>
</template>
<style scoped>
  .hero-block{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    height: 20vh;
    background-color: var(--color-primary);
    background-image: url('~assets/images/peopleThinking.jpg');
    background-size: cover;
    background-position: 50% 100%;
  }
</style>
