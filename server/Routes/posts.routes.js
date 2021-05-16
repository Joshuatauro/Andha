const router = require('express').Router()
const db = require('../dbConnection')
const {v4: uuidv4} = require('uuid')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/' ,async(req, res) => {
  console.log(req.username)
  try{

    const getPostsQuery = await db.query(`SELECT 
                                            post_id, post_title, post_body, post_flair, created_at, username, is_edited, comment_count
                                          FROM 
                                            (
                                                SELECT
                                                post_id, post_title, post_body, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited,
                                                COUNT(comments.parent_postid) As "comment_count"
                                                FROM
                                                    posts
                                                LEFT JOIN
                                                    comments ON posts.post_id = comments.parent_postid
                                                GROUP BY
                                                    posts.post_id
                                                ORDER BY 
                                                    posts.created_at DESC
                                            ) AS NEW_TABLE
                                          LEFT JOIN users ON id = NEW_TABLE.user_id`)
  
  
    res.status(200).json(
      {
        posts: getPostsQuery.rows,
        count: getPostsQuery.rowCount
      }
    )
  } catch(err) {
    console.log(err)
  }
})

router.post("/create", async(req, res) => {
  const body = req.body.body
  const flair = req.body.flair
  const title = req.body.title
  const createdAt = new Date()

  try {


    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const userID = req.userID
    const username = req.username

    const addPostQuery = await db.query('INSERT INTO posts (post_title, post_body, post_flair, user_id, created_At) VALUES ($1, $2, $3, $4, $5) returning post_id', [title, body, flair, userID, createdAt])

    res.status(200).json(
      {
        postID: addPostQuery.rows[0].post_id
      }
    )

  } catch(err) {
    res.status(400).json({message: "Could not add post", error: err.message})
  }
})

router.get('/:postID', async(req, res) => {
  const postID = req.params.postID

  try {
    const getSinglePostQuery = await db.query(`SELECT 
                                                  post_id, post_title, post_body, post_flair, created_at, username, is_edited
                                              FROM 
                                                  (
                                                  SELECT 
                                                      *
                                                  FROM 
                                                      posts
                                                  WHERE 
                                                      post_id = $1
                                                  ) AS NEW_TABLE
                                              LEFT JOIN users on id = NEW_TABLE.user_id
                                                  `, [postID])

    const getPostCommentsQuery = await db.query(`SELECT 
                                                    comment_id, comment_body, username, parent_postid, parent_comment_id, created_at
                                                FROM
                                                    (
                                                        SELECT * FROM comments WHERE parent_postid = $1
                                                    ) AS NEW_TABLE
                                                LEFT JOIN users ON id = NEW_TABLE.user_id`, [postID])
    res.status(200).json(
      {
        post: getSinglePostQuery.rows[0],
        comments: getPostCommentsQuery.rows,
        commentCount: getPostCommentsQuery.rowCount
      }
    )
  } catch(err) {
    console.log(err)
    res.status(400).json(
      {
        message: "Something went wrong"
      }
    )
  }
})

module.exports = router