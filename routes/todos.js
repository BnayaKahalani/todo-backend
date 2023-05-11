const express = require('express')
const {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  // crossOutTodo,
} = require('../controllers/todoController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', createTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', updateTodo)
// router.patch('/:id', crossOutTodo)

module.exports = router

