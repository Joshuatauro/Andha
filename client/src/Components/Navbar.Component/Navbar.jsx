import React from 'react'
import { Link } from 'react-router-dom'

import { RiAccountCircleLine } from 'react-icons/ri'
import { CgMathPlus } from 'react-icons/cg'

const Navbar = () => {
  return (
    <nav className="flex sticky top-0  w-auto bg-white font-noto h-16 border-b-2 border-gray-300">
      <div className="w-10/12 m-auto flex justify-between items-center    ">
        <h1 className='font-bold text-xl py-2 px-4 bg-black text-white rounded-lg'>JOBIFY</h1>
        <ul className="flex">
          <li className="mx-2 text-black ">
            <Link to='/posts'>
              <h1>Posts</h1>
            </Link>
          </li>
          <li className="mx-5 text-black">
            <Link to="/companies">
              <h1>Top Companies</h1>
            </Link>
          </li>
          <li className="mx-2 text-black">
            <Link to="/reviews">
              <h1>Reviews</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex">
          <li className="mr-5 text-black font-semibold">
            <Link>
              <CgMathPlus size={25} />
            </Link>
          </li>
          <li className=" font-semibold text-black">
            <Link>
              <RiAccountCircleLine size={25} />
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
