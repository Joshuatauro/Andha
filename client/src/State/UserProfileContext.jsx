import React, { createContext, useState } from 'react'
import axios from 'axios'

export const UserProfileContext = createContext()

const isProd = false

export const UserProfileProvider = ({children}) => {

  const [userInContext, setUser] = useState()
  const [userPosts, setUserPosts] = useState([])
  const [userComments, setUserComments] = useState([])
  const [userSavedPosts, setUserSavedPosts] = useState([])
  const [userLikedPosts, setUserLikedPosts] = useState([])

  const [url, setUrl] = useState(isProd ? "" : "http://localhost:5000")


  const getUserPostsFunction = async(user) => {
    if(userPosts.length === 0) {
      const { data } = await axios.get(`/api/users/posts/${user}`, { withCredentials: true })
      setUserPosts(data.userPosts)
      setUserComments([])
      setUser(user)
    } else if(user !== userInContext) {
      const { data } = await axios.get(`/api/users/posts/${user}`, { withCredentials: true })
      setUserPosts(data.userPosts)
      setUserComments([])
      setUser(user)
    }
  }

  const getUserCommentsFunction = async(user) => {
    console.log(user)
    if(userComments.length === 0) {
      const { data } = await axios.get(`/api/users/comments/${user}`, { withCredentials: true })
      setUserComments(data.comments)
      setUser(userInContext)
    } else if (user !== userInContext){
      const { data } = await axios.get(`/api/users/comments/${user}`, { withCredentials: true })
      setUserComments(data.comments)
      setUser(userInContext)
    }
  }

  const getUserLikesFunction = async(user) => {
    if(userLikedPosts.length === 0) {
      const { data } = await axios.get(`/api/users/liked/${user}`, { withCredentials: true })
      setUserLikedPosts(data.posts)
      setUser(userInContext)
    } else if (user !== userInContext){
      const { data } = await axios.get(`/api/users/liked/${user}`, { withCredentials: true })
      setUserLikedPosts(data.posts)
      setUser(userInContext)
    }
  }

  const getUserSavedFunction = async(user) => {
    if(userPosts.length === 0) {
      const { data } = await axios.get(`/api/users/comments/${user}`, { withCredentials: true })
      setUserSavedPosts(data.posts)
      setUser(userInContext)
    } else if (user !== userInContext){
      const { data } = await axios.get(`/api/users/comments/${user}`, { withCredentials: true })
      setUserComments(data.posts)
      setUser(userInContext)
    }
  }


  return (
    <UserProfileContext.Provider value={
      { 
        getUserCommentsFunction,
        getUserLikesFunction,
        getUserPostsFunction,
        getUserSavedFunction,
        userSavedPosts,
        userComments,
        userPosts,
        userLikedPosts
        
      }
    }>
      {children}
    </UserProfileContext.Provider>
  )
}
