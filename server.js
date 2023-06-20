require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')

const app = express()
mongoose.set('strictQuery', true);

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method, res)
  next()
})

app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log('error:', error)
  })

