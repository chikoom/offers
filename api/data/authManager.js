const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signupSchema = Joi.object({
  username: Joi.string()
    .min(6)
    .max(12)
    .pattern(new RegExp('^[a-zA-Z0-9_]{6,12}$'))
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required()
})

const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required()
})

class AuthManager {
  getAllUsers() {
    const rawdata = fs.readFileSync(path.resolve(__dirname, './users.json'))
    const users = JSON.parse(rawdata)
    return users
  }

  getUserById(userId) {
    const allUsers = this.getAllUsers()
    const chosenUser = allUsers.find(user => user.id === userId)
    return chosenUser
  }

  async loginUser({ email, password }) {
    try {
      const validation = Joi.attempt({ email, password }, loginSchema)
      const allUsers = this.getAllUsers()
      const foundUser = allUsers.find(user => user.email === email)
      if (!foundUser) {
        throw new Error('User Does Not Exist')
      }
      const validPass = await bcrypt.compare(password, foundUser.password)

      if (!validPass) {
        throw new Error('Wrong Password')
      }
      return {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      }
    } catch (err) {
      throw new Error('UnAuthorized: ' + err.message)
    }
  }

  async signupUser({ username, email, password }) {
    const validation = Joi.attempt({ username, email, password }, signupSchema)
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userID = uuidv4()
    const allUsers = this.getAllUsers()
    const userExist = allUsers.find(user => user.username === username)
    const emailExist = allUsers.find(user => user.email === email)
    if (userExist) {
      throw new Error('Username Already Exist')
    }
    if (emailExist) {
      throw new Error('Email Already Exist')
    }
    allUsers.push({
      id: userID,
      username,
      email,
      password: hashedPassword
    })
    const stringData = JSON.stringify(allUsers)
    fs.writeFileSync(path.resolve(__dirname, './users.json'), stringData)
    const newUser = this.getUserById(userID)
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  }

  generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '60m' })
  }

  generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  }

  verifyRefreshToken(refreshToken) {
    const verifiedUser = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const accessToken = this.generateAccessToken({
      id: verifiedUser.id,
      username: verifiedUser.username,
      email: verifiedUser.email
    })
    return { accessToken }
  }
}

module.exports = new AuthManager()
