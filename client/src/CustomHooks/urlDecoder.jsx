import React from 'react'
import Linkify from 'react-linkify';


export default function urlDecoder(text){
  return <Linkify>{text}</Linkify>
}