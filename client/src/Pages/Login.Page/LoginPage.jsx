import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../State/AuthContext'
import { useToast } from '@chakra-ui/toast'


const LoginPage = () => {
  const history = useHistory()
  const toast = useToast()
  const { login } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logInUser = async(e) => {
    e.preventDefault()
    const reRouteUser = await login(username, password)

    if(reRouteUser){
      toast(
        {
          title: "Login successful",
          description: "Hey there, welcome to Jobify",
          status: "success",
          duration: 3000,
          isClosable: true,
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
        }
      )
    }
  }


  return (
    <section className="w-full font-noto">
      <div className="grid grid-cols-2 max-h-screen relative">
        <img src="./watch.png" alt="" className="h-screen object-cover w-full" />
        <div className="h-screen flex justify-center items-center" style={{backgroundColor: "#413E51"}}>
          <div className=" w-9/12 m-auto ">
            <h2 className="text-3xl text-left font-black" style={{color: "#55C9FF"}}>Login</h2>
            <form onSubmit={logInUser} className="mt-7">
              <div className="flex flex-col">
                <label  className="text-xs text-gray-100 font-bold pl-2 pb-1 text-left ">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className=" text-sm flex-g px-3 py-2 text-white h-10 bg-transparent border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 font-semibold " />
              </div>
              <div className="flex flex-col mt-3">
                <label  className="text-xs text-gray-100 font-bold pl-2 pb-1 text-left ">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className=" text-md flex-g px-3 py-2 text-white h-10 bg-transparent border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 " />
              </div>
              <button type="submit" className=" focus:outline-none w-full mt-5 py-2 rounded-md duration-300 text-white hover:bg-opacity-90" style={{backgroundColor: "#2EC2F1"}}>Submit</button>
              <p className="text-left text-xs mt-1 text-white">New here? Create an account <Link to="/signup" className="text-blue-500" style={{color: "#2EC2F1"}}> here</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
