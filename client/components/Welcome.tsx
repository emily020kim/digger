import React from 'react';
import Image from 'next/image';
import doug from '../public/waving.png';
import { FaArrowRight } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <div className='flex flex-col md:flex-row justify-center items-center bg-gold p-4 w-4/5 md:w-2/3 lg:w-1/2 h-1/4 md:h-1/3 rounded-md mb-16 mt-24'>
        <div className='flex justify-center items-center w-1/2'>
          <h1 className='font-bold text-white text-2xl md:text-3xl xl:text-5xl text-center mb-4 md:mb-0'>
            Welcome to Diggr!
          </h1>
        </div>
        <div className='flex items-center justify-center w-1/2'>
          <Image src={doug} width={200} height={200} alt='Character' />
        </div>
      </div>
      <div className='flex justify-center items-center border-[1px] border-[#CFCFCF] rounded-md p-4 shadow-sm hover:scale-105'>
        <h3 className='text-gold font-semibold mr-2'>
          Submit your song
        </h3>
        <div className='bg-gold p-2 rounded-full'>
          <FaArrowRight size={20} className='text-white'/>
        </div>
      </div>
    </div>
  )
};

export default Welcome;