import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TypeSpace from './TypeSpace';
import EditGroup from '../group/EditGroup';

export default function PersonChat() {
    const [menu,setMenu] = useState(false);
    const [groupInfo,setGroupInfo] = useState(false)
    const menuRef = useRef();
    const selectedChat = useSelector(state=>state.chats.selectedChat)
    console.log(selectedChat);
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
      {selectedChat?<div className={!groupInfo?'h-full w-full':"h-full w-[40vw] border-solid border-r-[1px] border-gray-500"}>
        <div className='h-[3.8rem] w-full flex items-center justify-between bg-[#9DB2BF]'>
          <div className='flex ml-4 space-x-4'>
            <div className='h-4/5 w-10 rounded-full'>
              <img src={!selectedChat.isGroupChat?selectedChat.avatar:selectedChat.groupAvatar} alt="" className='h-full w-full rounded-full'/>
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
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={()=>{setGroupInfo(true);setMenu(0)}}>Group Info</li>
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10">Exit Group</li>
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
        {groupInfo&&<div className='h-full'>
          <EditGroup selectedChat={selectedChat} groupInfo={()=>setGroupInfo(!groupInfo)}/>
        </div>}
        </div>
      </div>
    </>
  )
}
