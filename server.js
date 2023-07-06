require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')

const app = express()

const port = process.env.PORT || 4000

mongoose.set('strictQuery', true);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
} else {
  app.use(cors())
}

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method, res)
  next()
})

app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Connected to db & listening on port:', port)
    })
  })
  .catch((error) => {
    console.log('error:', error)
  })

