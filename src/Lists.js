import React, {Component} from 'react'
import clientAuth from './clientAuth'

class Lists extends Component{
  state = {
    lists: [],
    tasks: [],
    listId: ''
  }

  componentDidMount(){
    clientAuth.getLists().then(res =>{
      this.setState({
        lists: res.data
      })
    })
  }
  /////////////////////////////////////////////
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
    clientAuth.showList(id).then(res =>{
      this.setState({
        tasks: res.data.tasks,
        listId: id
      })
    })
  }
//////////////////////////////////////////////////
_addTask(evt){
  evt.preventDefault()
  const newTask = {
    body: this.refs.body.value
    // description: this.refs.description.value
  }
  clientAuth.addTask(this.state.listId, newTask).then(res => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        res.data.task
      ]
    })
    this.refs.body.value = ''
    // this.refs.description.value = ''
  })
}

_deleteTask(taskId){
  clientAuth.deleteTask(this.state.listId, taskId).then(res => {
    this.setState({
      tasks: this.state.tasks.filter((task)=>{
        return task._id !== taskId
      })
    })
  })
}

_toggleCompleted(taskId){
  clientAuth.toggleCompleted(this.state.listId, taskId).then(res => {
    const taskIndex = this.state.tasks.findIndex((task)=> {
      return task._id === taskId
    })
    this.setState({
      tasks: [
      ...this.state.tasks.slice(0, taskIndex),
      res.data.task,
      ...this.state.tasks.slice(taskIndex + 1)
      ]
    })
  })
}
////////////////////////////////////////////////////


  render(){
    const lists = this.state.lists.map((list, i)=>{
      return (
        <div key={i} className='theLists'>
          <h3 className='listH3'>{list.title}</h3>
          <button className='listBtn' onClick={this._deleteList.bind(this, list._id)}>Finished</button>
          <button className='taskList' onClick={this._displayTasks.bind(this, list._id)}>Tasks</button>
        </div>
      )
    })
    const tasks = this.state.tasks.map((task, i)=>{
      return (
        <div key={i} className='theTasks'>
          <h3>{task.body}</h3>
          <button onClick={this._deleteTask.bind(this, task._id)}>X</button>
          <button onClick={this._toggleCompleted.bind(this, task._id)}>
            Mark {task.completed ? 'Complete' : 'Incomplete'}
          </button>
        </div>
      )
    })
    return (
    <div>
      <div className='listForm'>
        <form onSubmit={this._addList.bind(this)}>
          <input type='text' placeholder='New List' ref='title' />
          <button type='submit'>Add New List</button>
        </form>
        <h1>Lists:</h1>
        {lists}
      </div>
      <div className='tasks'>
        <form onSubmit={this._addTask.bind(this)}>
          <input type='text' placeholder='Task' ref='body' />
          {/* <input type='text' placeholder='description' ref='description' /> */}
          <button type='submit'>Add Task</button>
        </form>
        <h1>Tasks:</h1>
        {tasks}
      </div>
    </div>
    )
  }
}

export default Lists
