import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../State/AuthContext'
import { useToast } from '@chakra-ui/toast'
import { ImSpinner2 } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
const SignUpPage = () => {
  const history = useHistory()
  const toast = useToast()
  const { signup } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [fetching, setFetching] = useState(false)

  const logInUser = async(e) => {
    e.preventDefault()
    if(password !== rePassword){
      toast(
        {
          title: "Could not create account",
          description: "Please make sure both entered passwords are correct",
          status: "error",
          duration: 300000,
          isClosable: true,
          position: "bottom-right"
        }
      )
    }else {
      setFetching(true)
      const reRouteUser = await signup(email, password,username)
      if(reRouteUser){
        toast(
          {
            title: "Login successful",
            description: "Hey there, welcome to Jobify",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right"
          }
        )
        setFetching(false)
        history.push('/')
      }
      else {
        toast(
          {
            title: "Login failed",
            description: "Entered credentials are wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right"
          }
        )
        setFetching(false)
      }
    }

  }


  return (
    <section className="w-full font-noto">
      <div className="grid md:grid-cols-3 max-h-screen relative">
      <div className=" hidden md:block col-span-2" style={{
          backgroundColor: "#303067",
          backgroundImage:  "linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777)",
          backgroundSize: "48px 84px",
          backgroundPosition: "0 0, 0 0, 24px 42px, 24px 42px, 0 0, 24px 42px",
        }} />
        <div className="min-h-screen flex justify-center items-center" style={{"backgroundColor": "#303067"}}>
          <div className=" w-9/12 m-auto ">
            <div className="flex  h-full ">
              <Link to="/" className="bg-green-flair px-3 mr-2 rounded-sm flex items-center">
                <AiFillHome className="text-white" />
              </Link>
              <h2 className="text-3xl text-left font-black text-white">Sign Up</h2>
            </div>
            <form onSubmit={logInUser} className="mt-7">
            <div className="flex flex-col">
                <label  className="text-xs text-gray-100 font-bold pl-2 pb-1 text-left ">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className=" text-sm flex-g px-3 py-2 text-white h-10 bg-transparent border-gray-400 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 font-semibold " />
              </div>
              <div className="flex flex-col mt-3">
                <label  className="text-xs text-gray-100 font-bold pl-2 pb-1 text-left ">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className=" text-sm flex-g px-3 py-2 text-white h-10 bg-transparent border-gray-400 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 font-semibold " />
              </div>
              <div className="flex flex-col mt-3">
                <label  className="text-xs text-gray-100 font-bold pl-2 pb-1 text-left ">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className=" text-sm flex-g px-3 py-2 text-white h-10 bg-transparent border-gray-400 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 font-semibold " />
              </div>
              <div className="flex flex-col mt-3">
                <label  className="text-xs text-gray-100 font-bold pl-2 pb-1 text-left ">Re enter Password</label>
                <input type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} className=" text-sm flex-g px-3 py-2 text-white h-10 bg-transparent border-gray-400 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 " />
              </div>
              <button type="submit" className=" focus:outline-none flex items-center justify-center w-full mt-5 py-2 rounded-md duration-300 text-white hover:bg-opacity-90" style={{backgroundColor: "#454DF8"}}>
              {
                  fetching ? (
                    <>
                      <ImSpinner2 className="text-white animate-spin mr-2" />
                      Submitting
                    </>
                  ) : "Submit"
                }
              </button>
              <p className="text-left text-xs mt-1 text-white">Already have an account? <Link to="/login" className="text-blue-500" style={{color: "#454DF8"}}> here</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
