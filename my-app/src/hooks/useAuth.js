import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

/**
 * useAuth Hook
 * 
 * Custom hook to access the current authenticated user from any component
 * 
 * Usage:
 * const { user, loading } = useAuth();
 * 
 * Returns:
 * - user: The current user object (null if not signed in)
 * - loading: Boolean indicating if authentication state is being loaded
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
