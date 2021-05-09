import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'


import Moment from 'react-moment'
import { BiTimeFive, BiUser } from 'react-icons/bi'
import { BsChat } from 'react-icons/bs'
import Comment from '../../Components/Comment.Component/Comment'
import SkeletonLandingPost from '../../Components/Skeleton.Component/Skeleton.Landing.Post.Component'
import SkeletonSinglePost from '../../Components/Skeleton.Component/Skeleton.Single.Post.Component'

const SinglePostPage = () => {
  const { postID } = useParams()

  const [postBody, setPostBody] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postCreatedAt, setPostCreatedAt] = useState('')
  const [postUsername, setPostUsername] = useState('')
  const [isEdited, setIsEdited] = useState(false)
  const [postFlair, setPostFlair] = useState('')

  const [comment, setComment] = useState('')
  const [commentCount, setCommentCount] = useState(0)

  const [comments, setComments] = useState([])
  const [replyComments, setReplyComments] = useState([])

  const [loading, isLoading] = useState(false)


  useEffect(() => {
    const fetchPost = async() => {
      isLoading(true)
      const { data } = await axios.get(`http://localhost:5000/api/posts/${postID}`)
      setPostBody(data.post.post_body)
      setPostTitle(data.post.post_title)
      setPostCreatedAt(data.post.created_at)
      setIsEdited(data.post.is_edited)
      setPostFlair(data.post.post_flair)
      setPostUsername(data.post.username)
      
      //* TO GET ALL ROOT LEVEL COMMENTS ONLY
      setComments(data.comments.filter(comment => comment.parent_comment_id === null))
      setCommentCount(data.commentCount)

      //* CONTAINS ALL NON PARENT COMMENTS, SO ROOT COMMENTS DONT HAVE TO SEARCH ORIGINAL COMMENTS ARRAY FOR CHILDREN
      setReplyComments(data.comments.filter(comment => comment.parent_comment_id !== null))

      if(data){
        setTimeout(() => {

          isLoading(false)
        }, 900)
      }
    }

    fetchPost(  )
  }, [])

  const handleCommentSubmit = async(e) => {
    e.preventDefault()
    const { data } = await axios.post(`http://localhost:5000/api/comments/${postID}`, { comment }, {withCredentials: true})

    if(data.isSuccess){
      setComments([data.commentData, ...comments])
      setCommentCount(prev => prev+1)
      setComment('')
    }
  }

  const handleEditClick = async(commentID, editedComment, username) => {
    const { data } = await axios.put(`http://localhost:5000/api/comments`, { commentID, editedComment, username } , { withCredentials: true })
    
    if(data.wasUpdated) {
      setComments([...comments.filter(comment => comment.comment_id === commentID ? comment.comment_body = editedComment : comment)])
      return true
    }

    return false
  }

  const handleDeleteClick = async(commentID, username) => {
    const { data } = await axios.post('http://localhost:5000/api/comments', {commentID, username}, { withCredentials: true })
    if(data.wasDeleted){
      setComments([...comments.filter(comment => comment.comment_id === commentID ? comment.username = '[deleted]' : comment)])
    }
  }

  const handleCancelClick = async() => {

  }





  return (
    <section className="dark:bg-dark-primary font-noto w-full min-h-screen pt-7 pb-16 transition-all duration-500 bg-white-bg">
      <div className="dark:bg-dark-post w-11/12 m-auto h-full rounded-xl pb-6  transition-all duration-500 bg-white">
        {loading ? 
          (
            <SkeletonSinglePost />
          ) 
            : 
          (
            <>
              <div className=" w-11/12 m-auto pt-10 border-b-2 pb-5 dark:border-dark-flair border-gray-300">
                <Link to={`/flair/${postFlair}`} className="flex  justify-start font-medium text-xs rounded-md text-white w-max  py-1.5 px-2" style={{"background-color": "#00AE81"}} >
                  {postFlair}
                </Link>
                <h1 className="dark:text-white pt-4 flex text-left justify-start font-black text-3xl text-gray-900">
                  {postTitle}
                </h1>
                <p className="dark:text-gray-400 text-gray-700 flex justify-start text-lg whitespace-pre-wrap  text-left">
                  {postBody}
                </p>

                <div className="flex mt-5">
                  <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
                    <BiUser color={"#fff"} />
                    <Link to={`/user/${postUsername}`} className="flex text-xs ml-1 items-center text-white " >
                      {postUsername}
                    </Link>
                  </div>



                  <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2  w-max mx-5 rounded-md" >
                    <BiTimeFive color={"#fff"} />
                    <p className="flex text-xs ml-1 items-center text-white "  >
                      <Moment fromNow ago>{postCreatedAt}</Moment>
                    </p>
                  </div>

                  <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center w-max py-1.5 px-2  rounded-md">
                    <BsChat color={"#fff"} />
                    <p className="flex text-xs ml-1 items-center text-white " >
                      {commentCount}
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleCommentSubmit} className="flex w-11/12 m-auto pt-4 flex-col border-b-2 pb-5 dark:border-dark-flair border-gray-300">
                <textarea value={comment} onChange={e => setComment(e.target.value)} className="dark:text-white text-md w-full px-3 py-2 text-gray-700 h-36 bg-transparent dark:border-gray-700 border-gray-400 border-2 rounded-lg resize-y  outline-none " />
                <button className=" focus:outline-none w-full mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Submit</button>
              </form>
              <div className="m-auto w-11/12 ">  
                <h1 className="dark:text-white duration-500 transition-all text-gray-900 mt-3 font-black text-left text-2xl">Comments</h1>
                  {
                    commentCount === 0 ? (
                      <div className="flex flex-col py-20">
                        <h1 className="flex justify-center text-white font-black text-4xl">Wow, such empty</h1>
                        <p className="dark:text-gray-400 text-gray-700 flex justify-center text-lg whitespace-pre-wrap "> Start off by saying something nice</p>
                      </div>
                    ) : (
                      <div className="flex flex-col pb-4">
                        {comments.map(comment => (
                          <Comment key={comment.comment_id} isEdited={comment.is_edited} replyComments={replyComments} commentID={comment.comment_id} updateComment={handleEditClick} deleteComment={handleDeleteClick} cancelComment={handleCancelClick} commentBody={comment.comment_body} username={comment.username} createdAt={comment.created_at} />
                        ))}
                      </div>
                    )
                  }
              </div>
          </>
          )
        }
      </div>
    </section>
  )
}

export default SinglePostPage
