<template>
  <section v-if="offers.length > 0" class="offer-list">
    <offer-preview
      v-for="offer in offers"
      :id="offer.id"
      :key="offer.id"
      :user-id="offer.userId"
      :title="offer.title"
      :description="offer.description"
      :email="offer.email"
      :phone="offer.phone"
    />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    offers: {
      type: Array,
      required: true
    }
  }
})
</script>
<style scoped>
 .offer-list{
  display: flex;
  flex-direction: column;
  align-items: center;
 }
</style>
