import React from 'react';
import doug from '../public/facing_right.png';
import Image from 'next/image';

const Topic = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <h1 className='font-bold text-base md:text-xl lg:text-2xl mb-8'>
        This Week&apos;s Playlist Topic
      </h1>
      <div className='flex flex-col md:flex-row w-11/12 md:w-2/3 xl:w-3/5 items-center justify-center'>
        <div className='flex w-1/2 items-center justify-center bg-gold rounded-tl-[100px] rounded-tr-[200px] rounded-bl-[300px] rounded-br-[50px] p-4 md:p-12 mx-0 md:mx-3 mb-4 md:mb-0'>
          <Image src={doug} width={150} height={150} alt='Character'/>
        </div>
        <div className='flex w-1/2 items-center justify-center mx-0 md:mx-3 text-center md:text-left'>
          <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl'>
            Seasonal depression songs
          </h1>
        </div>
      </div>
    </div>
  )
};

export default Topic;