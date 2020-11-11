import Vuex from 'vuex'
import Vue from 'vue'

interface Offer {
  id?:String,
  userId?:String,
  title:String,
  description:String,
  email:String,
  phone:String
}
interface Viewers {
  [ key:string ]: number[]
}
Vue.use(Vuex)
Vue.config.devtools = true

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedOffers: <Offer[]> [],
      offersViewers: <Viewers> {},
      userUniqueIdentifier: new Date().getTime(),
      justanumber: 0
    },
    mutations: {
      setOffers (state, offers:Offer[]) {
        state.loadedOffers = offers
      },
      addOffer (state, offer:Offer) {
        state.loadedOffers.unshift(offer)
      },
      saveViewers (state, viewerData) {
        state.offersViewers = viewerData
      },
      updateViewers (state, viewerData) {
        const { offerId, viewers } = viewerData
        state.offersViewers[offerId] = viewers
      },
      removeViewers (state, viewerData) {
        const { offerId, viewers } = viewerData
        state.offersViewers[offerId] = viewers
      }
    },
    actions: {
      updateViewers(vuexContext, viewerData) {
        vuexContext.commit('updateViewers', viewerData)
      },
      removeViewers(vuexContext, viewerData) {
        vuexContext.commit('removeViewers', viewerData)
      },
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
      },
      getViewersByOfferId (vuexContext, offerId) {
        const currentOffer = vuexContext.state.offersViewers[offerId]
        if (currentOffer !== undefined) {
          return currentOffer.length
        } else {
          return 0
        }
      }
    },
    getters: {
      userUniqueIdentifier (state) {
        return state.userUniqueIdentifier
      },
      loadedOffers (state) {
        return state.loadedOffers
      },
      offersViewers (state) {
        return state.offersViewers
      },
      viewersByOfferId: (state) => (offerId:string) => {
        const currentOffer = state.offersViewers[offerId]
        if (currentOffer !== undefined) {
          return currentOffer.length
        } else {
          return 0
        }
      },
      justanumber (state) {
        return state.justanumber
      }
    }
  })
}

export default createStore
