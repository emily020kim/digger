import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import doug from '../public/facing_left.png';

type GenreCardProps = {
  bgColor: string;
  title: string;
  description: string;
  buttonColor: string;
  link: string;
};

const GenreCard: React.FC<GenreCardProps> = ({ bgColor, title, description, buttonColor, link }) => (
  <div className={`flex flex-col col-span-1 row-span-1 rounded-md p-4 md:p-6 ${bgColor} gap-y-4 md:gap-y-8`}>
    <h1 className='text-white font-bold text-2xl lg:text-3xl'>{title}</h1>
    <p className='text-white text-xs lg:text-base'>{description}</p>
    <Link href={link}>
      <button className={`w-2/3 bg-white rounded-full py-2 ${buttonColor} text-sm md:text-base lg:text-lg font-semibold`}>
        See leaderboard
      </button>
    </Link>
  </div>
);

const MusicGenres = () => {
  const genres = [
    { title: 'Pop', description: 'Artists like Taylor Swift, Ariana Grande, and Olivia Rodrigo.', bgColor: 'bg-[#FCC5D3]', buttonColor: 'text-[#FCC5D3]', link: '/leaderboard/pop' },
    { title: 'Rap', description: 'Artists like 2Pac, Jay-Z, and Kendrick Lamar.', bgColor: 'bg-[#C23B22]', buttonColor: 'text-[#C23B22]', link: '/leaderboard/rap' },
    { title: 'Band', description: 'Artists like Paramore, Coldplay, and The Killers.', bgColor: 'bg-[#A2BFFE]', buttonColor: 'text-[#A2BFFE]', link: '/leaderboard/band' },
    { title: 'Indie', description: 'Artists like Phoebe Bridgers, Mitski, and Hozier.', bgColor: 'bg-[#B1D27D]', buttonColor: 'text-[#B1D27D]', link: '/leaderboard/indie' },
    { title: 'International', description: 'Artists like BTS, Blackpink, Bad Bunny, and Rosalia.', bgColor: 'bg-[#D4AF47]', buttonColor: 'text-[#D4AF47]', link: '/leaderboard/international' },
    { title: 'Rnb', description: 'Artists like SZA, Brent Faiyaz, Usher, and Miguel.', bgColor: 'bg-[#341539]', buttonColor: 'text-[#341539]', link: '/leaderboard/rnb' },
  ];

  return (
    <div className='flex flex-col w-3/4 lg:w-11/12 xl:w-3/4 h-screen mt-12 mb-96 md:my-20 lg:my-8'>
      <div className='flex items-center mb-4'>
        <h1 className='font-bold text-2xl mr-3'>
          Categories
        </h1>
        <Image src={doug} width={50} height={50} alt='Character'/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-3 md:gap-8'>
        {genres.map((genre, index) => (
          <GenreCard 
            key={index}
            title={genre.title}
            description={genre.description}
            bgColor={genre.bgColor}
            buttonColor={genre.buttonColor}
            link={genre.link}
          />
        ))}
      </div>
    </div>
  )
};

export default MusicGenres;