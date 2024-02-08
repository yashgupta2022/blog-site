
import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import {onSnapshot, collection, orderBy, query, where} from 'firebase/firestore'
import { db } from '../app/firebase'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'


export default function Blogs() {
  const pathname = usePathname()
  const {data:session} = useSession()
  const [blogs,setBlogs] = useState([])
  useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db,'blogs'), orderBy('timestamp','desc')) , (snapshot) => {
        setBlogs(snapshot.docs)
      }) 
      return unsubscribe  
  },[db])

  return (
    <div classname=''>
      {pathname === '/' &&   blogs.map((blog) => 
      <Blog key={blog.id} id={blog.id} username={blog.data().username} userImage={blog.data().profileImg} file={blog.data().file} title={blog.data().title} description={blog.data().description} type={blog.data().type} timestamp ={blog.data().timestamp?.toDate()}/> )} 

      {pathname === '/myblogs' &&   blogs.map(blog => {
        return blog.data().username === session?.user?.username &&
          <Blog key={blog.id} id={blog.id} username={blog.data().username} userImage={blog.data().profileImg} file={blog.data().file} title={blog.data().title} description={blog.data().description} type={blog.data().type} timestamp ={blog.data().timestamp?.toDate()}/> 
        })
      }

      <p className='h-[50px]'></p>
    </div>
  )
}
