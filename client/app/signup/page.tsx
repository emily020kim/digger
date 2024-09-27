"use client"

import { useState, useEffect } from "react";

import Image from "next/image";
import doug from '../../public/winking.png';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import GoogleAuth from "@/components/GoogleAuth";

const SignupPage = () => {
  const [show, setShow] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(true);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth > 425);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {isScreenLarge && (
        <div className="flex w-1/2 justify-center items-center">
          <div className="flex items-center justify-center bg-gradient-to-bl from-gold to-white rounded-tl-[50px] rounded-tr-[150px] rounded-bl-[200px] rounded-br-[30px] md:w-3/4 md:h-1/3">
            <Image src={doug} width={200} height={200} alt="Character" />
          </div>
        </div>
      )}
      <div className="flex w-11/12 md:w-2/3 lg:w-1/2 justify-center items-center">
        <div className="flex flex-col xl:w-2/3 xl:h-2/3 bg-[#FBFBFB] rounded-lg items-center px-8 py-5 md:px-16 md:py-10 shadow-md">
          <h1 className="text-2xl lg:text-3xl font-bold mb-8">
            Create an account
          </h1>
          <div className="flex items-center mb-10">
            <p className="text-[#808080] text-sm mr-2">
              Already have an account?
            </p>
            <a className="text-gold underline text-sm">
              Login
            </a>
          </div>
          <Input 
            size='md'
            placeholder='Username'
            focusBorderColor='yellow.400'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            bg='blackAlpha.200'
            mb={3}
          />
          <Input 
            size='md'
            placeholder='Email'
            focusBorderColor='yellow.400'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            bg='blackAlpha.200'
            mb={3}
          />
          <InputGroup size='md' mb={3}>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Password'
              bg='blackAlpha.200'
              focusBorderColor='yellow.400'
              _placeholder={{ opacity: 1, color: 'gray.500' }}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <button className="bg-gradient-to-r from-gold to-goldEnd rounded-full text-white font-semibold px-6 py-2 md:text-base mb-8">
            Create account
          </button>
          <p className="text-sm font-medium text-[#808080] mb-10">
            Or register with
          </p>
          <GoogleAuth />
        </div>
      </div>
    </div> 
  );
};

export default SignupPage;