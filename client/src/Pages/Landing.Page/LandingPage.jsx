import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostComponent from '../../Components/Post.Component/Post.Component'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


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
    <section className="dark:bg-dark-primary transition-all duration-500 w-full h-full bg-white-bg">
      <div className="w-11/12 m-auto py-8">
        <div className="w-full ">
          {/* {posts.map(post =>  {
            return(
              <PostComponent props={post} key={post.post_id} />
            )
            }
          )} */}
          <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 1020: 2}}
            >
                <Masonry gutter="15px">
                    {posts.map((post  ) => (
                        <PostComponent props={post} key={post.post_id} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
      </div>
    </section>
  )
}

export default LandingPage
