import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firebaseDatabase } from "../../firebase/firebasedb";
import Link from "next/link";
import Comments from "../Comments";

const Book = () => {
  const router = useRouter();
  const [currentBook, setCurrentBook] = useState<any>();
  const [book, setBook] = useState<boolean | null>(null);
  const [bookEntries, setBookEntries] = useState<string[] | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [refresh, setRefresh] = useState<number>(0);
  useEffect(() => {
    let book: string;
    function getRouterQuery() {
      if (router.isReady) {
        const { id } = router.query;
        setCurrentBook(id);
        book = id as string;
      }
    }
    getRouterQuery();

    async function getBooks() {
      const docRef = doc(firebaseDatabase, "books", `${book}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBook(true);
        setBookEntries(docSnap.data().entries);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getBooks();
  }, [router.isReady]);

  async function addingInfo() {
    const documentRef = doc(firebaseDatabase, "books", `${currentBook}`);
    await updateDoc(documentRef, {
      entries: arrayUnion(ref.current?.value),
    });
    //@ts-ignore
    router.reload(window.location.pathname);
  }
  return (
    <div className='min-w-[340px]'>
      {book ? (
        <div>
          <div className='flex flex-col items-center mt-10 font-ubuntu'>
            <h1 className='mb-2 text-6xl font-medium antialiased  md:text-8xl text-[#3E6ADD]'>
              {currentBook}
            </h1>
            <div className='flex flex-col items-center'>
              <textarea
                cols={30}
                rows={10}
                placeholder='Sum it up!'
                ref={ref}
                className='md:text-xl  max-h-[100px]  mt-8 py-4 outline-none  font-bold  hide-scrollbar  resize-none bg-[#3E6ADD] px-6 rounded-2xl drop-shadow-lg text-white '
              />
              <div>
                <button
                  onClick={addingInfo}
                  className=' bg-[#000000] hover:bg-[#3E6ADD] duration-300  px-10 rounded-2xl drop-shadow-lg text-white mt-2 mx-4 text-xl sm:text-2xl md:text-3xl shadow-lg'
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            {bookEntries &&
              bookEntries.map((item) => {
                return <Comments entry={item} />;
              })}
          </div>
        </div>
      ) : (
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
        </div>
      )}
    </div>
  );
};

export default Book;
