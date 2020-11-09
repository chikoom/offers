<template>
  <hr :style="{ margin: `${space} 0` }">
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    space: {
      type: String,
      default: '1em'
    }
  }
})
</script>
<style scoped>
hr{
  height: 2px;
  background-color: #ccc;
  border: 0;
}
</style>
