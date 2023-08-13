import React, { useState } from 'react'
import { getChats } from "../../actions/chatsActions";

import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function ConfirmGroup({handleConfirmGroup,groupMembers,back}) {
    const [name,setName] = useState();
    const dispatch = useDispatch();
    const users = [];
    groupMembers.map((mem)=>(users.push(mem._id)))
    const token = JSON.parse(localStorage.getItem("user")).token
    const createGroup = async()=>{
        const data =await axios.post("/api/v1/chat/group",{name,users},{
            headers:{
            Authorization:`Bearer ${token}`
            }
    })
    back(true)
    dispatch(getChats())
}

  return (<>
            <div id="chats" className="bg-[#27374D] w-[30%] h-screen">
                    <div className="sticky top-0 pb-4">
                        <div className='flex items-end h-24 bg-[#9DB2BF]'>
                            <button onClick={()=>handleConfirmGroup()}><img src="./img/back.png" alt="" className='h-3/5 w-6 ml-4 mb-2'/></button>
                            <h1 className='ml-4 font-semibold text-lg mb-2'>New Group</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center h-[calc(100vh-6rem)] space-y-12 w-full overflow-auto'>
                        <div className='rounded-full bg-slate-600 flex items-center justify-center p-8'>
                            <span>
                                <img src="/img/groups.png" alt="" className='h-32'/>
                            </span>
                        </div>
                        <div className='flex flex-col items-start w-full px-8'>
                            <input type="text" id='groupName' value={name} onChange={(e)=>setName(e.target.value)} className='w-full outline-none h-8 bg-[#27374D] border-b-2 text-[#a2acb4]' placeholder='Enter Group name'/>
                        </div>
                    
                        <div className='rounded-full bg-[#7f9ea3] p-2 cursor-pointer'>
                            <span onClick={createGroup}>
                                <img src="/img/tick.png" alt=""  className='h-8 '/>
                            </span>
                        </div>
                    </div>
                </div>
         </>
  )}
