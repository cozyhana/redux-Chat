/*
 * @Author: hf 
 * @Date: 2018-03-13 09:47:20 
 * @Last Modified by: hf
 * @Last Modified time: 2018-03-13 10:11:18
 */
//数据流转

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

export function auth(state = { isAuth: false, user: '李云龙' }, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuth: true }
    case LOGOUT:
      return { ...state, isAuth: false }
    default:
      return state
  }
}

//action

export function login() {
  return { type: LOGIN }
}


export function logout() {
  return { type: LOGOUT }
}
