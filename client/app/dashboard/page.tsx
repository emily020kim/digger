import React from 'react';
import Welcome from '@/components/Welcome';
import Topic from '@/components/Topic';

export default function Dashboard() {
  return (
    <div className='flex flex-col'>
      <Welcome />
      <Topic />
    </div>
  )
};