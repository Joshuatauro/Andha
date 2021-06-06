const router = require('express').Router()
const db = require('../dbConnection')

router.post("/add", async(req, res) => {
  const companyName = req.body.companyName
  const companyIndustry = req.body.companyIndustry
  const companyWebsite = req.body.companyWebsite
  const companySize = req.body.companySize
  const companyAbout = req.body.companyAbout
  const companyLocation = req.body.companyLocation
  const companyFounded = req.body.companyFounded
  const companyLogo = req.body.companyLogo

  try {

    if(!companySize || !companyWebsite || !companyName || !companyAbout || !companyLocation || !companyIndustry || !companyLogo) return res.status(400).json({message: "Missing fields"})

    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const addToCompaniesQuery = await db.query('INSERT INTO companies (company_name, company_industry, company_location, company_about, company_founded, company_website, company_size, company_logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *', [companyName, companyIndustry, companyLocation, companyAbout, companyFounded, companyWebsite, companySize, companyLogo])
    res.status(200).json(
      {
        message: 'Added company successfully',
        companyDetails: addToCompaniesQuery
      }
    )

  } catch(err) {
    console.log(err.message)
    res.json({message: err.message})
  }


})

router.get("/", async(req, res) => {

  try{
    const getTopCompaniesQuery = await db.query(`SELECT
                                                    company_id, companies.company_name, company_industry, company_website, company_founded, company_location, company_about, company_size, company_logo,
                                                    AVG(reviews.review_rating) As "company_rating", COUNT(reviews.review_rating) AS "total_reviews"
                                                FROM
                                                    companies
                                                LEFT JOIN
                                                    reviews ON reviews.company_name = companies.company_name
                                                GROUP BY
                                                    companies.company_name
                                                ORDER BY 
                                                    company_rating ASC
                                                LIMIT 10`)

    res.json(
      {
        companies: getTopCompaniesQuery.rows
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

router.get("/:companyName", async(req, res) => {
  console.log('object')
  const companyName = req.params.companyName
  try{

    const getCompanyDetails = await db.query(`SELECT
                                                  company_id, companies.company_name, company_industry, company_website, company_founded, company_location, company_about, company_size, company_logo,
                                                  AVG(reviews.review_rating) As "company_rating", COUNT(reviews.review_rating) AS "total_reviews"
                                              FROM
                                                  companies
                                              LEFT JOIN
                                                  reviews ON reviews.company_name = companies.company_name
                                              GROUP BY
                                                  companies.company_name
                                              HAVING 
                                                companies.company_name ILIKE $1`, [companyName])
    const getCompanyReviews = await db.query(`
                                              SELECT 
                                                  review_id,
                                                  review_rating,
                                                  review_created_at,
                                                  company_name,
                                                  user_id,
                                                  user_position,
                                                  review_pros,
                                                  review_cons,
                                                  review_title,
                                                  username FROM reviews 
                                              LEFT JOIN users on users.id = reviews.user_id
                                              WHERE company_name ILIKE $1 ORDER BY review_created_at DESC`, [companyName])

    res.status(200).json(
      {
        companyDetails: getCompanyDetails.rows[0],
        reviews: getCompanyReviews.rows,
        doesCompanyExist: getCompanyDetails.rows ? true : false
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