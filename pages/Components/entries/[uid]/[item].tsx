import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { TiArrowBack } from 'react-icons/ti'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firebaseDatabase } from "../../../firebase/firebasedb";
import Link from "next/link";
import Comments from "../../Comments";
import {  onAuthStateChanged } from "firebase/auth";
import { firebaseAuthRef } from "../../../firebase/firebaseauth";

const Book = () => {
  const router = useRouter();
  const [currentBook, setCurrentBook] = useState<any>();
  const [book, setBook] = useState<boolean | null>(null);
  const [bookEntries, setBookEntries] = useState<string[] | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [addedInfo, setAddedInfo] = useState<number>(0)
  const [uid, setUid] = useState<string | null>(null)
  
  useEffect(() => {

      if (router.isReady) {
        var { item } = router.query;

       setCurrentBook(item as string);
      }

    
    onAuthStateChanged(firebaseAuthRef, (user) => {
      if (user) {
        setUid(user.uid)
        // ...
      } else {
        setUid(null)

      }
    });
    

    async function getBooks() {
      if(uid){
      setLoading(true)
      const docRef = doc(firebaseDatabase, uid, `${item}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBook(true);
        setBookEntries(docSnap.data().entries);
        setLoading(false)
      } else {
        console.log("No such document!");
      }
      }
    }
    getBooks();

  }, [router.isReady, addedInfo, uid, router.query]);

  async function addingInfo() {
    if(uid){
      const documentRef = doc(firebaseDatabase, uid, `${currentBook}`);
      await updateDoc(documentRef, {
        entries: arrayUnion(ref.current?.value),
      });
      setLoading(true);
      setAddedInfo(addedInfo+1)
    }
  }
  return (
    <div className='min-w-[340px] font-ubuntu'>
      <Link  href='/'><TiArrowBack size={50} className="cursor-pointer"/></Link>
      {book ? (
        <div>
          <div className='flex flex-col items-center mt-10 '>
            <h1 className=' text-6xl font-medium antialiased  md:text-8xl text-[#000]  p-3 rounded-lg drop-shadow-lg'>
              {currentBook}
            </h1>
            <div className='flex flex-col items-center'>
              <textarea
                cols={30}
                rows={10}
                placeholder='Sum it up!'
                ref={ref}
                className='md:text-xl  max-h-[100px]  mt-8 py-4 outline-none    hide-scrollbar  resize-none bg-[#000] px-6 rounded-2xl shadow-custom-box text-white '
              />
              <div>
                <button
                  onClick={addingInfo}
                  className='shadow-custom-box bg-[#000000] hover:bg-[#3E6ADD] duration-300  px-10 rounded-2xl text-white mt-2 mx-4 text-xl sm:text-2xl md:text-3xl'
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap'>
            {bookEntries &&
              bookEntries.map((item) => {
                return (
                  <Comments key={item} currentBook={currentBook} uid={uid} entry={item} />
                );
              })}
          </div>
        </div>
      ) : (

        <div>

        {loading? <div className="flex justify-center items-center" role="status">
                  <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>:  
            <div className='flex flex-col items-center justify-center h-screen bg-[#2f2f2f] font-ubuntu'>
              <h1 className='mb-8 uppercase text-2xl sm:text-4xl font-bold text-center antialiased text-transparent  bg-gradient-to-r from-[#66b3f2c0]  to-[#156de1] bg-clip-text'>
                Please Login to use our service
              </h1>
          <div>
            <Link href='/Components/Auth/Login'>
              <button className='mr-8 uppercase text-white bg-[#1D1D1D] rounded-2xl px-8 hover:bg-[black] font-bold sm:px-10 py-1'>
                Login
              </button>
            </Link>
            <Link href='/Components/Auth/Signup'>
              <button className='uppercase text-white bg-[#1D1D1D] rounded-2xl px-8 hover:bg-[black] font-bold sm:px-10 py-1'>
                Sign Up
              </button>
            </Link>
          </div>
        </div>}
       
        </div>
      )}
    </div>
  );
};

export default Book;
