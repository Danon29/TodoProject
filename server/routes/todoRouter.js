const Router = require('express')
const router = new Router()
const TodoController = require('../controllers/TodoController')
const authMiddleWare = require('../middleWare/authMiddleWare')

router.get('/all', TodoController.findAllTodo)
router.get('/:id', TodoController.findOneTodo)
router.post('/', authMiddleWare, TodoController.createTodo)
router.post('/:id', authMiddleWare, TodoController.updateTodo)
router.delete('/:id', authMiddleWare, TodoController.deleteTodo)

module.exports = router
