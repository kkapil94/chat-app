import React, {useState } from "react";
import Chats2 from "./Chats2";
import {useNavigate} from "react-router-dom"

export default function Chats({chats}) {
  const [newChat,setNewChat] = useState(false);
  const navigate = useNavigate()
  const [menu,setMenu] = useState("hidden")
  const toggleChat = ()=>{
    setNewChat(false)
  }
  const logout = ()=>{
    localStorage.removeItem("user");
    navigate("/login")
  }
  
  const onClickMenu = ()=>{
    if(menu === "hidden" ){
      setMenu("absolute bg-slate-500 right-8 top-14 min-h-20 w-[12rem] py-4 ")
    }else{
      setMenu("hidden")
    }
  }
  return (
    <>
      {!newChat?(<div id="chats" className="bg-[#27374D] w-[30%] h-screen">
        <div className="h-[3.8rem] bg-[#9DB2BF] flex items-center justify-between sticky top-0">
          <div id="avatar">
            <img
              src="/img/avatar.png"
              alt=""
              className="h-4/5 w-10 rounded-full ml-4"
            />
          </div>
          <div className="flex w-1/2 justify-end space-x-5 mr-5">
            <div>
              <img src="/img/chat.png" alt="" className="h-[1.5rem] w-6 cursor-pointer" onClick={()=>setNewChat(true)}/>
            </div>
            <div>
              <img src="/img/more.png" alt="" className="h-[1.5rem] w-6 cursor-pointer" onClick={onClickMenu}/>
            </div>
            <div className={menu} >
              <ul className="space-y-2">
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10">New Group</li>
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={logout}>LogOut</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[inherit] overflow-auto">
          {chats&&chats.map((chat)=>(
            <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-slate-600 cursor-pointer" key={chat._id}>
            <div>
              <img src={chat.users[1].avatar} alt="" className="h-12 w-12 rounded-full m-3 object-contain"/>
            </div>
            <div className="border-solid border-b-[1px] border-stone-500 w-[83%] h-full text-white flex items-center">
              <span>{chat.chatName}</span>
            </div>
          </div>
          ))
          }
        </div>
      </div>):<Chats2 toggleChat={()=>toggleChat()}/>}
    </>
  );
}
