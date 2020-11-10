const express = require('express')
const offersRouter = express.Router()
const dataManager = require('../data/dataManager')
const { authUser } = require('./middleware/authVerify')

offersRouter.get('/offers', (req, res) => {
  try {
    const allOffers = dataManager.getAllOffers()
    res.status(200).send(allOffers)
  } catch (err) {
    res.status(400)
  }
})

offersRouter.get('/offers/:id', (req, res) => {
  try {
    const { id } = req.params
    const offer = dataManager.dataManager.getOfferByID(id)
    res.status(200).send(offer)
  } catch (err) {
    res.status(400)
  }
})

offersRouter.get('/offers/user/:id', authUser, (req, res) => {
  try {
    const { id } = req.user
    const userOffers = dataManager.getAllOffersByUserID(id)
    res.status(200).send(userOffers)
  } catch (err) {
    res.status(400)
  }
})

offersRouter.post('/offers', (req, res) => {
  try {
    const offer = req.body
    const savedOffer = dataManager.saveOffer(offer)
    res.status(200).send(savedOffer)
  } catch (err) {
    res.status(400)
  }
})

module.exports = offersRouter
