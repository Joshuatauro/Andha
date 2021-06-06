import React from 'react'
import { BiUser, BiStar, BiMapPin } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { Link } from 'react-router-dom'
const CompanyCard = ({ companyName, companyIndustry, companyID, companyImage, companyLocation, companyRating, totalReviews, companySize, companyWebsite, companyAbout }) => {
  return (
    <article className="dark:bg-dark-post w-full duration-500 transition-all bg-white shadow-lg rounded-md mb-3">
      <div className=" w-11/12 m-auto py-4">
        <div className="flex mb-1">
          <img src={companyImage} alt="company logo" className=" object-cover h-12 " />
          <div className="items-center flex ml-2">
            <div className="flex items-center mb-1">
              <Link to={`/companies/${companyName}`}>
                <h1 className="dark:text-white font-bold text-xl text-left mr-2">{companyName}</h1>
              </Link>
              <h2 className="text-xs font-medium bg-green-flair text-white px-2 py-1 rounded-md" >{companyIndustry}</h2>
            </div>
          </div>
        </div>
        <p className="dark:text-gray-400 text-left text-gray-700 text-md mb-3">{companyAbout}</p>

        <div className="grid grid-cols-2  gap-2 md:flex mt-1">
          <div className="dark:bg-dark-flair transition-all  duration-500 bg-light-flair flex items-center py-1.5 px-2 w-full md:w-max rounded-md">
            <BiStar color={"#fff"} />
            <h2 className="flex text-xs ml-1 items-center text-white " >
              {Math.round(companyRating*10)/10} ({totalReviews} reviews)
            </h2>
          </div>
          <div className="dark:bg-dark-flair transition-all  duration-500 bg-light-flair flex items-center py-1.5 px-2 w-full md:w-max rounded-md">
            <BiUser color={"#fff"} />
            <h3 className="flex text-xs ml-1 items-center text-white " >
              {companySize}+
            </h3>
          </div>
          <div className="dark:bg-dark-flair transition-all  duration-500 bg-light-flair flex items-center py-1.5 px-2 w-full md:w-max rounded-md">
            <CgWebsite color={"#fff"} />
            <a href={companyWebsite} target="_blank" rel="noreferrer" className="flex text-xs ml-1 items-center text-white " >
              {companyWebsite}
            </a>
          </div>
          <div className="dark:bg-dark-flair transition-all  duration-500 bg-light-flair flex items-center py-1.5 px-2 w-full md:w-max rounded-md">
            <BiMapPin color={"#fff"} />
            <h2 className="flex text-xs ml-1 items-center text-white " >
              {companyLocation}
            </h2>
          </div>
          
        </div>
      </div>
    </article>
  )
}

export default CompanyCard
