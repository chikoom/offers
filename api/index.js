const express = require('express')
const offers = require('./routes/offers')
const auth = require('./routes/auth')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(offers)
app.use(auth)
app.get('/test', (req, res) => {
  res.send('ok')
})

module.exports = app

if (require.main === module) {
  const port = process.env.SERVER_PORT || 3001
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
