"use client"
import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    location.href = "https://youtu.be/dQw4w9WgXcQ"
  }, [])
  return (
    <div>page</div>
  )
}

export default page