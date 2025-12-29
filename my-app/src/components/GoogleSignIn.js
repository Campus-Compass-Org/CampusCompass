import { useAuth } from "../hooks/useAuth";
import { handleGoogleSignIn, handleSignOut } from "../utils/auth";
import "./GoogleSignIn.css";

/**
 * GoogleSignIn Component
 *
 * Simple Google OAuth authentication via Supabase
 * Returns either a sign-in button or a sign-out-button w/ basic info
 */
function GoogleSignIn() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="google-signin-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (user) {
    // User is signed in - show their profile
    return (
      <div className="google-signin-container">
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">
              {user.user_metadata?.full_name || user.email}
            </span>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is not signed in - show pill-shaped Google button
  return (
    <div className="google-signin-container">
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        <span className="google-icon">G</span>
        Continue with Google
      </button>
    </div>
  );
}

export default GoogleSignIn;
