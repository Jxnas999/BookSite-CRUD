import React, { useState } from "react";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { firebaseDatabase } from "../firebase/firebasedb";
import { useRouter } from "next/router";
export default function Adding() {
  const router = useRouter();
  const [bookOrPodcast, setBookOrPodcast] = useState<boolean | undefined>();
  const [bookInput, setBookInput] = useState<boolean | null>(null);
  const [book, setBook] = useState<string | null>(null);
  const [podcastInput, setPodcastInput] = useState<boolean | null>(null);
  const [podcast, setPodcast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null)
  function handleInputChangeBook(e: any) {
    setBook(e.target.value);
    e.target.value.length > 0 ? setBookInput(true) : setBookInput(false);
  }
  function handleInputChangePodcast(e: any) {
    setPodcast(e.target.value);
    e.target.value.length > 0 ? setPodcastInput(true) : setPodcastInput(false);
  }
  async function createBookEntry() {
    const docRef = doc(firebaseDatabase, 'books', `${book}`)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      console.log('exists')
      setError('The Book is already created, please enter another name.')
      setTimeout(() => {
        setError(null)
      },5000);
    }
    else {
    try {
      await setDoc(doc(firebaseDatabase, "books", `${book}`), {
        name: book,
        entries: [],
      });
      router.push(`/Components/Books/${book}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  }
  async function createPodcastEntry() {
    const docRef = doc(firebaseDatabase, 'podcasts', `${podcast}`)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      console.log('exists')
      setError('The Podcast is already created, please enter another name.')
      setTimeout(() => {
        setError(null)
      },5000);
    }
    else {
    try {
      await setDoc(doc(firebaseDatabase, "podcasts", `${podcast}`), {
        name: podcast,
        entries: [],
      });
      router.push(`/podcast/${podcast}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  }
  return (
    <div className='flex justify-center h-screen font-ubuntu'>
      {error? <div className="absolute top-0  duration-300 animate-bounce p-5 mt-10 rounded-3xl bg-[#3E6ADD] text-[#ffffff] shadow-custom-box">{error}</div>:<div></div>}
      {bookOrPodcast == undefined ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold sm:text-4xl md:text-4xl'>
            What do you want to add?
          </h1>
          <div>
            <button
              onClick={(e) => setBookOrPodcast(true)}
              className='bg-[#3E6ADD] hover:bg-[#2d3fff] duration-300  px-6 rounded-2xl drop-shadow-lg text-white mt-4 mx-4 text-xl sm:text-2xl md:text-3xl shadow-lg'
            >
              Book
            </button>
            <button
              onClick={(e) => setBookOrPodcast(false)}
              className='bg-[#3E6ADD] hover:bg-[#2d3fff] duration-300 px-6 rounded-2xl drop-shadow-lg text-white mt-4 mx-4 text-xl sm:text-2xl md:text-3xl shadow-lg'
            >
              Podcast
            </button>
          </div>
        </div>
      ) : bookOrPodcast ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold sm:text-4xl md:text-4xl'>
            What's the name of it?
          </h1>
          <input
            className='mt-4 sm:min-w-full font-bold sm:text-base border-2 rounded-2xl rounded-br-none sm:py-1 px-2 text-white bg-[#3E6ADD] border-[#3E6ADD]'
            type='search'
            name='booksearch'
            id='1'
            onChange={(e) => handleInputChangeBook(e)}
          />
          {bookInput ? (
            <button
              onClick={createBookEntry}
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
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold sm:text-4xl md:text-4xl'>
            What's the name of it?
          </h1>
          <input
            className='mt-4 sm:min-w-full font-bold sm:text-base border-2 rounded-2xl rounded-br-none sm:py-1 px-2 text-white bg-[#3E6ADD] border-[#3E6ADD]'
            type='search'
            name='booksearch'
            id='1'
            onChange={(e) => handleInputChangePodcast(e)}
          />
          {podcastInput ? (
            <button
              onClick={createPodcastEntry}
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
      )}
    </div>
  );
}
