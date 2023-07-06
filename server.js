require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')

const app = express()
mongoose.set('strictQuery', true);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // const corsOptions = {
  //   origin: ['http://localhost:5174', 'http://127.0.0.1:5174', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
  //   credentials: true
  // }
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
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log('error:', error)
  })

