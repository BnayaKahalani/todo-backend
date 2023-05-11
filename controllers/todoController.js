const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

const getTodos = async (req, res) => {

  const user_id = req.user._id

  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 })
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
  const { title, body, crossedOut } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!body) {
    emptyFields.push('body')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  try {
    const user_id = req.user._id
    const todo = await Todo.create({ title, body, crossedOut, user_id })
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

  console.log('req.body:', req.body)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Not valid ID' })
  }

  const todo = await Todo.findOneAndUpdate({ _id: id }, { $set: { ...req.body } },)
  const [updatedTodo,] = await Todo.find({ _id: id })
  res.status(200).json(updatedTodo)
}

// const crossOutTodo = async (req, res) => {
//   const { id } = req.params

//   Todo.updateOne({ _id: id }, { $set: { crossedOut: { $not: "$crossedOut" } } }, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   })
// }

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  // crossOutTodo,
}