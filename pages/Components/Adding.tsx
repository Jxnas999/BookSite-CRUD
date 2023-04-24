import React, { useState, useEffect } from "react";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { firebaseDatabase } from "../../firebase/firebasedb";
import { useRouter } from "next/router";
import { useUser } from '../Context/UserContext'
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuthRef } from "../../firebase/firebaseauth";
export default function Adding() {
  const router = useRouter();
  const [addInput, setAddInput] = useState<boolean | undefined>();
  const [input, setInput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuthRef, (user) => {
        if (user) {
          
          setUid(user.uid)
          
        } else {
          setUid(null)
        }
      });
    }, [uid])


  function handleInputChange(e: any) {
    setInput(e.target.value);
  }
  
  async function createEntry() {
    if(uid){
    const docRef = doc(firebaseDatabase, uid , `${input}`)
    const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setError('The Book is already created, please enter another name.')
        setTimeout(() => {
          setError(null)
        },5000);
      }
    
      else {
        try {
          await setDoc(doc(firebaseDatabase, uid, `${input}`), {
            name: `${input}`,
            entries: [],
          });
          router.push(`/Components/entries/${uid}/${input}`);
        } 
        catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    } else {
      setError('You need to create an Account')
      setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }
  
  return (
    <div className='flex justify-center h-screen font-ubuntu'>
      {error? <div className="absolute top-0  duration-300 animate-bounce p-5 mt-10 rounded-3xl bg-[#3E6ADD] text-[#ffffff] shadow-custom-box">{error}</div>:<div></div>}
      {addInput == undefined ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold sm:text-4xl md:text-4xl'>
            What do you want to add?
          </h1>
          <div>
            <button
              onClick={(e) => setAddInput(true)}
              className='bg-[#3E6ADD] hover:bg-[#2d3fff] duration-300  px-6 rounded-2xl drop-shadow-lg text-white mt-4 mx-4 text-xl sm:text-2xl md:text-3xl shadow-lg'
            >
              Book
            </button>
            <button
              onClick={(e) => setAddInput(true)}
              className='bg-[#3E6ADD] hover:bg-[#2d3fff] duration-300 px-6 rounded-2xl drop-shadow-lg text-white mt-4 mx-4 text-xl sm:text-2xl md:text-3xl shadow-lg'
            >
              Podcast
            </button>
          </div>
        </div>
      ) : addInput ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold sm:text-4xl md:text-4xl'>
            What's the name of it?
          </h1>
          <input
            className='mt-4 sm:min-w-full font-bold sm:text-base border-2 rounded-2xl rounded-br-none sm:py-1 px-2 text-white bg-[#3E6ADD] border-[#3E6ADD]'
            type='search'
            name='booksearch'
            id='1'
            onChange={(e) => handleInputChange(e)}
          />
          {input ? (
            <button
              onClick={createEntry}
              className='bg-[#000]  duration-300 hover:bg-[#585959] px-3 rounded-2xl rounded-tr-none drop-shadow-2xl text-white ml-auto sm:text-xl  shadow-lg'
            >
              Create
            </button>
          ) : (
            <button className='bg-[#fff] cursor-default duration-300  px-2 rounded-2xl rounded-tr-none  text-white ml-auto sm:text-xl  '>
              Create
            </button>
          )}
        </div>
      ) : <div></div>}
    </div>
  );
}
