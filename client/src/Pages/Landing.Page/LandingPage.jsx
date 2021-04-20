import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostComponent from '../../Components/Post.Component/Post.Component'

const LandingPage = () => {

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchPosts = async() => {
      const { data } = await axios.get('http://localhost:5000/api/posts')
      console.log(data)
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])
  
  return (
    <section className="w-full h-full bg-white-bg">
      <div className="w-10/12 m-auto py-8">
        <div className="w-full">
          {posts.map(post =>  {
            return(
              <PostComponent props={post} key={post.post_id} />
            )

            }
          )}
        </div>
      </div>
    </section>
  )
}

export default LandingPage
