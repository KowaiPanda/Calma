'use client';

import { useState, type FormEvent } from 'react';
import { supabase } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred');
      }
    }
    redirect('/level_menu');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-lg w-96">
        <h1 className="text-4xl font-bold text-center mb-8 text-white/90 font-fantasy">
          Welcome Back
        </h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-white placeholder-white/50"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-white placeholder-white/50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500/80 hover:bg-emerald-600/80 text-white font-semibold rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-white/70 text-center">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-emerald-400 hover:text-golden-yellow underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
