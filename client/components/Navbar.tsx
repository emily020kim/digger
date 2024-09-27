"use client"

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import Link from "next/link";

import Image from 'next/image';
import logo from '../public/diggr.png';

type NavbarProps = {
  session: Session;
};

const Navbar: React.FC<NavbarProps> = ({ session }: NavbarProps) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(75);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setWidth(75);
        setHeight(50);
        setIsMobileView(true);
      } else {
        setWidth(100);
        setHeight(75);
        setIsMobileView(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='flex w-full py-4 shadow-lg justify-around'>
      <Image src={logo} width={width} height={height} alt='Logo' />
      <div className='flex items-center gap-x-2 md:gap-x-4'>
        <Link href='/signin'>
          <button 
            className='border-[1px] border-gold py-2 px-4 md:py-2 md:px-5 text-gold font-semibold rounded-full text-sm md:text-lg'
          >
            Login
          </button>
        </Link>
        <Link href='/signup'>
          <button 
            className='py-2 px-4 md:py-2 md:px-5 text-white font-semibold bg-gradient-to-r from-gold to-goldEnd rounded-full text-sm md:text-lg'
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;