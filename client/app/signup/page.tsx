"use client"

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { setDoc, doc, Timestamp } from "firebase/firestore";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import doug from '../../public/winking.png';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import GoogleAuth from "@/components/GoogleAuth";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isScreenLarge, setIsScreenLarge] = useState(true);
  const router = useRouter();

  const handleClick = () => setShow(!show);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth > 425);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // validate email and password
  const validateForm = () => {
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setError(true);
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      setError(true);
      return false;
    }
    return true;
  };

  // Handle user sign up with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        created_at: Timestamp.now(),
      });

      router.push('/dashboard');
    } catch (err) {
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage("This email address is already in use by another account.");
          break;
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {isScreenLarge && (
        <div className="flex w-1/2 justify-center items-center">
          <div className="flex items-center justify-center bg-gradient-to-bl from-gold to-white rounded-tl-[50px] rounded-tr-[150px] rounded-bl-[200px] rounded-br-[30px] md:w-3/4 md:h-1/3 lg:py-20">
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
            <a 
              href="/signin"
              className="text-gold underline text-sm"
            >
              Login
            </a>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <Input 
              size='md'
              placeholder='Username'
              focusBorderColor='yellow.400'
              _placeholder={{ opacity: 1, color: 'gray.500' }}
              bg='blackAlpha.200'
              mb={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              type="submit"
              className="bg-gradient-to-r from-gold to-goldEnd rounded-full text-white font-semibold px-6 py-2 md:text-base mb-8"
            >
              Create account
            </button>
          </form>
          {error && (
            <p className="text-red-600 text-sm mt-3">
              {errorMessage}
            </p>
          )}
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