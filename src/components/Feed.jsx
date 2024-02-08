'use client'
import React from 'react'
import Compose from './Compose'
import Blogs from './Blogs'

export default function Feed() {
  return (
    <div className="max-w-6xl mx-auto"> 
      <Compose /> 
      <Blogs />
    </div>
  )
}
