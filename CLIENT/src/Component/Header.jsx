import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { AppContext } from '../Context/appContext.jsx'
function Header() {
  const {userData}=useContext(AppContext);
  return (
    <div className='w-full flex flex-col justify-center items-center gap-3'>
        <img className="w-36 h-36 rounded-full mb-6 mt-40"src={assets.header_img} alt="" />
        <div className='flex  flex-col justify-center items-center gap-2'>
            <h2 className='flex text-2xl'>
             Hey {userData && userData.name ? userData.name : "Programmer"}!
              <img className="w-7" src={assets.hand_wave} alt="" />
            </h2>
            <h1 className='text-4xl sm:text-5xl font-semibold mb-4'>WELL COME TO MY APP</h1>
            <p className='mb-8 max-w-md'>Let's Start With Quick Product Tour And We Will Have You Up And Runnig On Time</p>
        </div>
        <button className='border border-gray-500 rounded-full px-3 py-2 hover:bg-gray-100 transparent-all'>Get Started</button>
    </div>
  )
}

export default Header