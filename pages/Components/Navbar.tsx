import {  onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import {firebaseAuthRef} from '../firebase/firebaseauth'

export default function Navbar() {
    const [email, setEmail] = useState<string | null>(null)
    const [menu, setMenu] = useState<boolean>(false)

    useEffect(() => {
        onAuthStateChanged(firebaseAuthRef, (user) => {
            if (user) {
              
              setEmail(user.email)
              console.log(user)
              
            } else {
              setEmail(null)
            }
          });
    }, [email])
    

    function onMenuClick () {
        setMenu(!menu)
    }


  return (
    <div>
        <div className='hidden font-bold uppercase justify-around sm:flex bg-gradient-to-r from-[#6669f2]   via-[#4486ff] to-[#5b85e6] text-white'>
            <Link href='/'><h1 className='ml-3 cursor-pointer p-4'>Home</h1></Link>
            <Link href='/Components/Notes'><h1 className='ml-3 cursor-pointer p-4'>Notes</h1></Link>
            <h1 className='ml-3 cursor-pointer p-4'>Recommendations</h1>
            
            {email? 
            <div>
                
                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-cente"><h1 className='ml-3 p-4 border-b-2 cursor-pointer'>{email}</h1></button>
                <div className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul >
                    <li>
                        <a  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    
                    </ul>
                </div>
            </div>:<Link href='/Components/Auth/Login'><h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Login</h1></Link>}
      
        </div>
        <div className='flex sm:hidden justify-end uppercase bg-gradient-to-r from-[#6669f2]   via-[#4486ff] to-[#5b85e6]'>
            {menu ? <div className='absolute duration-300 font-bold text-white bg-gradient-to-r from-[#7375e8] shadow-lg  via-[#4486ff] to-[#4471dc] h-screen w-[50%] top-0 left-0 z-50'>
            <Link href='/'><h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Home</h1></Link>
            <Link href='/Components/'><h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Notes</h1></Link>
            <Link href='/Components/'><h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Recommendations</h1></Link>
            {email? <h1 className='ml-3 p-4 border-b-2 cursor-pointer'>{email}</h1>:<Link href='/Components/Auth/Login'><h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Login</h1></Link>}
        </div> : <div className='absolute duration-300 font-bold text-white bg-gradient-to-r from-[#7375e8] shadow-lg  via-[#4486ff] to-[#4471dc] h-screen top-0 left-[-500px]'>
            <h1 className='ml-3 p-4'>Home</h1>
            <h1 className='ml-3 p-4'>Notes</h1>
            <h1 className='ml-3 p-4'>Recommendations</h1>
            <h1 className='ml-3 p-4'>Login</h1>
        </div> }
            <BiMenuAltRight color='white' onClick={onMenuClick} className='cursor-pointer' size={40}/>
        </div>
    </div>
  )
}
