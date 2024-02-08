'use client'
import {modalState} from './../../atom/modalAtom'
import {useRecoilState} from 'recoil' 
import Modal from 'react-modal'
import {FiCamera} from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import {addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from  '../app/firebase'
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedFile, setSelectedFile] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const filePickerRef = useRef(null)

    const {data:session} = useSession()

    const addFileToBlog = (e)=>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent)=>{
            setSelectedFile(readerEvent.target.result)
        }
    }

    const uploadBlog = async ()=>{
        if (loading) return
        setLoading(true)
        const docRef = await addDoc(collection(db, 'blogs'), {
            username: session.user.username,
            title: title,
            description: description,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        const fileRef = ref(storage, `blogs/${docRef.id}/file`)
        await uploadString(fileRef, selectedFile, 'data_url').then(async (snapshot)=>{
            const downloadUrl = await getDownloadURL(fileRef)
            
            await updateDoc(doc(db, 'blogs', docRef.id),{
                file: downloadUrl,
                type : selectedFile.startsWith('data:image/') ? 'image' : 'video'
            })  
        })
        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }

  return (
    <div>
      {open && ( 
        <Modal 
        className="bg-white border-2 rounded-md shadow-md top-[25%] w-[90%] absolute max-w-lg p-6 left-[50%]  translate-x-[-50%]"
            isOpen={open}
            onRequestClose={()=>{setOpen(false);setSelectedFile(null)}}
        >
           <div className='flex flex-col justify-center items-center h-[100%]'>
            {selectedFile ?(selectedFile.startsWith('data:image/') ? <img onClick={()=>setSelectedFile(null)} className='w-full max-h-[250px] object-cover cursor-pointer' src={selectedFile} alt=''/> : <video  className='w-full max-h-[250px] object-cover cursor-pointer'  muted controls autoPlay><source src={selectedFile}></source></video>)
            :(
            <>
            <p className='mb-2 text-sm '>Click below to upload images or videos</p>
            <FiCamera onClick={()=>{filePickerRef.current.click()}} className='cursor-pointer h-14 w-14 bg-red-200 p-2 rounded-full border-2 text-red-500'/>
            </>)}
            <input type='file' accept='image/*,video/*'  onChange={addFileToBlog} hidden ref={filePickerRef} />
            
            <input type='text' onChange={(e)=>{setTitle(e.target.value)}} placeholder='Add Title' maxLength='50' className='border-none m-4 mb-2 focus:ring-0 focus:outline-none w-full text-center'/>
            <textarea type='text' onChange={(e)=>{setDescription(e.target.value)}} placeholder='Enter Description' maxLength='1000' className='border-none m-4 mt-0 max-h-[150px] resize-y focus:ring-0 focus:outline-none w-full text-center'/>

            <button onClick={uploadBlog} disabled ={!title.trim() || loading} className='bg-red-600 w-full text-white p-2 shadow-md rounded-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Upload Blog</button>
            </div>
        </Modal>
      )}
    </div>
  )
}
