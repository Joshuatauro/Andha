const router = require('express').Router()
const db = require('../dbConnection')
const {v4: uuidv4} = require('uuid')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/', async(req, res) => {
  const getPostsQuery = await db.query('SELECT * FROM posts ORDER BY created_at DESC')


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

    res.status(200).json(
      {
        post: getSinglePostQuery.rows,
        count: getSinglePostQuery.rowCount
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