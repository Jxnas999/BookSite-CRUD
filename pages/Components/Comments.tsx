import React from "react";
interface Book {
  entry: string;
}
export default function Comments({ entry }: Book) {
  return (
    <div className='inline-flex max-w-[200px]'>
      <p className='md:text-xl m-8 py-4 outline-none   font-bold  bg-[#3E6ADD] px-6 rounded-2xl drop-shadow-lg text-white '>
        {entry}
      </p>
    </div>
  );
}
