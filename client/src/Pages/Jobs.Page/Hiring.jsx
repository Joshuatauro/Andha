import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import JobPostCard from '../../Components/JobPostCard/JobPostCard'
import { Link } from 'react-router-dom'

const Hiring = () => {
  const [title,setTitle] = useState('')
  const [location, setLocation] = useState('')

  const [jobs, setJobs] = useState([])


  const handleJobSearch = async(e) => {
    e.preventDefault()
    const { data } = await axios.get(`/api/jobs?title=${title}&loc=${location}`)
    setJobs(data.jobs)
  }

  useEffect(() => {
    const getJobs = async() => {
      const { data } = await axios.get('/api/jobs')
      console.log(data)
      setJobs(data.jobs)
    }
    getJobs()
  }, [])

  return (
    <section className="w-full min-h-screen bg-white-bg dark:bg-dark-primary">
      <div className="m-auto w-11/12 pt-4">
        <div className=" w-full">
          
          <form onSubmit={handleJobSearch} className="flex w-full">
            <InputGroup className=" w-full mr-3">
              <InputLeftAddon children="Job title" bgColor="#00AE81" color="white" height="100%" borderColor='transparent' />
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} height="auto" placeholder="Eg: Frontend Developer" className="dark:text-white border-r pl-3 rounded-tr-md border-t border-b border-gray-300 dark:border-gray-700 outline-none w-full bg-transparent rounded-br-md focus:ring-1  focus:ring-inset focus:ring-green-flair" />
            </InputGroup>
            <InputGroup width="100% ">
              <InputLeftAddon children="Location" bgColor="#00AE81" color="white" height="100%" borderColor='transparent' />
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} height="auto" placeholder="Eg: New Delhi, India" className="dark:text-white border-r pl-3 rounded-tr-md border-t border-b border-gray-300 dark:border-gray-700 outline-none w-full bg-transparent rounded-br-md focus:ring-1  focus:ring-inset focus:ring-green-flair" />
            </InputGroup>
            <button type="submit" onSubmit={handleJobSearch} className="focus:outline-none px-12 ml-2 h-11 bg-green-flair  rounded-md duration-300 text-white hover:bg-opacity-90">Search</button>
          </form>
          <div className="w-full text-right mt-1">
            <Link to="/add/job" className="text-sm text-green-flair">Recruiter? Add a job here</Link>
          </div>
          <div className="grid mt-6 grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              jobs.map(job => <JobPostCard jobID={job.job_id} jobDesc={job.job_desc} jobApplyAt={job.job_apply_at} jobCompany={job.job_company} jobCreatedAt={job.job_created_at} jobTitle={job.job_title} jobLocation={job.job_location} />)
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hiring
