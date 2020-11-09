const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

class DataManager {
  getAllOffers() {
    const rawdata = fs.readFileSync(path.resolve(__dirname, './offers.json'))
    const offers = JSON.parse(rawdata)
    return offers
  }

  getOfferByID(offerId) {
    const allOffers = this.getAllOffers()
    const specificOffer = allOffers.find(offer => offer.id === offerId)
    return specificOffer
  }

  getAllOffersByUserID(userId) {
    const allOffers = this.getAllOffers()
    const userOffers = allOffers.filter(offer => offer.userId === userId)
    return userOffers
  }

  saveOffer(offerObject) {
    const uniqueId = uuidv4()
    const allOffers = this.getAllOffers()
    allOffers.unshift({
      id: uniqueId,
      ...offerObject
    })
    const stringData = JSON.stringify(allOffers)
    fs.writeFileSync(path.resolve(__dirname, './offers.json'), stringData)
    return this.getOfferByID(uniqueId)
  }
}

module.exports = new DataManager()
