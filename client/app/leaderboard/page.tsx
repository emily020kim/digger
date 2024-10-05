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
import doug from '../../public/sunglasses.png';
import oneD from '../../public/1d.jpg';
import { FaMedal } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";

export default function Leaderboard() {
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
            <Tr>
              <Td>
                <FaMedal size={30} className='text-[#D4AF37]'/>
              </Td>
              <Td >
                <div className='flex items-center'>
                  <Image src={oneD} width={50} height={50} alt='Album cover'/>
                  <div className='flex flex-col ml-2'>
                    <h1 className='text-xl font-bold mb-2'>Steal my girl</h1>
                    <h2 className='text-base font-medium'>One direction</h2>
                  </div>
                </div>
              </Td>
              <Td>
                This is for Audio
              </Td>
              <Td>
                <h1 className='text-base font-medium'>
                  {/** add user profile pic */}
                  kirby
                </h1>
              </Td>
              <Td>
                <div className='flex items-center mr-2'>
                  <BiSolidUpvote size={30} className='text-gold mr-2' />
                  <p className='font-bold'>478</p>
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <FaMedal size={30} className='text-[#A5A9B4]'/>
              </Td>
              <Td >
                <div className='flex items-center'>
                  <Image src={oneD} width={50} height={50} alt='Album cover'/>
                  <div className='flex flex-col ml-2'>
                    <h1 className='text-xl font-bold mb-2'>Steal my girl</h1>
                    <h2 className='text-base font-medium'>One direction</h2>
                  </div>
                </div>
              </Td>
              <Td>
                This is for audio preview
              </Td>
              <Td>
                <h1 className='text-base font-medium'>
                  kirby
                </h1>
              </Td>
              <Td>
                <div className='flex items-center mr-2'>
                  <BiSolidUpvote size={30} className='text-gold mr-2' />
                  <p className='font-bold'>478</p>
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <FaMedal size={30} className='text-[#6E4D25]'/>
              </Td>
              <Td >
                <div className='flex items-center'>
                  <Image src={oneD} width={50} height={50} alt='Album cover'/>
                  <div className='flex flex-col ml-2'>
                    <h1 className='text-xl font-bold mb-2'>Steal my girl</h1>
                    <h2 className='text-base font-medium'>One direction</h2>
                  </div>
                </div>
              </Td>
              <Td>
                This is for audio preview
              </Td>
              <Td>
                <h1 className='text-base font-medium'>
                  kirby
                </h1>
              </Td>
              <Td>
                <div className='flex items-center mr-2'>
                  <BiSolidUpvote size={30} className='text-gold mr-2' />
                  <p className='font-bold'>478</p>
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
};