import React from 'react'

export default function Chats2({toggleChat}) {
  return (
    <>
        {<div id="chats" className="bg-[#27374D] w-[30%]">
        <div className="sticky top-0 pb-4">
            <div className='flex items-end h-24 bg-[#9DB2BF]'>
                <button><img src="./img/back.png" alt="" className='h-3/5 w-6 ml-4 mb-2' onClick={()=>toggleChat()}/></button>
                <h1 className='ml-4 font-semibold text-lg mb-2'>New Chat</h1>
            </div>
            <div className='w-full flex justify-center '>
                <button className='inline-block mb-4'><img src="./img/search.png" alt="" className='absolute h-6 w-6 ml-2'/></button>
                <input type="text" placeholder='Search Contacts' className='w-11/12 mt-2 rounded-md pl-12 h-8 outline-none'/>
            </div>
        </div>
        <div className='flex items-center w-full h-16 p-4 hover:bg-slate-600'>
          <div className='border-solid border-[1px] rounded-full mr-4 p-2'>
            <img src="./img/groups.png" alt="" className='h-8 w-8 '/>
          </div>
          <div className='w-4/5'>
            <span className='text-lg w-11/12 inline-block'>New Group</span>
          </div>
        </div>
        <div className='w-full'>
          <div className='h-[1px] bg-slate-600 ml-20'></div>
        </div>
        {/* <div>
          {chats&&chats.map((chat)=>(
            <div className="flex items-center justify-start max-w-full h-[4rem]" key={chat._id}>
            <div>
              <img src={chat.users[1].avatar} alt="" className="h-10 w-10 rounded-full m-3"/>
            </div>
            <div className="border-solid border-b-[1px] border-stone-500 w-[83%] h-full text-white flex items-center">
              <span>{chat.chatName}</span>
            </div>
          </div>
          ))
          }
        </div> */}
      </div>}
    </>
  )
}
