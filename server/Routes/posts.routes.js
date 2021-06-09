const router = require('express').Router()
const db = require('../dbConnection')

router.get('/' ,async(req, res) => {
  const offset = req.query.l || 0

  try{

    const getPostsQuery = await db.query(`SELECT 
                                            post_id, liked_by,post_title, post_body, post_flair, created_at, username, is_edited, comment_count
                                          FROM 
                                            (
                                                SELECT
                                                post_id, posts.liked_by ,post_title, post_body, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited,
                                                COUNT(comments.parent_postid) As "comment_count"
                                                FROM
                                                    posts
                                                LEFT JOIN
                                                    comments ON posts.post_id = comments.parent_postid
                                                GROUP BY
                                                    posts.post_id
                                                ORDER BY 
                                                    posts.created_at ASC
                                                OFFSET $1
                                                LIMIT 30
                                            ) AS NEW_TABLE
                                          LEFT JOIN users ON id = NEW_TABLE.user_id`, [offset*30])
  
  
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

router.get('/search', async(req, res) => {

  const searchParam = req.query.q.replace(/\s/g, "|");
  try{

    const getKeywordSearchPostQuery = await db.query(`SELECT 
                                    post_id, liked_by,post_title, post_body, post_flair, created_at, username, is_edited, comment_count
                                  FROM 
                                    (
                                        SELECT
                                        post_id, posts.liked_by ,post_title, post_body, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited,
                                        COUNT(comments.parent_postid) As "comment_count"
                                        FROM
                                            posts
                                        LEFT JOIN
                                            comments ON posts.post_id = comments.parent_postid
                                        GROUP BY
                                            posts.post_id
                                        HAVING
                                            search_helper @@ to_tsquery($1)
                                        ORDER BY
                                            ts_rank(search_helper, plainto_tsquery($1)),  
                                            posts.created_at DESC
                                        
                                    ) AS NEW_TABLE
                                  LEFT JOIN users ON id = NEW_TABLE.user_id`, [searchParam])
    res.status(200).json({posts: getKeywordSearchPostQuery.rows})
  } catch(err) {
    console.log(err)
    res.status(400).json({message: err.message})
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

    const addPostQuery = await db.query(`INSERT INTO posts (post_title, post_body, post_flair, user_id, created_At, liked_by, search_helper) VALUES ($1, $2, $3, $4, $5, ARRAY[$6], to_tsvector($7 || ' ' || $8)) returning post_id`, [title, body, flair, userID, createdAt, userID, body, title])

    res.status(200).json(
      {
        postID: addPostQuery.rows[0].post_id
      }
    )

  } catch(err) {
    console.log(err)
    res.status(400).json({message: "Could not add post", error: err.message})
  }
})

router.get('/:postID/like', async(req, res) => {
  const postID = req.params.postID
  try{
    console.log(req.userID)
    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const userID = req.userID

    const addUserLikeQuery = await db.query('UPDATE posts SET liked_by = array_append(liked_by, $1) WHERE post_id = $2 returning liked_by', [userID, postID])

    res.status(200).json(
      {
        wasUpdated: true,
        likedBy: addUserLikeQuery.rows[0].liked_by
      }
    )

  } catch(err){
    console.log(err)
    res.status(200).json(
      {
        wasUpdated: false,
        message: err.message
      }
    )
  }
})

router.get('/:postID/dislike', async(req, res) => {
  const postID = req.params.postID
  try{
    console.log(req.userID)
    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const userID = req.userID

    const addUserLikeQuery = await db.query('UPDATE posts SET liked_by = array_remove(liked_by, $1) WHERE post_id = $2 returning liked_by', [userID, postID])

    res.status(200).json(
      {
        wasDeleted: true,
        likedBy: addUserLikeQuery.rows[0].liked_by
      }
    )

  } catch(err){
    console.log(err)
    res.status(200).json(
      {
        wasDeleted: false,
        message: err.message
      }
    )
  }
})

router.get('/:postID', async(req, res) => {
  const postID = req.params.postID

  try {
    const getSinglePostQuery = await db.query(`SELECT 
                                                  post_id, liked_by, post_title, post_body, post_flair, created_at, username, is_edited
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
                                                    comment_id, comment_body, username, parent_postid, parent_comment_id, created_at, user_id
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
    
    res.status(400).json(
      {
        message: err.message
      }
    )
  }
})

module.exports = router