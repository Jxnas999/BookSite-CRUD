import type { NextPage } from "next";
import Link from "next/link";
import Navbar from "./Components/Navbar";
import {useState, useEffect} from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuthRef } from "../firebase/firebaseauth";
const Home: NextPage = () => {

  const [uid, setUid] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    
    useEffect(() => {
      
      onAuthStateChanged(firebaseAuthRef, (user) => {
        if (user) {
          setUid(user.uid)
          setEmail(user.email)
          
        } else {
          setUid(null)
          setEmail(null)
        }
      });

    }, [uid]) 



  return (
    <div className="font-ubuntu">
      <Navbar email={email} uid={uid}/>
    <div className='h-screen bg-[#e9e8e8] bg-cover flex flex-col justify-center'>
      <div className='pb-20 text-center select-none '>
        <h1 className='mb-2 text-7xl font-medium antialiased text-transparent md:text-9xl bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text'>
          Sum it up!
        </h1>
        
        <p className='font-semibold text-xl md:text-3xl bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text text-transparent'>
          remember and learn the key points of your book, podcast etc.
        </p>
        <div>
          <Link href='./Components/Adding'>
            <button className='md:text-xl hover:from-[#124fde] duration-300 hover:to-[#5484ff]  mt-8 md:py-5 md:px-10 py-3 px-6  font-bold bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] rounded-2xl drop-shadow-lg text-white '>
              Start documenting
            </button>
          </Link>
        </div>
      </div>
      
    </div>
    
  </div>
  );
};

export default Home;

