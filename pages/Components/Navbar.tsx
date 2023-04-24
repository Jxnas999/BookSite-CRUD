import {  getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'

interface User {
    uid: string | null,
    email: string | null
}

export default function Navbar({ email, uid }: User) {
    const [message, setMessage] = useState<string | null>(null)
    

   
    function logOut(){
        const auth = getAuth();
        signOut(auth).then(() => {
        setTimeout(() => {
            setMessage('Logged out successfully')
          }, 2000);
        }).catch((error) => {
        // An error happened.
        });
        
    }


  return (
    <div>
        <div className=' font-bold uppercase justify-around bg-black py-4 text-white flex'>
            <Link href='/'><h1 className='ml-3 cursor-pointer p-4'>Home</h1></Link>
            <Link href='/Components/Notes'><h1 className='ml-3 cursor-pointer p-4'>Notes</h1></Link>
            
            {email? 
                <h1 className='ml-3 p-4 cursor-pointer'>{email}</h1>
            :
            <Link href='/Components/Auth/Login'>
                <h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Login</h1>
            </Link>
            }
            {
                email?
                <h1 onClick={logOut} className='ml-3 p-4 cursor-pointer'>Sign Out</h1>
                :
                <></>
            }
            {
                message?
                <h1 className='absolute bottom-5 right-0 bg-black p-2 rounded-lg animate-bounce'>{message}</h1>
                :
                <></>
            }
      
        </div>
    </div>
  )
}
