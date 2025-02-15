'use client';

import { FormEventHandler, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { th } from 'motion/react-client';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSignUp: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setError(null);

    try {
      const parsedUsername = z
        .string()
        .min(3, {
          message: 'Username must be between 3 and 30 characters long',
        })
        .max(30, {
          message: 'Username must be between 3 and 30 characters long',
        })
        .safeParse(username);

      if (!parsedUsername.success) {
        console.error(parsedUsername.error);
        throw new Error(parsedUsername.error.errors[0].message);
      }
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData || !authData.user) {
        throw new Error('An error occurred while signing up');
      }

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });
      console.log(response);

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-opacity-20 bg-white backdrop-blur-lg rounded-xl p-8 shadow-lg max-w-md w-full border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-white/90 font-fantasy">
          Begin Your Journey
        </h2>
        {error && <p className="text-crimson-red mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Choose your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-golden-yellow"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-golden-yellow"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-golden-yellow"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-semibold transition-colors duration-200"
          >
            Embark on Your Quest
          </button>
        </form>
        <p className="mt-4 text-center text-white/70">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-midnight-purple hover:text-golden-yellow transition-colors duration-200"
          >
            Return to your adventure
          </a>
        </p>
      </div>
    </div>
  );
}
