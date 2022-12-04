import { ifError } from "assert";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { firebaseDatabase } from "../../firebase/firebasedb";
import React, { useRef, useState, useContext } from "react";
import { firebaseAuthRef } from "../../firebase/firebaseauth";
import Router from "next/router";

export default function Login() {
  
 const email = useRef<HTMLInputElement>(null)
 const password = useRef<HTMLInputElement>(null)

 
  async function LoginFun () {
    console.log(email)
    if(email.current && password.current){
    signInWithEmailAndPassword(firebaseAuthRef, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      console.log(firebaseDatabase)
      Router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
 
  }
}
  return (
    <div className='bg-[#1D1D1D] font-inter '>
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-4xl font-bold text-white'>Log in to Account</h1>
        <input
        ref={email}
          type='email'
          placeholder='Email'
          className='px-10 md:min-w-[400px] min-w-[300px] bg-[#2B2B2B] focus:outline-[#3079df] my-4 rounded-lg py-2 outline-none text-white font-medium '
        />
        <input
        ref={password}
          type='password'
          placeholder='Password'
          className='px-10 md:min-w-[400px] min-w-[300px] bg-[#2B2B2B] focus:outline-[#3079df] rounded-lg py-2 outline-none text-white font-medium '
        />
        <button onClick={LoginFun} className=' md:min-w-[400px] uppercase min-w-[300px]  bg-[#FFF] rounded-xl px-8 mt-4 font-bold sm:px-10 py-2'>
          Log in
        </button>
        <div className='flex mt-4'>
          <p className='text-[#525252]'>Don't have an account?</p>
          <Link href='/Components/Auth/Signup'>
            <a className='ml-2 font-bold text-[#66ace9]'>Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
