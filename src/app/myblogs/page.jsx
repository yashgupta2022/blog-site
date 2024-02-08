'use client'
import Feed from '@/components/Feed'
import Header from '@/components/Header'
import UploadModal from '@/components/UploadModal'
import { useSession } from 'next-auth/react'
import {useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function myblogs() {
    const {data:session} = useSession()
    const router = useRouter()
    if (!session) {
        router.push('/')
        return <div></div>
    }
    else{
        return (
            <div className="min-h-screen" style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/026/184/692/non_2x/seamless-pattern-with-autumn-fall-leaves-in-beige-red-brown-green-and-yellow-perfect-for-wallpaper-wrapping-paper-web-sites-background-social-media-blog-and-greeting-cards-vector.jpg")'   }}>
            <div className='backdrop-blur-[2px] min-h-screen '>
            <Header />
            <Feed />
            <UploadModal />
            </div>
          </div>
        )
    }
}
