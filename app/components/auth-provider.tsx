'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/utils/supabase/client';
import { User } from '@prisma/client';

type AuthContextType = {
  user: User | null;
  isLoading: boolean; // Add a loading state
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null); // Replace `any` with your Prisma User type
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      console.log('Fetching session...');
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        setIsLoading(false); // Stop loading
        return;
      }

      if (session?.user?.email) {
        // Fetch the Prisma user from the API route
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        });

        if (response.ok) {
          const { user } = await response.json();
          setUser(user);
        } else {
          console.error('Error fetching Prisma user');
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false); // Stop loading after fetching the session
    };

    fetchSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user?.email) {
          // Fetch the Prisma user from the API route
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.user.email }),
          });

          if (response.ok) {
            const { user } = await response.json();
            setUser(user);
          } else {
            console.error('Error fetching Prisma user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
