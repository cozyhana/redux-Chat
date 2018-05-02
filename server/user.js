const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }
// Chat.remove({}, function (e, d) {
//   //清空聊天信息
// })

Router.get('/list', function (req, res) {
  const { type } = req.query
  // User.remove({}, function (e, d) { })
  User.find({ type }, function (err, doc) {
    return res.json({ code: 0, data: doc })
  })
})
Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})
Router.post('/login', function (req, res) {
  const { user, pwd } = req.body

  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或者密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})
Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body
  User.findOne({ user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }

    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save(function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      const { user, type, _id } = d
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { user, type, _id } })
    })
  })
})
Router.get('/info', function (req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
  // 用户有没有cookie

})

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd + salt))
}


//获取聊天列表
Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userid;
  // Chat.find({ '$or', [{ from: user, to: user }]});
  //首先查询出用户信息
  User.find({}, function (e, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    //查询聊天信息
    //查询出当前用户的所发和所接收的信息
    //过滤条件'$or': [{ from: user }, { to: user }]
    Chat.find({ $or: [{ from: user }, { to: user }] }, function (err, doc) {
      if (!err) {//查询无错
        return res.json({ code: 0, msgs: doc, users: users })
      }
    })
  })
})

module.exports = Router