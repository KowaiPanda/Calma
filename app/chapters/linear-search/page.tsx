'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlay, FaFire } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

  const [code, setCode] = useState(
    'def linear_search(arr, target):\n    # Your code here\n    pass',
  );
  const [passed, setPassed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testCases = [
    {
      inputs: [[1, 3, 5, 7, 9], 5], // array and target
      expected: 2, // index where 5 is found
    },
    {
      inputs: [[1, 3, 5, 7, 9], 2], // array and target
      expected: -1, // target not found
    },
    {
      inputs: [[], 1], // empty array
      expected: -1, // target not found
    },
    {
      inputs: [[1], 1], // single element array
      expected: 0, // target found at index 0
    },
    {
      inputs: [[1, 1, 1, 1], 1], // multiple occurrences
      expected: 0, // should return first occurrence
    },
  ];

  const handleEditorChange = (newCode: string | undefined) => {
    setCode(newCode ?? '');
  };

  const verifyCode = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, testCases }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify code');
      }
      setPassed(data.passed);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred while verifying code');
      }
    } finally {
      setLoading(false);
    }
  };

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
        <Button className="max-w-32" disabled={loading} onClick={verifyCode}>
          <FaPlay /> Run
        </Button>
        {error && (
          <Alert variant="destructive">
            <IoMdAlert className="w-6 h-6" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {passed != null && (
          <div
            className={`flex items-center text-neutral-100 ${passed ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {passed ? (
              <>
                <FaFire className="w-6 h-6" />
                <span className="ml-2">All test cases passed!</span>
              </>
            ) : (
              <>
                <IoMdAlert className="w-6 h-6" />
                <span className="ml-2">
                  Some test cases failed. Check your implementation and try
                  again.
                </span>
              </>
            )}
          </div>
        )}
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
      <CodeEditor code={code} onChange={handleEditorChange} />
    </div>
  );
}
