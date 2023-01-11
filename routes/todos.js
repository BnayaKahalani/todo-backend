const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mssg: 'GET all todos' })
})

router.get('/:id', (req, res) => {
  res.json({ mssg: 'GET a single todo' })
})

router.post('/', (req, res) => {
  res.json({ mssg: 'POST a new todo' })
})

router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE a todo' })
})

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE a todo' })
})



module.exports = router

