import Image from 'next/image';
import doug1 from '../public/facing_right.png';
import doug2 from '../public/waving.png';


const Description = () => {
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center gap-y-8'>
      <h1 className='w-7/8 md:w-1/2 xl:w-1/3 text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-center'>
        A community where you help each other find new songs
      </h1>
      <div className='flex justify-around items-center md:w-2/3 lg::w-1/2 md:h-1/3 bg-gold rounded-tl-[175px] rounded-tr-[50px] rounded-br-[175px] rounded-bl-[50px]'>
        <Image src={doug1} width={150} height={150} alt='Character' />
        <Image src={doug2} width={150} height={150} alt='Character' className='pb-16' />
      </div>
    </div>
  );
};

export default Description;