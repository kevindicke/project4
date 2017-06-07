import React, {Component} from 'react'
import Lists from './Lists'

class Body extends Component {
  render(){
    const currentUser = this.props.currentUser
    return (
      <div className='body'>
        {currentUser && (
          <div>
            <img src={currentUser.image} alt='User Pic' className='profilePic'/>
            <h3 className='userName'>{
              currentUser ? currentUser.name + "'s List" : 'Welcome to ToGet'
            }</h3>
             {currentUser ? <Lists /> : <h4>Log in to see tasks</h4>}
          </div>
        )}

      </div>
    )
  }
}

export default Body
