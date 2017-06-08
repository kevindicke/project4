import React, { Component } from 'react';
import './App.css';
import clientAuth from './clientAuth'
import Header from './Header'
import Body from './Body'

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      view: 'home'
    }
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: currentUser ? 'tasks' : 'home'
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data)=>{
      this.setState({
        currentUser: data,
        loggedIn: true,
        view: ''
      })
    })
  }

  _logIn(credentials) {
    clientAuth.logIn(credentials).then(user =>{
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: ''
      })
    })
  }
  _logOut(){
    clientAuth.logOut().then(message =>{
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }
  _setView(viewName){
    this.setState({
      view: viewName
    })
  }


  render() {
    return (
      <div className="App">
        <Header
          loggedIn={this.state.loggedIn}
          onViewChange={this._setView.bind(this)}
          onLogout={this._logOut.bind(this)}
        />

        {{
          home: <img className='check' src='https://maxcdn.icons8.com/Share/icon/ios7/User_Interface//checked_checkbox1600.png' alt='check'/>,
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />
        }[this.state.view]}
        <Body currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

class SignUp extends Component {
  _handleSignup(evt){
    evt.preventDefault()
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      image: this.refs.image.value,
      password: this.refs.password.value
    }
    this.props.onSignup(newUser)
  }
  render(){
    return (
      <div className='container'>
        <h2>Sign Up</h2>
        <form onSubmit={this._handleSignup.bind(this)}>
          <input type='text' placeholder='Name' ref='name' />
          <input type='email' placeholder='Email' ref='email' />
          <input type='text' placeholder='Image URL' ref='image' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}

class LogIn extends Component {
  _handleLogin(evt){
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onLogin(credentials)
  }
  render() {
    return (
      <div className='container'>
        <h2>Log In</h2>
        <form onSubmit={this._handleLogin.bind(this)}>
          <input type='email' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Log In</button>
        </form>
      </div>
    )
  }
}

export default App;
