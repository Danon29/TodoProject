const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const todoRouter = require('./todoRouter')
const tagController = require('../controllers/TagController')

router.use('/auth', authRouter)
router.use('/todos', todoRouter)
router.post('/tag', tagController)

module.exports = router
