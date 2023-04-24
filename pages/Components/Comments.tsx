import React, { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { firebaseDatabase } from "../../firebase/firebasedb";
interface Book {
  entry: string;
  currentBook: string;
  uid: string | null;
}
export default function Comments({ entry, currentBook, uid }: Book) {
  const [deleted, setDeleted] = useState<boolean>(false)

  async function deleteEntry() {
    if(uid){
      const deleteRef = doc(firebaseDatabase, `${uid}`, `${currentBook}`);
      await updateDoc(deleteRef, {
        entries: arrayRemove(entry),
      });
      setDeleted(true)
    }
  }
  return (
    <div className="font-">
      {!deleted ? <div className='bg-black m-8 md:text-xl shadow-custom-box md:max-h-[400px] md:min-h-[400px] md:min-w-[300px] md:max-w-[300px] overflow-y-scroll scrollbar  py-4 outline-none   bg-[#3E6ADD] px-6 rounded-2xl drop-shadow-lg text-white '>
        <p className="font-inter">
          {entry}
        </p>
        <BsTrashFill className="drop-shadow-md cursor-pointer ml-auto duration-150 hover:text-[#1f1f1f]" onClick={deleteEntry}></BsTrashFill>

      </div>:<div></div>}
    </div>
  );
}
