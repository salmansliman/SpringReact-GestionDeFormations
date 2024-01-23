import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080'
})

export function isLogin(){
    if (localStorage.getItem('token')) {
        return true
    }
    return false
}

export function getUser(){
    if (localStorage.getItem('user')) {
        return localStorage.getItem('user')
    }
    return null
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
  