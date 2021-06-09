const router = require('express').Router()
const db = require('../dbConnection')

const jwt = require("jsonwebtoken");


//* UPDATING A COMMENT
router.put('/', async(req, res) => {

  const commentID = req.body.commentID
  const creatorUsername = req.body.username
  const editedComment = req.body.editedComment


  try {


    const userID = req.userID
    const username = req.username

    
    if(username != creatorUsername) return res.status(401).json({message: 'User is not the owner of the comment'})


    const updateCommentQuery = await db.query('UPDATE comments SET comment_body = $1, is_edited = true WHERE comment_id = $2 returning *', [editedComment, commentID])
  
    res.status(200).json(
      {
        comment: updateCommentQuery.rows,
        wasUpdated: true
      }
    )
  
  } catch (err) {
    console.log(err)
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
    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const userID = req.userID
    const username = req.username

    if(creatorUsername != username) return res.status(402).json({message: 'Not authorized', wasDeleted: false})

    const deleteCommentQuery = await db.query('UPDATE comments SET comment_body = $1 WHERE comment_id = $2 returning *', ['[deleted]', commentID])

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
    if(!req.userID) return res.status(401).json({message: 'Not authorized', isSuccess: false})

    const userID = req.userID
    const username = req.username    


    let replyToCommentQuery = await db.query('INSERT INTO comments( comment_body,parent_comment_id ,user_id, parent_postid, created_at) VALUES ($1, $2, $3, $4, $5) returning *', [replyComment, parentCommentID ,userID, postID, createdAt])
    replyToCommentQuery.rows[0].username = username
    
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
    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const userID = req.userID
    const username = req.username

    let addCommentQuery = await db.query('INSERT INTO comments ( comment_body,parent_comment_id, user_id, parent_postid, created_at) VALUES ($1, NULL ,$2, $3, $4) returning *', [comment, userID, parent_postID, created_at])
    addCommentQuery.rows[0].username = username

    res.status(200).json(
      {
        message: 'Added comment',
        commentData: addCommentQuery.rows[0],
        isSuccess: true
      }
    )
  
  } catch(err) {
    console.log(err)
    res.status(200).json(
      {
        message: 'Could not add comment',
        isSuccess: false
      }
    )
  }
})

module.exports = router