const router = require('express').Router()
const db = require('../dbConnection')
const jwt = require("jsonwebtoken");


router.post('/add', async(req, res) => {
  const reviewRating = req.body.reviewRating
  const reviewBody = req.body.reviewBody
  const companyName = req.body.companyName
  const userPosition = req.body.userPosition
  const reviewCreatedAt = new Date()
  
  try{

    if(!reviewBody || !reviewRating || !companyName || !userPosition) return res.status(400).json({message: "Missing fields"})

    const userToken = req.cookies.jwtToken

    if(!userToken) return res.status(401).json({message: 'Not authorized'})

    const { username } = jwt.verify(userToken, process.env.JWT_SECRET)

    if(!username) return res.status(401).json({message: 'Not authorized'})

    const addReviewQuery = await db.query('INSERT INTO reviews (review_body, review_rating, review_created_at, company_name, user_position, username) VALUES ($1, $2, $3, $4, $5, $6) returning *', [reviewBody, reviewRating, reviewCreatedAt, companyName, userPosition, username])

    res.status(200).json(
      {
        wasAdded: true,
        reviewDetails: addReviewQuery.rows[0]
      }
    )

  } catch(err) {
    res.status(400).json(
      {
        message: 'Something went wrong'
      }
    )
  }
})

module.exports = router