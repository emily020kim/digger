import React from 'react';
import Welcome from '@/components/Welcome';
import Topic from '@/components/Topic';
import MusicGenres from '@/components/MusicGenres';

export default function Dashboard() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Welcome />
      <Topic />
      <MusicGenres />
    </div>
  )
};