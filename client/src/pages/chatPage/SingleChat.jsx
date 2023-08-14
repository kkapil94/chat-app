import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TypeSpace from './TypeSpace';
import ChatInfo from '../group/ChatInfo';
import { getChats, selectChat } from '../../actions/chatsActions';
import axios from 'axios';

export default function SingleChat() {
    const [menu,setMenu] = useState(false);
    const [chatInfo,setChatInfo] = useState(false)
    const selectedChat = useSelector(state=>state.chats.selectedChat)
    const menuRef = useRef();
    const {token} = JSON.parse(localStorage.getItem("user"));
    const func = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setMenu(false);
      }
    }
    useEffect(() => {
      document.addEventListener("mousedown",func)
      return () => {
        document.removeEventListener("mousedown",func)
      }
    })
  return (
    <>
    <div className='flex h-full'>
      {selectedChat?<div className={!chatInfo?'h-full w-full':"h-full w-[40vw] border-solid border-r-[1px] border-gray-500"}>
        <div className='h-[3.8rem] w-full flex items-center justify-between bg-[#9DB2BF]'>
          <div className='flex ml-4 space-x-2'>
            <div>
              <img src={selectedChat.chatAvatar} alt="" className='h-10 w-10 rounded-full m-1 object-contain'/>
            </div>
            <div className='flex items-center'>
              <span>{selectedChat.chatName}</span>
            </div>
          </div>
          <div className='relative'>
              <div  className={menu?"bg-[#979ba3] rounded-full w-10 h-10 flex items-center justify-center m-4":"rounded-full w-10 h-10 flex items-center justify-center m-4"}>
                <img ref={menuRef} src="/img/more.png" alt="" className="h-[1.5rem] w-6 cursor-pointer " onClick={()=>setMenu(!menu)}/>
              </div>
              <div ref={menuRef} className={menu?"absolute bg-slate-500 right-8 top-14 min-h-20 w-[12rem] py-4":"hidden"} >
              <ul className="space-y-2">
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={()=>{setChatInfo(true);setMenu(0)}}>Chat Info</li>
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={()=>removeMember(selectedChat._id)}>Delete Chat</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='sticky top-full w-full'>
          <TypeSpace/>
        </div>
      </div>:<div className='h-full w-full flex items-center justify-center text-xl text-slate-200 font-bold'>
        <span>Select a chat to start a new converstaion!</span>
        </div>}
        <div className='h-full'>
        {chatInfo&&<div className='h-full'>
          <ChatInfo chat={selectedChat} chatInfo={()=>setChatInfo(!chatInfo)}/>
        </div>}
        </div>
      </div>
    </>
  )
}
