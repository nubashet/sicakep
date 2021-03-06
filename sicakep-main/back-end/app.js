require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const Middleware = require('./middleware/Middleware')
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(Middleware.errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
