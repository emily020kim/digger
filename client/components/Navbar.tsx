"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut, getProviders } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import { Session } from "next-auth";
import logo from "../public/logo.png";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";

type NavbarProps = {
  session: Session;
};

const Navbar: React.FC<NavbarProps> = ({ session }: NavbarProps) => {
  const [size, setSize] = useState(60);
  const [isMobileView, setIsMobileView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setSize(50);
        setIsMobileView(true);
      } else if (window.innerWidth <= 768) {
        setSize(50);
        setIsMobileView(false);
      } else {
        setSize(60);
        setIsMobileView(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full justify-between items-center py-4 px-8">
      <div className="flex">
        <Image src={logo} width={size} height={size} alt="Logo" />
      </div>

      {!isMobileView && (
        <>
          <div className="flex gap-x-4 md:gap-x-16 items-center">
            <a href="/mission" className="text-sm md:text-base lg:text-lg font-medium">
              Mission
            </a>
            <a href="/about" className="text-sm md:text-base lg:text-lg font-medium">
              About
            </a>
            <a href="/support" className="text-sm md:text-base lg:text-lg font-medium">
              Support
            </a>
          </div>
          <div className="flex">
            <button 
              className="text-sm md:text-base lg:text-lg text-white font-medium px-2 py-1 lg:px-3 lg:py-2 bg-cyan rounded-md hover:bg-opacity-75"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        </>
      )}

      {isMobileView && (
        <>
          <div className="flex">
            <div 
              ref={btnRef} 
              className="font-semibold cursor-pointer"
              onClick={onOpen}
            >
              <CiMenuFries size={20} />
            </div>
          </div>

          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Diggr</DrawerHeader>

              <DrawerBody>
                <div className="flex flex-col gap-y-6">
                  <a href="/mission" className="text-base font-medium">
                    Mission
                  </a>
                  <a href="/about" className="text-base font-medium">
                    About
                  </a>
                  <a href="/support" className="text-base font-medium">
                    Support
                  </a>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
      </>
      )}
    </div>
  );
};

export default Navbar;