import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { BiTimeFive, BiUser } from 'react-icons/bi'
import { BsChat } from 'react-icons/bs'

const PostComponent = ({props}) => {

  console.log(props)

  const { is_edited, post_body, post_title, created_at, post_flair, username, post_id } = props

  return (
    <article className="w-full my-4  bg-white font-noto rounded-lg border-2 border-gray-300">
      <div className="w-11/12 m-auto py-8">
        <Link className="flex  justify-start font-medium text-xs rounded-md text-white w-max text-white py-1.5 px-2" style={{"background-color": "#00AE81"}} >
          {post_flair}
        </Link>
        <Link to={`/post/${post_id}`}>
          <h1 className="font-black justify-start flex mt-1.5 transition duration-300 ease-in-out text-2xl text-gray-900 hover:text-blue-special" 
          >
            {post_title}
          </h1>
        </Link>
        <p className="w-full text-gray-800 flex justify-start text-md whitespace-pre-wrap  text-left">
          {post_body}
        </p>

        <div className="flex mt-5">
        <div className="flex items-center py-1.5 px-2 w-max rounded-md" style={{"background-color": "#3B49DF"}}>
            <BiUser color={"#fff"} />
            <Link to={`/user/${username}`} className="flex text-xs ml-2 items-center text-white ">
              {username}
            </Link>
          </div>

          <div className="flex items-center py-1.5 px-2 w-max mx-3 rounded-md" style={{"background-color": "#3B49DF"}}>
            <BiTimeFive color={"#fff"} />
            <p className="flex text-xs ml-2 items-center text-white ">
              <Moment fromNow ago>{created_at}</Moment>
            </p>
          </div>

          <div className="flex items-center py-1.5 px-2 w-max   rounded-md" style={{"background-color": "#3B49DF"}}>
            <BsChat color={"#fff"} />
            <p className="flex text-xs ml-2 items-center text-white ">
              0
            </p>
          </div>
        </div>
      </div>

    </article>
  )
}

export default PostComponent
