"use client"

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import doug from '../../public/winking.png';
import { Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Icons } from "@/components/icons";
import { db, auth } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

interface SongData {
  title: string;
  artist: string;
  albumImage: string;
  audio: string;
  previewUrl: string;
}

export default function SongSubmission() { 
  const { user, loading } = useAuth();
  const [link, setLink] = useState("");
  const [genre, setGenre] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingNavigate, setLoadingNavigate] = useState(false);
  const [songData, setSongData] = useState<SongData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setError(null);
    setSongData(null);

    try {
      const response = await axios.post('/api/metadata', { link });
      setSongData(response.data);

      const user = auth.currentUser;

      if (user) {
        const songSubmission = {
          userId: user.uid,                 
          songLink: link,                   
          songTitle: response.data.title,   
          artist: response.data.artist,     
          albumImage: response.data.albumImage,  
          audioPreview: response.data.previewUrl || null,
          genre: genre,     
          votes: 0,                 
          submittedAt: new Date().toISOString()  
        };

        await addDoc(collection(db, "submissions"), songSubmission);

        const genreCollectionName = `${genre}Leaderboard`;
        await addDoc(collection(db, genreCollectionName), songSubmission);
      } else {
        setError("You need to be logged in to submit a song.");
      }
    } catch (error) {
      console.error("Error submitting song:", error);
      setError('Failed to submit song');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleNavigate = async () => {
    setLoadingNavigate(true);
    router.push(`/leaderboard/${genre.toLowerCase()}`);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="hidden sm:flex flex-col w-1/3 bg-gold justify-center items-center px-4 lg:px-8 xl:px-16">
        <h1 className="font-bold text-white text-2xl lg:text-3xl xl:text-5xl mb-16">
          Let&apos;s submit your daily song
        </h1>
        <p className="text-white text-sm xl:text-lg">
          This can be one of your favorite songs or a song you think is criminally underrated
        </p>
      </div>
      <div className="flex flex-col w-11/12 md:w-2/3 mt-20 md:mt-0 justify-start md:justify-center items-center p-2 lg:p-8 gap-y-8">
        <div className="w-3/4 lg:w-1/2">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold mr-2">
              Submit your song
            </h1>
            <Image src={doug} width={50} height={50} alt="Character"/>
          </div>
          <p className="text-sm xl:text-lg font-medium mb-1">
            Paste Spotify link
          </p>
          <Input 
            size='md'
            focusBorderColor='yellow.400'
            mb={10}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-sm xl:text-lg font-medium mb-1">
            Genre of song
          </p>
          <Select 
            placeholder="Select genre" 
            mb={10}
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="Indie">Indie</option>
            <option value="Band">Band</option>
            <option value="International">International</option>
            <option value="Rnb">Rnb</option>
          </Select>
          <button 
            className="bg-gradient-to-r from-gold to-goldEnd rounded-full text-white font-semibold px-6 py-2 md:text-base mb-8"
            onClick={handleSubmit}
          >
            {loadingSubmit ? <Icons.spinner className="h-4 w-4 animate-spin" /> : 'Submit'}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {songData && (
            <div className="flex flex-col items-center bg-gold rounded-lg my-4 p-3">
              <h2 className="text-lg font-bold text-white">{songData.title} by {songData.artist}</h2>
              <img src={songData.albumImage} alt="Album" className="w-24 h-24 mt-4" />
              {songData.previewUrl && (
                <audio controls className="w-full md:w-5/6 xl:w-1/2 mt-4">
                  <source src={songData.previewUrl} type="audio/mpeg" />
                </audio>
              )}
              <button 
                className="bg-white rounded-full p-2 text-gold text-base font-medium mt-4"
                onClick={handleNavigate}
                disabled={loadingNavigate}
              >
                {loadingNavigate ? 'Posting...' : 'Post on leaderboard'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};