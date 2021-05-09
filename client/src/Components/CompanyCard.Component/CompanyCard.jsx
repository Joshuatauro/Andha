import React from 'react'
import { BiUser, BiStar } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { Link } from 'react-router-dom'
const CompanyCard = ({ companyName, companyIndustry, companyID, companyFounded, companyLocation, companyRating, totalReviews, companySize, companyWebsite, companyAbout }) => {
  return (
    <article className="w-full max-h-44 bg-white shadow-lg rounded-md">
      <div className=" w-11/12 m-auto py-4">
        <div className="flex items-center mb-1">
          <h1 className="font-bold text-xl text-left mr-2">{companyName}</h1>
          <h2 className="text-xs font-medium bg-green-flair text-white px-2 py-1 rounded-md" >{companyIndustry}</h2>
        </div>
        <p className="text-left text-gray-700 text-md">{companyAbout}</p>

        <div className="flex mt-1">
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <BiStar color={"#fff"} />
            <h2 className="flex text-xs ml-1 items-center text-white " >
              {Math.round(companyRating*10)/10} ({totalReviews} reviews)
            </h2>
          </div>
          <div className="dark:bg-dark-flair transition-all duration-500 mx-2 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <BiUser color={"#fff"} />
            <h3 className="flex text-xs ml-1 items-center text-white " >
              {companySize}+
            </h3>
          </div>
          <div className="dark:bg-dark-flair transition-all  duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <CgWebsite color={"#fff"} />
            <a href={companyWebsite} target="_blank" rel="noreferrer" className="flex text-xs ml-1 items-center text-white " >
              {companyWebsite}
            </a>
          </div>
          
          
        </div>
      </div>
    </article>
  )
}

export default CompanyCard
