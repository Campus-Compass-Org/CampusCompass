// useNavigate moves to different pages (when our code decides to navigate)
import { useNavigate } from "react-router-dom";
// Layout is our custom component that wraps the page with header/navigation
import Layout from "../components/Layout";
// useQuiz is our custom hook that gives us access to quiz data from anywhere in the app
import { useQuiz } from "../context/QuizContext";
// CATEGORY_QUESTIONS contains all the quiz questions organized by category
import { CATEGORY_QUESTIONS } from "../data/questions";
// Import the CSS styles for this specific page
import "./QuizPage.css";

/**
 * What this page does:
 * - Shows questions from the categories they selected on the home page
 * - Presents one question at a time with simple Yes/No buttons
 * - Tracks their progress with a visual progress bar
 * - Records their answers for later analysis
 * - Automatically moves through questions and categories
 *
 * How the quiz flows:
 * 1. Start with first question from first selected category
 * 2. User answers Yes or No
 * 3. Move to next question in same category
 * 4. When category is done, move to next category
 *
 * Data it collects:
 * - For each question, saves a 1 (Yes) or 0 (No)
 * - Questions are linked to "tags" that represent different interests
 * - These numbers get analyzed later to find matching clubs
 *
 * @returns {JSX.Element} The rendered QuizPage component (JSX is like HTML but in JavaScript)
 */
