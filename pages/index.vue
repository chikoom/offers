<template>
  <div class="home-page">
    <hero-block>Offerzzz<br>לוח מודעות וחמוצים</hero-block>
    <sub-header>כל ההצעות שפורסמו</sub-header>
    <offer-list :offers="loadedOffers" />
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  computed: {
    loadedOffers () {
      return this.$store.getters.loadedOffers
    }
  },
  created () {
    this.$store.dispatch('setOffers', this.loadedOffers)
  },
  mounted() {
    this.socket = this.$nuxtSocket({ channel: '/index' })
  }
})
</script>
<style scoped>

</style>
