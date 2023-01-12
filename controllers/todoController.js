const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

const getTodos = async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 })
  res.status(200).json(todos)
}

const getTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such todo' })
  }

  const todo = await Todo.findById(id)

  if (!todo) {
    return res.status(404).json({ error: 'No such todo' })
  }

  res.status(200).json(todo)
}

const createTodo = async (req, res) => {
  const { title, body, urgency } = req.body
  try {
    const todo = await Todo.create({ title, body, urgency })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such todo' })
  }

  const todo = await Todo.findByIdAndDelete({ _id: id })

  if (!todo) {
    return res.status(404).json({ error: 'No such todo' })
  }

  res.status(200).json(todo)
}

const updateTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such todo' })
  }

  const todo = await Todo.findByIdAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!todo) {
    return res.status(404).json({ error: 'No such todo' })
  }

  res.status(200).json(todo)
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo
}