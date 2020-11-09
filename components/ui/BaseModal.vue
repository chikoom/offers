<template>
  <section class="popup-modal" @click="$emit('close-modal')">
    <base-card class="popup-modal-inner">
      <slot />
    </base-card>
  </section>
</template>

<style scoped>
  .popup-modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 70%);
    width: 100%;
    height: 100%;
  }
  .popup-modal-inner {
    background-color: #fff;
    padding: 1em;
  }
</style>
