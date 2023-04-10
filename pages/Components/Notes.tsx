import React from 'react'
import Navbar from './Navbar'
import { collection, getDocs, query } from "firebase/firestore";
import {useEffect, useState} from 'react'
import { firebaseDatabase } from '../firebase/firebasedb';
import Link from 'next/link';
import { firebaseAuthRef } from '../firebase/firebaseauth';
import { onAuthStateChanged } from 'firebase/auth';



function Notes() {
    const [uid, setUid] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [books, setBooks] = useState<string[]>()
    
    useEffect(() => {
      
      onAuthStateChanged(firebaseAuthRef, (user) => {
        if (user) {
          console.log(user)
          setUid(user.uid)
          setEmail(user.email)
          
        } else {
          setUid(null)
          setEmail(null)

        }
      });

      async function getNotes(){
        if(uid){
          console.log(uid)
          const q = query(collection(firebaseDatabase, uid))
          const querySnapshot = await getDocs(q);
          const tempBooks: string[] = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            tempBooks.push(doc.data().name)
          });
          setBooks(tempBooks)
        }
        else{
          console.log('No req')
        }
       }
       getNotes()
        
      
    }, [uid]) 
    
    return (
    <div className='font-ubuntu'>
        <Navbar uid={uid} email={email}/>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-bold mt-4 border-b-4 border-black'>These are your Notes🧐</h1>
          <div className='flex flex-col relative'>
          {books && books.map(item => {
            return(
              <Link href={`/Components/entries/${uid}/${item}`} className='cursor-pointer '><button className='mb-2 px-20 py-2 bg-black text-3xl font-medium antialiased mt-4 md:text-4xl text-[#fff] hover:text-black hover:bg-white duration-300 drop-shadow-lg' key={item}>{item}</button></Link>
              )})}
            </div>
        </div>
        
    </div>
  )
}

export default Notes

