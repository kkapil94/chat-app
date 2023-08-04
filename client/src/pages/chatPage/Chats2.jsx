import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../actions/usersActions';
import NewGroup from '../create group/NewGroup';

export default function Chats2({toggleChat,directNewGroup}) {
  const dispatch = useDispatch();
  const [search,setSearch] = useState()
  const {users} = useSelector((state)=>state.users)
  const [newGroup,setNewGroup] = useState(false)
  const toggleGroup = ()=>{
    setNewGroup(0)
  }
  useEffect(()=>{
    dispatch(searchUser(search));
  },[dispatch,search])

  return (
    <>
        {!newGroup?<div id="chats" className="bg-[#27374D] w-[30%] h-screen">
        <div className="sticky top-0 pb-4">
            <div className='flex items-end h-24 bg-[#9DB2BF]'>
                <button><img src="./img/back.png" alt="" className='h-3/5 w-6 ml-4 mb-2' onClick={()=>toggleChat()}/></button>
                <h1 className='ml-4 font-semibold text-lg mb-2'>New Chat</h1>
            </div>
            <div className='w-full flex justify-center bg-[#27374D]'>
                <button className='inline-block mb-4'><img src="./img/search.png" alt="" className='absolute h-4 w-4 ml-2'/></button>
                <input type="text" placeholder='Search Contacts' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-11/12 my-2 rounded-md pl-12 h-8 outline-none'/>
            </div>
        </div>
        {users.length?<div className='h-[calc(100vh-10rem)] overflow-auto'>
        <div className='flex items-center w-full h-16 p-3 hover:bg-slate-600 cursor-pointer' onClick={()=>setNewGroup(1)}>
          <div className='border-solid border-[1px] rounded-full mr-2 p-2'>
            <img src="./img/groups.png" alt="" className='h-8 w-8'/>
          </div>
          <div className='w-4/5'>
            <span className='text-lg w-11/12 inline-block'>New Group</span>
          </div>
        </div>
        <div className='w-full'>
          <div className='h-[1px] bg-slate-600 ml-[4.5rem] mr-1'></div>
        </div>
        <div>
          {users&&users.map((user)=>(
            <div key={user._id}>
            <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-slate-600 cursor-pointer">
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
      </div>:<NewGroup toggleGroup={()=>toggleGroup()} toggleChat={toggleChat} directNewGroup={directNewGroup}/>}
    </>
  )
}
