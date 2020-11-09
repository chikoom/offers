const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.sendStatus(401)
  }
  try {
    const verify = await jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verify
    next()
  } catch (err) {
    return res.sendStatus(403)
  }
}

module.exports = { authUser }
