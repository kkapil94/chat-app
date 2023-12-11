import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"
import { useDispatch } from "react-redux";
import { clearErrors } from "../actions/chatsActions";
import Loader from "../components/Loader";
export default function Login() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const user = localStorage.getItem("user")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false);
  const [logData,setLogData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    setLogData({...logData,[e.target.id]:e.target.value})
  }
  const notify = toast
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      dispatch(clearErrors())
      setLoading(true)
      const {data} =await axios.post(`${baseUrl}/api/v1/auth/login`,logData)
      if(data.success) {
        setLoading(false)
        localStorage.setItem("user",JSON.stringify(data))
        notify.success("Logged In successfully");
        navigate("/")
      }
    }catch(err){
      setLoading(false)
      notify.error("Login failed!")
      console.log(err);}
  }
  useEffect(()=>{
    if (user) {
      navigate("/")
    }
  })
  return (
    <>{loading&&<Loader/>}
      <div className="min-h-screen w-screen xs:max-sm:p-2 sm:max-md:p-8 flex items-center justify-center bg-gray-900 flex-col">
        <span>Whatsapp</span>
        <div className="flex xs:max-md:flex-col min-h-[80vh] xs:max-sm:w-full xs:max-md:w-11/12 w-4/5 items-center justify-center border-2  border-gray-400 rounded-3xl">
          <div className="w-1/2 xs:max-md:w-full xs:max-md:mb-8 h-full flex justify-center items-center xs:max-md:mt-8">
            <img src="/img/whats.png" className="w-80 xs:max-md:w-40 object-cover"/>
          </div>
          <div className="w-1/2 xs:max-md:w-full backdrop:blur-3xl flex flex-col justify-center space-y-8 h-full xs:max-lg:p-0 pl-12 xs:max-md:mb-8">
            <h1 className="text-4xl text-white xs:max-md:text-center">Welcome!</h1>
            <div>
              <form className="flex flex-col h-full xs:max-lg:w-full xs:max-md:items-center  space-y-9" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-around xs:max-md:items-center h-[10rem] w-full">
                  <div className="xs:max-md:w-4/5">
                    <label htmlFor="email" className="text-md text-white block">
                      Username
                    </label>
                    <input
                    id="email"
                      type="text"
                      required
                      value={logData.username}
                      onChange={handleChange}
                      className="w-3/5 md:max-lg:w-4/5 xs:max-md:w-full rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div className="xs:max-md:w-4/5">
                    <label htmlFor="password" className="text-md text-white block">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={logData.password}
                      onChange={handleChange}
                      className="w-3/5 md:max-lg:w-4/5 xs:max-md:w-full rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                </div >
                <div className="xs:max-md:w-4/5 ">
                <button type="submit" className="text-green-500 font-semibold h-8 bg-white md:max-lg:w-4/5 xs:max-md:w-full w-3/5 rounded-2xl mb-1">SignIn</button>
                <Link to ="/register" className="text-sm flex md:max-lg:w-4/5 justify-end w-3/5 xs:max-md:text-xs xs:max-md:w-full text-white">Don't have an account?SignUp.</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
