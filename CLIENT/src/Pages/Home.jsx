import React from 'react'
import Header from "../Component/Header"
import NavBar from '../Component/NavBar'
function Home() {
  return (
    <div className=' items-center min-h-screen justify-center bg-[url("/bg_img.png")] bg-cover bg-center'>
        <NavBar />
        <Header />
    </div>
  )
}

export default Home