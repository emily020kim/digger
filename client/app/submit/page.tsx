"use client"

import Image from "next/image";
import doug from '../../public/winking.png';
import { Input, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function SongSubmission() { 
  const [link, setLink] = useState("");

  return (
    <div className="flex w-full h-screen">
      <div className="hidden sm:flex flex-col w-1/3 bg-gold justify-center px-4 lg:px-8 xl:px-16">
        <h1 className="font-bold text-white text-2xl lg:text-3xl xl:text-5xl mb-16">
          Let&apos;s submit your daily song
        </h1>
        <p className="text-white text-sm xl:text-lg">
          This can be one of your favorite songs or a song you think is criminally underrated
        </p>
      </div>
      <div className="flex flex-col w-11/12 md:w-2/3 mt-20 md:mt-0 justify-start md:justify-center items-center p-4 lg:p-8 gap-y-8">
        <div className="w-3/4 lg:w-1/2">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold mr-2">
              Submit your song
            </h1>
            <Image src={doug} width={50} height={50} alt="Character"/>
          </div>
          <p className="text-sm xl:text-lg font-medium mb-1">
            Paste Spotify, YouTube, or Soundcloud link
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
          <Select placeholder="Select genre" mb={10}>
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="Indie">Indie</option>
            <option value="Band">Band</option>
            <option value="International">International</option>
            <option value="R&B">R&B</option>
          </Select>
          <button className="bg-gradient-to-r from-gold to-goldEnd rounded-full text-white font-semibold px-6 py-2 md:text-base mb-8">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
};