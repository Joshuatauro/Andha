const router = require('express').Router()
const db = require('../dbConnection')
const {v4: uuidv4} = require('uuid')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/', async(req, res) => {
  const getPostsQuery = await db.query(`SELECT
                                          post_id, post_title, post_body, posts.post_flair, posts.created_at, posts.username, posts.is_edited, posts.username,
                                          COUNT(comments.parent_postid) As "comment_count"
                                        FROM
                                          posts
                                        LEFT JOIN
                                          comments ON posts.post_id = comments.parent_postid
                                        GROUP BY
                                          posts.post_id
                                        ORDER BY 
                                          posts.created_at DESC`)


  res.status(200).json(
    {
      posts: getPostsQuery.rows,
      count: getPostsQuery.rowCount
    }
  )
})

router.get('/:postID', async(req, res) => {
  const postID = req.params.postID

  try {
    const getSinglePostQuery = await db.query('SELECT * FROM posts WHERE post_id = $1', [postID])
    const getPostCommentsQuery = await db.query('SELECT * FROM comments WHERE parent_postid = $1 ORDER BY created_at DESC', [postID])
    res.status(200).json(
      {
        post: getSinglePostQuery.rows[0],
        comments: getPostCommentsQuery.rows,
        commentCount: getPostCommentsQuery.rowCount
      }
    )
  } catch(err) {
    res.status(400).json(
      {
        message: "Something went wrong"
      }
    )
  }
})

module.exports = router