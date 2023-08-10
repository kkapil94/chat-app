import React, { useState } from 'react'
import axios from "axios"

export default function EditGroup({selectedChat,groupInfo}) {
    const [edit,setEdit] = useState(false);
    const token = JSON.parse(localStorage.getItem("user")).token;
    const [details,setDetails] = useState({
        name:selectedChat.chatName,
        avatar:selectedChat.groupAvatar
    })
    
    const editInfo = async(id)=>{
       try{ const data =await axios.post(`/api/v1/chat/group/rename`,{name:details.name},{
            headers:{
                Authorization:`Bearer ${token}`
                },
            params:{
                id
            }
        })}catch(err){
            console.log(err);
        }
        console.log(data);
        setEdit(0);
    }

  return (
    <>
        <div className='w-[30vw] h-screen overflow-auto'>
            <div className='bg-[#27374D] pb-4 mb-2'>
                <div className='flex items-center pl-4 h-[3.8rem] bg-[#9DB2BF] sticky top-0'>
                    <div className='mr-2 cursor-pointer' onClick={()=>groupInfo()}>
                        <img src="/img/close.png" alt="" className='h-6'/>
                    </div>
                     <div>
                        <span>Group Info</span>
                    </div>
                </div>
                <div className='flex flex-col items-center pt-6'>
                    <div>
                        <div className='h-48 '>
                            <img src={selectedChat.groupAvatar} alt="" className='h-full rounded-full'/>   
                        </div>
                    </div>
                    <div className='mt-4 text-center'>
                        <div className='flex items-center space-x-2 justify-center'>
                            {!edit?<span className='text-3xl text-[#b1b3bb]'>{selectedChat.chatName}</span>:
                                <input type="text" value={details.name} className='text-3xl w-2/5 outline-none bg-transparent border-b-2 border-solid border-[#b1b3bb] text-[#b1b3bb] pb-2' onChange={(e)=>{setDetails({...details,name:e.target.value})}} />
                            }
                            <span className='relative'>
                                {!edit?<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" onClick={()=>setEdit(1)} className='h-6 w-auto fill-[#b1b3bb] cursor-pointer'>
                                        <path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/>
                                </svg>:<svg xmlns="http://www.w3.org/2000/svg" height="48" onClick={()=>editInfo(selectedChat._id)} viewBox="0 -960 960 960" width="48" className='h-8 top-[-1rem] right-0 absolute w-auto fill-[#b1b3bb] cursor-pointer'>
                                    <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
                                </svg>}
                            </span>
                        </div>
                        <span className='text-[#eef4f9]'>Group · {selectedChat.users.length} participants</span>
                    </div>
                </div>
            </div>
            <div className='bg-[#27374D]'>
                <div >
                    <span className='text-lg pl-4 mt-4 inline-block text-[#b1b3bb]'>
                        {selectedChat.users.length} members
                    </span>
                </div>
                {selectedChat.users.map((memb)=>(
                      <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-slate-600 cursor-pointer" key={memb._id}>
                        <div>
                            <img src={memb.avatar} alt="" className="h-12 w-12 rounded-full m-3 object-contain"/>
                        </div>
                        <div className="h-full text-white flex items-center">
                            <span>{memb.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}
