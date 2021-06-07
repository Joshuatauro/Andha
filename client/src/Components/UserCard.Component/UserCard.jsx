import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const UserCard  = () => {
  const { username } = useParams()

  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    const getUserDetails = async() => {
      const {data} = await axios.get(`/api/users${username}`, { withCredentials: true })
      console.log(data)
    }

    getUserDetails()

  }, [])
  return (
    <article>
      
    </article>
  )
}

export default UserCard
