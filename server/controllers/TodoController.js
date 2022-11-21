const { Model } = require('mongoose')
const Tag = require('../models/Tag')
const Todo = require('../models/Todo')

class TodoController {
  async createTodo(req, res) {
    try {
      const text = req.body.text
      const tags = req.body.tags
      if (tags.length === 0) {
        const doc = new Todo({
          text: text,
        })

        const todo = await doc
          .save()
          .then(() => console.log('Документ сохранен'))

        return res.json({ doc })
      }

      let tagArray = []
      for (let i = 0; i <= tags.length; i++) {
        const tagId = await Tag.findOne({ name: tags[i] })
        if (tagId) {
          tagArray.push(tagId._id)
        }
      }

      const doc = new Todo({
        text: text,
        tags: tagArray,
      })

      const todo = await doc.save().then(() => console.log('Документ сохранен'))

      res.json({ doc })
    } catch (err) {
      console.log(err)
    }
  }

  async updateTodo(req, res) {
    try {
      const id = req.params.id
      const _text = req.body.text
      const _tags = req.body.tags
      if (_text && _tags) {
        let tagArray = []
        for (let i = 0; i <= _tags.length; i++) {
          const tagId = await Tag.findOne({ name: _tags[i] })
          if (tagId) {
            tagArray.push(tagId._id)
          }
        }

        const doc = await Todo.findOneAndUpdate(
          { _id: id },
          { text: _text, tags: tagArray },
          { new: true }
        )

        console.log('Документ был изменен')
        return res.send(doc)
      }

      if (!_text && _tags) {
        let tagArray = []
        for (let i = 0; i <= _tags.length; i++) {
          const tagId = await Tag.findOne({ name: _tags[i] })
          if (tagId) {
            tagArray.push(tagId._id)
          }
        }

        const doc = await Todo.findOneAndUpdate(
          { _id: id },
          { tags: tagArray },
          { new: true }
        )

        console.log('В документе были изменены теги')
        return res.send(doc)
      }

      if (_text && !_tags) {
        const doc = await Todo.findOneAndUpdate(
          { _id: id },
          { text: _text },
          { new: true }
        )

        console.log('В документе был изменен текст')
        return res.send(doc)
      }

      return res.send('???')
    } catch (err) {
      console.log(err)
    }
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.params

      await Todo.findOneAndDelete({ _id: id })

      console.log(`Документ был удален`)
      return res.send('Объект был успешно удален')
    } catch (err) {
      console.log(err)
    }
  }

  async findOneTodo(req, res) {
    const id = req.params.id

    const doc = await Todo.findOne({ _id: id })

    if (!doc) {
      return res.send('Такого документа нет')
    }

    res.send(doc)
  }

  async findAllTodo(req, res) {
    const tags = req.query.tags
    const limit = req.query.limit || 5
    const skip = req.query.skip || 0

    if (typeof tags === 'undefined') {
      const todos = await Todo.find({}).skip(skip).limit(limit)

      return res.send(todos)
    }

    let tagArray = []

    if (typeof tags === 'object') {
      for (let i = 0; i < tags.length; i++) {
        const allTags = await Tag.findOne({ name: tags[i] })
        tagArray.push(allTags._id)
      }

      const todos = await Todo.find({ tags: { $in: tagArray } })
        .skip(skip)
        .limit(limit)

      return res.send(todos)
    }

    const tagId = await Tag.findOne({ name: tags })
    const todos = await Todo.find({ tags: { $all: tagId } })
      .skip(skip)
      .limit(limit)

    res.send(todos)
  }
}

module.exports = new TodoController()
