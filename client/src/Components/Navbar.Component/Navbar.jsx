import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import  useDarkMode from '../../CustomHooks/useDarkMode'
import GetUserPreference from '../../CustomHooks/getUserPreference'
import { RiAccountCircleLine } from 'react-icons/ri'
import { CgMathPlus } from 'react-icons/cg'
import { AuthContext } from '../../State/AuthContext'

const Navbar = () => {
  const { checkUserLoggedIn, loggedIn } = useContext(AuthContext)

  GetUserPreference()

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  return (
    <nav  
    className="dark:bg-dark-post dark:border-transparent dark:border-dark-flair
    transition-all duration-500 flex sticky top-0 z-50  w-auto bg-white font-noto h-16 border-b-2 border-gray-300">
      <div className="w-11/12 m-auto flex justify-between items-center    ">
        <h1 onClick={useDarkMode} className='dark:bg-dark-flair dark:text-white font-bold text-xl py-2 px-4 bg-blue-special text-white rounded-lg'>JOBIFY</h1>
        <ul className="flex">
          <li className="dark:text-white mx-2 text-black ">
            <Link to='/'>
              <h1>Posts</h1>
            </Link>
          </li>
          <li className="dark:text-white mx-5 text-black">
            <Link to="/companies">
              <h1>Top Companies</h1>
            </Link>
          </li>
          <li className="dark:text-white mx-2 text-black">
            <Link to="/reviews">
              <h1>Reviews</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex">
          <li className="mr-5 dark:text-white text-black font-semibold">
            <Link>
              <CgMathPlus size={25} />
            </Link>
          </li>
          <li className="dark:text-white  font-semibold text-black">
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
