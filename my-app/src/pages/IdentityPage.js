import { useState } from "react";
// useNavigate lets us programmatically move to different pages (like clicking a link in code)
import { useNavigate } from "react-router-dom";
// Layout is our custom component that wraps the page with header/navigation
import Layout from "../components/Layout";
// Dropdown is our custom component for selection dropdowns (like choosing from a list)
import Dropdown from "../components/Dropdown";
// useQuiz is our custom hook that gives us access to quiz data from anywhere in the app
import { useQuiz } from "../context/QuizContext";
// These contain the identity questions and their possible answer options
import { IDENTITY_QUESTIONS, IDENTITY_OPTIONS } from "../data/identity";
// These are utility functions that do complex calculations for club matching
import {
  calcUserTagScores,
  applyCategoryInterestScores,
  rankClubsBySimilarity,
} from "../utils/quizUtils";
// Import the CSS styles for this specific page
import "./IdentityPage.css";
// Import the tag data which contains all the tags used in the app
import { ALL_TAGS } from "../data/tags";

/**
 * What this page does:
 * - Asks optional demographic/identity questions (like year in school, major, etc.)
 * - Users can skip this entirely and go straight to results
 * - If they choose to answer, shows questions one-by-one with dropdown menus
 * - Combines identity answers with quiz answers for better club matching
 * - Computes final results page when done
 *
 * Flow diagram:
 * 1. Show choice: "Answer identity questions?" or "Skip to results"
 * 2. If skip → calculate results → go to results page
 * 3. If yes → show questions one by one → calculate results → go to results page
 *
 * @returns {JSX.Element} The rendered IdentityPage component (JSX is like HTML but in JavaScript)
 */
