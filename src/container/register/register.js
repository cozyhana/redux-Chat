import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile';

import { connect } from 'react-redux'
import { regigter } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {
    regigter
  }
)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' //牛人
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key, val) {
    this.setState(
      {
        [key]: val
      }
    )
  }
  handleRegister() {
    this.props.regigter(this.state);
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <List>
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户</InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange('pwd', v)}
            >密码</InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange('repeatpwd', v)}
            >确认密码</InputItem>
            <WhiteSpace />
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={() => this.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={() => this.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
          </List>
          <Button onClick={this.handleRegister} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Register