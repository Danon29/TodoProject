const Router = require('express')
const router = new Router()
const TodoController = require('../controllers/TodoController')

router.get('/all', TodoController.findAllTodo)
router.post('/', TodoController.createTodo)
router.post('/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)
router.get('/:id', TodoController.findOneTodo)

module.exports = router
