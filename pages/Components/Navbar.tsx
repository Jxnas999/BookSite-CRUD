import { useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
export default function Navbar() {
    const [menu, setMenu] = useState<boolean>(false)
    function onMenuClick () {
        setMenu(!menu)
    }
  return (
    <div>
        <div className='hidden font-bold uppercase justify-around sm:flex bg-gradient-to-r from-[#6669f2]   via-[#4486ff] to-[#5b85e6] text-white'>
            <h1 className='ml-3 p-4'>Home</h1>
            <h1 className='ml-3 p-4'>Notes</h1>
            <h1 className='ml-3 p-4'>Recommendations</h1>
            <h1 className='ml-3 p-4'>Login</h1>
        </div>
        <div className='flex sm:hidden justify-end uppercase bg-gradient-to-r from-[#6669f2]   via-[#4486ff] to-[#5b85e6]'>
            {menu ? <div className='absolute duration-300 font-bold text-white bg-gradient-to-r from-[#7375e8] shadow-lg  via-[#4486ff] to-[#4471dc] h-screen w-[50%] top-0 left-0 z-50'>
            <h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Home</h1>
            <h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Notes</h1>
            <h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Recommendations</h1>
            <h1 className='ml-3 p-4 border-b-2 cursor-pointer'>Login</h1>
        </div> : <div className='absolute duration-300 font-bold text-white bg-gradient-to-r from-[#7375e8] shadow-lg  via-[#4486ff] to-[#4471dc] h-screen top-0 left-[-500px]'>
            <h1 className='ml-3 p-4'>Home</h1>
            <h1 className='ml-3 p-4'>Notes</h1>
            <h1 className='ml-3 p-4'>Recommendations</h1>
            <h1 className='ml-3 p-4'>Login</h1>
        </div> }
            <BiMenuAltRight color='white' onClick={onMenuClick} className='cursor-pointer' size={40}/>
        </div>
    </div>
  )
}
