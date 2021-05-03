const router = require('express').Router()
const db = require('../dbConnection')
const {v4: uuidv4} = require('uuid')

const jwt = require("jsonwebtoken");

router.post("/add", async(req, res) => {
  const companyName = req.body.companyName
  const companyIndustry = req.body.companyIndustry
  const companyWebsite = req.body.companyWebsite
  const companySize = req.body.companySize
  const companyAbout = req.body.companyAbout
  const companyLocation = req.body.companyLocation
  const companyFounded = req.body.companyFounded

  try {

    if(!companySize || !companyWebsite || !companyName || !companyAbout || !companyLocation || !companyIndustry) return res.status(400).json({message: "Missing fields"})

    const userToken = req.cookies.jwtToken

    if(!userToken) return res.status(401).json({message: 'Not authorized'})

    const { username } = jwt.verify(userToken, process.env.JWT_SECRET)

    if(!username) return res.status(401).json({message: 'Not authorized'})

    const addToCompaniesQuery = await db.query('INSERT INTO companies (company_name, company_industry, company_location, company_about, company_founded, company_website, company_size) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [companyName, companyIndustry, companyLocation, companyAbout, companyFounded, companyWebsite, companySize])
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
                                                    company_id, companies.company_name, company_industry, company_website,
                                                    AVG(reviews.review_rating) As "company_rating"
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
        message: getTopCompaniesQuery.rows
      }
    )

  } catch(err) {

  }
})


module.exports = router