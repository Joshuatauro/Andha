const router = require('express').Router()
const db = require('../dbConnection')
const {v4: uuidv4} = require('uuid')

const jwt = require("jsonwebtoken");


//* UPDATING A COMMENT
router.put('/', async(req, res) => {

  const commentID = req.body.commentID
  const creatorUsername = req.body.username
  const editedComment = req.body.editedComment


  try {

    const userToken = req.cookies.jwtToken

    if(!userToken) return res.status(401).json({message: "Not authorized to conduct action"})
    
    const { username } = jwt.verify(userToken, process.env.JWT_SECRET)
    
    if(username != creatorUsername) return res.status(401).json({message: 'User is not the owner of the comment'})


    const updateCommentQuery = await db.query('UPDATE comments SET comment_body = $1, is_edited = true WHERE comment_id = $2 returning *', [editedComment, commentID])
  
    res.status(200).json(
      {
        comment: updateCommentQuery.rows,
        wasUpdated: true
      }
    )
  
  } catch (err) {
    res.status(400).json (
      {
        wasUpdated: false
      }
    )
  }
})

//* DELETING A COMMENT
router.post('/', async(req, res) => {
  const commentID = req.body.commentID
  const creatorUsername = req.body.username

  try {
    const userToken = req.cookies.jwtToken

    if(!userToken) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const { username } = jwt.verify(userToken, process.env.JWT_SECRET)

    if(creatorUsername != username) return res.status(402).json({message: 'Not authorized', wasDeleted: false})

    const deleteCommentQuery = await db.query('UPDATE comments SET username= $1 WHERE comment_id = $2', ['[deleted]', commentID])

    res.status(200).json(
      {
        message: 'Deleted comment successfully',
        wasDeleted: true
      }
    )

  } catch(err) {
    console.log(err)
    res.status(400).json(
      {
        message: err.message
      }
    )
  }
})

//* ADDING A REPLY
router.post('/reply', async(req, res) => {
  const parentCommentID = req.body.parentCommentID
  const replyComment = req.body.replyComment
  const postID = req.body.postID
  const createdAt = new Date()


  try {
    const userToken = req.cookies.jwtToken

    if(!userToken) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const { username } = jwt.verify(userToken, process.env.JWT_SECRET)


    const replyToCommentQuery = await db.query('INSERT INTO comments( comment_body,parent_comment_id ,username, parent_postid, created_at) VALUES ($1, $2, $3, $4, $5) returning *', [replyComment, parentCommentID ,username, postID, createdAt])

    res.status(200).json(
      {
        message: 'Added comment',
        commentData: replyToCommentQuery.rows[0],
        isSuccess: true
      }
    )

  } catch(err) {
    res.status(200).json(
      {
        message: err.message,
        isSuccess: false
      }
    )
  }
})

//* ADDING A COMMENT
router.post('/:postID', async(req, res) => {
  const created_at = new Date()
  const parent_postID = req.params.postID
  const comment = req.body.comment

  try {
    const userToken = req.cookies.jwtToken

    if(!userToken) return res.status(401).json({message: "Not authorized to conduct action"})

    const { username } = jwt.verify(userToken, process.env.JWT_SECRET)

    if(!username) return res.status(401).json({message: "Not authorized"})
    
    const addCommentQuery = await db.query('INSERT INTO comments ( comment_body,parent_comment_id, username, parent_postid, created_at) VALUES ($1, NULL ,$2, $3, $4) returning *', [comment, username, parent_postID, created_at])

    res.status(200).json(
      {
        message: 'Added comment',
        commentData: addCommentQuery.rows[0],
        isSuccess: true
      }
    )
  
  } catch(err) {
    res.status(200).json(
      {
        message: 'Could nodddt add comment',
        isSuccess: false
      }
    )
  }
})

module.exports = router