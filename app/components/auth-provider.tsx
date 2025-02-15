'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User, PrismaClient } from '@prisma/client';

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });
const supabase = createClient();
const prisma = new PrismaClient();

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the user from the server
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (user) {
          const prismaUser = await prisma.user.findUnique({
            where: {
              userid: session?.user.id ?? '',
            },
          });
          setUser(prismaUser || null);
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
