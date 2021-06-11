import React, { createContext, useState } from 'react'
import axios from 'axios'

export const PostsContext = createContext()

export const PostsProvider = ({children}) => {

  const [posts, setPosts] = useState([])



  const getPostsFunction = async() => {
      const { data } = await axios.get(`/api/posts`, { withCredentials: true })
      setPosts(data.posts)
      if(data.posts){
        return true
      }
  }

  // const getFreshBatchOfPosts = async() => {
  //   const { data } = await axios.get('/api/posts', { withCredentials: true })
  //     setPosts(data.posts)
  //     return true
  // }

  return (
    <PostsContext.Provider value={
      {
        getPostsFunction,
        // getFreshBatchOfPosts,
        posts,
        setPosts
      }
    }>
      {children}
    </PostsContext.Provider>
  )
}
