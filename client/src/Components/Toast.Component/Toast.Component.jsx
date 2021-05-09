import React, { useEffect, useState } from 'react'

const Toast = (title, body, type, time) => {
  const [show,setShow] = useState(false)
  
  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }, [])

  return(
    <div className={`w-72  py-3 rounded-md bg-red-500 fixed left-1/2 -ml-36 bottom-5 ${show ? '' : "hidden"}`}>
      Helo world
    </div>
  )
}

export default Toast