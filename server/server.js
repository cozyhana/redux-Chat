const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('<h2>HELLO</h2>')
})
app.get('/data', function (req, res) {
  res.json({ name: 'imooc', type: 'IT' })
})
app.use('/user', userRouter)
app.listen(9093, function () {
  console.log('Node app start at port 9093')
})