import React, { useState } from 'react'
import axios from "axios"
import AddUserModal from './AddUserModal';
export default function EditGroup({chat,groupInfo}) {
    const [selectedChat,setSelectedChat] = useState(chat)
    const [edit,setEdit] = useState(false);
    const [open,setOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem("user")).token;
    const [details,setDetails] = useState({
        name:selectedChat.chatName,
        avatar:selectedChat.groupAvatar
    })


    //rename group
    
    const editInfo = async(id)=>{
       try{ const data =await axios.put(`/api/v1/chat/group/rename/${id}`,{name:details.name},{
            headers:{
                Authorization:`Bearer ${token}`
                },
        })
        console.log(data);
    
    }catch(err){
            console.log(err);
        }
        setEdit(0);
    }

    //remove group

    const removeMember = async(groupId,membId)=>{
        try{ const data =await axios.put(`/api/v1/chat/group/remove/${groupId}`,{userId:membId},{
            headers:{
                Authorization:`Bearer ${token}`
                },
        })
            setSelectedChat(chat)
    }catch(err){
            console.log(err);
        }
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
                <div className='flex items-center hover:bg-slate-600 cursor-pointer' onClick={()=>setOpen(true)}>
                    <div className='rounded-full bg-gray-500 m-3 h-12 w-12 flex items-center justify-center'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className='h-8'>
                                <path d="M730-400v-130H600v-60h130v-130h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420-420 478-406.5 536-393 611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm260-321q39 0 64.5-25.5T450-631q0-39-25.5-64.5T360-721q-39 0-64.5 25.5T270-631q0 39 25.5 64.5T360-541Zm0-90Zm0 411Z"/>
                            </svg>
                        </span>
                    </div>
                    <div className="h-full text-white flex items-center">
                       <span>Add User</span>
                    </div>
                </div>
                {selectedChat.users.map((memb)=>(
                    <div key={memb._id} className='group flex justify-between items-center  hover:bg-slate-600 cursor-pointer'>
                      <div className="flex items-center justify-start max-w-full h-[4.5rem]" >
                        <div>
                            <img src={memb.avatar} alt="" className="h-12 w-12 rounded-full m-3 object-contain"/>
                        </div>
                        <div className="h-full text-white flex items-center">
                            <span>{memb.name}</span>
                        </div>
                    </div>
                    <div className='group-hover:block hidden' onClick={()=>removeMember(selectedChat._id,memb._id)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className='h-6 fill-white'>
                                <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
                            </svg>
                        </span>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <AddUserModal open={open} setOpen={()=>setOpen(!open)} selectedChat={selectedChat}/>
    </>
  )
}
