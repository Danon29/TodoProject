const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Tag = require('../models/Tag')

function generateJWT(id, name) {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class authController {
  async registration(req, res) {
    try {
      const personName = req.body.name
      const person = await User.findOne({ name: personName })
      if (person) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' })
      }

      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)

      const doc = new User({
        name: personName,
        passwordHash,
      })

      await doc.save().then(() => console.log('Пользователь сохранен'))

      res.send(doc)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Ошибка регистрации' })
    }
  }

  async login(req, res) {
    try {
      const name = req.body.name
      const password = req.body.password
      const user = await User.findOne({ name })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const checkedPassword = bcrypt.compare(password, user.passwordHash)
      if (!checkedPassword) {
        return res.status.json({ message: 'Ошибка входа' })
      }

      const token = generateJWT(user._id, user.name)
      return res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Ошибка входа' })
    }
  }
  async createTag(req, res) {
    const { name } = req.body
    const doc = new Tag({
      name: name,
    })

    await doc.save().then(() => console.log('Tag saved'))
    res.send(doc)
  }
}

module.exports = new authController()
