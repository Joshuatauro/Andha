import React, {useState, useEffect, useContext} from 'react'
import Moment from 'react-moment'
import { Link, useParams } from 'react-router-dom'
import {AuthContext} from '../../State/AuthContext'
import { UserProfileContext } from '../../State/UserProfileContext'

const UserProfileComments = () => {
  const {username} = useParams()
  const { loggedInUsername } = useContext(AuthContext)
  const { getUserCommentsFunction, userComments } = useContext(UserProfileContext)
  
  useEffect(() => {
    getUserCommentsFunction(username)
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
              <Link to={`/user/${username}/comments`} className="text-sm text-black font-semibold dark:text-white border-b-2 pb-0.5 border-black  dark:border-white">COMMENTS</Link>
            </li>
            {
              loggedInUsername === username ? (
                <>
                  <li className="mr-7">
                    <Link to={`/user/${username}/liked`} className="text-sm font-semibold text-black dark:text-white">LIKED</Link>
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
              userComments.map(post => (
                <CommentsPreview props={post} />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

const CommentsPreview = ({props}) => {
  return (
    <article to={`/post/${props.parent_postid}`} className="w-full h-auto mt-4 bg-white rounded-md shadow-md dark:bg-dark-post">
      <Link to={`/post/${props.parent_postid}`}>
        <div className="m-auto py-3 w-11/12">
          <div className="flex mt-1">
              <h1 className="dark:text-gray-300 text-left text-gray-900 font-bold text-xs">{props.username} <span className="text-gray-700 dark:text-gray-400">commented on</span> </h1>
              <h1 className="text-gray-900 mr-3 dark:text-gray-300 font-bold text-xs whitespace-pre">  {props.post_title}</h1>
          </div>
          <h1 className="text-gray-900 mr-3 dark:text-white font-bold text-md">{props.comment_body}</h1>
        </div>
      </Link>
    </article>  
  )
}

export default UserProfileComments