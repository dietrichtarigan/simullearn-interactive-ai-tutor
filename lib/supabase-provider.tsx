'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

interface SupabaseContext {
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<SupabaseContext | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
      if (event === 'SIGNED_OUT') {
        router.push('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};

export const useUser = () => {
  const { supabase } = useSupabase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    // Get initial user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return user;
};

// Custom hook for subscription status
export const useSubscription = () => {
  const { supabase } = useSupabase();
  const user = useUser();
  const [subscription, setSubscription] = useState<string>('free');

  useEffect(() => {
    if (user) {
      const fetchSubscription = async () => {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('subscription_tier')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setSubscription(data.subscription_tier);
        }
      };

      fetchSubscription();
    }
  }, [user, supabase]);

  return subscription;
};
