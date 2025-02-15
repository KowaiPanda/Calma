'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/app/components/auth-provider';
import CodeEditor from '@/app/components/code-editor';
import Mascot from '@/app/components/mascot';

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
    <div className="flex h-screen mx-4 gap-4 py-4">
      <article className="text-neutral-100 min-w-[400px] max-w-[800px] rounded-lg p-4 bg-midnight-purple/80 border-neutral-100 border shadow-lg shadow-mystic-teal relative flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Linear Search</h1>
        <h2 className="font-semibold text-2xl">
          The Trials of the Linear Knight
        </h2>
        <p>
          The Endless Search Long before the rise of the Binary Blade, the
          kingdom of Arrayia relied on an older, slower method of discovery—the
          Linear Search. In those days, warriors seeking lost relics had no
          special strategy; they would check each location one by one,
          tirelessly scanning through every possibility. Among these warriors
          was Sir Linearus, a knight known for his persistence rather than his
          speed.{' '}
        </p>
        <p>
          {' '}
          When the fabled Key of Elements was rumored to be hidden within a vast
          labyrinth, Linearus set out on a quest to retrieve it. Without a guide
          or a plan, he began searching every chamber from the very first door,
          moving forward room by room. If he found the key early, he counted
          himself lucky, but if it lay at the farthest end of the labyrinth, he
          would exhaust himself before reaching it. His method was simple:
          inspect every location until the treasure is found—or until every
          possibility is exhausted.
        </p>
        <div className="bottom-8 left-8 fixed z-50">
          <Mascot
            hints={[
              'In linear search, you don’t jump ahead—you begin at index 0 and check each element one by one. No shortcuts, no fancy tricks—just pure perseverance.',
              'Linear search doesn’t skip elements. Whether the target is at the start, middle, or end, every element gets checked in order. This means the worst case takes O(n) time—slow for large lists but useful when the data is unsorted or when the list is small.',
              'As soon as the target is found, stop searching! Return the index immediately to avoid unnecessary work. If the loop ends without finding the target, return -1 to signal failure.',
            ]}
          />
        </div>
      </article>
      <CodeEditor />
    </div>
  );
}
