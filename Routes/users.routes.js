const router = require('express').Router()
const db = require('../dbConnection')
const jwt = require('jsonwebtoken')
const bcrypt  =require('bcryptjs')
router.get("/", async(req, res) => {
  try{
    const userID = req.userID
    const username = req.username

    if(!username || !userID) return res.status(401).json({message: "Please sign in to your account"})

    const getUserAccountDetailsQuery = await db.query('SELECT username, company, job_title, location, bio, portfolio_url, linkedin_url  from users WHERE id = $1', [userID])

    res.status(200).json(
      {
        userDetails: getUserAccountDetailsQuery.rows[0],
        message: "Retrieved data successfully"
      }
    )
  } catch(err) {
    console.log(err)
    res.status(400).json(
      {
        message: "Could not retrieve data",
        error: err.message
      }
    )
  }
})

router.put('/', async(req, res) => {
  
  const jobTitle = req.body.jobTitle 
  const company = req.body.company 
  const username = req.body.username 
  const linkedIn = req.body.linkedIn
  const portfolio = req.body.portfolio
  const bio = req.body.bio
  const location = req.body.location
  
  try{

    if(!req.userID) return res.status(401).json({message: 'Not authorized'})

    const userID = req.userID

    const updateUserDetailsQuery = await db.query('UPDATE users SET job_title=$1,  company = $2, username=$3, location=$4, portfolio_url=$5, linkedin_url=$6, bio=$7 WHERE id = $8 returning username', [jobTitle, company, username, location, portfolio, linkedIn, bio, userID])

      const signToken = await jwt.sign(
        {
          userID,
          username,
          isAdmin: false
        },
        process.env.JWT_SECRET
      )
    res.cookie('jwtToken', signToken, { httpOnly: true } ).json(
      {
        didUpdate: true,
        details: updateUserDetailsQuery.rows[0]
      }
    )

  } catch(err){ 
    console.log(err)
    res.status(400).json(
      {
        didUpdate: false
      }
    )
  }
})

router.post('/reset-password', async(req, res) => {
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword
  const reNewPassword = req.body.reNewPassword

  try{
    if(!oldPassword || !newPassword || !reNewPassword) return res.status(401).json({message: 'Please enter all the fields'})
    if(!req.userID) return res.status(401).json({message: 'Not authorized to perform action'})
    if(newPassword !== reNewPassword) return res.status(401).json({message: "Make sure both entered new passwords are similar"})

    const userID = req.userID
    const username = req.username  

    const checkUserExistsQuery = await db.query('SELECT hashedPassword, id FROM users WHERE username = $1', [username])

    const isUserDetailsCorrect = await bcrypt.compare(oldPassword,checkUserExistsQuery.rows[0].hashedpassword)
    if(!isUserDetailsCorrect) return res.status(401).json({message: "Please enter correct old password"})

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt) //HASHED PASSWORD 

    const updateUserPassword = await db.query(`UPDATE users SET hashedPassword = $1 WHERE id = $2`, [ hashedPassword, userID ])

    res.status(200).json(
      {
        message: "Updated password",
        didUpdate: true
      }
    )
  } catch(err){
    console.log(err)
    res.status(200).json(
      {
        message: err.message,
        didUpdate: false
      }
    )
  }
})

router.get('/posts/:username', async(req, res) => {
  const clientUsername= req.params.username

  try{
    
    const getUsersPostsQuery = await db.query(`SELECT 
                                                  post_id, liked_by, post_title, post_flair, created_at, username, is_edited, comment_count
                                                FROM 
                                                  (
                                                      SELECT
                                                      post_id, post_title, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited, posts.liked_by,
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
                                                LEFT JOIN users ON id = NEW_TABLE.user_id
                                                WHERE username = $1`, [clientUsername])
  
    res.status(200).json(
      {
        userPosts: getUsersPostsQuery.rows,
        isSuccess: true
      }
    )
  } catch(err) {
    console.log(err.message)
    res.status(400).json(
      {
        message: err.message
      }
    )
  }
})

router.get('/comments/:username', async(req, res) => {
  const clientUsername = req.params.username

  try{

    const getUserCommentsQuery = await db.query(`SELECT comment_body, NEW_TABLE.created_at, parent_postid, username, post_title 
                                                FROM (
                                                    SELECT 
                                                        comments.comment_body, comments.created_at, comments.parent_postid, username
                                                    FROM 
                                                        comments
                                                    LEFT JOIN 
                                                        users ON  id = comments.user_id
                                                    WHERE username = $1
                                                ) AS NEW_TABLE
                                                LEFT JOIN 
                                                    posts ON post_id = parent_postid`, [clientUsername])

    res.status(200).json(
      {
        comments: getUserCommentsQuery.rows,
        isSuccess: true
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

router.get('/liked/:username', async(req, res) => {
  const clientUsername = req.params.username

  try{

    const userID = req.userID
    const username = req.username

    if(!username || !userID) return res.status(401).json({message: "Please sign in to your account"})

    if (username !== clientUsername) return res.status(401).json({message: "Not authorized"})

    const getUserLikedPostsQuery = await db.query(`
                                                SELECT 
                                                  post_id, post_title, liked_by ,post_flair, created_at, username, is_edited, comment_count
                                                FROM 
                                                  (
                                                      SELECT
                                                      post_id, posts.liked_by ,post_title, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited,
                                                      COUNT(comments.parent_postid) As "comment_count"
                                                      FROM
                                                          posts
                                                      LEFT JOIN
                                                          comments ON posts.post_id = comments.parent_postid
                                                      GROUP BY
                                                          posts.post_id
                                                      HAVING $1 = ANY(posts.liked_by) AND posts.user_id != $1
                                                      ORDER BY 
                                                          posts.created_at DESC
                                                  ) AS NEW_TABLE
                                                LEFT JOIN users ON id = NEW_TABLE.user_id`, [userID])

    res.status(200).json(
      {
        posts: getUserLikedPostsQuery.rows
      }
    )

  } catch(err){
    res.status(400).json(
      {
        message: err.message
      }
    )
  } 
})

module.exports = router