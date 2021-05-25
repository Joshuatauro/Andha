import React, { useContext, useState } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import Linkify from 'react-linkify';
import { AuthContext } from '../../State/AuthContext';


const ReplyComment = ({replyComment, replyEdit, replyDelete}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [replyEditedComment, setReplyEditedComment] = useState(replyComment.comment_body)

  const componentDecorator = (href, text, key) => (
    <a href={href} className=" dark:text-green-flair text-light-flair" rel="noreferrer" key={key} target="_blank">
      {text}
    </a>
  );

  const handleEditClick = async() => {
    console.log('here')
    const didUpdateComment = await replyEdit(replyComment.comment_id, replyComment.username, replyEditedComment)
    
    if(didUpdateComment) {
      setIsEditing(false)
    }
  }

  const handleDeleteClick = async() => {
    console.log('here del')
    const didDeleteComment = await replyDelete(replyComment.comment_id, replyComment.username)

    if(didDeleteComment){
      setIsEditing(false)
    }
  }

  

  const { loggedInUserID } = useContext(AuthContext)


  return (
    <article className="w-full mt-3 pl-5  font-noto">
      <div className="flex items-center">
        <h2 className="dark:text-gray-300 text-left text-gray-900 font-bold text-xs">{replyComment.username} </h2>

        
        <p className="dark:text-gray-400 text-left text-xs ml-1  font-bold text-gray-700">
          <Moment fromNow >
            {replyComment.created_at}
          </Moment>
        </p>
      </div>
      {
        isEditing ? (
          <>
            <textarea value={replyEditedComment} onChange={e => setReplyEditedComment(e.target.value)} className="dark:border-gray-700 dark:text-white mt-2 w-full h-36 bg-transparent border-2 border-gray-400 rounded-md px-3 py-2 outline-none"></textarea>
            <div className="flex items-center">
              <button onClick={handleEditClick}  className="focus:outline-none outline-none text-md py-2 px-5 bg-green-flair rounded-md text-white">Save</button>
              <button onClick={handleDeleteClick}  className="focus:outline-none outline-none text-md py-2 px-5 bg-red-500 ml-3 rounded-md text-white">Delete</button>
              <button onClick={() => setIsEditing(false)}  className="focus:outline-none outline-none dark:bg-dark-flair bg-light-flair text-md py-2 px-5 text-white rounded-md ml-3">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="dark:text-gray-100  w-11/12 text-left text-gray-900 font-medium whitespace-pre-wrap">

            <Linkify  componentDecorator={componentDecorator}>
              {replyComment.comment_body}
            </Linkify>
            </div>

            
            <div className="flex items-center">
            {loggedInUserID === replyComment.user_id ? (

              <button onClick={() => setIsEditing(!isEditing)} className="dark:text-gray-400 focus:outline-none text-gray-700  font-bold text-xs">Edit</button>
            ) : ""}
            </div>
          </>
          )
      }
    </article>
  )
}

export default ReplyComment