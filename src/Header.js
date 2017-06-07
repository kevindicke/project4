import React, {Component} from 'react'

class Header extends Component {

  _handleClick(evt) {
    console.log('Changing view...')
    this.props.onViewChange(evt.target.name)
  }

  _handleLogOut() {
    console.log("Logging out..")
    this.props.onLogout()
  }

  render() {
    return (
      <div className='header'>
        <h2 className='appName'>ToGet</h2>
        <img src='https://a.wattpad.com/useravatar/DJ_MEOWINGTONS.128.36693.jpg' className='logo' alt="Logo" />
        <div className='btns'>
          {!this.props.loggedIn && (
            <button className='signupBtn' name='signup' onClick={this._handleClick.bind(this)}>Sign Up</button>
          )}
          {!this.props.loggedIn && (
            <button name='login' onClick={this._handleClick.bind(this)}>Log In</button>
          )}
          {this.props.loggedIn && (
            <button onClick={this._handleLogOut.bind(this)}>Log Out</button>
          )}

        </div>
      </div>
    )
  }
}


export default Header
