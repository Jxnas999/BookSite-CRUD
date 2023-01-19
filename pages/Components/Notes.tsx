import React from 'react'
import Navbar from './Navbar'
import { collection, getDocs } from "firebase/firestore";
import { useUser } from '../Context/UserContext';
import {useEffect, useState} from 'react'
import { firebaseDatabase } from '../firebase/firebasedb';



export default function Notes() {
    const {email, setEmail, uid, setUid} = useUser()
    const [books, setBooks] = useState<string[]>()

     useEffect(() => {
      console.log(email)

       const getNotes = async () => {
        if(uid){
          const querySnapshot = await getDocs(collection(firebaseDatabase, uid));
          const tempBooks: string[] = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempBooks.push(doc.data().name)
          });
          setBooks(tempBooks)
        }
       }
       getNotes()
        
      
    }, []) 
    
    console.log(books)
    return (
    <div>
        <Navbar/>
        <div>
          {books && books.map(item => {
            return(
              <h1>{item}</h1>
            )
          })}
        </div>
    </div>
  )
}
