import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { login }
)

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
    }
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  //登录页面
  register() {
    this.props.history.push('/register')
  }
  //input 输入
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  //登录
  handleLogin() {
    this.props.login(this.state);
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => this.handleChange('pwd', v)}
            >密码</InputItem>
          </List>
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login