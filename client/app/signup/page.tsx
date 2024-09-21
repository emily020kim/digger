"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from 'next-auth/react';
import { Alert } from "@chakra-ui/react";

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const searchParam = useSearchParams();
  const [email, setEmail] = useState(searchParam.get('email'));
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.replace('/signup', undefined);
    console.log("email: ", email);
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("signup email: ", email);
    const body = JSON.stringify({ email: email, display_name: username });
    const response = await fetch('http://localhost:5147/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (response.ok) {
      setShowAlert(true);
      setTimeout(() => {
        signIn();
      }, 1500);
    } else {
      console.log("Couldn't create account for: ", username);
      console.log("Code: ", response.status);
    }
  };

  return (
    <div className="flex justify-center h-full text-[#825AF6]">
      <div className="w-full md:max-w-md max-w-xs">
        <h1 className="text-4xl font-bold mb-8 text-center">Create New Account</h1>
        <form className="bg-[#262626]/50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="artistname">
              Artist Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-[#262626]/50 text-white"
              id="artistname"
              type="text"
              placeholder="Artist Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end">
            <button onClick={handleSubmit} className="text-white bg-purpleBtn w-[140px] h-[32px] rounded-md 
                hover:bg-white hover:text-purpleBtn hover:border-purpleBtn transition duration-300 ease-in-out"
            >  Sign Up
            </button>
          </div>
        </form>
        {showAlert && <Alert status="success" mt={4} variant="solid">{'Sign Up Successful, Sign In Now!'}</Alert>}
      </div>
    </div> 
    
  );
};

export default SignupPage;