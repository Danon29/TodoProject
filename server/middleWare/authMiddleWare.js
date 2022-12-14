const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'Не авторизован' })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Не авторизован' })
  }
}
