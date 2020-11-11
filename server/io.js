let currentlyWatchedOffers = {}
export default function(socket, io) {
  return Object.freeze({
    getViewers() {
      const objectToReturn = {}
      Object.keys(currentlyWatchedOffers).forEach(offer => {
        objectToReturn[offer] = Array.from(currentlyWatchedOffers[offer])
      })
      socket.emit('recieveViewers', objectToReturn)
    },
    updateViewers(data) {
      const { offerId, userId } = data
      const singleOfferViewers = currentlyWatchedOffers[offerId]
      if (!singleOfferViewers) {
        currentlyWatchedOffers[offerId] = new Set()
      }
      currentlyWatchedOffers[offerId].add(userId)
      const answer = {
        offerId,
        viewers: Array.from(currentlyWatchedOffers[offerId])
      }
      io.emit('updateViewers', answer)
    },
    removeViewers(data) {
      const { offerId, userId } = data
      currentlyWatchedOffers[offerId].delete(userId)
      const answer = {
        offerId,
        viewers: Array.from(currentlyWatchedOffers[offerId])
      }
      io.emit('removeViewers', answer)
    }
  })
}
