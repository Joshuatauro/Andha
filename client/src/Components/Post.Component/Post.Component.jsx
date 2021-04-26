import React from 'react'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'
import { BiTimeFive, BiUser } from 'react-icons/bi'
import { BsChat } from 'react-icons/bs'

const PostComponent = ({props}) => {

  const { is_edited, post_body, post_title, created_at, post_flair, username, post_id } = props

  return (
    <article className="dark:bg-dark-post transition-all duration-500 w-full h-auto  bg-white font-noto rounded-lg shadow-lg" style={{"height": "fit-content"}}>
      <div className="w-11/12 m-auto py-8">
        <Link to={`/flair/${post_flair}`} className="flex  justify-start font-medium text-xs rounded-md text-white w-max  py-1.5 px-2" style={{"background-color": "#00AE81"}} >
          {post_flair}
        </Link>
        <Link to={`/post/${post_id}`}>
          <h1 className="dark:text-white font-bold text-left justify-start flex mt-1.5 transition duration-300 ease-in-out text-xl text-gray-900 " 
          >
            {post_title}
          </h1>
        </Link>
        <p className="dark:text-gray-400 w-full text-gray-500 flex justify-start text-md whitespace-pre-wrap  text-left"   >
          {post_body}
        </p>

        <div className="flex mt-5">
        <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <BiUser color={"#fff"} />
            <Link to={`/user/${username}`} className="flex text-xs ml-1 items-center text-white " >
              {username}
            </Link>
          </div>

          {/* <div className="flex items-center py-1.5 px-2 w-max mx-3 rounded-md" style={{"background-color": "#525fe6"}}>
            <BiTimeFive color={"#fff"} />
            <p className="flex text-xs ml-2 items-center text-white ">
              <Moment fromNow ago>{created_at}</Moment>
            </p>
          </div> */}

          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2  w-max mx-5 rounded-md" >
            <BiTimeFive color={"#fff"} />
            <p className="flex text-xs ml-1 items-center text-white "  >
              <Moment fromNow ago>{created_at}</Moment>
            </p>
          </div>

          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center w-max py-1.5 px-2  rounded-md">
            <BsChat color={"#fff"} />
            <p className="flex text-xs ml-1 items-center text-white " >
              0
            </p>
          </div>
        </div>
      </div>

    </article>
  )
}

export default PostComponent