function QuizPage() {
  // REFRESHES EVERY TIME THE STATE CHANGES - IMPORTANT TO KNOW
  const { state, dispatch } = useQuiz();

  const navigate = useNavigate();

  // ROUTE PROTECTION: Makes sure user should be on this page
  if (!state.quizStarted || state.selectedCategories.length === 0) {
    navigate("/"); // Send them back to home page if they shouldn't be here
    return null;
  }

  // DATA PREPARATION: Figure out which question to show right now

  // Get the name of the category we're currently asking about
  const categoryName = state.selectedCategories[state.currentCategoryIndex];

  // Get all the questions for this specific category
  const questionsForCategory = CATEGORY_QUESTIONS[categoryName];

  // Get the specific question we're showing right now
  // currentQuestion is an array like: ["Do you like team sports?", [1, 5, 12]]
  // [0] = the question text, [1] = array of tag IDs this question relates to
  const currentQuestion = questionsForCategory[state.currentQuestionIndex];

  /**
   * Handles when user answers a question by clicking Yes or No
   *
   * What it does step-by-step:
   * 1. Converts their Yes/No answer into a number (1 or 0)
   * 2. Saves that number for all the "tags" this question relates to
   * 3. Figures out what to do next (next question, next category, or finish)
   * 4. Updates the quiz state to move forward
   *
   * Why we use numbers instead of Yes/No:
   * - Later we'll average these numbers to get preference scores
   * - 1 means "I like this", 0 means "I don't like this"
   *
   * What are "tags"?
   * - Tags represent different interests/activities (like "teamwork", "outdoors", "leadership")
   * - Each question can relate to multiple tags
   * - Clubs also have scores for these same tags
   * - We match users to clubs by comparing tag scores
   *
   * @param {Array} tagIds - Array of tag numbers this question relates to (like [1, 5, 12])
   * @param {boolean} answeredYes - true if they clicked Yes, false if they clicked No
   */
  const handleAnswer = (tagIds, answeredYes) => {
    // STEP 1: Convert Yes/No to number
    const numericAnswer = answeredYes ? 1 : 0;

    // STEP 2: Make a shallow copy of existing user tags so we don't accidentally change the original
    const updatedTags = { ...state.userTags };

    // STEP 3: Append this answer to all the tags this question relates to
    // Loop through each tag ID for this question
    tagIds.forEach((tid) => {
      // For each tag, add the numeric answer to its array of responses
      updatedTags[tid] = [...updatedTags[tid], numericAnswer];
    });

    // STEP 4: Save the updated tags to our global quiz state
    dispatch({ type: "UPDATE_USER_TAGS", payload: updatedTags });

    // STEP 5: Figure out where to go next in the quiz
    // Check if this was the last question in the current category
    if (state.currentQuestionIndex === questionsForCategory.length - 1) {
      // Check if there are more categories
      if (state.currentCategoryIndex < state.selectedCategories.length - 1) {
        // This resets currentQuestionIndex to 0 and increments currentCategoryIndex
        dispatch({ type: "NEXT_CATEGORY" });
      } else {
        // No more categories - we finished the entire quiz!
        dispatch({ type: "COMPLETE_SURVEY" });
        navigate("/identity");
      }
    } else {
      // Move to next question (increments currentQuestionIndex by 1)
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  // Back button
  const handleBack = (tagIds) => {
    console.log(tagIds);

    // STEP 1: Make a copy of existing user tags so we don't accidentally change the original
    const updatedTags = { ...state.userTags };

    tagIds.forEach((tid) => {
      // For each tag from the previous question, delete most recent response
      updatedTags[tid] = updatedTags[tid].slice(0, -1);
    });
    // STEP 2: Save the updated tags to our global quiz state
    console.log("CURRENT global state:", state.userTags);
    console.log("NEW global state (after BACK):", updatedTags);
    dispatch({ type: "UPDATE_USER_TAGS", payload: updatedTags });

    // STEP 3: Figure out where to go next in the quiz
    // If the current question is the first question in the category, we can't go back - IMPLEMENT LATER POTENTIALLY
    if (state.currentQuestionIndex !== 0) {
      // Not first question, can just go back 1 question in category
      dispatch({ type: "PREV_QUESTION" });
    }
  };

  // PROGRESS CALCULATION: Figure out how far through the quiz they are

  // Calculate overall progress percentage across all selected categories

  // How the math works:
  // - currentCategoryIndex = which category we're on (0, 1, 2...)
  // - currentQuestionIndex = which question in current category (0, 1, 2...)
  // - questionsForCategory.length = total questions per category (usually 7)
  // - selectedCategories.length = total categories they picked (1, 2, or 3)

  // Formula: (completed questions / total questions) * 100
  // Example: If they picked 2 categories with 7 questions each = 14 total questions
  //          If they're on category 1, question 3 = they've completed 10 questions
  //          Progress = (10 / 14) * 100 = 71%
  const progressPercentage =
    ((state.currentCategoryIndex * questionsForCategory.length +
      state.currentQuestionIndex +
      1) /
      (state.selectedCategories.length * questionsForCategory.length)) *
    100;

  return (
    <Layout>
      {/* Layout wraps our content with the header/navigation */}

      {/* 
        PROGRESS BAR: Visual indicator showing how far through the quiz they are
        The progressPercentage variable controls how much of the bar is filled
      */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main question display area - everything the user interacts with */}
      <div className="question-block">
        {/* 
          CATEGORY HEADER: Shows which category and question number they're on
        */}
        <h3 className="category-name">
          {categoryName}{" "}
          {/* Name of current category like "Sports" or "Academic" */}
          <span className="question-counter">
            ({state.currentQuestionIndex + 1} of {questionsForCategory.length})
          </span>
        </h3>

        {/* 
          THE ACTUAL QUESTION: This is what users read and respond to
        */}
        <h2 className="subcategory-question">{currentQuestion[0]}</h2>

        {/* 
          ANSWER BUTTONS: The Yes and No buttons that users click
        */}
        <div className="answer-buttons">
          <button
            className="answer-button yes-button"
            // When clicked: call handleAnswer with the question's tag IDs and true (for Yes)
            // currentQuestion[1] contains the array of tag IDs this question relates to - see note on line 56
            onClick={() => handleAnswer(currentQuestion[1], true)}
          >
            Yes
          </button>
          <button
            className="answer-button no-button"
            // When clicked: call handleAnswer with the question's tag IDs and false (for No)
            onClick={() => handleAnswer(currentQuestion[1], false)}
          >
            No
          </button>
          {state.currentQuestionIndex > 0 && (
            <button
              className="back-button"
              onClick={() =>
                handleBack(
                  questionsForCategory[state.currentQuestionIndex - 1][1]
                )
              }
            >
              Back
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default QuizPage;
