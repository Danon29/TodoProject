const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const authMiddleWare = require('../middleWare/authMiddleWare')

router.post('/register', authController.registration)
router.post('/login', authController.login)
router.post('/tag', authController.createTag)
module.exports = router
