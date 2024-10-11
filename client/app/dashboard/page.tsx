"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Welcome from '@/components/Welcome';
import Topic from '@/components/Topic';
import MusicGenres from '@/components/MusicGenres';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Welcome />
      <Topic />
      <MusicGenres />
    </div>
  )
};