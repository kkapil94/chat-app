import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../actions/usersActions';
import NewGroup from '../group/NewGroup';
import axios from 'axios';
import { getChats } from '../../actions/chatsActions';
import {AnimatePresence, motion,usePresence} from "framer-motion"
const baseUrl = import.meta.env.VITE_BASE_URL
export default function Chats2({toggleChat,directNewGroup}) {
  const dispatch = useDispatch();
  // const [isPresent, safeToRemove] = usePresence()
  const [search,setSearch] = useState()
  const userId = JSON.parse(localStorage.getItem('user')).user._id
  const {selectedChat} = useSelector(state=>state.chats)
  const {users} = useSelector((state)=>state.users)
  const [newGroup,setNewGroup] = useState(directNewGroup)
  const toggleGroup = ()=>{
    setNewGroup(directNewGroup)
  }
  const singleChat = async(user)=>{
    const {token} = JSON.parse(localStorage.getItem("user"))
    const data = await axios.post(`${baseUrl}/api/v1/chat`,{user},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    toggleChat();
    dispatch(getChats());
  }

    useEffect(()=>{
    dispatch(searchUser(search));
  },[dispatch,search]) 

  return (
    <>
      <AnimatePresence >
        {!newGroup?<motion.div id="chats" key={"chats"} className={`bg-[#0f3a50] sm:max-xl:w-[40%] w-[30%] ${!selectedChat?'xs:max-sm:w-screen':'xs:max-sm:hidden'}  h-screen border-r-[1px] border-solid border-gray-500`} initial={{x:'-100vw'}} animate={{x:0}} transition={{type:"tween",ease:"easeIn",duration:'.3'}} exit={{x:0,position:"absolute"}}>
        <div className="sticky top-0 pb-4">
            <div className='flex items-end h-24 bg-[#355070]'>
                <button><img src="./img/back.svg" alt="" className='h-3/5 w-6 ml-4 mb-2' onClick={()=>toggleChat()}/></button>
                <h1 className='ml-4 font-semibold text-lg mb-2 text-slate-100'>New Chat</h1>
            </div>
            <div className='w-full flex justify-center bg-[#27374D]'>
                <button className='inline-block mb-4'><img src="./img/search.svg" alt="" className='absolute h-4 w-4 ml-2'/></button>
                <input type="text" placeholder='Search Contacts' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-11/12 my-2 rounded-md pl-12 h-8 outline-none'/>
            </div>
        </div>
        {users.length?<div className='h-[calc(100vh-10rem)] overflow-auto'>
        <div className='flex items-center w-full h-16 p-3 hover:bg-[#8d99ae40] cursor-pointer' onClick={()=>setNewGroup(1)}>
          <div className='border-solid border-[1px] rounded-full mr-2 p-2'>
            <img src="./img/groups.svg" alt="" className='h-8 w-8'/>
          </div>
          <div className='w-4/5'>
            <span className='text-lg w-11/12 inline-block text-[#bac1c7]'>New Group</span>
          </div>
        </div>
        <div className='w-full'>
          <div className='h-[1px] bg-slate-600 ml-[4.5rem] mr-2'></div>
        </div>
        <div>
          {users&&users.filter(user=>userId!=user._id).map((user)=>(
            <div key={user._id} onClick={()=>singleChat(user)}>
            <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-[#8d99ae40] cursor-pointer">
            <div>
              <img src={user.avatar} alt="" className="h-12 w-12 rounded-full m-3 object-contain"/>
            </div>
            <div className="h-full text-white flex items-center">
              <span>{user.name}</span>
            </div>
          </div>
          <div className='w-full'>
             <div className='h-[1px] bg-slate-600 ml-[4.5rem] mr-1'></div>
             </div>
          </div>
           ))
          }
        </div>
        </div>:<span className='text-center block mt-8'>No results found for '{search}'</span>}
      </motion.div>:<NewGroup toggleGroup={()=>toggleGroup()} toggleChat={toggleChat} directNewGroup={directNewGroup}/>}
      </AnimatePresence>
    </>
  )
}
