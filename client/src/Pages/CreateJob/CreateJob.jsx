import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Select } from "@chakra-ui/react"
import { useHistory } from 'react-router'
import { AuthContext } from '../../State/AuthContext'

const CreateJob = () => {
  const {loggedIn} = useContext(AuthContext)

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [location, setLocation] = useState('')
  const [applyURL, setApplyURL] = useState('')
  const [company, setCompany] = useState('')


    //will reroute user to previous page if he/she is not signed in
    useEffect(() => {
      if(!loggedIn) {
        history.push('/login')
      }
    }, [])
    
    const addPost = async(e) => {
      e.preventDefault()
      try {
        const { data } = await axios.post('/api/jobs/add', 
          {
            title, location, applyURL, keywords, company
          }, 
          {withCredentials: true}
        )

        if(data){
          history.push(`/hiring`)
        }
      } catch(err) {

      }
    }

  return (
    <section className="dark:bg-dark-primary  transition-all flex justify-center items-center font-noto duration-500 w-full min-h-screen h-full bg-white-bg">
      <div className="w-11/12 m-auto my-3 dark:bg-dark-post bg-white duration-500 transition-all py-8 px-4 rounded-md">
        <form onSubmit={addPost} className=" flex w-full py-2 md:pt-4 flex-col pb-5 dark:border-dark-flair ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col text-left">
                <label  className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Job Title*</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
            </div>
            <div className="flex flex-col text-left ">
              <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Your company*</label>
              <input value={company} onChange={e => setCompany(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3 md:my-2">
            <div className="flex flex-col text-left">
                <label  className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Job Location*</label>
                <input value={location} onChange={e => setLocation(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
            </div>
            <div className="flex flex-col text-left ">
              <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Apply URL*</label>
              <input value={applyURL} onChange={e => setApplyURL(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
            </div>
          </div>
          <div className="flex w-full flex-col mt-3 mb-2 text-left">
            <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Keywords* ({keywords.length}/100)</label>
            <textarea maxLength="100" value={keywords} onChange={e => setKeywords(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-56 bg-transparent dark:border-gray-700 hover:ring-green-flair resize-y border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
          </div>
          <button type="submit" className=" focus:outline-none w-full mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default CreateJob