function IdentityPage() {
  // useQuiz() connects us to our global quiz data storage
  // 'state' = current quiz data (like what answers they've given)
  // 'dispatch' = function to update/change the quiz data
  const { state, dispatch } = useQuiz();

  const navigate = useNavigate();

  // selectedOption tracks what the user picked in the current dropdown
  // starts as null (nothing selected), updates when they choose something
  const [selectedOption, setSelectedOption] = useState(null);

  // Only allow access if they completed the main survey
  if (!state.surveyComplete) {
    navigate("/"); // Send them back to home page if they shouldn't be here
    return null;
  }

  // IDENTITY_QUESTIONS["Identity"] gives us an array of all identity questions
  const questionsForIdentity = IDENTITY_QUESTIONS["Identity"];
  // Get the specific question we're currently asking
  const currentQuestion = questionsForIdentity[state.currentQuestionIndex];

  /**
   * Skips all identity questions and goes straight to calculating final results
   *
   * What happens:
   * - Calls our calculation function with no identity answers (empty array)
   * - Calculation function figures out best clubs based on quiz answers only
   * - User gets taken to results page
   */
  const handleSkipIdentity = () => {
    finalizeScoresAndComputeClubs(); // Calculate results without identity info
  };

  /**
   * Starts the identity question flow
   *
   * What happens:
   * - Updates global state to show identity questions interface
   */
  const handleStartIdentity = () => {
    dispatch({ type: "SET_SHOW_IDENTITY_QUESTIONS", payload: true });
  };

  /**
   * Handles when user clicks "Next Question" or "Get My Results"
   *
   * What happens:
   * 1. Gets what they selected in the dropdown
   * 2. Saves that answer to our global state
   * 3. Checks if this was the last question
   *    - If last question: calculate final results and go to results page
   *    - If not last: move to next question and reset the dropdown
   */
  const handleNext = () => {
    // Get selected value
    const value = selectedOption.value;

    // Check if this was the last identity question
    if (state.currentQuestionIndex >= questionsForIdentity.length - 1) {
      // All identity questions answered - calculate final results
      const allResponses = [...state.userIdentityResponses, value];
      finalizeScoresAndComputeClubs(allResponses);
    } else {
      // Save this answer to our global quiz state
      dispatch({ type: "ADD_IDENTITY_RESPONSE", payload: value });
      // Move to next identity question
      dispatch({ type: "NEXT_QUESTION" });
      setSelectedOption(null); // Reset selectedOption for next question
    }
  };

  /**
   *
   * This function takes all the user's answers and figures out which clubs they'd like best.
   * It's like a matchmaking algorithm for clubs!
   *
   * What it does step-by-step:
   * 1. Takes their quiz answers (interest) and identity answers
   * 2. Boosts scores for THE CATEGORIES they said they were interested in
   * 3. Averages out their answers (array of 1s and 0s indicating responses) to get final score for each tag
   * 4. Finds the clubs most similar to what they want
   * 5. Filters clubs based on identity (if they answered those questions)
   * 6. Gives back the top 10 best matches
   * 7. Takes them to the results page to see their matches
   *
   * @param {Array} identityResponses - Array of user's identity question answers (optional)
   */
  const finalizeScoresAndComputeClubs = (identityResponses = []) => {
    // STEP 1: Make a safe copy of user's quiz answers so we don't accidentally change the original
    let tempUserTags = JSON.parse(JSON.stringify(state.userTags));

    // STEP 2: Add the value "1" to the tag arrays associated with the categories the user selected
    // When we take the average later, this boosts those tags higher
    tempUserTags = applyCategoryInterestScores(
      tempUserTags,
      state.selectedCategories
    );

    // STEP 3: Calculate final scores for each tag
    // This averages the answers for each tag to get one final score per tag, as well as applying any boosts
    const finalScores = calcUserTagScores(tempUserTags);

    // STEP 4: Build the user vector of their preferences for each of the 40 interest tags
    const userVector = [];
    // We loop from 1 to length of ALL_TAGS because that's how the tags are numbered in our system
    for (let tagId = 1; tagId <= Object.keys(ALL_TAGS).length; tagId++) {
      // JavaScript automatically converts the integer 1 to the string "1" for object property access (automatic type coercion)
      userVector.push(finalScores[tagId]);
    }

    // STEP 5: Find the best matching clubs!
    // Finds club vectors that are most similar to user vector (using "cosine similarity")

    if (identityResponses.length > 0) {
      // filter state.clubData to remove non-related ones using func from quizUtils
      function removeNonreleventIdentities(clubData, identityResponses) {
        const headers = clubData["headerMapping"]; //{Club Name: 0, links: 1, Leadership: 2, Teamwork: 3, ...}
        let clubs = clubData["rows"].slice(1); //[['Club1', 'link1', '0.12', '0.32', ...], ['Club2', 'link2', '0.12', '0.32', ...]]
        // identity responses  ["identity1", "identity2", ...]

        console.log(clubs);
        // -- filter out greek --
        const greek_idx = headers["Greek"];
        if (!identityResponses.includes("Greek")) {
          clubs = clubs.filter((club) => Number(club[greek_idx]) === 0.0);
        }

        // -- filter out religion --
        // loop through questions and get one that contains "religion"
        let questionKey = null;
        for (const key in IDENTITY_OPTIONS) {
          if (key.includes("religion") || key.includes("Religion")) {
            questionKey = key;
          }
        }
        // get list of religions
        const religionsList = IDENTITY_OPTIONS[questionKey].map(
          (option) => option["value"] // [religion1, religion2, ...]
        );
        // get corresponding heafer value for each key
        const religionsDict = {}; // ex: {religion1: 56, religion2: 58, ... }
        for (const religion of religionsList) {
          religionsDict[religion] = headers[religion];
        }
        // filter for each club
        for (const religion of religionsList) {
          clubs = clubs.filter(
            (club) =>
              club[religionsDict[religion]] < 0.8 ||
              religion === "other" ||
              identityResponses.includes(religion)
          );
        }

        console.log(identityResponses);
        console.log(clubs);
        console.log();

        // gender filters

        // race/ethnicity filters

        console.log("WAKEY WAKEY");
      }
      removeNonreleventIdentities(state.clubData, identityResponses);
    }

    const topTen = rankClubsBySimilarity(
      userVector,
      state.clubData,
      identityResponses
    );

    // If identity questions were answered, also calculate the results without them for comparison.
    if (identityResponses.length > 0) {
      const topTen = rankClubsBySimilarity(
        userVector,
        state.clubData,
        [] // Pass empty array for identity responses
      );
      // Store the non-identity results in a separate state for comparison on the results page.
      dispatch({
        type: "SET_TOP_CLUBS_WITHOUT_IDENTITY",
        payload: topTen,
      });
    }

    // STEP 6: Save the results and take them to see their matches
    dispatch({ type: "SET_TOP_CLUBS", payload: topTen }); // Save the top 10 clubs
    dispatch({ type: "COMPLETE_IDENTITY" }); // Mark identity phase as complete
    navigate("/results"); // Go to results page to show their matches
  };

  // SCREEN 1: Initial choice screen - "Do you want to answer identity questions?"
  // This shows when showIdentityQuestions is false (the default)
  if (!state.showIdentityQuestions) {
    return (
      <Layout>
        {/* Layout wraps our content with the header/navigation */}
        <div className="question-block">
          <h2 className="category-name">Optional Identity Questions</h2>
          <p className="subcategory-question">
            Would you like to answer some identity-based questions to improve
            your matchmaking results?
          </p>
          {/* Two buttons: Yes (start questions) or No (skip to results) */}
          <div className="answer-buttons">
            <button
              className="answer-button yes-button"
              onClick={handleStartIdentity} // Run function to start identity questions
            >
              Yes, let's improve my matches
            </button>
            <button
              className="answer-button no-button"
              onClick={handleSkipIdentity} // Run function to skip to results
            >
              Skip to results
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // This shows when user chose "Yes" to answering identity questions
  return (
    <Layout>
      {/* 
        PROGRESS BAR: Visual indicator of how far through questions they are
        Math: (current question number / total questions) * 100 = percentage complete
      */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${
              ((state.currentQuestionIndex + 1) / questionsForIdentity.length) *
              100
            }%`,
          }}
        ></div>
      </div>

      <div className="question-block">
        {/* QUESTION HEADER: Shows title and current progress */}
        <h2 className="category-name">
          Identity Questions
          <span className="question-counter">
            ({state.currentQuestionIndex + 1} of {questionsForIdentity.length})
          </span>
        </h2>

        {/* CURRENT QUESTION: Display the actual question */}
        <h3 className="subcategory-question">{currentQuestion}</h3>

        {/* 
          DROPDOWN MENU: Where user selects their answer
          This uses our custom Dropdown component with simple configuration
        */}
        <div className="dropdown-container">
          <Dropdown
            options={IDENTITY_OPTIONS[currentQuestion]}
            onChange={(option) => setSelectedOption(option)}
            value={selectedOption}
            placeholder="Select an option..."
            className="identity-dropdown"
            isSearchable // Allow typing to filter options
          />
        </div>

        {/* 
          NEXT/COMPLETE BUTTON: Advances to next question or finishes
        */}
        <button
          className="next-button"
          onClick={handleNext} // Function to run when clicked
          disabled={!selectedOption} // Can't click if nothing selected
        >
          {/* CONDITIONAL TEXT: Different button text based on whether this is the last question */}
          {state.currentQuestionIndex >= questionsForIdentity.length - 1
            ? "Get My Results"
            : "Next Question"}
        </button>
      </div>
    </Layout>
  );
}

export default IdentityPage;
