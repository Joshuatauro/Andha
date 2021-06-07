import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import Linkify from 'react-linkify';
import Comment from '../../Components/Comment.Component/Comment'
import SkeletonSinglePost from '../../Components/Skeleton.Component/Skeleton.Single.Post.Component'

import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BsChat, BsHeart, BsHeartFill } from 'react-icons/bs'
import { BiTimeFive, BiUser } from 'react-icons/bi'
import {ImCross} from 'react-icons/im'
import { AuthContext } from '../../State/AuthContext';
import { useToast } from '@chakra-ui/react'

const SinglePostPage = () => {
  const toast = useToast()
  const history = useHistory()
  const { loggedIn, loggedInUserID } = useContext(AuthContext)
  const { postID } = useParams()

  const [postBody, setPostBody] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postCreatedAt, setPostCreatedAt] = useState('')
  const [postUsername, setPostUsername] = useState('')
  const [isEdited, setIsEdited] = useState(false)
  const [postFlair, setPostFlair] = useState('')
  const [likedBy, setLikedBy] = useState()
  const [didUserLike, setDidUserLike] = useState(false)
  const [spamDisable, setSpamDisable] = useState(false)

  const [comment, setComment] = useState('')
  const [commentCount, setCommentCount] = useState(0)

  const [comments, setComments] = useState([])
  const [replyComments, setReplyComments] = useState([])

  const [loading, isLoading] = useState(false)


  useEffect(() => {
    const fetchPost = async() => {
      isLoading(true)
      const { data } = await axios.get(`/api/posts/${postID}`)
      setPostBody(data.post.post_body)
      setPostTitle(data.post.post_title)
      setPostCreatedAt(data.post.created_at)
      setIsEdited(data.post.is_edited)
      setPostFlair(data.post.post_flair)
      setPostUsername(data.post.username)
      setLikedBy(data.post.liked_by.length)
      setDidUserLike(data.post.liked_by.includes(loggedInUserID))

  
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
    try{
      const { data } = await axios.post(`/api/comments/${postID}`, { comment }, {withCredentials: true})
      
      if(data.isSuccess){
        toast(
          {
            title: "Added comment",
            status: "success",
            duration: 3000,
            isClosable: true,
          }
        )
        setComments([data.commentData, ...comments])
        setCommentCount(prev => prev+1)
        setComment('')
      }
    } catch(err) {
      toast(
        {
          title: " Could not add comment",
          status: "error",
          duration: 3000,
          isClosable: true,
        }
      )
    }
  }

  const handleEditClick = async(commentID, editedComment, username) => {
    const { data } = await axios.put(`/api/comments`, { commentID, editedComment, username } , { withCredentials: true })
    
    if(data.wasUpdated) {
      toast(
        {
          title: "Edited comment",
          status: "success",
          duration: 3000,
          isClosable: true,
        }
      )
      setComments([...comments.filter(comment => comment.comment_id === commentID ? comment.comment_body = editedComment : comment)])
      return true
    }

    return false
  }

  const handleDeleteClick = async(commentID, username) => {
    const { data } = await axios.post(`/api/comments`, {commentID, username}, { withCredentials: true })
    if(data.wasDeleted){
      toast(
        {
          title: "Deleted successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        }
      )
      setComments([...comments.filter(comment => comment.comment_id === commentID ? comment.comment_body = '[deleted]' : comment)])
      return true
    }else{
      toast(
        {
          title: "Could not delete comment",
          status: "error",
          duration: 3000,
          isClosable: true,
        }
      )
    }
  }

  //*TO RECOGNISE LINKS IN A POST
  const componentDecorator = (href, text, key) => (
    <a href={href} className=" dark:text-green-flair text-light-flair" key={key} target="_blank">
      {text}
    </a>
  );

  const handleExitClick = () => {
      history.push('/')
  }

  const handleUserLike = async() => {
    const { data } = await axios.get(`/api/posts/${postID}/like`, { withCredentials: true })
    if(data.wasUpdated){
      console.log(data)
      setDidUserLike(true)
      setLikedBy(data.likedBy.length)
      setSpamDisable(true)
      setTimeout(() => setSpamDisable(false), 1000)
    } 
    else{
      alert(data.error.message)
    }
  }

  const handleUserDislike = async() => {
    const { data } = await axios.get(`/api/posts/${postID}/dislike`, { withCredentials: true })
    if(data.wasDeleted){
      console.log(data)
      setDidUserLike(false)
      setLikedBy(data.likedBy.length)
      setSpamDisable(true)
      setTimeout(() => setSpamDisable(false), 1000)
    }
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
                <div className="flex justify-between">
                  <button to={`/flair/${postFlair}`} className="flex  justify-start font-medium text-xs rounded-md text-white w-max bg-green-flair  py-1.5 px-2">
                    {postFlair}
                  </button>
                  <Link onClick={handleExitClick} className="flex  items-center font-medium text-xs rounded-md text-white w-max  py-1.5 px-2 bg-green-flair" >
                    <ImCross />
                  </Link>
                </div>
                <h1 className="dark:text-white pt-4 flex text-left justify-start font-black text-3xl text-gray-900">
                  <Linkify componentDecorator={componentDecorator}>
                    {postTitle}
                  </Linkify>
                </h1>
                <p className="dark:text-gray-300 text-gray-700 text-md whitespace-pre-wrap  text-left">
                <Linkify componentDecorator={componentDecorator}>
                    {postBody}
                  </Linkify>
                </p>

                <div className="flex mt-5">
                  <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
                    <BiUser color={"#fff"} />
                    <Link to={`/user/${postUsername}`} className="flex text-xs ml-1 items-center text-white " >
                      {postUsername}
                    </Link>
                  </div>

                  <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2  w-max mx-2 rounded-md" >
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
                  {
                    didUserLike ? (

                      <button onClick={handleUserDislike} className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center w-max py-1.5 ml-2 px-2  rounded-md">
                        
                        <BsHeartFill className="text-white " />
                        <p className="flex text-xs ml-1 items-center text-white " >
                          {likedBy}
                        </p>
                      </button>
                    ) : (
                      <button disabled={spamDisable} onClick={handleUserLike} className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center w-max py-1.5 ml-2 px-2  rounded-md">
                        
                        <BsHeart color={"#fff"} />
                        <p className="flex text-xs ml-1 items-center text-white " >
                          {likedBy}
                        </p>
                      </button>
                    )
                  }
                </div>
              </div>
              {
                loggedIn ? 
                (
                  <form onSubmit={handleCommentSubmit} className="flex w-11/12 m-auto pt-4 flex-col border-b-2 pb-5 dark:border-dark-flair border-gray-300">
                    <textarea value={comment} onChange={e => setComment(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-36 bg-transparent dark:border-gray-700 hover:ring-green-flair resize-y border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
                    <button className=" focus:outline-none w-full mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Submit</button>
                  </form>
                ) : 
                (
                  <h1 className="text-xl w-11/12 m-auto my-3 text-black dark:text-gray-200 font-bold  border-b-2 pb-2 dark:border-dark-flair border-gray-300">Login to be able to comment on posts</h1>
                )
              }
              <div className="m-auto w-11/12 ">  
                <h1 className="dark:text-white duration-500 transition-all text-gray-900 mt-3 font-black text-left text-2xl">Comments</h1>
                  {
                    commentCount === 0 ? (
                      <div className="flex flex-col py-20">
                        <h1 className="flex justify-center text-gray-900 dark:text-white font-black text-4xl">Wow, such empty</h1>
                        <p className="dark:text-gray-400 text-gray-700 flex justify-center text-lg whitespace-pre-wrap "> Start off by saying something nice</p>
                      </div>
                    ) : (
                      <div className="flex flex-col pb-4">
                        {comments.map(comment => (
                          <Comment key={comment.comment_id} userID={comment.user_id} isEdited={comment.is_edited} replyComments={replyComments} commentID={comment.comment_id} updateComment={handleEditClick} deleteComment={handleDeleteClick}  commentBody={comment.comment_body} username={comment.username} createdAt={comment.created_at} />
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
