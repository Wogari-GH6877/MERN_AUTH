import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AppContext=createContext();



export const AppContextProvider=(props)=>{
    
    axios.defaults.withCredentials=true;
    const BackendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setIsLoggedin]=useState(false);
    const [userData,setUserData] = useState(false);

    const getAuthState = async () =>{
        try {
            const {data} = await axios.get(BackendUrl + "/api/auth/is-auth");
            
            if(data.success){
                setIsLoggedin(true);
                getUserData();
            }
        } 
         catch (error) {
            
               if (error.response?.status !== 401) {
                  toast.error(error.response?.data?.message || error.message);
            // } else {
            //     setIsLoggedin(false);
    }
        }
    }

        
    


    const getUserData= async()=>{

        try {
            const {data}=await axios.get(BackendUrl + "/api/user/data");
            data.success?setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            if(error.response?.status!==401){
            toast.error(error.response?.data?.message || error.message);}
        }
    }

    

    const value={
        BackendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,getUserData
    }

    useEffect(()=>{
        getAuthState();
    },[]);

    return (
        <AppContext.Provider value={value}>

            {props.children}

        </AppContext.Provider>
    )
}

