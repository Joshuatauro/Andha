import React, { useContext, useState } from 'react'
import { AuthContext } from '../../State/AuthContext'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment'
import axios from 'axios'
import Linkify from 'react-linkify';
import Toast from '../Toast.Component/Toast.Component'
import ReplyComment from './ReplyComment'
import { useToast } from '@chakra-ui/react'

const Comment = ({ username, createdAt, commentBody, deleteComment, updateComment, replyComments, commentID, isEdited, userID }) => {
  const toast = useToast()
  const {postID} = useParams()

  const [isEditing, setIsEditing] = useState(false)
  const [comment, setComment] = useState(commentBody)
  

  const [replying, isReplying] = useState(false)
  const [replyComment, setReplyComment] = useState('')

  const [childrenComments, setChildrenComments] = useState(replyComments.filter(replyComment => replyComment.parent_comment_id === commentID))


  const { loggedInUserID } = useContext(AuthContext)

  const handleTopLevelCancelClick = () => {
    setIsEditing(false)
  }

  const handleTopLevelEditClick = async() => {
    const didUpdateComments = await updateComment(commentID, comment, username)
    if(didUpdateComments) {
      
      setIsEditing(false)
    }

  }

  const handleTopLevelDeleteClick = async() => {
    const didDeleteComment = await deleteComment(commentID, username)
    if(didDeleteComment) {
      setIsEditing(false)
    }
  } 

  const componentDecorator = (href, text, key) => (
    <a href={href} className=" dark:text-green-flair text-light-flair" key={key} target="_blank">
      {text}
    </a>
  );

  const replyCommentAdd = async(e) => {
    e.preventDefault()
    const { data } = await axios.post(`/api/comments/reply`, {parentCommentID: commentID,replyComment, postID}, { withCredentials: true })
    if (data.isSuccess) {
      toast(
        {
          title: "Added comment",
          status: "success",
          duration: 3000,
          isClosable: true,
        }
      )
      setChildrenComments([data.commentData, ...childrenComments])
      isReplying(false)
      setReplyComment('')
    }
  }

  const replyCommentEdit = async(replyCommentID, replyCreatorUsername, replyEditedComment) => {
    const { data } = await axios.put(`/api/comments`, { commentID: replyCommentID, editedComment: replyEditedComment, username: replyCreatorUsername }, { withCredentials:true })
    if(data.wasUpdated){
      toast(
        {
          title: "Edited comment",
          status: "success",
          duration: 3000,
          isClosable: true,
        }
      )
      setChildrenComments([...childrenComments.filter(comment => comment.comment_id === replyCommentID ? comment.comment_body = replyEditedComment : comment)])
      return true
    }

    return false
  }

  const replyCommentDelete = async(replyCommentID, replyCreatorUsername) => {

    const { data } = await axios.post(`/api/comments`, { commentID: replyCommentID,  username: replyCreatorUsername }, { withCredentials:true })
    if(data.wasDeleted){
      toast(
        {
          title: "Deleted comment",
          status: "success",
          duration: 3000,
          isClosable: true,
        }
      )
      setChildrenComments([...childrenComments.filter(comment => comment.comment_id === replyCommentID ? comment.comment_body = '[deleted]' : comment)])
      return true
    }

    return false
  }






  return (
    <article className="w-full mt-2 mb-5 font-noto">
      <div className="flex items-center">
        <h2 className="dark:text-gray-300 text-left text-gray-900 font-bold text-xs">{username} </h2>

        <p className="dark:text-gray-400 text-left text-xs ml-1  font-bold text-gray-700">
          <Moment fromNow >
            {createdAt}
          </Moment>
        </p>

        {
          isEdited ? (
            <p className="dark:text-gray-400 text-left text-xs ml-1 italic font-bold text-gray-700">(Edited)</p>
          ) : ('')
        }
      </div>
      {
        isEditing ? (
          <>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="dark:border-gray-700 dark:text-white mt-2 w-full h-36 bg-transparent border-2 border-gray-400 rounded-md px-3 py-2 outline-none"></textarea>
            <div className="flex items-center">
              <button onClick={handleTopLevelEditClick} className="focus:outline-none outline-none text-md py-2 px-5 bg-green-flair rounded-md text-white">Save</button>
              <button onClick={handleTopLevelDeleteClick} className="focus:outline-none outline-none bg-red-500 text-md py-2 px-5 text-white rounded-md ml-3">Delete</button>
              <button onClick={handleTopLevelCancelClick} className="focus:outline-none outline-none dark:bg-dark-flair bg-light-flair text-md py-2 px-5 text-white rounded-md ml-3">Cancel</button>
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
              <button onClick={() => isReplying(!replying)} className="dark:text-gray-400 focus:outline-none text-gray-700 font-bold text-xs mr-2">Reply</button>
              <button onClick={() => setIsEditing(!isEditing)} className="dark:text-gray-400 focus:outline-none text-gray-700 font-bold text-xs">{loggedInUserID === userID ? ("Edit") : ""}</button>
            </div>
          </>
          )
      }
      {
        replying ? (
          <form onSubmit={replyCommentAdd} className="flex flex-col justify-start ml-5 my-3">
            <textarea value={replyComment} onChange={e => setReplyComment(e.target.value)} className="dark:text-white text-md w-full px-3 py-2 text-gray-700 h-36 bg-transparent dark:border-gray-700 border-gray-400 border-2 rounded-lg resize-y  outline-none " />
            <div className="flex mt-2">
              <button onClick={replyCommentAdd} type='submit' className="focus:outline-none outline-none text-md py-2 px-5 bg-green-flair rounded-md text-white">Save</button>
              <button onClick={() => isReplying(false)} className="focus:outline-none outline-none dark:bg-dark-flair bg-light-flair text-md py-2 px-5 text-white rounded-md ml-3">Cancel</button>
            </div>
          </form>
        ) : (
          ''
        )
      }
      {/* NESTED COMMENTS RENDERING */}
        {childrenComments.map(replyComment => (
          <ReplyComment replyComment={replyComment} replyEdit={replyCommentEdit} replyDelete={replyCommentDelete}/>
        ))}
    </article>
  )
}

export default Comment
