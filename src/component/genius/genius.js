import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../../component/usercard/usercard'

@connect(
  state => state.chatuser,
  { getUserList }
)

class Genius extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    console.log(this.props.userlist);
    return <UserCard userlist={this.props.userlist} />
  }
}

export default Genius