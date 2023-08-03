import React from 'react'

export default function TypeSpace() {
  return (
    <>
        <div className='h-[3.8rem] bg-slate-600 w-full'>
            <div className='h-full w-full flex items-center justify-center space-x-10'>
                <div className='h-full w-4/5 flex items-center'>
                    <input type="text" placeholder='Type a message' className='w-full rounded-md h-3/5 p-4 bg-[#526d82] outline-none text-[#ededed]'/>
                </div>
                <div>
                  <button>
                    <img src="/img/send.png" alt="" className='h-8 ' />
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}
