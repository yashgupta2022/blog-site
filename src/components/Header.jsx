'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/modalAtom';


export default function Header() {
  const {data:session} = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()
  return (
    <div className=' flex justify-end h-[60px] pr-10 shadow-sm shadow-white p-2 sticky top-0 bg-white z-30  '>

        <div className='flex space-x-4 items-center  '>
        <IoMdHome onClick={()=>{router.push('/')}} className='h-6 w-6 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer'/>
        
        {session ? <> 
          <CiCirclePlus onClick={()=>setOpen(prev=>!prev)} className='h-6 w-6 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer ' />
          <button onClick={()=>router.push('/myblogs')} className='text-sm font-semibold text-blue-500 hover:text-blue-600 transition duration-200'>My Blogs</button>
          <button onClick={signOut} className='text-sm font-semibold text-blue-500 hover:text-blue-600 transition duration-200'>Sign out</button>
        </> : <button onClick={signIn} className='text-sm font-semibold text-blue-500 hover:text-blue-600 transition duration-200'>Sign in</button>} 
        </div>
      </div>
  )
}
