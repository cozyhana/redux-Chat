import axios from 'axios';
import io from 'socket.io-client';
import { stat } from 'fs';
const socket = io.connect('ws://127.0.0.1:9093');

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
      return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to == action.payload.userid).length }
    case MSG_RECV:
      const n = action.payload.to == action.payload.userid ? 1 : 0;
      return { ...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread + n }
    case MSG_READ:
      return { ...state, chatmsg: state.chatmsg.map(v => ({ ...v, read: true })), unread: state.unread - action.payload.num }
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return { type: 'MSG_LIST', payload: { msgs, users, userid } }
}

function msgRecv(msg, userid) {
  return {
    type: 'MSG_RECV', payload: { msg, userid }
  }
}
/**
 * 处理已读信息
 * 使已读信息的数目清零
 * @param {*发送者} from
 * @param {*接收者} userid
 * @param {*消息数量} num 
 */
function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } }
}
//获取信息列表
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status == 200 && res.data.code == 0) {
          dispatch(msgList(res.data.msgs, res.data.users, getState().user._id))
        }
      })
  }
}

//发送信息
export function sendMsg({ from, to, msg }) {
  console.log(from, to, msg)
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

//接收消息
export function recvMsg() {
  //只过滤别人发给我的信息数量
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      dispatch(msgRecv(data, getState().user._id))
    })
  }
}

//清零已读信息的数量
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', { from })
      .then(res => {
        const userid = getState().user._id;
        if (res.status === 200 && res.data.code === 0) {
          //code===0 ：服务正确
          dispatch(msgRead({ userid, from, num: res.data.num }))
        }
      })
  }
}

