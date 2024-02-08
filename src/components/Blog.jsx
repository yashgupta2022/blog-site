import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal,HiOutlineEmojiHappy, HiOutlineChat, HiHeart } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import {useSession} from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../app/firebase';
import Moment from 'react-moment'


export default function Blog({id,username,userImage,file,title,description,type,timestamp}) {

    const {data:session} = useSession()
    const [comment,setComment] = useState("")
    const [comments,setComments] = useState([])
    const [hasLiked,setHasLiked] = useState(false)
    const [likes,setLikes] = useState([])
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db,'blogs',id,'comments'),orderBy('timestamp','desc')), (snapshot) => {
            setComments(snapshot.docs)
        })
        return unsubscribe  
    }, [db, id])

    const sendComment = async (e) => {
        e.preventDefault()
        await addDoc(collection(db,'blogs',id,'comments'),{
            comment:comment,
            username:session.user.username,
            userImage:session.user.image,
            timestamp:serverTimestamp()
        })
        setComment('')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db,'blogs',id,'likes'), (snapshot) => {
            setLikes(snapshot.docs)
        })
        return unsubscribe
    }, [db, id])
    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
    },[db, likes])
    const likeBlog = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db,'blogs',id,'likes',session.user.uid))
        }
        else{
        await setDoc(doc(db,'blogs',id,'likes',session.user.uid),{
            username:session.user.username
        })}
    }

  return (
    <div className='bg-white my-7 border rounded-md'>
        {/* BlogHeader */}
        <div className='flex items-center  p-5'>
            <img src={userImage} alt=""  className=' h-12 rounded-full object-cover border mr-3 p-1'/>
            <p className='flex-1 font-bold '>{username} </p>
            
        </div>
        {/* BlogImage */}
        {file && type==='image' ?  <img src={file} alt="" className='object-cover w-full'/> : <video  className='w-full  object-cover ' controls ><source src={file}></source></video>
        }

        {/* BlogButtons */}
        {session && (
        <div className='flex items-center gap-x-2  px-4 pt-2'>
                {hasLiked?<HiHeart onClick={likeBlog} className='btn  text-red-500'/> :<FiHeart onClick ={likeBlog} className='btn'/>}
                {likes.length > 0 && (<p className='font-bold'>{likes.length} likes</p>)}   
        </div> )}

        

        {/* Blog Comments */}
        <div className='flex justify-between items-center'>
    
            <p className='px-4 py-2 truncate flex-1'>
              
            <span className='font-bold mr-2'>{username}</span> 
            <span>{title}</span>
        </p>
        <Moment className='text-sm mr-4 truncate' fromNow>{timestamp}</Moment>
        </div>
        {description && <p>
         <p className={`px-5 ${expand ? '':'line-clamp-2'}`}><span className='font-semibold mr-2'>Description : </span> {description} </p><p className='px-5'><button className='text-xs hover:text-blue-400 text-gray-400 underline' hidden={!expand} onClick={()=>{setExpand(p=>!p)}}>Show Less</button>  </p>
            <button  className='text-xs pl-5 hover:text-blue-400 text-gray-400 underline' hidden={expand} onClick={()=>{setExpand(p=>!p)}}>Read More</button>
        </p>}
        
        {comments.length >0 && (
            <div className=' mx-10 max-h-24 overflow-y-scroll scrollbar-none'>
                <h1 className='font-semibold my-4'>Comments</h1>
                {comments.map((comment) => (
                    <div key={comment.id} className='flex items-center space-x-2 mb-3 text-sm'>
                        <img src={comment.data().userImage} alt="" className='h-7 rounded-full object-cover'/>
                        <p className='font-semibold'>{comment.data().username}</p>
                        <p className='flex-1 truncate'>{comment.data().comment}</p>
                        <Moment fromNow >{comment.data().timestamp?.toDate()}</Moment>
                    </div>
                ))}
            </div>
        )}
        
        {/* Blog Input */}
        {session && (
        <form className='flex items-center p-4 pl-6'>
            <input onChange={(e)=>setComment(e.target.value)} value={comment} type="text" placeholder='Enter your comment...' className='border-none flex-1 focus:ring-0  outline-none' />
            <button type='submit' onClick={sendComment} disabled={comment.trim()===''} className='disabled:text-blue-200 font-bold text-blue-400'>Send</button>
        </form>)}
        
    </div>
  )
}
