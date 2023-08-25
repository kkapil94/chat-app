import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import ChatInfo from '../group/ChatInfo';
import { getChats, selectChat } from '../../actions/chatsActions';
import axios from 'axios';
import { toast } from 'react-toastify';
import Message from "../messages/Message";
import {socket} from '../../socket.js'

export default function GroupChat() {
    var ioChat;
    const [menu,setMenu] = useState(false);
    const [groupInfo,setGroupInfo] = useState(false)
    const [content, setContent] = useState('');
    const [msg,setMsg] = useState([])
    const [connected,setConnected] = useState(0)
    const dispatch = useDispatch()
    const menuRef = useRef();
    const {token} = JSON.parse(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    const selectedChat = useSelector(state=>state.chats.selectedChat)
    const func = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setMenu(false);
      }
    }

    const sendMsg = async () => {
      try {
        if (content.trim()=='') {
          toast.info("Please type something to send")
          return 
        }
        const { data } = await axios.post(
          "api/v1/msg/send",
          { content: content, chatId: selectedChat._id },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (data.success) {
          setContent("");
          fetchMsg()
          socket.emit("send-msg",data.data,selectedChat._id);
        }
      } catch (err) {
        return new Error(err.message);
      }
    };
  
    const fetchMsg = async()=>{
      try {
        const {data} = await axios.get(`api/v1/msg/${selectedChat._id}`,{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        socket.emit('join-chat',selectedChat._id)
        setMsg(data);
      } catch (error) {
        return  new Error(error.meassage)
      }
    }

    const getChatName = (chat)=>{
      const users = chat.users.filter(memb=>memb._id!=user.user._id)
      return users.length&&users[0].name
    }
    const getChatAvatar = (chat)=>{
      const users = chat.users.filter(memb=>memb._id!=user.user._id)
      return users.length&&users[0].avatar
    }
  


    const exitGroup = async(groupId)=>{
      try{ const data =await axios.put(`/api/v1/chat/group/exit/${groupId}`,{userId},{
          headers:{
              Authorization:`Bearer ${token}`
              },
      })
      dispatch(getChats())
      dispatch(selectChat())
      if (data.status === 200) {
        toast.success("Exited from group")
      }
  }catch(err){
          console.log(err);
      }
  }

  useEffect(()=>{
    socket.emit('create',user.user);
    socket.on("connected",()=>setConnected(1))
    document.addEventListener("mousedown", func);
    return () => {
    document.removeEventListener("mousedown", func);
    };
 },[])


  useEffect(() => {
    fetchMsg()
    ioChat = selectedChat
  },[selectedChat]);
  
  useEffect(() => {
    socket.on("receive-msg", (reMsg) => {
      console.log(ioChat, "nk");
      if (!ioChat || reMsg.chat._id !== ioChat._id) {
        return;
      } else {
        setMsg((prevMsg) => [...prevMsg, reMsg]);
      }
    });
  });

    
  return (
    <>
    <div className='flex h-full'>
      {selectedChat?<div className={!groupInfo?'h-full w-full':"h-full w-[40vw] border-solid border-r-[1px] border-gray-500"}>
        <div className='h-[3.8rem] w-full flex items-center justify-between bg-[#9DB2BF]'>
          <div className='flex ml-4 space-x-2'>
            <div>
              <img src={!selectedChat.isGroupChat?selectedChat.avatar:selectedChat.chatAvatar} alt="" className='h-10 w-10 rounded-full m-1 object-contain'/>
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
                <li className="cursor-pointer hover:bg-slate-700 pl-4 flex items-center h-10" onClick={()=>exitGroup(selectedChat._id)}>Exit Group</li>
              </ul>
            </div>
          </div>
        </div>
        {msg&&
            <div className="h-[calc(100vh-7.6rem)] ">
              <Message messages={msg}/>
            </div>}
        <div className="sticky top-full w-full">
              <div className="h-[3.8rem] bg-slate-600 w-full">
                <div className="h-full w-full flex items-center justify-center space-x-10">
                  <div className="h-full w-4/5 flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full rounded-md h-3/5 p-4 bg-[#526d82] outline-none text-[#ededed]"
                      onKeyDown={(e)=>{
                        if (e.key=="Enter"&&content) {
                          sendMsg()
                        }
                      }}
                    />
                  </div>
                  <div className="flex">
                    <button onClick={sendMsg}>
                      <img src="/img/send.png" alt="" className="h-8 " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
      </div>:<div className='h-full w-full flex items-center justify-center text-xl text-slate-200 font-bold'>
        <span>Select a chat to start a new conversation!</span>
        </div>}
        <div className='h-full'>
        {groupInfo&&<div className='h-full'>
          <ChatInfo chat={selectedChat} groupInfo={()=>setGroupInfo(!groupInfo)}/>
        </div>}
        </div>
      </div>
    </>
  )
}
