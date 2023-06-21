import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Session() {
    const navigate = useNavigate()
  return (
    <>
        <div className='w-screen h-screen flex items-center justify-center bg-slate-600 '>
            <div className='h-[15rem] w-[20rem] bg-slate-200 rounded-md flex items-center justify-center flex-col'>
                <div>
                    <img src="./img/session.png" alt="" className='h-20 w-20'/>
                </div>
                <div className='w-full p-5'>
                    <span>Your session is expired! Please login to continue.</span>
                </div>
                <button onClick={()=>{navigate("/login")}} className='bg-green-600 rounded-md text-slate-200 w-16 p-2'>Login</button>
            </div>
        </div>
    </>
  )
}
