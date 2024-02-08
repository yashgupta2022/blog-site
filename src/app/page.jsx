import React from "react";
import Header from "../components/Header";
import Feed from "../components/Feed";
import UploadModal from "../components/UploadModal";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/026/184/692/non_2x/seamless-pattern-with-autumn-fall-leaves-in-beige-red-brown-green-and-yellow-perfect-for-wallpaper-wrapping-paper-web-sites-background-social-media-blog-and-greeting-cards-vector.jpg")'   }}>
      <div className='backdrop-blur-[2px] min-h-screen '>
      <Header />
      <Feed />
      <UploadModal />
      </div>
    </div>
  );
}
