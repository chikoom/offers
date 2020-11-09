<template>
  <button
    class="button"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button {
  font: inherit;
  background-color: var(--color-secondary);
  color: #fff;
  border: 0;
  outline: 0;
  max-width: 150px;
  padding: 18px 20px;
  cursor: pointer;
}

.button:hover{
  background-color:var(--color-primary);
  box-shadow: 1px 1px 3px #999;
}

.button:active {
  background-color: var(--color-secondary);
  box-shadow: none;
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}

.cancel {
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}

.small{
  padding: 5px 7px;
  font-size: 0.8em;
}
</style>
