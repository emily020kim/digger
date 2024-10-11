"use client"

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import doug from '../public/sunglasses.png';

const Join = () => {
  const router = useRouter();

  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <div className='flex flex-col md:flex-row w-5/6 h-1/3 md:w-2/3 xl:w-1/2 md:h-1/3 bg-gold items-center justify-center rounded-lg'>
        <div className='flex w-1/2 justify-center items-center'>
          <Image src={doug} width={150} height={150} alt='Character' />
        </div>
        <div className='flex flex-col justify-center items-center gap-y-8'>
          <h1 className='text-xl md:text-2xl xl:text-3xl font-bold text-white'>
            Join Diggr today!
          </h1>
          <button 
            className='w-3/4 md:w-1/2 lg:text-base xl:text-lg font-semibold text-gold bg-white rounded-full px-4 py-2'
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;