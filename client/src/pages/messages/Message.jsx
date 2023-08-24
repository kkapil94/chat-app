import React from 'react'
import ScrollableFeed from "react-scrollable-feed"

export default function Message({messages}) {
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  return (
    <>
          <ScrollableFeed className='px-4 pt-2'>
            {messages&&messages.map((msg)=>(
            <div className={msg.sender._id==userId?"flex justify-end":'flex justify-start'} key={msg._id}>
              <span className={`h-8 p-2 flex items-center justify-center rounded-md mb-1 ${msg.sender._id==userId?'bg-[#9db2bf]':"bg-white"}`}>{msg.content}</span>
            </div>
        ))}
        </ScrollableFeed>
    </>
  )
}
