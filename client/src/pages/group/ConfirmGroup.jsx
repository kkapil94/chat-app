import React, { useRef, useState } from 'react'
import { getChats } from "../../actions/chatsActions";

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { AnimatePresence, motion } from 'framer-motion';

export default function ConfirmGroup({handleConfirmGroup,groupMembers,back}) {
    const form  =  useRef(null);
    const baseUrl = import.meta.env.VITE_BASE_URL
    const formData = new FormData();
    const notify = toast
    const [name,setName] = useState();
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState();
    const {selectedChat} = useSelector(state=>state.chats)
    const [pre,setPre] = useState();
    const dispatch = useDispatch();
    const users = [];
    groupMembers.map((mem)=>(users.push(mem._id)))
    const token = JSON.parse(localStorage.getItem("user")).token
    const handleSetFile = (e)=>{
        setFile(e.target.files[0])
        setPre(URL.createObjectURL(e.target.files[0]))
    }
    const createGroup = async(e)=>{
        e.preventDefault();
       try{
        setLoading(true)
        formData.append("name",name)
        formData.append("file",file)
        formData.append("users",JSON.stringify(users))
        const data =await axios.post(`${baseUrl}/api/v1/chat/group`,formData,{
            headers:{
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`,
            }
        })
        if (data.status===200) {
            setLoading(false)
            back(true)
            dispatch(getChats())
            notify.success("Group created")
        }}catch(err){
            setLoading(false)
            notify.error(err.response.data.msg);
        }
            
}

  return (<>{loading&&<Loader/>}
            <AnimatePresence>
          
            <motion.div id="chats" className={`bg-[#0f3a50] w-[30%] sm:max-xl:w-[40%] h-screen ${!selectedChat?'xs:max-sm:w-screen':'xs:max-sm:hidden'}`} initial={{x:"-100vh"}} animate={{x:0}}
            transition={{type:"tween",ease:"easeIn",duration:".3"}} exit={{x:0,position:"absolute"}}>
                    <div className="sticky top-0 pb-4">
                        <div className='flex items-end h-24 bg-[#0f3a50]'>
                            <button onClick={()=>handleConfirmGroup()}><img src="./img/back.svg" alt="" className='h-3/5 w-6 ml-4 mb-2'/></button>
                            <h1 className='ml-4 font-semibold text-slate-100 text-lg mb-2'>New Group</h1>
                        </div>
                    </div>
                    <form  onSubmit={createGroup} className='flex flex-col items-center h-[calc(100vh-6rem)] mt-12 space-y-12 w-full overflow-auto'>
                        <div className='rounded-full bg-slate-600 flex items-center justify-center '>
                            <label htmlFor='avatar' className='cursor-pointer'>
                            {!pre?<span className='relative'>
                                <span className='opacity-30'>
                                <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" fill='#8c9aa7'>
                                    <path class="primary" fill-rule="evenodd" clip-rule="evenodd" d="M102.282 77.2856C102.282 87.957 93.8569 96.5713 83.3419 96.5713C72.827 96.5713 64.339 87.957 64.339 77.2856C64.339 66.6143 72.827 58 83.3419 58C93.8569 58 102.282 66.6143 102.282 77.2856ZM150.35 80.1427C150.35 89.9446 142.612 97.857 132.954 97.857C123.296 97.857 115.5 89.9446 115.5 80.1427C115.5 70.3409 123.296 62.4285 132.954 62.4285C142.612 62.4285 150.35 70.3409 150.35 80.1427ZM83.3402 109.428C68.5812 109.428 39 116.95 39 131.928V143.714C39 147.25 41.8504 148 45.3343 148H121.346C124.83 148 127.68 147.25 127.68 143.714V131.928C127.68 116.95 98.0991 109.428 83.3402 109.428ZM126.804 110.853C127.707 110.871 128.485 110.886 129 110.886C143.759 110.886 174 116.95 174 131.929V141.571C174 145.107 171.15 148 167.666 148H134.854C135.551 146.007 135.995 143.821 135.995 141.571L135.75 131.071C135.75 121.51 130.136 117.858 124.162 113.971C122.772 113.067 121.363 112.15 120 111.143C119.981 111.123 119.962 111.098 119.941 111.07C119.893 111.007 119.835 110.931 119.747 110.886C121.343 110.747 124.485 110.808 126.804 110.853Z"></path></svg>
                                </span>
                                <div className='absolute left-16 bottom-16 '>
                                    <label htmlFor="avatar" className='text-white font-semibold text-lg flex flex-col items-center cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="35" viewBox="0 -960 960 960" width="48"><path d="M774.615-690.154v-84.461h-84.461v-45.384h84.461v-85.076h45.384v85.076h85.076v45.384h-85.076v84.461h-45.384ZM440.192-280.463q66.423 0 111.769-45.345 45.346-45.346 45.346-111.769 0-67.423-45.346-112.461t-111.769-45.038q-67.422 0-112.461 45.038Q282.693-505 282.693-437.577q0 66.423 45.038 111.769 45.039 45.345 112.461 45.345Zm0-45.383q-48.577 0-80.346-32.077-31.769-32.077-31.769-79.654 0-48.577 31.769-80.346 31.769-31.77 80.346-31.77 47.577 0 79.654 31.77 32.077 31.769 32.077 80.346 0 47.577-32.077 79.654t-79.654 32.077ZM117.694-140.001q-23.53 0-40.61-17.082Q60-174.165 60-197.694V-677.23q0-23 17.082-40.346 17.082-17.346 40.611-17.346h137.384l73.384-85.077h288.614v118.462h84.461v84.461h118.462v419.382q0 23.529-17.347 40.611-17.346 17.082-40.346 17.082H117.694Z"/></svg>Add Photo
                                        </label>
                                    <input id='avatar' name='file' type="file" className='hidden' required onChange={handleSetFile}/>
                                </div>
                            </span>:
                            <span className='relative'>
                                <img src={pre} alt="" className='h-48 rounded-full'/>
                                <input id='avatar' name='file' type="file" className='hidden'   onChange={handleSetFile}/>
                            </span>}
                            </label>
                        </div>
                        <div className='flex flex-col items-start w-full px-8'>
                            <input type="text" name='name' id='groupName' value={name} onChange={(e)=>setName(e.target.value)} required className='w-full outline-none h-8 bg-[#27374D] border-b-2 text-[#a2acb4]' placeholder='Enter Group name'/>
                        </div>
                    
                        <div className=' bg-[#003049bd] p-2 w-12 h-12 rounded-full'>
                            <button type='submit' className='w-full h-full'>
                                <img src="/img/check.svg" alt=""  className='h-8'/>
                            </button>
                        </div>
                    </form>
                </motion.div>
                </AnimatePresence>
         </>
  )}
