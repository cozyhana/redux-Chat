import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

@connect(
  state => state.user,
  { update }
)
class Geniusinfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo
    return <div>
      {redirect && redirect !== path ? <Redirect to={redirect} /> : ''}
      <NavBar mode="dark">牛人信息完善页</NavBar>
      <AvatarSelector
        selectAvatar={(imgname) => {
          this.setState({
            avatar: imgname
          })
        }}
      />
      <InputItem
        onChange={v => this.handleChange('title', v)}
      >
        求职职位
      </InputItem>

      <TextareaItem
        onChange={v => this.handleChange('desc', v)}
        rows={3}
        autoHeight
        title='个人简介'
      ></TextareaItem>
      <Button
        onClick={() => {
          this.props.update(this.state)
        }}
        type="primary">保存</Button>
    </div>
  }
}

export default Geniusinfo