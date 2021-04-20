const router = require('express').Router()
const db = require('../dbConnection')
const {v4: uuidv4} = require('uuid')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//*SIGNUP
router.post('/signup', async(req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  
  //MISSING ANY OF THE FIELDS
  if (!username || !password || !email) return res.status(400).send("Please enter all the fields")

  //BCRYPT INITIALISATION
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt) //HASHED PASSWORD 

  const signUpUserQuery = await db.query(`INSERT INTO users(id, username, email, hashedpassword) VALUES ($1, $2, $3, $4)`, [uuidv4(), username, email, passwordHash ])

  try{
    
    //CREATING & SIGNING A TOKEN TO SEND TO THE FRONTEND
    const signToken = await jwt.sign(
      {
        username,
        isAdmin: false
      },
      process.env.JWT_SECRET
    )
  
    //SENDING COOKIE TO FRONTEND 
    res.cookie('jwtToken', signToken).json({message: "Created account"})
  } catch(err) {
    res.json({message: "error"})
  }

})

//*LOGIN USER
router.post('/login', async(req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) return res.status(400).json({message: "PLease enter all the fields"})

  const checkUserExistsQuery = await db.query('SELECT hashedPassword FROM users WHERE username = $1', [username])

  if (checkUserExistsQuery.rowCount === 0) return res.status(400).json({message: "No such account exists"})

  //COMPARES THE TWO PASSWORDS AND CHECKS IF ITS TRUE
  const isUserDetailsCorrect = await bcrypt.compare(password,checkUserExistsQuery.rows[0].hashedpassword)

  if(!isUserDetailsCorrect) return res.status(401).json('Either password or username is wrong')

  //CREATING A TOKEN TO BE SENT TO THE FRONTEND
  const token = jwt.sign(
    {
      username,
      isAdmin: false
    }, 
    process.env.JWT_SECRET
  )

  res.cookie('jwtToken', token, { httpOnly: true } ).json({message: "Logged in successfully"})

})


module.exports = router