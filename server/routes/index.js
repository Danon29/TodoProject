const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const todoRouter = require('./todoRouter')

router.use('/auth', authRouter)
router.use('/todos', todoRouter)

module.exports = router
