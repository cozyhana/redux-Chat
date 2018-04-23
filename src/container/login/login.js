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
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

//1.高阶组件，装饰器模式
//高阶组件，传入一个组件，再返回一个组件
//----------------------
// function hello() {
//   console.log('hello')
// }

// function WrapperHello(fn) {
//   return function () {
//     console.log('before say hello');
//     fn()
//     console.log('after say hello')
//   }
// }

// hello = WrapperHello(hello)
// hello()
//----------------------------

//2.@装饰器
//属性代理
// function WrapperHello(Comp) {
//   class WrapComp extends React.Component {

//     render() {
//       return <div>
//         <p>这是高阶组件HOC特有的元素</p>
//         <Comp {...this.props}></Comp>
//       </div>
//     }
//   }
//   return WrapComp
// }

// @WrapperHello
// class Hello extends React.Component {
//   render() {
//     return <h2>hf</h2>
//   }
// }
//------------------------------------------

//3.反向继承
// function WrapperHello(Comp) {
//   class WrapComp extends Comp {
//     componentDidMount() {
//       console.log('高阶组件新增的生命周期，加载完成')
//     }
//     render() {
//       return <Comp></Comp>
//     }
//   }
//   return WrapComp
// }

// @WrapperHello
// class Hello extends React.Component {
//   render() {
//     return <h2>hf</h2>
//   }
// }
//-----------------------------------------

//4.使用高阶组件的作用是：
//代码的复用
//逻辑的抽象
//反向代理的作用

@connect(
  state => state.user,
  { login }
)

@imoocForm

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  //登录页面
  register() {
    this.props.history.push('/register')
  }

  //登录
  handleLogin() {
    this.props.login(this.props.state);
  }
  render() {
    return (
      <div>
        {(this.props.redirectTo && this.props.redirectTo != '/login') ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}
              type="password"
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