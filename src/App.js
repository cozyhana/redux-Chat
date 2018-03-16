import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGUN, removeGUN, addGunAsync } from './index.redux';

@connect(
  //你要state什么属性放在props里
  state => ({ num: state.counter }),
  //你要什么方法，放在props里，自动dispatch
  { addGUN, removeGUN, addGunAsync }
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>现在有{this.props.num}把</h1>
        <button onClick={this.props.addGUN}>申请武器</button>
        <button onClick={this.props.addGunAsync}>拖两天再给</button>
        <button onClick={this.props.removeGUN}>上交武器</button>
      </div>
    );
  }
}
export default App;
