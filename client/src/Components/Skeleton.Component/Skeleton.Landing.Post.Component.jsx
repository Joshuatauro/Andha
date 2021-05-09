import React from 'react'

const SkeletonLandingPost = () => (
  <div className="dark:bg-dark-post bg-white transition-all duration-500">
    <div className="animate-pulse w-11/12 m-auto py-8">
      <div className=" bg-green-flair w-20 h-7 rounded-md"></div>
      <div className=" w-9/12 h-7 my-2 dark:bg-dark-flair bg-gray-400"></div>
      <div className="w-full h-28 dark:bg-dark-flair bg-gray-400"></div>
      <div className="flex mt-3">
        <div className="w-24 rounded-md h-8 mr-2 dark:bg-dark-flair bg-light-flair"></div>
        <div className="w-24 rounded-md h-8 mr-2 dark:bg-dark-flair bg-light-flair"></div>
        <div className="w-24 rounded-md h-8 mr-2 dark:bg-dark-flair bg-light-flair"></div>
      </div>

    </div>
  </div>
  
)

export default SkeletonLandingPost

