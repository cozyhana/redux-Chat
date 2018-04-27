import axios from 'axios';
import io from 'socket.io-client';
import { stat } from 'fs';
const socket = io.connect('ws://116.62.163.29:9093');

//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标记已读
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}
//reducer
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read).length }
    case MSG_RECV:
      return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs, users) {
  return { type: 'MSG_LIST', payload: { msgs, users } }
}

function msgRecv(msg) {
  return { type: 'MSG_RECV', payload: msg }
}

//获取信息列表
export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status == 200 && res.data.code == 0) {
          dispatch(msgList(res.data.msgs, res.data.users))
        }
      })
  }
}

//发送信息
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

//接收消息
export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', function (data) {
      dispatch(msgRecv(data))
    })
  }
}

