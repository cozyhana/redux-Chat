import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavLinkBar from '../navLink/navLink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
function Msg() {
  return <h2>Msg 首页</h2>
}

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends React.Component {

  componentDidMount() {
    //获取用户信息
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render() {
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'boss',
        title: 'boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ]
    const { pathname } = this.props.location;
    return pathname === '/' ?
      <Redirect to={'/login'} />
      :
      (
        <div>
          <NavBar mode='dard' className='fixd-header'>{navList.find(v => v.path === pathname).title}</NavBar>
          <div style={{ marginTop: 45 }}>
            <Switch>
              {
                navList.map(v => (
                  <Route key={v.path} path={v.path} component={v.component}></Route>
                ))
              }
            </Switch>
          </div>
          <NavLinkBar
            data={navList}
          />
        </div>
      )
  }
}

export default Dashboard