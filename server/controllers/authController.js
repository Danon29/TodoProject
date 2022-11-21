const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
/**
 * Функция генерации jwt токена
 * @param  id {string} id пользователя
 * @param  name {string} имя пользователя
 * @returns jwt token
 */
function generateJWT(id, name) {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class authController {
  /**
   * Функция регистрации пользователя
   * @param req.body.name - имя пользователя
   * @param req.body.password - пароль пользователя
   * @description При получении имени, которое уже есть в бд, возвращается сообщение о том, что такой
   * пользователь уже существует. Если такого пользователя нет, то хешируется пароль и создается
   * новый документ с введенным именем и захешированным паролем
   * @returns user doc
   */
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
  /**
   * Функция входа пользователя
   * @param req.body.name - имя пользователя
   * @param req.body.password - пароль пользователя
   * @description На вход получает имя и пароль. Если пользователя с таким именем нет, то возвращается сообщение
   * об этом и работа функции заканчивается. Если такой пользователь существует, то текущий пароль сравнивается
   * с захешированным из бд. Если проверка пройдена, то генерируется jwt токен и возвращается в ответе.
   * Если проверка не пройдена, то пользователь получает сообщение об ошибка входа
   * @returns jwt token
   */
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
}

module.exports = new authController()
