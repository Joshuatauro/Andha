import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import GetUserPreference from '../../CustomHooks/getUserPreference'
import { AuthContext } from '../../State/AuthContext'
import { BsPerson } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { AiOutlineSearch } from 'react-icons/ai'

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext)
  const history = useHistory()

  GetUserPreference()

  const [textSearch, setTextSearch] = useState('')
  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 750 ? false : true)

  const handleTextSearch = e => {
    e.preventDefault()
    setTextSearch('')
    history.push(`/search?q=${textSearch}`)
  }

  window.addEventListener('resize', () => {
    setIsMobileView(window.innerWidth > 750 ? false : true)
  })




  return (
    <nav  
    className="dark:bg-dark-post dark:border-transparent dark:border-dark-flair
    transition-all duration-500 flex top-0 sticky bottom-0 z-50  w-auto bg-white font-noto h-16 border-b-2 border-gray-300">
      <div className="w-11/12 m-auto flex justify-between items-center    ">
        <div className="flex flex-grow items-center">
          <Link to="/" className='dark:bg-dark-flair w-auto dark:text-white font-bold text-xl py-2 px-4 bg-blue-special text-white rounded-lg'>{isMobileView ? "J" : "JOBIFY"}</Link>
          <form action="" onSubmit={handleTextSearch} className="h-full mx-4 w-full ">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineSearch className="dark:text-white text-black" />}
              />
              <Input type="text" value={textSearch} onChange={e => setTextSearch(e.target.value)} placeholder="Search" className="dark:text-gray-300" borderColor="gray.700" />
            </InputGroup>
          </form>
        </div>
        <ul className="flex items-center">
          {
            isMobileView ? (
              ""
            ) : (
              <>
                <li className="dark:text-white mx-2 text-black">
                  <Link to="/hiring">
                    <h1>Who's hiring</h1>
                  </Link>
                </li>
                <li className="dark:text-white mx-2 text-black">
                  <Link to="/companies">
                    <h1>Reviews</h1>
                  </Link>
                </li>
              </>
            )
          }

          {
            loggedIn ? 
              (
                <>
                  <li className="mx-2 dark:text-white text-black">
                    <Link to="/create"> 
                      <IoCreateOutline size={24} />
                    </Link>
                  </li>
                  <li className="dark:text-white text-black">
                    <Link to="/settings">
                      <BsPerson size={25} />
                    </Link>
                  </li>
                </>
              ) : 
              (
                <>
                  <li className="dark:text-white mx-2 text-black">
                    <Link to="/login">
                      <h1 className='font-bold text-md py-1 px-4 bg-green-flair text-white rounded-lg'>Login</h1>
                    </Link>
                  </li>
                </>
              )
          }
        </ul>
          
          
      </div>
    </nav>
  )
}

export default Navbar
