import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { BiStar } from 'react-icons/bi'

const CompanyDetails = () => {
  const { companyName } = useParams()

  const [companyDetails, setCompanyDetails] = useState({})
  const [reviews, setReviews]  =useState()


  useEffect(() => {
    const getCompanyDetails = async() => {
      const { data } = await axios.get(`http://localhost:5000/api/companies/${companyName}`)
      setCompanyDetails(data.companyDetails)
      setReviews(data.reviews)

      console.log(data)
      
    }

    getCompanyDetails()
  }, [])

  return (
    <section className='dark:bg-dark-primary font-noto w-full min-h-screen pt-7 pb-16 transition-all duration-500 bg-white-bg'>
      <div className="dark:bg-dark-post dark:text-white transition-all duration-500 w-11/12 bg-white m-auto h-full rounded-md ">
        <div className="pt-10 pb-5 w-11/12 m-auto">
          <div className="flex text-left">
            <img src={companyDetails.company_logo} alt="company logo" className="object-contain h-20" />
            <div className="flex flex-col ml-3">
              <h1 className="font-black text-3xl"> {companyDetails.company_name}</h1>
              <div className="flex items-center ">
                <BiStar className="text-gray-900 dark:text-white" />
                <p className="items-center pt-0.5 text-gray-700 dark:text-gray-400 text-sm">{Math.round(companyDetails.company_rating*10)/10} ({companyDetails.total_reviews} reviews)</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-left ">
            <h1 className="font-black text-2xl">About {companyDetails.company_name}</h1>
            <ul className="grid grid-cols-2 grid-rows-3 gap-x-12 w-7/12">
              <li className=" mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Website</h2>
                <a href={companyDetails.company_website} target="_blank" rel="noreferrer" className="text-green-flair -ml-10" >{companyDetails.company_website}</a>
              </li>
              <li className=" mt-2 grid grid-cols-2 gap-x-0 grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Industry</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_industry}</h2>
              </li>
              <li className=" mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Location</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_location}</h2>
              </li>
              <li className="mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Founded</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_founded}</h2>
              </li>
              <li className=" mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Size</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_size}+ Employee's</h2>
              </li>
              
            </ul>
            <p className="mt-4">{companyDetails.company_about}</p>
          </div>
          <div className="mt-6 text-left">
            <h1 className="font-black text-2xl">Reviews</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyDetails
