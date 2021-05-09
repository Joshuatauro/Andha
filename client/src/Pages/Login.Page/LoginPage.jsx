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
      <div className="grid grid-cols-3 h-screen">
        <div className=" col-span-2" style={{
          "background-color": "#3b49df",
          "background-image": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%23203f8f' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%23274dad' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%23203f8f' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%23274dad' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%232e5acc' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%2320328f' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%23273dad' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%232e48cc' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%23273dad' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%2320328f' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%232e48cc' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%2320328f' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%232e48cc' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%23273dad' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%232e48cc' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E")`
        }}>
          <div className=" w-10/12 m-auto flex flex-col justify-center h-full sticky z-10">
            <h1 className="text-white flex text-left font-black text-5xl w-full leading-none">
              Get news related to the corporate industry on your fingertips.
            </h1>
            
          </div> 
        </div>
      </div>
    </section>
  )
}

export default LoginPage
