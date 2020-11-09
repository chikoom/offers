const express = require('express')
const authRouter = express.Router()
const authManager = require('../data/authManager')
const { authUser } = require('./middleware/authVerify')

let refreshTokens = []

authRouter.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const savedUser = await authManager.signupUser({
      username,
      email,
      password
    })
    res.status(200).send(savedUser)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

authRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const loggedUser = await authManager.loginUser({
      email,
      password
    })
    const token = authManager.generateAccessToken(loggedUser)
    const refreshToken = authManager.generateRefreshToken(loggedUser)
    refreshTokens.push(refreshToken)

    res.status(200).send({
      token,
      refreshToken
    })
  } catch (err) {
    res.status(401).send(err.message)
  }
})

authRouter.post('/auth/token', (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken) {
    return res.sendStatus(401)
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403)
  }
  const newToken = authManager.verifyRefreshToken(refreshToken)
  res.status(200).send(newToken)
})

authRouter.delete('/auth/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.status(204).send('logout')
})

authRouter.get('/auth/user', authUser, (req, res) => {
  const { id } = req.user
  const selectedUser = authManager.getUserById(id)
  res.status(200).send({
    user: {
      id: selectedUser.id,
      username: selectedUser.username,
      email: selectedUser.email
    }
  })
})

module.exports = authRouter
