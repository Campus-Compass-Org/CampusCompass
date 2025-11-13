// useNavigate lets us programmatically move to different pages (when our code decides to navigate)
import { useNavigate } from "react-router-dom";
// Layout is our custom component that wraps the page with header/navigation
import Layout from "../components/Layout";
// useQuiz is our custom hook that gives us access to quiz data from anywhere in the app
import { useQuiz } from "../context/QuizContext";
// Import the CSS styles for this specific page
import "./ResultsPage.css";
import { useEffect, useState } from "react";

/**
 * What this page does:
 * - Shows the top clubs that best match the user's quiz answers
 * - Displays each club with a "match score"
 * - Provides links to learn more about each club
 * - Offers options to retake the quiz or browse all clubs
 *
 * @returns {JSX.Element} The rendered ResultsPage component (JSX is like HTML but in JavaScript)
 */
function ResultsPage() {
  // useQuiz() connects us to our global quiz data storage
  // 'state' = current quiz data (like the calculated club matches)
  // 'dispatch' = function to update/change the quiz data
  const { state, dispatch } = useQuiz();
  const [showWithIdentity, setShowWithIdentity] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Top clubs with identity questions:", state.topClubs);
    if (state.topClubsWithoutIdentity.length > 0) {
      console.log(
        "Top clubs without identity questions:",
        state.topClubsWithoutIdentity
      );
    }
  }, [state.topClubs, state.topClubsWithoutIdentity]);

  // Only allow access if they completed both the quiz AND identity phase
  // Also make sure we actually have results to show them
  if (!state.identityCompleted || state.topClubs.length === 0) {
    navigate("/"); // Send them back to home page if they shouldn't be here
    return null; // Don't render anything while navigating
  }

  // Determine which list of clubs to display based on the toggle state
  const clubsToShow =
    showWithIdentity || state.topClubsWithoutIdentity.length === 0
      ? state.topClubs
      : state.topClubsWithoutIdentity;

  /**
   * Handles when user clicks "Retake Quiz"
   * Completely resets the quiz and starts over from the beginning
   *
   * - Resets all quiz progress back to initial state
   * - Takes them back to the home page to select categories again
   */
  const handleRetakeQuiz = () => {
    dispatch({ type: "RESET_QUIZ" }); // Clear all quiz data
    navigate("/"); // Go back to the beginning
  };

  /**
   * Handles when user clicks "View All Cal Poly Clubs"
   * Opens the official Cal Poly organizations page in a new browser tab
   *
   * What happens:
   * - window.open() opens a new browser tab (doesn't leave our app)
   * - "_blank" means "open in new tab" (keeps our app open too)
   */
  const handleViewAllClubs = () => {
    window.open("https://now.calpoly.edu/organizations", "_blank");
  };

  return (
    <Layout>
      {/* Layout wraps our content with the header/navigation */}

      <div className="results-container">
        <h2 className="top-matches-title">
          🎉 Here are your top club matches!
        </h2>

        {/* 
          ACTION BUTTONS: Give users options for what to do next
          These appear at the top so users see their options right away
        */}
        <div className="action-buttons">
          <button
            className="action-button primary"
            onClick={handleViewAllClubs} // Run our function when clicked
          >
            View All Cal Poly Clubs
          </button>
          <button
            className="action-button secondary" // "secondary" = less important button (more subtle)
            onClick={handleRetakeQuiz} // Run our function when clicked
          >
            Retake Quiz
          </button>
        </div>

        {/* Only show the toggle if the user answered identity questions */}
        {state.topClubsWithoutIdentity.length > 0 && (
          <div className="toggle-container">
            <span className="toggle-label">Include Identity Preferences</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={showWithIdentity}
                onChange={() => setShowWithIdentity(!showWithIdentity)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        )}

        <div className="club-list">
          {/* 
            MAP FUNCTION: Loop through each recommended club and create a card for it
            
            state.topClubs looks like:
            [
              { clubName: "Chess Club", similarity: 0.85, clubLink: "https://..." },
              { clubName: "Hiking Club", similarity: 0.82, clubLink: "https://..." },
              ...
            ]
          */}
          {clubsToShow.map((club, index) => (
            <div key={index} className="club-item">
              <div className="club-rank">#{index + 1}</div>

              {/* 
                CLUB NAME: The actual name of the club
              */}
              <h3 className="club-name">{club.clubName}</h3>

              {/* 
                MATCH SCORE: How well this club matches their interests
                club.similarity is a decimal like 0.85, we convert to percentage like 85%
              */}
              <div className="match-percentage">
                <span className="match-label">Match Score:</span>
                <span className="match-score">
                  {(club.similarity * 100).toFixed(1)}%
                </span>
              </div>

              {/* 
                LEARN MORE BUTTON: Takes them to the club's official page
                Opens in new tab so they don't lose their results
              */}
              <button
                className="club-link-button"
                // Template literal: `${club.clubLink}` inserts the actual URL
                onClick={() => window.open(`${club.clubLink}`, "_blank")}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* 
          FOOTER MESSAGE: Helpful guidance about what to do with these results
        */}
        <div className="results-footer">
          <p>
            These matches are based on your interests and preferences. Don't see
            something you like? Try retaking the quiz with different categories!
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ResultsPage;
