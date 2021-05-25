import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PostComponent from '../../Components/Post.Component/Post.Component'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import SkeletonLandingPost from '../../Components/Skeleton.Component/Skeleton.Landing.Post.Component'
import { PostsContext } from '../../State/PostsContext'


const LandingPage = () => {
  const { getPostsFunction, posts } = useContext(PostsContext)

  const [loading, isLoading] = useState(false)
  
  useEffect(() => {
    const fetchPosts = async() => {
      isLoading(true)
      getPostsFunction()
      if(posts.length > 0){
        isLoading(false)
      }
    }
    fetchPosts()
  }, [posts])
  
  return (
    <section className="dark:bg-dark-primary transition-all duration-500 w-full min-h-screen h-full bg-white-bg">
      <div className="w-11/12 m-auto py-8">
        <div className="w-full ">
          {loading ? 
            (
              <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}}>
                <Masonry gutter="15px">
                    {posts.map((post) => (
                        <SkeletonLandingPost />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            ) : (
              <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}}>
                <Masonry gutter="15px">
                    {posts.map((post  ) => (
                        <PostComponent props={post} key={post.post_id} />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default LandingPage
