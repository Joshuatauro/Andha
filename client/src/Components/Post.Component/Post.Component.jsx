import React from 'react'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'
import { BiTimeFive, BiUser } from 'react-icons/bi'
import { BsChat, BsHeart } from 'react-icons/bs'

const PostComponent = ({props}) => {

  const { liked_by, post_body, post_title, created_at, post_flair, username, post_id, comment_count } = props

  return (
    <article className="dark:bg-dark-post transition-all duration-500 w-full max-h-96  bg-white font-noto rounded-lg shadow-lg" style={{"height": "fit-content"}}>
      <div className="w-11/12 m-auto py-8 ">
        <div className="flex">
          <div className=" mr-5">
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex  items-center w-auto px-4 py-2 ml-2  rounded-md">
              <BsHeart color={"#fff"} />
              <p className="flex text-xs ml-1 items-center text-white " >
                {liked_by.length}
              </p>
            </div>
          </div>
          <div className=" 3">
            <Link to={`/flair/${post_flair}`} className="flex  justify-start font-medium text-xs rounded-md text-white w-max  py-1.5 px-2" style={{"background-color": "#00AE81"}} >
              {post_flair}
            </Link>
            <Link to={`/post/${post_id}`}>
              <h1 className="dark:text-white font-bold text-left justify-start flex mt-1.5 transition duration-300 ease-in-out text-xl text-gray-900 " 
              >
                {post_title}
              </h1>
            </Link>
            <p className="dark:text-gray-400 w-full overflow-hidden max-h-72 text-gray-700 flex justify-start text-md whitespace-pre-wrap transition duration-300 text-left"   >
              {post_body?.substr(0, 170)}...
            </p>

            {/* <SkeletonStack /> */}
            <div className="flex mt-5 transition-all duration-500">

              <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
                <BiUser color={"#fff"} />
                <Link to={`/user/${username}`} className="flex text-xs ml-1 items-center text-white " >
                  {username}
                </Link>
              </div>

              <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2  w-max mx-2 rounded-md" >
                <BiTimeFive color={"#fff"} />
                <p className="flex text-xs ml-1 items-center text-white "  >
                  <Moment fromNow >{created_at}</Moment>
                </p>
              </div>

              <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center w-max py-1.5 px-2  rounded-md">
                <BsChat color={"#fff"} />
                <p className="flex text-xs ml-1 items-center text-white " >
                  {comment_count}
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </article>
  )
}

export default PostComponent
