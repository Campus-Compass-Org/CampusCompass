import { supabase } from './supabase';

/**
 * Initiates Google OAuth sign-in flow
 */
export const handleGoogleSignIn = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
    alert('Error signing in with Google. Please try again.');
  }
};

/**
 * Signs the user out
 */
export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};
