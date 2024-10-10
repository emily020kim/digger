"use client"

import { useState, useEffect } from "react";
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
  ModalBody,
  ModalCloseButton, 
  Input,
} from '@chakra-ui/react';
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged, updateProfile, User, getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type UserProfile = {
  displayName?: string;
  photoURL?: string;
  createdAt?: any;
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(75);
  const [isMobileView, setIsMobileView] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [newDisplayName, setNewDisplayName] = useState("");

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

  const fetchUserProfile = async (userId: string) => {
    if (!userId) return null;

    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userProfile = await fetchUserProfile(currentUser.uid);

        if (userProfile) {
          setUser({
            ...currentUser,
            displayName: userProfile.displayName || currentUser.displayName,
            photoURL: userProfile.photoURL || currentUser.photoURL,
            createdAt: userProfile.createdAt,
          });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUploadProfilePicture = async (file: File) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
  
      await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      console.log('File uploaded successfully. URL:', downloadURL);
  
      await updateProfile(currentUser, { photoURL: downloadURL });
  
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });
  
      setUser(prevUser => prevUser ? { ...prevUser, photoURL: downloadURL } : prevUser);
  
      console.log('Profile picture updated successfully!');
    } catch (error) {
      console.error("Error uploading and updating profile picture:", error);
    }
  };

  const handleChangeDisplayName = async (newDisplayName: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!newDisplayName || !user) {
      console.error("No user or display name provided");
      return;
    }
  
    try {
      await updateProfile(user, { displayName: newDisplayName });
  
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { displayName: newDisplayName });
  
      setUser(prevUser => prevUser ? { ...prevUser, displayName: newDisplayName } : prevUser);
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <div className='flex w-full py-4 shadow-lg justify-around'>
      <Link href='/'>
        <Image src={logo} width={width} height={height} alt='Logo' />
      </Link>
      {user ? (
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <Avatar src={user?.photoURL || 'https://bit.ly/broken-link'} onClick={onOpen}/>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Profile settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex flex-col p-3">
                  <div className="flex items-center mb-6 gap-x-3">
                    <Avatar src={user?.photoURL || 'https://bit.ly/broken-link'} />
                    <label className="border-[1px] bg-gold px-2 py-1 text-base text-white rounded-md cursor-pointer">
                      Change picture
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => handleUploadProfilePicture(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-lg font-bold">{user?.displayName || "User's name"}</h1>
                    <p className="text-gray-500 text-sm">{user?.createdAt ? new Date(user.createdAt).getFullYear() : "Member since 2024"}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Input 
                      size='sm'
                      placeholder='Change username'
                      focusBorderColor='yellow.400'
                      _placeholder={{ opacity: 1, color: 'gray.500' }}
                      bg='blackAlpha.200'
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                    />
                    <button 
                      className="bg-gold px-2 py-1 text-base text-white ml-2 rounded-md"
                      onClick={() => handleChangeDisplayName(newDisplayName)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </ModalBody>
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