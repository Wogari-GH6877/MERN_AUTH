import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets.js';
import { AppContext } from '../Context/appContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';



function Login() {


  const {BackendUrl,setIsLoggedin,getUserData}=useContext(AppContext);

  const navigate=useNavigate();

  const [state,setState]=useState("Sign Up");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  

  const onSubmitHandler=async(e)=>{
    try {
        e.preventDefault();
        axios.defaults.withCredentials=true;

        if(state==="Sign Up"){
            if (!BackendUrl) {
            toast.error("Backend URL is not defined.");
            return;
          }
          if (!name || !email || !password) {
            toast.error("Please fills all fields.");
            return;
          }
            const  {data}=await axios.post(BackendUrl + "/api/auth/register",{name,email,password})

            if(data.success){
                setIsLoggedin(true);
                getUserData();
                navigate("/")
                toast.success(data.message)

            }else{
              toast.error(data.message)
            }
        }
        else{
            const  {data}=await axios.post(BackendUrl + "/api/auth/login",{email,password})

            if(data.success){
                setIsLoggedin(true);
                getUserData();
                navigate("/")
                
        }else{
          toast.error(data.message);
        }

    }} catch (error) {
       
         toast.error(error.response?.data?.message || error.message);

    }}
  
    return (
     <div className='flex justify-center items-center min-h-screen px-6 sm:px-0
    bg-gradient-to-br from-blue-350 to-purple-500'>
        <img onClick={()=>navigate("/")}src={assets.logo} alt="" className='absolute top-5 left-5 sm:left-20
        w-28 sm:w-32 cursor-pointer'/>
        <div className='flex flex-col items-center bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
        text-indigo-300 text-sm'>
          <h2 className='text-3xl text-white mb-3 font-semibolds'>{state=== "Sign Up"? "Create Account":"Login"}</h2>
          <p className='text-sm mb-6'>{state==="Sign Up" ? "Create Your Account": "Login To Your Account!"}</p>
          <form onSubmit={onSubmitHandler}>

            {state==="Sign Up" &&
             (<div className='flex items-center mb-4 py-3 px-5 bg-[#3B3635] rounded-full gap-3 w-full text-white'>
                <img src={assets.person_icon} alt="" />
                <input onChange={e=> setName(e.target.value)} 
                value={name} type="text" placeholder="Full Name" required className='bg-transparent outline-none'/>
          </div>)}
          

          <div className='flex items-center mb-4 py-3 px-5 bg-[#3B3635] rounded-full gap-3 w-full text-white'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={e=> setEmail(e.target.value)} 
                value={email}type="email" placeholder="Email" required className='bg-transparent outline-none'/>
          </div>

          <div className='flex items-center mb-4 py-3 px-5 bg-[#3B3635] rounded-full gap-3 w-full text-white'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={e=> setPassword(e.target.value)} 
                value={password}
            type="password" placeholder="PassWord" required className='bg-transparent outline-none'/>
          </div>
          <p onClick={()=>navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>
          <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-2.5 rounded-full font-medium text-white cursor-pointer'>{state}</button>
        </form>

        {state==="Sign Up" ? (<p className='text-gray-400 mt-4 text-center text-xs'>Already have an account?{" "} 
          <span onClick={()=>setState("Login")}className='text-blue-400 cursor-pointer underline'>Login here</span></p>
             ):(<p className='text-gray-400 mt-4 text-center text-xs'>Do Not  have an account?{" "} <span onClick={()=>setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign Up here</span></p>
)}


        </div>
        
    </div>
  )
}


export default Login