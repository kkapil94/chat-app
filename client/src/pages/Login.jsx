import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
export default function Login() {
  const navigate = useNavigate()
  const [logData,setLogData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    setLogData({...logData,[e.target.id]:e.target.value})
  }
  const notify = (msg)=>{toast(msg)}
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      const {data} =await axios.post("/api/v1/auth/login",logData)
      if(data.success) {
        localStorage.setItem("user",JSON.stringify(data))
        notify("Login successfully");
        navigate("/")
      }
    }catch(err){console.log(err);}
  }
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
        <div className="flex h-4/5 w-4/5 items-center justify-center border-2 border-gray-400 rounded-3xl">
          <div className="w-1/2">
            <img src="/img/hero.svg" />
          </div>
          <div className="w-1/2 backdrop:blur-3xl flex flex-col justify-center space-y-8 h-full pl-12">
            <h1 className="text-4xl text-white">Welcome!</h1>
            <div>
              <form className="flex flex-col h-full space-y-9" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-around h-[10rem]">
                  <div>
                    <label htmlFor="email" className="text-md text-white block">
                      Username
                    </label>
                    <input
                    id="email"
                      type="text"
                      required
                      value={logData.username}
                      onChange={handleChange}
                      className="w-3/5 rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-md text-white block">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={logData.password}
                      onChange={handleChange}
                      className="w-3/5 rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                </div >
                <div>
                <button type="submit" className="text-[#4aa0a1] h-8 bg-white w-3/5 rounded-2xl mb-1">SignIn</button>
                <Link to ="/register" className="text-sm text-white ml-auto block w-4/5">Don't have an account?SignUp.</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
