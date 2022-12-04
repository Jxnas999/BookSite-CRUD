import { useRouter } from "next/router";

const Podcast = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className='flex flex-col items-center mt-10 font-ubuntu'>
      <h1 className='drop-shadow-lg  mb-2 text-6xl font-medium antialiased text-transparent md:text-8xl bg-gradient-to-r from-[#6669f2]   to-[#44b7ff] bg-clip-text'>
        {id}
      </h1>
      <div className='flex flex-col items-center'>
        <textarea
          cols={30}
          rows={10}
          placeholder='Sum it up!'
          className='md:text-xl  max-h-[100px]  mt-8 py-4 outline-none  font-bold bg-gradient-to-r from-[#6669f2] hide-scrollbar  resize-none to-[#44b7ff] px-6 rounded-2xl shadow-custom-box text-white '
        />
        <div>
          <button className=' bg-[#000000] hover:bg-[#5462fb] duration-300  px-10 rounded-2xl text-white mt-2 mx-4 text-xl sm:text-2xl md:text-3xl shadow-custom-box'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
