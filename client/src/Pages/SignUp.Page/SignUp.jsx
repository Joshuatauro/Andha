import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../State/AuthContext'
import { useToast } from '@chakra-ui/toast'


const SignUpPage = () => {
  const history = useHistory()
  const toast = useToast()
  const { signup } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [rePassword, setRePassword] = useState('')

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
      }
    }

  }


  return (
    <section className="w-full font-noto">
      <div className="grid grid-cols-3 max-h-screen relative">
      <div className=" col-span-2" style={{
          backgroundColor: "#303067",
          backgroundImage:  "linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777)",
          backgroundSize: "48px 84px",
          backgroundPosition: "0 0, 0 0, 24px 42px, 24px 42px, 0 0, 24px 42px",
        }} />
        <div className="h-screen flex justify-center items-center" style={{"backgroundColor": "#303067"}}>
          <div className=" w-9/12 m-auto ">
            <h2 className="text-3xl text-left font-black text-white">Sign Up</h2>
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
              <button type="submit" className=" focus:outline-none w-full mt-5 py-2 rounded-md duration-300 text-white hover:bg-opacity-90" style={{backgroundColor: "#454DF8"}}>Submit</button>
              <p className="text-left text-xs mt-1 text-white">Already have an account? <Link to="/login" className="text-blue-500" style={{color: "#454DF8"}}> here</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
