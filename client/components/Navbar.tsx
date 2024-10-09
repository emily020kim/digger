"use client"

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react"; 
import Link from "next/link";
import Image from 'next/image';
import logo from '../public/diggr.png';
import { 
  Avatar, 
  useDisclosure, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Button,
} from '@chakra-ui/react';
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(75);
  const [isMobileView, setIsMobileView] = useState(false);
  const [user, setUser] = useState(null);

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

  // Check Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <div className='flex w-full py-4 shadow-lg justify-around'>
      <Link href='/'>
        <Image src={logo} width={width} height={height} alt='Logo' />
      </Link>
      {user ? (
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <Avatar src={'https://bit.ly/broken-link'} onClick={onOpen}/>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Profile settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='#FBB902' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <button 
            className='py-2 px-4 md:py-2 md:px-5 text-white font-semibold bg-gradient-to-r from-gold to-goldEnd rounded-full text-sm md:text-lg'
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Navbar;