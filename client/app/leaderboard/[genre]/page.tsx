"use client"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import doug from '../../../public/sunglasses.png';
import { FaMedal } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';

interface Song {
  songTitle: string;
  artist: string;
  albumImage: string;
  votes: number;
  submittedBy: string;
  audioPreview: string;
}

interface User {
  username: string;
}

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function Leaderboard() {
  const router = useRouter();
  const pathname = usePathname();
  const genre = pathname.split("/")[2];
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  const handleVote = async (songId: string, userId: string) => {
    try {
      const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      const genreCollectionName = `${capitalizeFirstLetter(genre)}Leaderboard`;
      const votesRef = collection(db, 'votes');
      const q = query(votesRef, where('userId', '==', userId), where('songId', '==', songId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        alert('You have already voted for this song.');
        return;
      }
  
      await addDoc(votesRef, {
        userId,
        songId,
      });
  
      const songRef = doc(db, genreCollectionName, songId);
      const songSnapshot = await getDoc(songRef);
  
      if (songSnapshot.exists()) {
        const currentVotes = songSnapshot.data().votes || 0;
        await updateDoc(songRef, {
          votes: currentVotes + 1,
        });
      }
  
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.songTitle === songId ? { ...song, votes: song.votes + 1 } : song
        )
      );
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    if (!genre) return;
  
    const fetchSongs = () => {
      const genreCollectionRef = collection(db, `${capitalizeFirstLetter(genre)}Leaderboard`);
      
      const unsubscribe = onSnapshot(genreCollectionRef, async (snapshot) => {
        const fetchedSongs: Song[] = await Promise.all(
          snapshot.docs.map(async (docSnapshot) => {
            const data = docSnapshot.data();
            const userRef = doc(db, 'users', data.userId);
            const userSnapshot = await getDoc(userRef);
            const userData = userSnapshot.exists() ? (userSnapshot.data() as User) : { username: 'Anonymous' };

            const votesQuery = query(
              collection(db, 'votes'),
              where('songId', '==', data.songTitle)
            );
            const votesSnapshot = await getDocs(votesQuery);
            const voteCount = votesSnapshot.size;
  
            return {
              songTitle: data.songTitle ?? 'Unknown Title',
              artist: data.artist ?? 'Unknown Artist',
              albumImage: data.albumImage ?? '/fallback.png',
              votes: voteCount,
              submittedBy: userData.username,
              audioPreview: data.audioPreview ?? '',
            };
          })
        );
  
        setSongs(fetchedSongs);
        setFilteredSongs(fetchedSongs);
      });
  
      return () => unsubscribe();
    };
  
    fetchSongs();
  }, [genre]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(
        (song) =>
          song.songTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchTerm, songs]);

  return (
    <div className='flex flex-col w-full h-screen p-8'>
      <InputGroup mt={6} mb={10} w='30%'>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input 
          placeholder='Search for a song or artist' 
          focusBorderColor='yellow.400' 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <h1 className='text-4xl font-bold mr-2'>
            Leaderboard
          </h1>
          <Image src={doug} width={50} height={50} alt='Character' />
        </div>
        <div className='flex items-center'>
          <Select placeholder='Genre' mr={3} onChange={(e) => router.push(`/leaderboard/${e.target.value.toLowerCase()}`)}>
            <option value='pop'>Pop</option>
            <option value='rap'>Rap</option>
            <option value='band'>Band</option>
            <option value='indie'>Indie</option>
            <option value='international'>International</option>
            <option value='rnb'>Rnb</option>
          </Select>
          <Select placeholder='Filter'>
            <option value='option1'>Most votes</option>
            <option value='option2'>Least votes</option>
            <option value='option3'>Most recent</option>
          </Select>
        </div>
      </div>

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Song</Th>
              <Th>Audio preview</Th>
              <Th>Submitted by</Th>
              <Th>Votes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={5}>Loading...</Td>
              </Tr>
            ) : (
              filteredSongs.map((song, index) => (
                <Tr key={index}>
                  <Td>
                    {index + 1 === 1 ? (
                      <FaMedal size={30} className='text-[#D4AF37]' />
                    ) : index + 1 === 2 ? (
                      <FaMedal size={30} className='text-[#A5A9B4]' />
                    ) : index + 1 === 3 ? (
                      <FaMedal size={30} className='text-[#6E4D25]' />
                    ) : (
                      index + 1
                    )}
                  </Td>
                  <Td>
                    <div className='flex items-center'>
                      <Image src={song.albumImage} width={50} height={50} alt='Album cover' />
                      <div className='flex flex-col ml-2'>
                        <h1 className='text-xl font-bold mb-2'>{song.songTitle}</h1>
                        <h2 className='text-base font-medium'>{song.artist}</h2>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    {song.audioPreview ? (
                      <audio controls>
                        <source src={song.audioPreview} type='audio/mpeg' />
                      </audio>
                    )          : (
                      "No audio available"
                    )}
                  </Td>
                  <Td>
                    <h1 className='text-base font-medium'>{song.submittedBy}</h1>
                  </Td>
                  <Td>
                    <div className='flex items-center mr-2'>
                              <BiSolidUpvote 
                        size={30} 
                        className='text-gold mr-2 hover:scale-110' 
                        onClick={() => currentUserId ? handleVote(song.songTitle, currentUserId) : alert('Please log in to vote.')}
                      />
                      <p className='font-bold'>{song.votes}</p>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
};