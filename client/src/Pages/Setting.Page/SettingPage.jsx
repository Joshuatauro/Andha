import React, { useState, useEffect } from 'react'
import axios from 'axios'
import  useDarkMode from '../../CustomHooks/useDarkMode'

const SettingPage = () => {

  //PROFILE STATE
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')

  //CHANGE PASSWORD STATE
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')

  return (
    <section className="dark:bg-dark-primary font-noto w-full min-h-screen pt-7 pb-16 transition-all duration-500 bg-white-bg">
      <div className="dark:bg-dark-post w-11/12 m-auto h-full rounded-xl py-6  transition-all duration-500 bg-white">
        <section className="m-auto w-11/12">
          <h1 className="text-left text-2xl text-black dark:text-white font-black ">Profile</h1>
          <form action="" className='mt-4'>
            <div className="flex flex-col">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Bio</label>
              <textarea type="text" value={bio} onChange={e => setBio(e.target.value)} className=" pt-2 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium h-36" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Portfolio URL</label>
              <input type="text" value={portfolio} onChange={e => setPortfolio(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">LinkedIn URL</label>
              <input type="text" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Company</label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Job Title</label>
              <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex justify-start mt-2">
              <button className=" focus:outline-none w-1/5 mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Save changes</button>
            </div>
          </form>

          <h1 className="text-left text-2xl text-black mt-16 dark:text-white font-black ">Change Theme</h1>
          <div className="flex justify-start">
            <button onClick={useDarkMode} className="focus:outline-none w-auto px-3 mt-2 bg-light-flair dark:bg-dark-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Switch</button>
          </div>

          <h1 className="text-left text-2xl text-black mt-16 dark:text-white font-black ">Change Password</h1>
          <form action="" className='mt-4'>
            <div className="flex flex-col">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Password*</label>
              <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">New password*</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="" className="text-left text-black dark:text-white text-sm font-medium ">Re-enter new password*</label>
              <input type="password" value={reNewPassword} onChange={e => setReNewPassword(e.target.value)} className="h-10 w-1/2 rounded-md outline-none px-2 bg-transparent border border-dark-flair dark:text-white font-medium" />
            </div>
            <div className="flex justify-start mt-2">
              <button className=" focus:outline-none w-auto px-4 mt-2 bg-light-flair dark:bg-dark-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Change password</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  )
}

export default SettingPage
