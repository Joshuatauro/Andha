import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import  useDarkMode from '../../CustomHooks/useDarkMode'
import { AuthContext } from '../../State/AuthContext'
import { useHistory } from 'react-router-dom'
import { useToast } from '@chakra-ui/toast'


const SettingPage = () => {
  const toast = useToast()
  const { logout, loggedIn } = useContext(AuthContext)
  const history = useHistory()
  //PROFILE STATE
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState()
  const [company, setCompany] = useState()
  const [jobTitle, setJobTitle] = useState()

  //CHANGE PASSWORD STATE
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')


  useEffect(() => {
    const getUserDetails = async() => {
      const { data } = await axios.get(`/api/users`, { withCredentials: true })
      console.log(data)
      const { userDetails } = data
      setUsername(userDetails.username)
      setBio(userDetails.bio)
      setCompany(userDetails.company)
      setLocation(userDetails.location)
      setJobTitle(userDetails.job_title)
    }
    
    loggedIn ? getUserDetails() : history.push('/login')
  }, [])

  const updateUserDetails = async(e) => {
    e.preventDefault()
    try{

      const { data } = await axios.put(`/api/users`,
                                      {
                                        username, jobTitle, location, bio, company
                                      },
                                      {withCredentials: true})
  
      if(data.didUpdate){
        toast(
          {
            title: "Action successful",
            description: "Updated your profile details",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right"
          }
        )
      }
    } catch(err) {
      toast(
        {
          title: "Action failed",
          description: "Could not update your profile details",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right"
        }
      )
    }
  }

  const changePassword = async(e) => {
    e.preventDefault()
    try{

      const { data } = await axios.post(`/api/users/reset-password`, 
      {
        oldPassword, newPassword, reNewPassword
      }, 
      {withCredentials: true})
      
      if(data.didUpdate){
        setOldPassword('')
        setNewPassword('')
        setReNewPassword('')
        toast(
          {
            title: "Action successful",
            description: "Updated your password",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right"
          }
        )
      } 
    } catch(err) {
      toast(
        {
          title: "Action failed",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right"
        }
      )
    }
  }

  const clickedLogout = async() => {
    const didUserLogOut = await logout()
    if(didUserLogOut){
      toast(
        {
          title: "Logout successful",
          description: "Bye! Hope to see you soon",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right"
        }
      )
      history.push('/')
    }

    
  }

  return (
    <section className="dark:bg-dark-primary font-noto w-full min-h-screen pt-7 pb-16 transition-all duration-500 bg-white-bg">
      <div className="dark:bg-dark-post w-11/12 m-auto h-full rounded-xl py-6  transition-all duration-500 bg-white">
        <section className="m-auto w-11/12">
          <h1 className="text-left text-2xl text-black dark:text-white font-black ">Profile</h1>
          <form action="" className='mt-4' onSubmit={updateUserDetails}>
            <div className="flex flex-col">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Bio</label>
              <textarea type="text" value={bio} onChange={e => setBio(e.target.value)} className=" pt-2 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium h-36" />
            </div>
            
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Company</label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Job Title</label>
              <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex justify-start mt-2">
              <button className=" focus:outline-none md:w-auto px-4 w-full mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Save changes</button>
            </div>
          </form>

          <h1 className="text-left text-2xl text-black mt-16 dark:text-white font-black ">Change Theme</h1>
          <div className="flex justify-start">
            <button onClick={useDarkMode} className="focus:outline-none w-auto px-3 mt-2 bg-light-flair dark:bg-dark-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Switch</button>
          </div>

          <h1 className="text-left text-2xl text-black mt-16 dark:text-white font-black ">Change Password</h1>
          <form onSubmit={changePassword} className='mt-4'>
            <div className="flex flex-col">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Password*</label>
              <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">New password*</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Re-enter new password*</label>
              <input type="password" value={reNewPassword} onChange={e => setReNewPassword(e.target.value)} className="h-10 md:w-1/2 w-full rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex justify-start mt-2">
              <button className=" focus:outline-none md:w-auto w-full px-4 mt-2 bg-light-flair dark:bg-dark-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Change password</button>
            </div>
          </form>

          <h1 className="text-left text-2xl text-black mt-16 dark:text-white font-black ">Logout</h1>
          <div className="flex justify-start">
            <button onClick={clickedLogout} className=" focus:outline-none w-auto px-4 mt-2 bg-red-500 dark:bg-red-500 py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Logout</button>
          </div>
        </section>
      </div>
    </section>
  )
}

export default SettingPage
