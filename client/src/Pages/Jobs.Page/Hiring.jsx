import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import JobPostCard from '../../Components/JobPostCard/JobPostCard'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/toast'
import { ImSpinner2 } from 'react-icons/im'
const Hiring = () => {
  const toast = useToast()

  const [title,setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [fetching ,setFetching] = useState(false)
  const [jobs, setJobs] = useState([])


  const handleJobSearch = async(e) => {
    e.preventDefault()
    setFetching(true)
    const { data } = await axios.get(`/api/jobs?title=${title}&loc=${location}`)
    setJobs(data.jobs)
    if(data.jobs.length === 0){
      setFetching(false)
      toast(
        {
          title: "No job results found",
          description: "Sorry, at the moment we don't have any jobs related to your search",
          duration: "10000",
          status: "error",
          isClosable: true,
          position: "bottom-right"
        }
      )
    } else {
      setFetching(false)
    }
  }

  useEffect(() => {
    const getJobs = async() => {
      const { data } = await axios.get(`/api/jobs`)
      setJobs(data.jobs)
    }
    getJobs()
  }, [])

  return (
    <section className="w-full min-h-screen bg-white-bg dark:bg-dark-primary">
      <div className="m-auto w-11/12 pt-4">
        <div className=" w-full">
          
          <form onSubmit={handleJobSearch} className="grid grid-row-3 gap-3  w-full  lg:grid-cols-5">
            <InputGroup className="h-12   md:mr-3 lg:col-span-2 ">
              <InputLeftAddon children="What " bgColor="#00AE81" color="white" height="100%" paddingRight="25px" borderColor='transparent' />
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} height="auto" placeholder="Eg: Frontend Developer" className="dark:text-white border-r pl-3 rounded-tr-md border-t border-b border-gray-300 dark:border-gray-700 outline-none w-full bg-transparent rounded-br-md focus:ring-1  focus:ring-inset focus:ring-green-flair" />
            </InputGroup>
            <InputGroup className="h-12 md:mr-3 lg:col-span-2 ">
              <InputLeftAddon children="Where" bgColor="#00AE81" color="white" height="100%" borderColor='transparent' />
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} height="auto" placeholder="Eg: New Delhi" className="dark:text-white border-r pl-3 rounded-tr-md border-t border-b border-gray-300 dark:border-gray-700 outline-none w-full bg-transparent rounded-br-md focus:ring-1  focus:ring-inset focus:ring-green-flair" />
            </InputGroup>

              {
                fetching ? (
                  <button type="submit" disabled onSubmit={handleJobSearch} className="focus:outline-none px-12 flex items-center justify-center h-12 bg-green-flair  rounded-md duration-300 text-white hover:bg-opacity-90">
                    <span className="flex items-center">
                      <ImSpinner2 className="text-white animate-spin mr-2 " />
                      Loading
                    </span>
                  </button>
                ) : (
                  <button type="submit" onSubmit={handleJobSearch} className="focus:outline-none px-12 h-12 bg-green-flair  rounded-md duration-300 text-white hover:bg-opacity-90">
                   Submit
                  </button>
                )
              }
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
