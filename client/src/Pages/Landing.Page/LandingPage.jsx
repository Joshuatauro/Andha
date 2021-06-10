import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PostComponent from '../../Components/Post.Component/Post.Component'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import SkeletonLandingPost from '../../Components/Skeleton.Component/Skeleton.Landing.Post.Component'
import { PostsContext } from '../../State/PostsContext'
import {  useToast } from '@chakra-ui/toast'
import { AuthContext } from '../../State/AuthContext'
import { ImSpinner2 } from 'react-icons/im'

const LandingPage = () => {
  const toast = useToast()
  const { url } = useContext(AuthContext)
  const { getPostsFunction, posts, setPosts } = useContext(PostsContext)

  const [loading, isLoading] = useState(true)
  const [offset, setOffset] = useState(1)
  const [fetching, setFetching] = useState(false)
  
  useEffect(() => {
    const fetchPosts = async() => {
      isLoading(true)
      const didGetPosts = getPostsFunction()
      if(didGetPosts){
        isLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleFetchPosts = async() => {
    setOffset(prev => prev+1)
    setFetching(true)
    const { data } = await axios.get(`/api/posts?l=${offset}`)
    setPosts([...posts, ...data.posts])
    data.posts ? setFetching(false) : setFetching(false)
    if(data.posts.length === 0){
      toast(
        {
          title: "We've reached the end",
          description: "Looks like you've been through all the posts that we have to offer",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right"
        }
      )
    }
  }

  
  return (
    <section className="dark:bg-dark-primary font-noto transition-all duration-500 w-full min-h-screen h-full bg-white-bg">
      <div className="w-11/12 m-auto py-8">
        <div className="w-full ">

          {loading ? 
            (
              <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}}>
                <Masonry gutter="15px">
                    {[1,2,3,4,5,6].map((post) => (
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
          <div className="flex w-full justify-center">
            <button onClick={handleFetchPosts} className="py-3 px-5 text-sm font-bold rounded-md dark:text-white text-black bg-white shadow-md dark:bg-dark-post mt-10">
              {fetching ? (
                <span className="flex items-center">
                  <ImSpinner2 className="text-white animate-spin mr-2 " />
                  Loading
                </span>
              ) : "Load more"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage
