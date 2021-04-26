import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../State/AuthContext'


const LoginPage = () => {
  const history = useHistory()
  const { login } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logInUser = async(e) => {
    e.preventDefault()
    const reRouteUser = await login(username, password)
    if(reRouteUser){
      history.push('/')
    }
  }


  return (
    <section className="w-full font-noto">
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-white-bg  h-full grid-co grid place-items-center" >
          <form className=" w-1/2" onSubmit={logInUser}>
            <h1 className=" text-gray-900 font-black text-2xl text-left">Login</h1>
            <button className="text-white rounded-md outline-none font-noto py-3 justify-center px-4 flex items-center mt-2 w-full bg-blue-special"><FcGoogle size={20} /> 
              <span className="ml-2">
                Login with Google
              </span> 
            </button>
            <h2 className="w-full text-center border-b-2 border-gray-400 my-5 " style={{"lineHeight": ".2em"}}>
              <span className="bg-white-bg text-gray-400 px-3">or</span>
            </h2>
            <span>
              <label className="text-gray-400 text-left text-md flex">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border-2 h-10 rounded-md outline-none px-4 text-sm border-gray-300 focus:border-opacity-75  focus:border-blue-special"/>
            </span>
            <span>
              <label className="text-gray-400 text-left mt-3 flex">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border-2 h-10 rounded-md outline-none px-4  border-gray-300 focus:border-opacity-75  focus:border-blue-special"/>
            </span>

            <button className="w-full mt-3 mb-1.5 py-3 text-white rounded-md bg-blue-special" >Login</button>
            <span className="text-xs">Don't have a account? Click <Link className="text-light-flair underline">here</Link> </span>
          </form>
        </div>
        <div className="bg-blue-special relative">
          <div className="absolute w-96 z-0 -top-20 -left-20">

            <svg  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#5662e9" d="M16.4,9.2C3.6,31.6,-36.5,37.9,-43.8,18.7C-51.1,-0.4,-25.5,-45.1,-5.5,-48.3C14.6,-51.4,29.1,-13.1,16.4,9.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          <svg className="fixed w-96 z-0 -top-10 -right-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#5662e9" d="M28.5,-43.5C40,-42.7,54.4,-41.2,64.1,-33.9C73.7,-26.5,78.7,-13.2,75.2,-2C71.7,9.2,59.8,18.4,47.8,21.8C35.8,25.1,23.6,22.5,15.7,20.1C7.7,17.7,3.8,15.6,-4.2,22.9C-12.3,30.3,-24.7,47.2,-37.9,52.6C-51.2,58,-65.4,52,-68.9,41.3C-72.3,30.6,-65,15.3,-56.5,4.9C-47.9,-5.5,-38.1,-10.9,-31.7,-16.4C-25.2,-21.8,-22,-27.2,-17.3,-32C-12.6,-36.7,-6.3,-40.6,1.1,-42.6C8.5,-44.5,17,-44.4,28.5,-43.5Z" transform="translate(100 100)" />
          </svg>
          <svg className="fixed w-96 z-0 -bottom-14 right-60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#5662e9" d="M32.5,-37.5C47.2,-41.1,67.7,-40.7,78.2,-31.6C88.6,-22.6,89,-4.9,80.8,7.5C72.6,19.8,55.8,26.8,44.5,36.8C33.1,46.7,27.2,59.6,17.5,64.9C7.8,70.1,-5.7,67.7,-19.7,64.6C-33.7,61.6,-48.1,57.9,-52.5,48.1C-56.8,38.3,-50.9,22.4,-45.6,11C-40.4,-0.4,-35.7,-7.3,-31.6,-13.7C-27.6,-20.2,-24.1,-26.2,-19,-27C-13.8,-27.8,-6.9,-23.3,1,-24.8C8.9,-26.4,17.8,-34,32.5,-37.5Z" transform="translate(100 100)" />
          </svg>
          <div className=" w-9/12 m-auto flex flex-col justify-center h-full sticky z-10">
            <h1 className="text-white flex text-left font-black text-4xl w-full">Welcome to the Jobify Community</h1>
            <p className="text-gray-300 text-left m-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quo est ipsam quas recusandae in sint dignissimos, voluptatem dicta cumque earum at a dolore dolor praesentium possimus, incidunt, quisquam explicabo.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
