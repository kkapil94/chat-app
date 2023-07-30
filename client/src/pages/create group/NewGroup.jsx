import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../actions/usersActions';

export default function NewGroup({toggleGroup,directNewGroup,toggleChat}) {
  const dispatch = useDispatch();
  const [search,setSearch] = useState()
  const {users} = useSelector((state)=>state.users)
  const [groupMembers,setGroupMembers] = useState([])
  const removeGroupMembers = (member)=>{
    setGroupMembers(groupMembers.filter(memb => memb!==member))
  }
  const back = ()=>{
    if(directNewGroup){
      toggleGroup()
      toggleChat()
    }
    else{
      toggleGroup()
    }
  }
  useEffect(()=>{
    dispatch(searchUser(search));
  },[dispatch,search])

  return (
    <>
        {<div id="chats" className="bg-[#27374D] w-[30%] h-screen">
        <div className="sticky top-0 pb-4">
            <div className='flex items-end h-24 bg-[#9DB2BF]'>
                <button><img src="./img/back.png" alt="" className='h-3/5 w-6 ml-4 mb-2' onClick={back}/></button>
                <h1 className='ml-4 font-semibold text-lg mb-2'>Add group participants</h1>
            </div>
            <div className='w-full flex justify-center bg-[#27374D]'>
                <button className='inline-block mb-4'><img src="./img/search.png" alt="" className='absolute h-4 w-4 ml-2'/></button>
                <input type="text" placeholder='Search Contacts' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-11/12 my-2 rounded-md pl-12 h-8 outline-none'/>
            </div>
        </div>
        <div className='ml-10'>
            {groupMembers.length?groupMembers.map((mem)=>(
            <div className='inline-flex items-center mr-4' key={mem._id}>
                <div>
                    <img src={mem.avatar} className='h-7 w-7 object-contain mr-2 rounded-full' />
                </div>
                <div className='mr-2'>
                    <span>{mem.name}</span>
                </div>
                <div>
                    <img src="./img/close.png" className='h-4 w-4 cursor-pointer' onClick={()=>removeGroupMembers(mem)} />
                </div>
            </div>
            ))
            :""}
            
        </div>
        {groupMembers.length?<div className='w-full'>
            <div className='h-[1px] bg-slate-600 mx-9 mb-4'></div>
          </div>:""}
        {users.length?<div className='h-[inherit] overflow-auto'>
        <div>
          {users&&users.map((user)=>(
            <div onClick={()=>setGroupMembers([...groupMembers,user])}>
            <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-slate-600 cursor-pointer" key={user._id}>
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
      </div>}
    </>
  )
}
