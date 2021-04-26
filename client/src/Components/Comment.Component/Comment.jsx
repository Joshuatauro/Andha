import React, { useContext, useState } from 'react'
import Moment from 'react-moment'
import { AuthContext } from '../../State/AuthContext'
import axios from 'axios'
import { useParams } from 'react-router'
import Linkify from 'react-linkify';

const Comment = ({ username, createdAt, commentBody, deleteComment, updateComment, cancelComment, commentID }) => {
  const {postID} = useParams()

  const [isEditing, setIsEditing] = useState(false)
  const [comment, setComment] = useState(commentBody)


  const { loggedInUsername } = useContext(AuthContext)

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  const handleEditClick = async() => {
    const didUpdateComments = updateComment(commentID, comment, username)
    if(didUpdateComments) {
      setIsEditing(false)
    }
  }

  const componentDecorator = (href, text, key) => (
    <a href={href} className=" dark:text-green-flair text-light-flair" key={key} target="_blank">
      {text}
    </a>
 );
 


  return (
    <article className="w-full mt-4 font-noto">
      <div className="flex items-center">
        <h2 className="dark:text-gray-300 text-left text-gray-900 font-bold text-xs">{username} </h2>
        
        <p className="dark:text-gray-400 text-left text-xs ml-1  font-bold text-gray-700">
          <Moment fromNow >
            {createdAt}
          </Moment>
        </p>
      </div>
      {
        isEditing ? (
          <>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="dark:border-gray-700 dark:text-white mt-2 w-full h-36 bg-transparent border-2 border-gray-400 rounded-md px-3 py-2 outline-none"></textarea>
            <div className="flex items-center">
              <button onClick={handleEditClick} className=" outline-none text-md py-2 px-5 bg-green-flair rounded-md text-white">Save</button>
              <button onClick={deleteComment} className="bg-red-500 text-md py-2 px-5 text-white rounded-md ml-3">Delete</button>
              <button onClick={handleCancelClick} className="dark:bg-dark-flair bg-light-flair text-md py-2 px-5 text-white rounded-md ml-3">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="dark:text-gray-100 mb-2 w-11/12 text-left text-gray-900 font-medium whitespace-pre-wrap">

            <Linkify  componentDecorator={componentDecorator}>
              {commentBody}
            </Linkify>
            </div>

            
            <div className="flex items-center">
              <button  className="dark:text-gray-400 text-gray-700 font-bold text-xs mr-2">Reply</button>
              <button onClick={() => setIsEditing(!isEditing)} className="dark:text-gray-400 text-gray-700 font-bold text-xs">{loggedInUsername === username ? ("Edit") : ""}</button>
            </div>
          </>
          )
      }
      
    </article>
  )
}

export default Comment
