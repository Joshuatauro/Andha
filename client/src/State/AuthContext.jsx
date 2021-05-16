import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUsername, setUsername] = useState(null)

  const checkUserLoggedIn = async() => {
    const { data } = await axios.get('http://localhost:5000/api/auth/check-auth-status', { withCredentials: true })
    console.log(data)
    setLoggedIn(data.isLoggedIn)
    setUsername(data.username)
  }

  const login = async(username,password) => { 
    try{

      const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password }, {withCredentials: true})
      setLoggedIn(data.logUserIn)
      return data.logUserIn
    } catch(err) {
      console.log(err)
    }
  }

  const signup = async(email, password, username) => {
    const { data } = axios.post('http://localhost:5000/api/auth/signup', { email, password, username }, { withCredentials: true })
    setLoggedIn(data.logUserIn)
  }




  return (
    <AuthContext.Provider value={
      {
        loggedIn,
        login, 
        signup,
        checkUserLoggedIn,
        loggedInUsername
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}
