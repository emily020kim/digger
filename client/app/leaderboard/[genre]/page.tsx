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
import { getDocs, collection, QuerySnapshot, DocumentData } from 'firebase/firestore';

interface Song {
  songTitle: string;
  artist: string;
  albumImage: string;
  votes: number;
  submittedBy: string;
  audioPreview: string;
}

export default function Leaderboard() {
  const router = useRouter();
  const pathname = usePathname();
  const genre = decodeURIComponent(pathname.split("/")[2]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch songs from Firestore based on genre
  useEffect(() => {
    if (!genre) return;

    const fetchSongs = async () => {
      setLoading(true);
      try {
        const genreCollectionName = `${genre}Leaderboard`;
        const genreCollectionRef = collection(db, genreCollectionName);
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(genreCollectionRef);
        
        const fetchedSongs: Song[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            songTitle: data.songTitle ?? 'Unknown Title',
            artist: data.artist ?? 'Unknown Artist',
            albumImage: data.albumImage ?? '/fallback.png',
            votes: data.votes ?? 0,
            submittedBy: data.submittedBy ?? 'Anonymous',
            audioPreview: data.audioPreview ?? '',
          };
        });
        setSongs(fetchedSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [genre]);

  return (
    <div className='flex flex-col w-full h-screen p-8'>
      <InputGroup mt={6} mb={10} w='30%'>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input placeholder='Search for a song' focusBorderColor='yellow.400'/>
      </InputGroup>

      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <h1 className='text-4xl font-bold mr-2'>
            Leaderboard
          </h1>
          <Image src={doug} width={50} height={50} alt='Character' />
        </div>
        <div className='flex items-center'>
          <Select
            bg='#FBB902'
            borderColor='3FBB902'
            color='white'
            placeholder='Genre'
            mr={3}
          >
            <option value='option1'>Pop</option>
            <option value='option2'>Rap</option>
            <option value='option3'>Band</option>
            <option value='option4'>Indie</option>
            <option value='option5'>International</option>
            <option value='option6'>R&B</option>
          </Select>
          <Select
            bg='#FBB902'
            borderColor='#FBB902'
            color='white'
            placeholder='Filter'
          >
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
              songs.map((song, index) => (
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
                    ) : (
                      "No audio available"
                    )}
                  </Td>
                  <Td>
                    <h1 className='text-base font-medium'>{song.submittedBy}</h1>
                  </Td>
                  <Td>
                    <div className='flex items-center mr-2'>
                      <BiSolidUpvote size={30} className='text-gold mr-2' />
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