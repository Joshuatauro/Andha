import React, {useState, useEffect, useContext} from 'react'
import { BiTimeFive, BiUser } from 'react-icons/bi'
import { BsChat, BsHeart } from 'react-icons/bs'
import Moment from 'react-moment'
import { Link, useHistory, useParams } from 'react-router-dom'
import PostComponent from '../../Components/Post.Component/Post.Component'
import {AuthContext} from '../../State/AuthContext'
import { UserProfileContext } from '../../State/UserProfileContext'

const UserProfile = () => {
  const history = useHistory()
  const {username} = useParams()
  const { loggedInUsername } = useContext(AuthContext)
  const { getUserLikesFunction, userLikedPosts } = useContext(UserProfileContext)
  
  useEffect(() => {
    if(loggedInUsername === username){
      getUserLikesFunction(username)
    } else {
      history.goBack()
    }
  }, [])

  return (
    <section className="w-full min-h-screen bg-white-bg py-8 dark:bg-dark-primary font-noto">
      <div className="h-auto w-11/12 m-auto ">
        <nav className="w-full m-auto py-4 bg-white rounded-md dark:bg-dark-post">
          <ul className="flex w-11/12 m-auto">
            <li className="mr-7">
              <Link to={`/user/${username}`} className="text-sm text-black font-semibold dark:text-white">POSTS</Link>
            </li>
            <li className="mr-7">
              <Link to={`/user/${username}/comments`} className="text-sm text-black font-semibold dark:text-white">COMMENTS</Link>
            </li>
            {
              loggedInUsername === username ? (
                <>
                  <li className="mr-7">
                    <Link to="/user" className="text-sm font-semibold text-black dark:text-white  border-b-2 pb-0.5  border-white">LIKED</Link>
                  </li>
                </>
              ) 
              : 
              ('')
            }
          </ul>
        </nav>
        <div className="">
          <div className="py-1.5">
            {
              userLikedPosts.map(post => (
                <PostPreview props={post} />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

const PostPreview = ({props}) => {
  return (
    <div className="w-full h-auto mt-4 bg-white rounded-md shadow-md dark:bg-dark-post">
      <div className="m-auto py-5 w-11/12">
          <Link to={`/flair/${props.post_flair}`} className="flex  justify-start font-medium text-xs rounded-md text-white w-max  py-1.5 px-2" style={{"background-color": "#00AE81"}} >
            {props.post_flair}
          </Link>
        <div className="flex mt-1 mb-3">
          <Link to={`/post/${props.post_id}`}>
            <h1 className="text-black mr-3 dark:text-white font-bold text-lg">{props.post_title}</h1>
          </Link>
        </div>
        <div className="flex">
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <BiUser color={"#fff"} />
            <Link to={`/user/${props.username}`} className="flex text-xs ml-1 items-center text-white " >
              {props.username}
            </Link>
          </div>

          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2  w-max mx-2 rounded-md" >
            <BiTimeFive color={"#fff"} />
            <p className="flex text-xs ml-1 items-center text-white "  >
              <Moment fromNow >{props.created_at}</Moment>
            </p>
          </div>

          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center w-max py-1.5 px-2  rounded-md">
            <BsChat color={"#fff"} />
            <p className="flex text-xs ml-1 items-center text-white " >
              {props.comment_count}
            </p>
          </div>
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair ml-2 flex items-center w-max py-1.5 px-2  rounded-md">
            <BsHeart color={"#fff"} />
            <p className="flex text-xs ml-1 items-center text-white " >
              {props.liked_by.length}
            </p>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default UserProfile