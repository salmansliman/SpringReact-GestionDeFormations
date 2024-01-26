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

export function isAdmin(){
    if (localStorage.getItem('role') == "ROLE_ADMIN") {
        return true
    }
    return false
}

export function getRole(){
    let userRole = localStorage.getItem('role')
    if (userRole == "ROLE_ADMIN") {
        return "Admin"
    } else if (userRole == "ROLE_ASSISTANT") {
        return "Assistant"
    } else if (userRole == "ROLE_FORMATER") {
        return "Formateur"
    } else {
        return null
    }
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
    localStorage.removeItem('role')
    window.location.href = '/login'
}

export function getAllFormations() {
}
