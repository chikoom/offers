const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')

const offerSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(60)
    .pattern(new RegExp('^[א-תa-zA-Z0-9_!?()@# ]{2,60}$'))
    .required(),
  description: Joi.string()
    .min(2)
    .max(200)
    .required()
    .pattern(new RegExp('^[א-תa-zA-Z0-9_!?()@#%*&:;,. "+-=]{1,200}$')),
  email: Joi.string()
    .min(2)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .min(6)
    .pattern(new RegExp('^d{2,3}[- ]{0,1}d{7,10}$'))
    .required()
})

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
    // const validation = Joi.attempt(offerObject, offerSchema)
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
