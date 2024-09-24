import React from 'react';
import { FaMusic } from "react-icons/fa6";
import { LuVote } from "react-icons/lu";
import { PiRanking } from "react-icons/pi";
import { TbPlaylist } from "react-icons/tb";

const Features = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 w-5/6 lg:w-3/4 xl:2/3 h-2/3 gap-8'>
        <div className='flex flex-col-reverse col-span-1 row-span-1 gap-y-5 px-4 py-8 bg-[#fbfbfb] shadow-md border-[1px] border-[#cfcfcf] rounded-lg hover:scale-105'>
          <p className='font-semibold text-sm lg:text-base text-gray-500'>
            Know an underrated song? Submit a link
          </p>
          <h1 className='md:text-xl lg:text-2xl font-bold'>
            Submit a track
          </h1>
          <FaMusic size={27} />
        </div>
        <div className='flex flex-col-reverse col-span-2 row-span-1 gap-y-5 px-4 py-8 bg-[#fbfbfb] shadow-md border-[1px] border-[#cfcfcf] rounded-lg hover:scale-105'>
          <p className='font-semibold text-sm lg:text-base text-gray-500'>
            Users can vote for a song they like from each genre
          </p>
          <h1 className='md:text-xl lg:text-2xl font-bold'>
            Vote for submissions
          </h1>
          <LuVote size={30} />
        </div>
        <div className='flex flex-col-reverse col-span-2 row-span-1 gap-y-5 px-4 py-8 bg-[#fbfbfb] shadow-md border-[1px] border-[#cfcfcf] rounded-lg hover:scale-105'>
          <p className='font-semibold text-sm lg:text-base text-gray-500'>
            Submitted tracks will be ranked by highest to lowest votes
          </p>
          <h1 className='md:text-xl lg:text-2xl font-bold'>
            Explore the rankings
          </h1>
          <PiRanking size={30} />
        </div>
        <div className='flex flex-col-reverse col-span-1 row-span-1 gap-y-5 px-4 py-8 bg-[#fbfbfb] shadow-md border-[1px] border-[#cfcfcf] rounded-lg hover:scale-105'>
          <p className='font-semibold text-sm lg:text-base text-gray-500'>
            Top 10 tracks from each genre will be combined into a playlist
          </p>
          <h1 className='md:text-xl lg:text-2xl font-bold'>
            Weekly Curated Playlists
          </h1>
          <TbPlaylist size={30} />
        </div>
      </div>
    </div>
  );
};

export default Features;