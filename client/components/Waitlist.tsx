import Image from "next/image";
import logo from "../public/logo.png";

import { Input } from "@chakra-ui/react";

const Waitlist = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex w-1/2 bg-cyan rounded-xl py-12 px-4">
        <div className="flex items-start justify-center w-1/2">
          <Image src={logo} width={200} height={200} alt="Logo" />
        </div>

        <div className="flex flex-col w-1/2">
          <h1 className="text-3xl text-white font-bold mb-10">
            Join Diggr today!
          </h1>
          <p className="text-xl text-white font-medium mb-8">
            Be the first to know when our platform launches. 
            Your excitement is what will make Diggr shine.
          </p>
          <h3 className="text-xl text-white font-semibold mb-4">
            Sign up for the waitlist
          </h3>
          <Input 
            placeholder='Enter your email'
            size='lg' 
            focusBorderColor='white'
          />
          <button className="rounded-full px-3 py-2 w-1/4 bg-gold text-white text-lg font-semibold mt-6">
            Join
          </button>
        </div>
      </div>
    </div>
  )
};

export default Waitlist;