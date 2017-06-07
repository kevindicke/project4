import React, {Component} from 'react'
import clientAuth from './clientAuth'

class Lists extends Component{
  state = {
    lists: []
  }

  componentDidMount(){
    clientAuth.getLists().then(res =>{
      this.setState({
        lists: res.data
      })
    })
  }

  _addList(evt){
    evt.preventDefault()
    const newList = {
      title: this.refs.title.value
    }
    clientAuth.addList(newList).then(res=>{
      this.setState({
        lists: [
          ...this.state.lists,
          res.data.list
        ]
      })
      this.refs.title.value = ''
    })
  }

  _deleteList(id){
    clientAuth.deleteList(id).then(res => {
      this.setState({
        lists: this.state.lists.filter((list)=>{
          return list._id !== id
        })
      })
    })
  }

  _displayTasks(id){
    clientAuth.getTasks(id).then(res =>{
      console.log(res);
    })
  }

  _showList(id){
    clientAuth.showList(id).then(res =>{
      console.log(res.data.tasks);
    })
  }

  render(){
    const lists = this.state.lists.map((list, i)=>{
      return (
        <div key={i} className='theLists'>
          <h3 className='listH3'>{list.title}</h3>
          <button className='listBtn' onClick={this._deleteList.bind(this, list._id)}>Finished</button>
          <button className='taskList' onClick={this._showList.bind(this, list._id)}>Tasks</button>
        </div>
      )
    })
    console.log(this.state.lists);
    return (
      <div className='listForm'>
        <form onSubmit={this._addList.bind(this)}>
          <input type='text' placeholder='New List' ref='title' />
          <button type='submit'>Add New List</button>
        </form>
        <h1>Lists:</h1>
        {lists}
      </div>
    )
  }
}

export default Lists
