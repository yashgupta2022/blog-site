'use client'
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/modalAtom';

export default function Compose() {
  const [open, setOpen] = useRecoilState(modalState)
  const {data:session} = useSession()
  
  return (
    <div className='bg-white  mt-8 p-2 md:p-6 py-6 border rounded-md  border-gray-200 '>
      {session ? <>
        <div className='flex items-center justify-between  md:ml-10 '>
      <img src={session?.user.image} alt="" className='h-16 rounded-full border p-[2px]' />
      <div className='flex-1 ml-4'>
        <h2 className='font-bold'>{session?.user.username}</h2>
        <h3 className='text-sm text-gray-400 text-wrap pr-4'>Welcome to BlogSite</h3>
        
      </div>
      <h1 className='font-semibold md:mr-20'><button onClick={()=>setOpen(prev=>!prev)} className='text-md text-blue-600 hover:text-blue-800'>{"Compose "}</button> </h1>
      
      </div>
        
      </>
      
         : <h1 className='font-semibold'>Please <button onClick={signIn} className='text-blue-600 hover:text-blue-800'>{"login "}</button> to compose blogs and comment on blogs... </h1>
      }
    </div>
  )
}
