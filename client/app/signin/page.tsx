"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import doug from '../../public/winking.png';
import { Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import GoogleAuth from "@/components/GoogleAuth";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [show, setShow] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth > 425);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error("Login failed:" , error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {isScreenLarge && (
        <div className="flex w-1/2 justify-center items-center">
          <div className="flex items-center justify-center bg-gradient-to-bl from-gold to-white rounded-tl-[50px] rounded-tr-[150px] rounded-bl-[200px] rounded-br-[30px] md:w-3/4 md:h-1/3 lg:h-2/3 lg:py-20">
            <Image src={doug} width={200} height={200} alt="Character" />
          </div>
        </div>
      )}
      <div className="flex w-11/12 md:w-2/3 lg:w-1/2 justify-center items-center">
        <div className="flex flex-col xl:w-2/3 xl:h-2/3 bg-[#FBFBFB] rounded-lg items-center px-8 py-5 md:px-16 md:py-10 shadow-md">
          <h1 className="text-2xl lg:text-3xl font-bold mb-8">
            Welcome back
          </h1>
          <div className="flex items-center mb-10">
            <p className="text-[#808080] text-sm mr-2">
              Don&apos;t have an account?
            </p>
            <a 
              className="text-gold underline text-sm"
              href="/signup"
            >
              Sign Up
            </a>
          </div>
          <Input 
            size='md'
            placeholder='Email'
            focusBorderColor='yellow.400'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            bg='blackAlpha.200'
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup size='md' mb={3}>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Password'
              bg='blackAlpha.200'
              focusBorderColor='yellow.400'
              _placeholder={{ opacity: 1, color: 'gray.500' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <button 
            disabled={isLoading}
            onClick={handleLogin}
            className="bg-gradient-to-r from-gold to-goldEnd rounded-full text-white font-semibold px-6 py-2 md:text-base mb-8"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm font-medium text-[#808080] mb-10">
            Or login with
          </p>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};