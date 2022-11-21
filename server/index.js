require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const router = require('./routes/index')

mongoose
  .connect(
    'mongodb+srv://admin:wwwww@cluster1.6n4vixw.mongodb.net/TodoList?retryWrites=true&w=majority'
  )
  .then(() => console.log('DataBase is fine'))
  .catch(() => {
    console.log('DataBase connect failed')
  })

const app = new express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`TodoList started on port ${PORT}...`))
