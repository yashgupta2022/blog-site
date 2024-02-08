'use client'
import Feed from '@/components/Feed'
import Header from '@/components/Header'
import UploadModal from '@/components/UploadModal'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function MyBlogs() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    // Return null or a loading indicator if needed
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/026/184/692/non_2x/seamless-pattern-with-autumn-fall-leaves-in-beige-red-brown-green-and-yellow-perfect-for-wallpaper-wrapping-paper-web-sites-background-social-media-blog-and-greeting-cards-vector.jpg")' }}>
      <div className='backdrop-blur-[2px] min-h-screen '>
        <Header />
        <Feed />
        <UploadModal />
      </div>
    </div>
  );
}
