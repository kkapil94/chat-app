import React from 'react'

export default function EditGroup({selectedChat,groupInfo}) {
  return (
    <>
        <div className='w-[30vw] h-full overflow-auto'>
            <div className='bg-[#27374D] pb-4 mb-2'>
                <div className='flex items-center pl-4 h-[3.8rem] bg-[#9DB2BF]'>
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
                        <span className='text-3xl block'>{selectedChat.chatName}</span>
                        <span>Group · {selectedChat.users.length} participants</span>
                    </div>
                </div>
            </div>
            <div className='bg-[#27374D]'>
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
