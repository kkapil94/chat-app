import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../actions/usersActions';
import ConfirmGroup from './ConfirmGroup';
import { AnimatePresence, motion } from 'framer-motion';

export default function NewGroup({toggleGroup,directNewGroup,toggleChat}) {

  const dispatch = useDispatch();
  const [search,setSearch] = useState()
  const {selectedChat} = useSelector(state=>state.chats)
  const {users} = useSelector((state)=>state.users)
  const [confirmGroup,setConfirmGroup] = useState(false)
  const [groupMembers,setGroupMembers] = useState([])
  const removeGroupMembers = (member)=>{
    setGroupMembers(groupMembers.filter(memb => memb!==member))
  }
  const back = (confirm)=>{
    console.log(confirm,"ok");
    if(directNewGroup||confirm){
      toggleGroup()
      toggleChat()
    }
    else{
      toggleGroup()
    }
  }

  const handleSetGroupMemb = (user)=>{
    let present = 0
    if (!groupMembers.length) {
      console.log(1);
      setGroupMembers([...groupMembers,user])
    }
    groupMembers.length&&groupMembers.forEach(memb=>{
      if(memb._id==user._id)
      present = 1;
    })
    if (!present) {
      setGroupMembers([...groupMembers,user])
    }
  }

  const handleConfirmGroup = ()=>{
    setConfirmGroup(!confirmGroup);
  }

  useEffect(()=>{
    dispatch(searchUser(search));
  },[dispatch,search])

  return (
    <>
      <AnimatePresence>
        {!confirmGroup? <motion.div id="chats" key={"NewGroup"} className={`bg-[#0f3a50] ${!selectedChat?'xs:max-sm:w-screen':'xs:max-sm:hidden'} w-[30%] sm:max-xl:w-[40%] h-screen flex flex-col`} initial={{x:'-100vw'}} animate={{x:0}} transition={{type:"tween",ease:"easeIn",duration:".3"}} exit={{x:0,position:"absolute"}}>
        <div className="sticky top-0 pb-4">
            <div className='flex items-end h-24 bg-[#355070]'>
                <button  onClick={()=>back(false)}><img src="./img/back.svg" alt="" className='h-3/5 w-6 ml-4 mb-2'/></button>
                <h1 className='ml-4 font-semibold text-slate-100 text-lg mb-2'>Add group participants</h1>
            </div>
            <div className='w-full flex justify-center bg-[#27374D]'>
                <button className='inline-block mb-4'><img src="./img/search.png" alt="" className='absolute h-4 w-4 ml-2'/></button>
                <input type="text" placeholder='Search Contacts' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-11/12 my-2 rounded-md pl-12 h-8 outline-none'/>
            </div>
        </div>
        <div>
        <div className='sm:max-2xl:ml-10 xs:max-sm:px-2 max-h-44 xs:max-sm:w-screen xs:max-sm:h-15 xs:max-sm:whitespace-nowrap  overflow-auto'>
            {groupMembers.length?groupMembers.map((mem)=>(
            <div className='inline-flex items-center mr-4' key={mem._id}>
                <div>
                    <img src={mem.avatar} className='h-7 w-7 xs:max-sm:h-10 xs:max-sm:w-10 object-contain mr-2 rounded-full' />
                </div>
                <div className='mr-2 text-slate-300'>
                    <span>{mem.name}</span>
                </div>
                <div>
                    <img src="./img/close.svg" className='h-4 w-4 cursor-pointer' onClick={()=>removeGroupMembers(mem)} />
                </div>
            </div>
            ))
            :""}
            
        </div>
        </div>
        {groupMembers.length?<div className='w-full'>
            <div className='h-[1px] xs:max-sm:h-0 bg-slate-600 mx-9 sm:max-2xl:mb-4'></div>
          </div>:""}
        {users.length?<div className={'overflow-auto '}>
        <div>
          {users&&users.map((user)=>(
            <div onClick={()=>handleSetGroupMemb(user)} key={user._id}>
            <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-[#8d99ae40] cursor-pointer" key={user._id}>
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
      {groupMembers.length?<div className=' bg-[#355070]'>
        <div className='h-24 w-full flex items-center justify-center '>
          <span className='p-4 rounded-full bg-[#003049bd] cursor-pointer' onClick={handleConfirmGroup}>
            <img src="/img/next.svg" alt=""  className='h-6 '/>
          </span>
        </div>
      </div>:""}
      </motion.div>:<ConfirmGroup handleConfirmGroup={handleConfirmGroup} groupMembers={groupMembers} back={back}/>}
      </AnimatePresence>
    </>
  )
}