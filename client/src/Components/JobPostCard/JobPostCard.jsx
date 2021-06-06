import React, { useRef } from 'react'
import { BiMapPin, BiTimeFive } from 'react-icons/bi';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { toast, useToast } from '@chakra-ui/toast';
import { AiFillCheckSquare } from 'react-icons/ai';
import { Tooltip } from '@chakra-ui/tooltip';

const JobPostCard = ({isApproved, jobTitle, jobLocation, jobCompany, jobCreatedAt, jobApplyAt}) => {
  
  

  return (
    <article className="w-full py-5 rounded-md  bg-white dark:bg-dark-post font-noto">
      <div className="w-11/12 m-auto">
        <Link to={`/companies/${jobCompany}`} className="flex  justify-start font-medium text-xs rounded-md text-white w-max  py-1.5 px-2" style={{"background-color": "#00AE81"}} >
          {jobCompany}
        </Link>
        <div className="flex items-center">

          <h1 className="dark:text-white text-lg font-bold mt-1">{jobTitle}</h1>
          {
            isApproved ? (
              <Tooltip hasArrow label="Approved posting" aria-label="A tooltip">
                <span className='w-min '>
                  <AiFillCheckSquare size={20} className="ml-1  text-green-flair" />
                </span>
              </Tooltip>
            ) : ""
          }
          
        </div>
        <a href={jobApplyAt} target="_blank" rel="noreferrer" className="dark:text-green-flair text-sm">Click here to apply</a>
        <div className="flex mt-2 ">
          <div className="dark:bg-dark-flair transition-all duration-500  bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <BiMapPin color={"#fff"} />
            <h2 className="flex text-xs ml-2 items-center text-white " >
              {jobLocation}
            </h2>
          </div>
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2  w-max mx-2 rounded-md" >
            <BiTimeFive color={"#fff"} />
            <p className="flex text-xs ml-1 items-center text-white "  >
              <Moment fromNow >{jobCreatedAt}</Moment>
            </p>
          </div>
          
        </div>
      </div>
    </article>
  )
}

export default JobPostCard
