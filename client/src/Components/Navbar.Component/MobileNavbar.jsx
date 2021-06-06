import React from 'react'
import { Link } from 'react-router-dom'

const MobileNavbar = () => {
  return (
    <nav className="w-full bottom-0 sticky bg-white dark:bg-dark-primary flex font-noto h-12  border-t-2 border-gray-300  dark:border-gray-700">
      <ul className="w-11/12  mx-auto grid place-items-center grid-cols-2">
          <Link to="/companies" className=" flex w-full  h-full items-center justify-center border-r-2 border-gray-300 dark:border-gray-700">
            <li className="dark:text-white mx-2 text-black list-none ">
              <h1>Reviews</h1>
            </li>
          </Link>
          <Link to="/hiring" className=" flex w-full  h-full items-center justify-center">
            <li className="dark:text-white mx-2 text-black list-none ">
              <h1>Who's hiring</h1>
            </li>
          </Link>
      </ul>
    </nav>
  )
}

export default MobileNavbar
