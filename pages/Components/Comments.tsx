import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { doc, updateDoc, deleteField, arrayRemove } from "firebase/firestore";
import { firebaseDatabase } from "../firebase/firebasedb";
interface Book {
  entry: string;
  currentBook: string;
}
export default function Comments({ entry, currentBook }: Book) {
  async function deleteEntry() {
    const deleteRef = doc(firebaseDatabase, "books", `${currentBook}`);
    await updateDoc(deleteRef, {
      entries: arrayRemove(entry),
    });
  }
  return (
    <div>
      <div className='m-8'>
        <p className='md:text-xl  py-4 outline-none   font-bold  bg-[#3E6ADD] px-6 rounded-2xl drop-shadow-lg text-white '>
          {entry}
        </p>
        <BsTrashFill onClick={deleteEntry} className='fixed'></BsTrashFill>
      </div>
    </div>
  );
}
