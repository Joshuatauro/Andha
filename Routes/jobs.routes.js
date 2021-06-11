const router = require('express').Router()
const db = require('../dbConnection')

router.get('/', async(req, res) => {
  let title = req.query.title
  const loc = req.query.loc 
  const offset = req.query.offset || 0


  try{

    if(title){
      title = req.query.title.replace(/\s/g, "|")
      const getJobsWithTitle = await db.query(`SELECT job_id, job_title, job_company, job_location, job_desc, job_apply_at, job_created_at, job_is_approved   
                                  FROM JOBS
                                  WHERE 
                                      search_helper @@ to_tsquery($1) AND
                                      job_location ILIKE $2
                                  ORDER BY
                                    job_created_at DESC
                                  OFFSET $3
                                  LIMIT 25`,[title, loc ? loc : '%' ,offset*2])
      res.status(200).json(
        {
          jobs: getJobsWithTitle.rows
        }
      )
    } else {
      const getJobs = await db.query(`SELECT job_id, job_title, job_company, job_location, job_desc, job_apply_at, job_created_at, job_is_approved
                                  FROM JOBS
                                  WHERE 
                                      job_location ILIKE $1
                                  ORDER BY
                                    job_created_at DESC
                                  OFFSET $2
                                  LIMIT 25`,[loc ? loc : '%' ,offset*2])
      res.status(200).json(
        {
          jobs: getJobs.rows
        }
      )
    }
  } catch(err){
    console.log(err.message)
  }


})

router.post('/add', async(req, res) => {
  const title = req.body.title
  const company = req.body.company
  const location = req.body.location
  const desc = req.body.keywords
  const applyURL = req.body.applyURL
  const createdAt = new Date()
  const job_is_approved = false

  try{

    if(!req.userID) return res.status(401).json({message: 'Not authorized', wasDeleted: false})

    const addJobPostingQuery = await db.query(`INSERT INTO jobs (job_title, job_company, job_location, job_created_at, job_apply_at, job_desc, search_helper) VALUES ($1, $2, $3, $4, $5, $6, to_tsvector($7 || ' ' || $8)) returning job_id`, [title, company, location, createdAt, applyURL, desc, title, desc])

    res.status(200).json(
      {
        wasAdded: true,
        jobID: addJobPostingQuery.rows[0].job_id
      }
    )

  } catch(err){
    console.log(err)
    res.status(400).json(
      {
        wasAdded: false,
        err: err.message
      }
    )
  }
})

module.exports = router