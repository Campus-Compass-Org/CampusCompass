import { handleGoogleSignIn } from "../utils/auth";
import "./LoginPage.css";

/**
 * LoginPage Component
 *
 * The first page users see - requires Google sign-in before accessing the app
 */
function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">
            CAL POLY
            <br />
            MATCHMAKER
          </h1>
          <p className="login-subtitle">
            Discover clubs and organizations that match your interests
          </p>
        </div>

        <div className="login-content">
          <h2 className="login-prompt">Sign in to get started</h2>
          <button onClick={handleGoogleSignIn} className="google-signin-button">
            <span className="google-icon">G</span>
            Continue with Google
          </button>
        </div>

        <div className="login-footer">
          <p>Find your community at Cal Poly</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
