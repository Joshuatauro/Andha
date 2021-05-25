import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUserID, setUserID] = useState(null)
  const [loggedInUsername, setLoggedInUsername] = useState(null)

  const checkUserLoggedIn = async() => {
    const { data } = await axios.get('http://localhost:5000/api/auth/check-auth-status', { withCredentials: true })
    setLoggedIn(data.isLoggedIn)
    setLoggedInUsername(data.username)
    setUserID(data.userID)
  }

  const login = async(username,password) => { 
    try{

      const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password }, {withCredentials: true})
      setLoggedIn(data.logUserIn)
      return data.logUserIn
    } catch(err) {
      return false
    }
  }

  const signup = async(email, password, username) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/signup', { email, password, username }, { withCredentials: true })
    setLoggedIn(data.logUserIn)
  }

  const logout = async() => {
    const { data } = await axios.get('http://localhost:5000/api/auth/logout', {withCredentials: true})
    if(data.logOutUser){
      setLoggedIn(false)
      setUserID(null)
      return true
    }
  }




  return (
    <AuthContext.Provider value={
      {
        loggedIn,
        login, 
        signup,
        checkUserLoggedIn,
        loggedInUsername,
        loggedInUserID,
        logout
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}
