import axios from 'axios'
import jwt_decode from 'jwt-decode'
const dotenv = require('dotenv').load({silent: true})

axios.defaults.baseURL = process.env.BASE_URL || 'https://toget.herokuapp.com'

const clientAuth = {

  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },

  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
    .then(res => {
      console.log(res);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  logIn: (credentials) => {
    return axios({
      url: 'api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  getCurrentUser: ()=> {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  logOut: ()=> {
    return new Promise((resolve)=>{
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve('bye.')
    })
  },
////////////////////////////////////////////////////////////////
  getLists: ()=>{
    return axios({
      url: 'api/lists',
      method: 'get'
    })
  },

  addList: (newList)=>{
    return axios({
      url: 'api/lists',
      method: 'post',
      data: newList
    })
  },

  showList: (id)=>{
    return axios({
      url: `api/lists/${id}`,
      method: 'get'
    })
  },

  deleteList: (id)=>{
    return axios({
      url:  `api/lists/${id}`,
      method: 'delete'
    })
  },

  editList: (id, editData)=>{
    return axios({
      url: `api/lists/${id}`,
      method: 'patch',
      data: editData
    })
  },
//////////////////////////////////////////////////////
  getTasks: (id)=>{
    return axios({
      url: `api/lists/${id}/tasks`,
      method: 'get'
    })
  },

  addTask: (id, newTask)=>{
    return axios({
      url: `/api/lists/${id}/tasks`,
      method: 'post',
      data: newTask
    })
  },
  showTask: (id, taskId)=>{
    return axios({
      url: `/api/lists/${id}/tasks/${taskId}`,
      method: 'get'
    })
  },

  deleteTask: (id, taskId)=> {
    return axios({
      url: `/api/lists/${id}/tasks/${taskId}`,
      method: 'delete'
    })
  },
  toggleCompleted: (id, taskId)=> {
    return axios({
      url: `/api/lists/${id}/tasks/${taskId}`,
      method: 'patch'
    })
  }
}
//////////////////////////////////////////////////////
clientAuth.setTokenHeader()

export default clientAuth
