import React from 'react'
import { useSelector } from 'react-redux'
import TypeSpace from './TypeSpace';

export default function PersonChat() {
    const selectedChat = useSelector(state=>state.chats.selectedChat)
    console.log(selectedChat);
  return (
    <>
      {selectedChat?<div className='h-full w-full'>
        <div className='h-[3.8rem] w-full flex items-center  bg-[#9DB2BF]'>
          <div className='flex ml-4 space-x-4'>
            <div className='h-4/5 w-10 rounded-full'>
              <img src={!selectedChat.isGroupChat?selectedChat.avatar:selectedChat.groupAvatar} alt="" className='h-full w-full rounded-full'/>
            </div>
            <div className='flex items-center'>
              <span>{selectedChat.chatName}</span>
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 w-[70%]'>
          <TypeSpace/>
        </div>
      </div>:<div className='h-full w-full flex items-center justify-center text-xl text-slate-200 font-bold'>
        <span>Select a chat to start a new converstaion!</span>
        </div>}
    </>
  )
}
