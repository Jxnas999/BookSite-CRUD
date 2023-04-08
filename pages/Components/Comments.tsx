import React, { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { doc, updateDoc, deleteField, arrayRemove } from "firebase/firestore";
import { firebaseDatabase } from "../firebase/firebasedb";
import { useRouter } from "next/router";
interface Book {
  entry: string;
  currentBook: string;
}
export default function Comments({ entry, currentBook }: Book) {
  const router = useRouter()
  const [deleted, setDeleted] = useState<boolean>(false)
  async function deleteEntry() {
    const deleteRef = doc(firebaseDatabase, "books", `${currentBook}`);
    await updateDoc(deleteRef, {
      entries: arrayRemove(entry),
    });
    setDeleted(true)
  }
  return (
    <div>
      {!deleted ? <div className='m-8 md:text-xl shadow-custom-box min-w-[250px] max-w-[250px] max-h-[250px] overflow-y-scroll   py-4 outline-none   bg-[#3E6ADD] px-6 rounded-2xl drop-shadow-lg text-white '>
        <p className=''>
          {entry}
        </p>
        <BsTrashFill className="drop-shadow-md ml-auto duration-150 hover:text-[#1f1f1f]" onClick={deleteEntry}></BsTrashFill>

      </div>:<div></div>}
    </div>
  );
}
