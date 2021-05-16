import React, { useEffect } from 'react'

export default function GetUserPreference(){
  useEffect(() => {
    const userPreference = localStorage.getItem('theme')

    const root = window.document.documentElement


    if(userPreference === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  },[])
}