import React from 'react'
import { connect } from 'react-redux'
import { login } from './Auth.redux'
import { Redirect } from 'react-router';
import { axios } from 'axios';

//两个reducers, 每个reducers都要一个state
//合并reducers,通过combineReducers合并

@connect(
  state => state.auth,
  { login }
)
class Auth extends React.Component {
  // componentDidMount() {
  //   axios.get('/data')
  //     .then(res => {
  //       console.log(res)
  //     })
  // }
  render() {
    return (
      <div>
        {
          this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null
        }
        <h2>你没有权限，需要登录才能看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
export default Auth