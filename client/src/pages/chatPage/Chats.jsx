import React, {useRef, useState, useEffect } from "react";
import Chats2 from "./Chats2";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { selectChat } from "../../actions/chatsActions";

export default function Chats({chats}) {
  const [newChat,setNewChat] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [menu,setMenu] = useState(false)
  const [toggleGroup,setToggleGroup]=useState(false)
  const toggleChat = ()=>{
    setNewChat(false)
    setToggleGroup(false)
  }
  const logout = ()=>{
    localStorage.removeItem("user");
    navigate("/login")
  }
  const newGroup =  ()=>{
    setMenu(false)
    setNewChat(true)
    setToggleGroup(true);
  }
  const menuRef = useRef();
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
      {!newChat?(<div id="chats" className="bg-[#27374D] w-[30%] h-screen border-r-[1px] border-solid border-gray-500 ">
        <div className="h-[3.8rem] bg-[#9DB2BF] flex items-center justify-between sticky top-0">
          <div id="avatar">
            <img
              src="/img/avatar.png"
              alt=""
              className="h-4/5 w-10 rounded-full ml-4"
            />
          </div>
          <div className="flex w-1/2 justify-end space-x-3 mr-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center active:bg-[#979ba3]">
              <img src="/img/chat.png" alt="" className="h-[1.5rem] w-6 cursor-pointer" onClick={()=>setNewChat(true)}/>
            </div>
            <div ref={menuRef} className={menu?"bg-[#979ba3] rounded-full w-10 h-10 flex items-center justify-center":"rounded-full w-10 h-10 flex items-center justify-center"}>
              <img src="/img/more.png" alt="" className="h-[1.5rem] w-6 cursor-pointer" onClick={()=>setMenu(!menu)}/>
            </div>
            <div ref={menuRef} className={menu?"absolute bg-slate-500 right-8 top-14 min-h-20 w-[12rem] py-4":"hidden"} >
              <ul className="space-y-2">
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={newGroup}>New Group</li>
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={logout}>LogOut</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-3.8rem)] overflow-auto">
          {chats&&chats.map((chat)=>(
            <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-slate-600 cursor-pointer" key={chat._id} onClick={()=>dispatch(selectChat(chat))}>
            <div>
              <img src={chat.groupAvatar} alt="" className="h-12 w-12 rounded-full m-3 object-contain"/>
            </div>
            <div className="border-solid border-b-[1px] border-stone-500 w-[83%] h-full text-white flex items-center">
              <span>{chat.chatName}</span>
            </div>
          </div>
          ))
          }
        </div>
      </div>):<Chats2 toggleChat={()=>toggleChat()} directNewGroup={toggleGroup}/>}
    </>
  );
}
