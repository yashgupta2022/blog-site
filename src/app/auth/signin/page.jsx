'use client'
import {signIn} from 'next-auth/react'
import Header from '../../../components/Header'
export default  function signin() {
  return (
    <div className='min-h-screen ' style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/026/184/692/non_2x/seamless-pattern-with-autumn-fall-leaves-in-beige-red-brown-green-and-yellow-perfect-for-wallpaper-wrapping-paper-web-sites-background-social-media-blog-and-greeting-cards-vector.jpg")'   }}>
      <div className='backdrop-blur-[4px] min-h-screen '>
      <Header />
      <div className="flex flex-col mt-14 items-center justify-center ">
          
            <h1 className="text-6xl font-mono m-5 text-center font-semibold mb-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Welcome to BlogSite</h1>
            <button onClick={()=>signIn('google', {callbackUrl:'/'} )} className=" shadow-lg bg-red-500 rounded-lg p-3 text-white hover:bg-red-600">Sign in with Google</button>
            
        </div>

      </div>
      
      
    </div>
  )
}

