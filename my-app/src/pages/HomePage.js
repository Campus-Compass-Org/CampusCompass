// Link lets us navigate between pages without refreshing the browser (like clicking a link)
import { Link } from "react-router-dom";
// Layout is our custom component that wraps the page with header/navigation
import Layout from "../components/Layout";
// useQuiz is our custom hook that gives us access to quiz data from anywhere in the app
import { useQuiz } from "../context/QuizContext";
// CATEGORY_QUESTIONS contains all the quiz questions organized by category
import { CATEGORY_QUESTIONS } from "../data/questions";
// Import the CSS styles for this specific page
import "./HomePage.css";

/**
 * HomePage Component
 *
 * What this page does:
 * - Shows all available categories (like Sports, Academic, Arts, etc.)
 * - Lets users click to select up to 3 categories they're interested in
 * - Shows a summary of what they've selected
 * - Has a "Start Quiz" button that takes them to the actual quiz
 *
 * @returns {JSX.Element} The rendered HomePage component (JSX is like HTML but in JavaScript)
 */
function HomePage() {
  // useQuiz() connects us to our global quiz data storage
  // 'state' = current quiz data (like what categories are selected)
  // 'dispatch' = function to update/change the quiz data
  const { state, dispatch } = useQuiz();

  // Object.keys() gets all the category names from our questions data
  const categoryKeys = Object.keys(CATEGORY_QUESTIONS);

  /**
   * This function adds/removes categories from their selection when the user clicks on them
   *
   * How it works:
   * - Uses the TOGGLE_CATEGORY action in our global state
   * @param {string} category - The name of the category they clicked (like "Sports")
   */
  const handleCategorySelection = (category) => {
    dispatch({ type: "TOGGLE_CATEGORY", payload: category });
  };

  /**
   * Handles when user clicks the "Start Quiz" button
   * This function uses state.selectedCategories to make sure they've selected categories before starting
   *
   * @param {Event} e - The click event (automatically passed by React when used in onClick)
   */
  const handleStartQuiz = (e) => {
    // Check if user hasn't selected any categories yet
    if (state.selectedCategories.length === 0) {
      e.preventDefault();
      return; // Exit the function early - don't do anything else
    }

    dispatch({ type: "START_QUIZ" });
  };

  // Error state: Show this if something went wrong loading the data
  if (state.error) {
    return (
      <Layout>
        <div className="error-container">
          <h2>Error: {state.error}</h2>
          {/* window.location.reload() refreshes the entire page to try again */}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Layout wraps our content with the header/navigation */}
      <h2 className="survey-title">
        Select up to 3 categories you're interested in
      </h2>

      {/* Container for all the category buttons */}
      <div className="category-selection-container">
        <div className="category-selection">
          {/* 
            MAP FUNCTION: Loop through each category and create a button for it
            Here: each category name → a clickable button
          */}
          {categoryKeys.map((category) => (
            <button
              key={category}
              // If category is selected, add "selected" class for different styling
              className={`category-button ${
                state.selectedCategories.includes(category) ? "selected" : ""
              }`}
              onClick={() => handleCategorySelection(category)} // Run our function when clicked
              // Disable button if user already has 3 categories AND this isn't one of them
              disabled={
                state.selectedCategories.length >= 3 &&
                !state.selectedCategories.includes(category)
              }
            >
              {category} {/* The text that appears on the button */}
            </button>
          ))}
        </div>
      </div>

      {/* 
        Show the selected categories if the user has picked > 0 categories
      */}
      {state.selectedCategories.length > 0 && (
        <div className="selected-categories">
          <h3>Selected Categories:</h3>
          <ul>
            {/* Loop through selected categories and show each as a list item */}
            {state.selectedCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 
        Button to start the quiz
      */}
      <Link
        to="/quiz"
        // Use "disabled" class if no categories selected (for gray styling)
        className={`start-quiz-button ${
          state.selectedCategories.length === 0 ? "disabled" : ""
        }`}
        onClick={handleStartQuiz} // Run our function when clicked (to validate selection)
      >
        Start Quiz
      </Link>
    </Layout>
  );
}

export default HomePage;
