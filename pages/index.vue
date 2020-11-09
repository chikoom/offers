<template>
  <div class="home-page">
    <hero-block>Offerzzz | לוח הצעות</hero-block>
    <sub-header>כל ההצעות שפורסמו</sub-header>
    <offer-list :offers="loadedOffers" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    loadedOffers () {
      return this.$store.getters.loadedOffers
    }
  },
  created () {
    this.$store.dispatch('setOffers', this.loadedOffers)
  }
})
</script>
<style scoped>
@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>
