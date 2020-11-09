<template>
  <div class="admin-page">
    <sub-header>שלום {{ $auth.user.username }}</sub-header>
    <sub-header>פרסום הצעה חדשה</sub-header>
    <section class="new-offer">
      <!-- <button>
        פרסום מודעה חדשה
      </button> -->
      <base-card>
        <offer-form @submit-data="dataSubmited" />
      </base-card>
    </section>
    <sub-header>כל ההצעות שפרסמת</sub-header>
    <offer-list :offers="offers" />
  </div>
</template>
<script>
export default {
  async middleware(context) {
    if (context.nuxtState) {
      if (localStorage) {
        const refreshToken = localStorage.getItem('auth._refresh_token.local')
        const response = await context.app.$axios.$post('/api/auth/token', { token: refreshToken })
        context.app.$auth.setUserToken(response.accessToken)
      }
    } else if (!context.app.$auth.loggedIn) {
      return context.redirect('/')
    }
  },
  async asyncData (context) {
    const response = await context.app.$axios.$get('/api/offers/user/' + context.app.$auth.user.id)
    return {
      offers: response
    }
  },
  methods: {
    async dataSubmited (offerData) {
      const postedOffer = await this.$store.dispatch('addOffer', {
        userId: this.$auth.user.id,
        ...offerData
      })
      this.$data.offers.unshift(postedOffer)
    }
  }
}
</script>
<style scoped>
  .new-offer {
    display: flex;
    justify-content: center;
  }
</style>
