import React from 'react'
import Navbar from './Navbar'
import { collection, getDocs } from "firebase/firestore";
import { useUser } from '../Context/UserContext';
import {useEffect, useState} from 'react'
import { firebaseDatabase } from '../firebase/firebasedb';
import Link from 'next/link';
import { firebaseAuthRef } from '../firebase/firebaseauth';
import { onAuthStateChanged } from 'firebase/auth';



function Notes() {
    const [uid, setUid] = useState<string | null>(null)
    const [books, setBooks] = useState<string[]>()
    
    useEffect(() => {
      console.log(uid)
      onAuthStateChanged(firebaseAuthRef, (user) => {
        if (user) {
          setUid(user.uid)
        } else {
          setUid(null)
        }
      });

      const getNotes = async () => {
        if(uid){
          const querySnapshot = await getDocs(collection(firebaseDatabase, uid));
          const tempBooks: string[] = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            tempBooks.push(doc.data().name)
          });
          setBooks(tempBooks)
        }
       }
       getNotes()
        
      
    }, [uid]) 
    
    return (
    <div className='font-ubuntu'>
        <Navbar/>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-bold mt-4 border-b-4 border-black'>These are your Notes🧐</h1>
          {books && books.map(item => {
            return(<h1 className='mb-2 text-3xl font-medium antialiased mt-4  md:text-4xl text-[#3E6ADD] drop-shadow-lg' key={item}><Link href={`/Components/entries/${uid}/${item}`} className='cursor-pointer '>{item}</Link></h1>)})}
        </div>
        
    </div>
  )
}

export default Notes

