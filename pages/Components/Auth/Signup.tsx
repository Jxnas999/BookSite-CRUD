import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div className='bg-[#1D1D1D] font-inter '>
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-4xl font-bold text-white'>Create an Account</h1>
        <input
          type='email'
          placeholder='Email'
          className='px-10 md:min-w-[400px] min-w-[300px] bg-[#2B2B2B] focus:outline-[#3079df] my-4 rounded-lg py-2 outline-none text-white font-medium '
        />
        <input
          type='password'
          placeholder='Password'
          className='px-10 md:min-w-[400px] min-w-[300px] bg-[#2B2B2B] focus:outline-[#3079df] rounded-lg py-2 outline-none text-white font-medium '
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='px-10 md:min-w-[400px] min-w-[300px] bg-[#2B2B2B] focus:outline-[#3079df] rounded-lg py-2 outline-none mt-4 text-white font-medium '
        />
        <button className=' md:min-w-[400px] uppercase min-w-[300px]  bg-[#FFF] rounded-xl px-8 mt-4 font-bold sm:px-10 py-2'>
          Sign up
        </button>
        <div className='flex mt-4'>
          <p className='text-[#525252]'>Already have an Account?</p>
          <Link href='/Components/Auth/Login'>
            <a className='ml-2 font-bold text-[#66ace9]'>Log in</a>
          </Link>
        </div>
      </div>
    </div>
  );
}