import React, { createContext, useState } from 'react'
import axios from 'axios'

export const PostsContext = createContext()

export const PostsProvider = ({children}) => {

  const [posts, setPosts] = useState([])

  const getPostsFunction = async() => {
    if(posts.length === 0) {
      const { data } = await axios.get('http://localhost:5000/api/posts', { withCredentials: true })
      console.log(data.posts)
      setPosts(data.posts)
    }
  }

  const getFreshBatchOfPosts = async() => {
    const { data } = await axios.get('http://localhost:5000/api/posts', { withCredentials: true })
      setPosts(data.posts)
  }

  return (
    <PostsContext.Provider value={
      {
        getPostsFunction,
        getFreshBatchOfPosts,
        posts
      }
    }>
      {children}
    </PostsContext.Provider>
  )
}
