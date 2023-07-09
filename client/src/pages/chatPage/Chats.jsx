import React, { useEffect, useState } from "react";
import { getChats } from "../../actions/chatsActions";
import { useSelector, useDispatch } from "react-redux";
import Session from "../../components/Session";
import { useNavigate } from "react-router-dom";
import Chats2 from "./Chats2";

export default function Chats({chats}) {
  const [newChat,setNewChat] = useState(false);
  const toggleChat = ()=>{
    setNewChat(false)
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
          <div id="menu" className="flex w-1/2 justify-end space-x-5 mr-5">
            <div>
              <img src="/img/chat.png" alt="" className="h-[1.5rem] w-6 cursor-pointer" onClick={()=>setNewChat(true)}/>
            </div>
            <div>
              <img src="/img/more.png" alt="" className="h-[1.5rem] w-6 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="h-[inherit] overflow-auto">
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
        </div>
      </div>):<Chats2 toggleChat={()=>toggleChat()}/>}
    </>
  );
}
