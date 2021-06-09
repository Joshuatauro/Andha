const router = require('express').Router()
const db = require('../dbConnection')
const jwt = require("jsonwebtoken");


router.post('/add', async(req, res) => {
  const reviewRating = req.body.rating
  const reviewPros = req.body.pros
  const reviewCons = req.body.cons
  const companyName = req.body.companyName
  const userPosition = req.body.position
  const reviewTitle = req.body.title
  const reviewCreatedAt = new Date()
  
  try{

    if(!reviewPros || !reviewCons || !reviewRating || !companyName || !userPosition || !reviewTitle) return res.status(400).json({message: "Missing fields"})

    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasAdded: false})

    const userID = req.userID
    const username = req.username

    const userCompany = await db.query('SELECT company FROM users WHERE username = $1', [username])
    if(companyName.toLowerCase() !== userCompany.rows[0].company.toLowerCase()) return res.status(401).json({message: "Cant post review since you do not work in the same company"})

    const addReviewQuery = await db.query('INSERT INTO reviews (review_pros, review_rating, review_created_at, company_name, user_position, user_id, review_cons, review_title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *', [reviewPros, reviewRating, reviewCreatedAt, companyName, userPosition, userID, reviewCons, reviewTitle])
    addReviewQuery.rows[0].username=username
    res.status(200).json(
      {
        wasAdded: true,
        reviewDetails: addReviewQuery.rows[0]
      }
    )

  } catch(err) {
    res.status(400).json(
      {
        message: 'Something went wrong',
        error: err.message,
        wasAdded: false
      }
    )
  }
})

module.exports = router