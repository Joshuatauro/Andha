import React from 'react'
import Moment from 'react-moment'
import { BiStar } from 'react-icons/bi'
import { GiTie } from 'react-icons/gi'

const ReviewComponent = ({reviewTitle, reviewCreatedAt ,reviewRating, reviewUser, reviewCons, reviewPros, reviewUserPosition}) => {
  return (
    <article className="w-full my-4 rounded-md dark:bg-dark-post bg-white duration-500 transition-all">
      <div className="w-11/12 m-auto py-5">
        <div className="flex items-center">
          <h2 className="dark:text-gray-100 text-left text-gray-900 font-bold text-lg">{reviewTitle} ~</h2>
          <span className="flex whitespace-pre-wrap">
            <h2 className="dark:text-gray-300 text-left text-gray-900 font-bold text-xs"> {reviewUser} </h2>

            <p className="dark:text-gray-400 text-left text-xs ml-1  font-bold text-gray-700">
              <Moment fromNow >
                {reviewCreatedAt}
              </Moment>
            </p>
          </span>
        </div>
        <div className="flex">
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 w-max rounded-md">
            <BiStar color={"#fff"} />
            <h2 className="flex text-xs ml-1 items-center text-white " >
              {Math.round(reviewRating*10)/10} 
            </h2>
          </div>
          <div className="dark:bg-dark-flair transition-all duration-500 bg-light-flair flex items-center py-1.5 px-2 ml-2 w-max rounded-md">
            <GiTie color={"#fff"} />
            <h2 className="flex text-xs ml-1 items-center text-white" >
              {reviewUserPosition} 
            </h2> 
          </div>
        </div>
        <h2 className="dark:text-gray-100 text-left text-gray-900 font-bold text-sm mt-3">Pros</h2>
        <p className="dark:text-gray-300 mb-2 w-11/12 text-left text-gray-900 font-medium whitespace-pre-wrap">{reviewPros}</p>
        
        <h2 className="dark:text-gray-100 text-left text-gray-900 font-bold text-sm mt-3">Cons</h2>
        <p className="dark:text-gray-300 mb-2 w-11/12 text-left text-gray-900 font-medium whitespace-pre-wrap">{reviewCons}</p>

      </div>
    </article>
  )
}

export default ReviewComponent