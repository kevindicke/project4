import React, {Component} from 'react'
import clientAuth from './clientAuth'

class Tasks extends Component{

  state = {
    tasks: []
  }

  componentDidMount(){
    clientAuth.getTasks().then(res=> {
      this.setState({
        tasks: res.data
      })
    })
  }

  _addTask(evt){
    evt.preventDefault()
    const newTask = {
      body: this.refs.body.value,
      description: this.refs.description.value
    }
    clientAuth.addTask(newTask).then(res => {
      this.setState({
        tasks: [
          ...this.state.tasks,
          res.data.task
        ]
      })
      this.refs.body.value = ''
      this.refs.description.value = ''
    })
  }

  _deleteTask(taskId){
    clientAuth.deleteTask(taskId).then(res => {
      this.setState({
        tasks: this.state.tasks.filter((task)=>{
          return task._id !== taskId
        })
      })
    })
  }

  _toggleCompleted(taskId){
    clientAuth.toggleCompleted(taskId).then(res => {
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

  render(){
    const tasks = this.state.tasks.map((task, i)=>{
      return (
        <li key={i}>
          <button onClick={this._toggleCompleted.bind(this, task._id)}>
            Mark {task.completed ? 'Complete' : 'Incomplete'}
          </button>
          {task.body}<button onClick={this._deleteTask.bind(this, task._id)}>X</button>
        </li>
      )
    })
    return(
      <div className='tasks'>
        <form onSubmit={this._addTask.bind(this)}>
          <input type='text' placeholder='Task' ref='body' />
          <input type='text' placeholder='description' ref='description' />
          <button type='submit'>Add Task</button>
        </form>
        <h1>Tasks:</h1>
        <ul>{tasks}</ul>
      </div>
    )
  }
}

export default Tasks
