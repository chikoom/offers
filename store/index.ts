import Vuex from 'vuex'

interface Offer {
  id?:String,
  userId?:String,
  title:String,
  description:String,
  email:String,
  phone:String
}
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedOffers: <Offer[]> []
    },
    mutations: {
      setOffers (state, offers) {
        state.loadedOffers = offers
      },
      addOffer (state, offer:Offer) {
        state.loadedOffers.unshift(offer)
      }
    },
    actions: {
      async nuxtServerInit (vuexContext, context) {
        if (context.store.state.loadedOffers.length > 0) {
          return
        }
        const offers = await context.app.$axios.$get('/api/offers/')
        vuexContext.commit('setOffers', offers)
      },
      setOffers (vuexContext, offers) {
        vuexContext.commit('setOffers', offers)
      },
      async addOffer (vuexContext, offer:Offer) {
        // const createdOffer = {
        //   userId: '222',
        //   ...offer
        // }
        const response = await this.$axios.$post('/api/offers/', offer)
        vuexContext.commit('addOffer', response)
        return response
      }
    },
    getters: {
      loadedOffers (state) {
        return state.loadedOffers
      }
    }
  })
}

export default createStore
