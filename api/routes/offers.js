const express = require('express')
const offersRouter = express.Router()
const dataManager = require('../data/dataManager')
const { authUser } = require('./middleware/authVerify')

offersRouter.get('/offers', (req, res) => {
  res.send(dataManager.getAllOffers())
})

offersRouter.get('/offers/:id', (req, res) => {
  const { id } = req.params
  res.send(dataManager.getOfferByID(id))
})

offersRouter.get('/offers/user/:id', authUser, (req, res) => {
  const { id } = req.user
  res.send(dataManager.getAllOffersByUserID(id))
})

offersRouter.post('/offers', (req, res) => {
  const offer = req.body
  res.send(dataManager.saveOffer(offer))
})

module.exports = offersRouter
