'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

type AuthContextType = {
  user: Session['user'] | null;
  session: Session | null;
  supabase: SupabaseClient;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession = null,
}: {
  children: React.ReactNode;
  initialSession?: Session | null;
}) {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isLoading, setIsLoading] = useState(!initialSession);

  useEffect(() => {
    // If we didn’t receive a session from SSR, fetch it client-side
    if (!initialSession) {
      const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setIsLoading(false);
      };
      getSession();
    } else {
      setIsLoading(false);
    }

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase, initialSession]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}