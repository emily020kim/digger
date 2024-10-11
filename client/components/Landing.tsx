"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import doug1 from "../public/mouth_open.png";
import Description from "./Description";
import Features from "./Features";
import Join from "./Join";

const Landing = () => {
  const [size, setSize] = useState(300);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setSize(180);
      } else if (window.innerWidth <= 768) {
        setSize(200);
      }
      else {
        setSize(300);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen px-0 md:px-8 mb-4 md:mb-0">
        <div className="flex flex-col w-full md:w-1/2 justify-center gap-y-3 px-4 lg:px-12 xl:px-24">
          <p className="text-gold text-sm lg:text-base font-semibold">
            | music discovery platform
          </p>
          <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl tracking-wider leading-relaxed">
            Bored of your playlist? That&apos;s where <span className="text-gold">Diggr</span> comes in
          </h1>
          <button 
            className='w-1/2 xl:w-1/3 py-2 px-4 md:py-2 md:px-5 text-white font-semibold bg-gradient-to-r from-gold to-goldEnd rounded-full text-sm md:text-base lg:text-lg'
            onClick={() => router.push('/signup')}
          >
            Start Digging
          </button>
        </div>
        <div className="flex w-full md:w-1/2 items-center justify-center py-12">
          <div className="flex items-center justify-center bg-gradient-to-br from-gold to-slate-50 rounded-full w-7/8 lg:w-4/5 xl:w-2/3 h-full py-12 px-8 lg:px-0">
            <Image src={doug1} width={size} height={size} alt="Character" />
          </div>
        </div>
      </div>
      <Description />
      <Features />
      <Join />
    </>
  )
};

export default Landing;