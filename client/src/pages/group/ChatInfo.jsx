import React, { useState } from 'react'
import axios from "axios"
import AddUserModal from './AddUserModal';
import { useSelector,useDispatch } from 'react-redux';
import { getChats, selectChat } from '../../actions/chatsActions';
import { toast } from 'react-toastify';
export default function ChatInfo({groupInfo,chatInfo}) {
    const {selectedChat} = useSelector(state=>state.chats)
    const dispatch = useDispatch();
    const notify = toast
    const [edit,setEdit] = useState(false);
    const [open,setOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem("user")).token;
    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    const [details,setDetails] = useState(selectedChat&&{
        name:selectedChat.chatName,
        avatar:selectedChat.chatAvatar
    })


    //rename group
    
    const editInfo = async(id)=>{
       try{ const data =await axios.put(`/api/v1/chat/group/rename/${id}`,{name:details.name},{
            headers:{
                Authorization:`Bearer ${token}`
                },
        })
        dispatch(selectChat(selectedChat._id))
        dispatch(getChats())
        if (data.status === 200) {
            notify.success("Name changed successfully")
        }
    }catch(err){
            console.log(err);
        }
        setEdit(0);
    }

    const getChatName = (chat)=>{
        const users = chat.users.filter(user=>user._id!=userId)
        return users.length&&users[0].name
      }

    //remove group

    const removeMember = async(groupId,membId)=>{
        console.log(groupId);
        try{ const data =await axios.put(`/api/v1/chat/group/remove/${groupId}`,{userId:membId},{
            headers:{
                Authorization:`Bearer ${token}`
                },
        })
        if (membId==userId) {
            dispatch(getChats())
            dispatch(selectChat())
            chatInfo()
        }else{
            dispatch(selectChat(selectedChat._id))
        }
        if (data.status === 200) {
            notify.success("User removed successfully")
        }
    }catch(err){
            console.log(err);
        }
    }

  return (
    <>
        <div className='w-[30vw] h-screen overflow-auto'>
                <div className='flex items-center pl-4 h-[3.8rem] bg-[#9DB2BF] sticky top-0'>
                    <div className='mr-2 cursor-pointer' onClick={()=>selectedChat&&selectedChat.isGroupChat?groupInfo():chatInfo()}>
                        <img src="/img/close.png" alt="" className='h-6 '/>
                    </div>
                     <div>
                        {selectedChat&&selectedChat.isGroupChat?<span>Group Info</span>:<span>Chat Info</span>}
                    </div>
                </div>
            <div className='bg-[#27374D] pb-4  h-[calc(100vh-3.8rem)] '>
                <div className='flex flex-col items-center pt-6'>
                    <div>
                        <div>
                            <img src={selectedChat&&selectedChat.chatAvatar} alt="" className='h-48 w-48 rounded-full object-contain '/>   
                        </div>
                    </div>
                    
                    {selectedChat&&!selectedChat.isGroupChat&&
                    <div className='flex flex-col items-center w-full'>
                        <div >
                            <span className='text-3xl text-[#b1b3bb]'>{selectedChat.isGroupChat?selectedChat.chatName:getChatName(selectedChat)}</span>
                        </div>
                        <div className='w-full mt-14'>
                            <div className='h-1 w-full bg-[#9DB2BF]'></div>
                        </div>
                        <div className='mt-16 w-full'>
                            <div  className='flex justify-start space-x-4 w-full pl-6 h-16 items-center   hover:bg-slate-600 cursor-pointer' onClick={()=>removeMember(selectedChat._id,userId)}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" fill='#f15c6d' viewBox="0 -960 960 960" width="48"><path d="M261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm106-146h60v-399h-60v399Zm166 0h60v-399h-60v399Z"/></svg>
                                </span>
                                <span className='text-lg text-[#f15c6d]'>Delete Chat</span>
                            </div>
                        </div>
                    </div>
                    }
                    {selectedChat&&selectedChat.isGroupChat&&<div className='mt-4 text-center'>
                        <div className='flex items-center space-x-2 justify-center'>
                            {!edit?<span className='text-3xl text-[#b1b3bb]'>{selectedChat.chatName}</span>:
                                <input type="text" value={details.name} className='text-3xl w-3/5  outline-none bg-transparent border-b-2 border-solid border-[#b1b3bb] text-[#b1b3bb] pb-2 mr-2' onChange={(e)=>{setDetails({...details,name:e.target.value})}} />
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
                    </div>}
                </div>
            {selectedChat&&selectedChat.isGroupChat&&<div className='bg-[#27374D]'>
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
                    {memb._id!=selectedChat.groupAdmin&&<div className='group-hover:block hidden' onClick={()=>removeMember(selectedChat._id,memb._id)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className='h-6 fill-white'>
                                <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
                            </svg>
                        </span>
                    </div>}
                </div>
                ))}
            </div>}
            </div>
        </div>
        <AddUserModal open={open} setOpen={()=>setOpen(!open)} selectedChat={selectedChat}/>
    </>
  )
}
