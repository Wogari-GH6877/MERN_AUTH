import React from 'react'
import {useNavigate} from "react-router-dom"
import {assets} from "../assets/assets.js"
import { useContext } from 'react';
import { AppContext } from '../Context/appContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
function NavBar() {

 const navigate = useNavigate();
  const {userData,BackendUrl,setUserData,setIsLoggedin}=useContext(AppContext);

  const sendVerficationOtp= async ()=>{
            try {
                axios.defaults.withCredentials=true;
    
                const {data}= await axios.post(BackendUrl + "/api/auth/send-verify-otp");
    
                if(data.success){
                    navigate("/verify-email");

                    toast.success(data.message);
                }else{
                  toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        }

    const logout = async()=>{
      try {
        
        axios.defaults.withCredentials=true;
        const {data}= await axios.post(BackendUrl + "/api/auth/logout");

        data.success && setIsLoggedin(false);
        data.success && setUserData(false);
        navigate("/");

      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  return (
    <div className='w-full flex justify-between p-4 sm:px-24 sm:p-6 absolute top-0'>
        <div className='cursor-pointer'>
            <img src={assets.logo} alt="Logo" />
        </div>
        {userData ?
        <div className='w-8 h-8 flex justify-center items-center rounded-full
        bg-black text-white relative group'>
          {userData.name[0].toUpperCase()}

          <div className=' absolute hidden group-hover:block top-0 right-0 z-10 text-black
          rounded pt-10 '>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && <li onClick={sendVerficationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
              <li onClick={logout}className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-20'>Logout</li>
            </ul>



          </div>
        </div>:
        <div className='flex px-5 gap-2 border rounded-full items-center cursor-pointer hover:bg-gray-100'>
            <button onClick={()=>navigate("/login")}>Login</button>
            <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
        </div>}
    </div>
  )
  
}

export default NavBar