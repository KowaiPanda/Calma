'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../components/auth-provider';
import Mascot from '../components/mascot';
import ConstellationNetwork from '../components/constellation';

export default function Page() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      redirect('/login');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen mx-4 gap-4 py-4 justify-center items-center ">
      <div className="w-48"></div>
      <ConstellationNetwork
        backgroundColor="bg-midnight-purple/0"
        enabledNodeIds={[1]}
      />
      <div className="bottom-0 left-0 fixed z-50">
        <Mascot hints={[`Welcome, ${user.username}!`]} />
      </div>
    </div>
  );
}
