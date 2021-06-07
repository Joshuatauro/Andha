import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import queryString from 'query-string'
import axios from 'axios'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import PostComponent from '../../Components/Post.Component/Post.Component'
import { useToast } from '@chakra-ui/toast'
const Search = () => {
  
  const toast = useToast()
  const { search } = useLocation()
  const queries = queryString.parse(search)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getQueryPosts = async() => {
      console.log(queries.q)
      const { data } = await axios.get(`/api/posts/search?q=${queries.q}`)
      setPosts(data.posts)
      if(data.posts.length === 0){
        toast(
          {
            title:"Could not find any posts",
            description: "We searched high and low but couldn't find anything related to your needs",
            status:"error",
            duration: 10000,
            isClosable: true,
            position: "bottom-right"
          }
        )
      }
      
    }
    getQueryPosts()
  }, [search])

  return (
    <section className="w-full  bg-white-bg dark:bg-dark-primary" style={{"min-height": "calc(100vh - 4rem)"}}>
      <div className="m-auto w-11/12 text-white">
        <div className="flex items-baseline">
          <h1 className="py-6 text-xl text-black dark:text-white capitalize font-noto font-black mr-1">Query: </h1>
          <p className="py-6 text-xl text-gray-700 dark:text-white capitalize font-noto font-bold mr-1">{queries.q}</p>
        </div>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}}>
            <Masonry gutter="15px">
                {posts.map((post  ) => (
                    <PostComponent props={post} key={post.post_id} />
                ))}
            </Masonry>
          </ResponsiveMasonry>
      </div>
    </section>
  )
}

export default Search
