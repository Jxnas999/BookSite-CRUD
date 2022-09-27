import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className='h-screen bg-[#000000] bg-cover'>
      <div className='flex flex-col pt-20 text-center select-none'>
        <h1 className='mb-2 text-6xl font-medium antialiased text-transparent md:text-8xl bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text'>
          Sum it up!
        </h1>
        <p className='font-semibold  md:text-xl bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text text-transparent'>
          remember and learn the key points of your book, podcast etc.
        </p>
        <div>
          <Link href='./Components/Adding'>
            <button className='md:text-xl hover:from-[#124fde] hover:to-[#5484ff]  mt-8 py-1  font-bold bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] px-6 rounded-2xl drop-shadow-lg text-white '>
              Start documenting
            </button>
          </Link>
        </div>
      </div>
      <div className=' flex justify-between mx-8 lg:ml-[20%] lg:mr-[20%] mt-[5%]'>
        <div className='flex flex-col text-center'>
          <h1 className='bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text text-transparent text-xl antialiased font-semibold md:text-2xl'>
            Book of the day
          </h1>
          <img
            src='https://images-na.ssl-images-amazon.com/images/I/71ZA+vKnFRL.jpg'
            className='xl:w-[300px] w-[200px]'
          />
        </div>
        <div className='flex flex-col text-center'>
          <h1 className='bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text text-transparent text-xl font-semibold md:text-2xl '>
            Podcast of the day
          </h1>
          <img
            className='xl:w-[300px] w-[200px]'
            src='https://images-na.ssl-images-amazon.com/images/I/71zGEocg7EL.jpg'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
