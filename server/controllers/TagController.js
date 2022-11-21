const Tag = require('../models/Tag')

/**
 * Функция, которая позволяет создать тег
 * @param req.body.text
 * @description Теги предназначены для дополнительной фильтрации Todo
 * @return Tag doc
 */
module.exports = async (req, res) => {
  const { name } = req.body
  const doc = new Tag({
    name: name,
  })

  await doc.save().then(() => console.log('Tag saved'))
  res.send(doc)
}
