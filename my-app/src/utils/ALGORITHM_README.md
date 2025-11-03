# CampusCompass - How The Algorithm Works

The steps to coming up with the final list of club matches for the user is pretty long/confusing. I have tried my best to explain it here. Let me know if I can clarify anything! - Akshat


## STEP 0: IMPORTANT CONTEXT
In the [`QuizContext.js`](../context/QuizContext.js) file, we are creating a global state called `QuizContext` to manage the user's quiz data using the `createContext()` command. 

This global state includes essentially everything that we will be using to calculate the final club matches:
- **clubData**: All of the loaded in club data from the CSV
  - This looks like:
  - ```javascript
    {
    headerMapping: { "Club Name": 0, "Academic": 1, "Sports": 2, ... },
    rows: [
        ["Club Name", "Academic", "Sports", ...],  // ← Header row (index 0)
        ["Chess Club", "0.9", "0.1", ...],        // ← First actual club (index 1)
        ["Soccer Team", "0.2", "0.8", ...],       // ← Second club (index 2)
        // ... more club rows
    ]
    }
    ```
- **userTags**: An array that stores an array of user responses for every single tag
  - This array looks like this by default: `{ "1": [], "2": [], "3": [], ... }`
  - The *keys* in the (key, value) pair are the numbered tags (1, 2, 3, etc.)
  - The *values* in the (key, value) pair represent if the user said "Yes" (1) or "No" (0) to that specific tag every time a question it was associated with it was asked in the quiz
    - Ideally, every tag would have shown up for the user 3 times in the quiz
  - By the end of the quiz, every single tag would ideally look something like this:
    -   ```javascript
        { "1": [1, 0, 0], "2": [0, 0, 1], "3": [1, 1, 1] }
        ```
- **selectedCategories**: An array that stores the user's top 3 category selections
- **userIdentityResponses**: An array that stores the user's responses to identity questions
- **currentCategoryIndex**: What *category* the user is currently on in the quiz
- **currentQuestionIndex**: What *question* the user is currently on in the quiz IN THAT CATEGORY
- **topClubs**: The array containing the final club matches for the user
- **quizStarted**: Just a boolean to check if the quiz has started or not
- **surveyComplete**: A boolean that checks if the user has completed the quiz interest questions
- **identityComplete**: A boolean that checks if the user has completed the identity questions
- **loading**: A boolean that checks if the app is currently in any sort of loading state
  - Now that I'm thinking about it, this may currently be completely useless. I can't think of any case where I set this boolean to true
    - We can do some research into this
- **error**: A string that stores any error message that occurs during the quiz process


## Step 1: User Inputs their Top 3 Categories

The user starts at the [HomePage.js](../Pages/HomePage.js) page. This page allows them to browse the cateogires and their questions and select their top 3 categories. 

We limit them to only 3 categories because otherwise they would have too many questions in the quiz, leading to survey fatigue and lower quality responses.

When the user selects a category, we update the `selectedCategories` array in the global state to include that category (if selectedCategories is not already full/length 3). 

Once the user selects all the categories that they are interested in, they can click the "Start Quiz" button to begin the quiz.

**After this step, this is what's in the following: **
- `selectedCategories`: An array of the user's selected categories (length 1-3)
- `quizStarted`: Set to true once the user clicks "Start Quiz"
- `currentCategoryIndex`: Set to 0 (first category)
- `currentQuestionIndex`: Set to 0 (first question in that category)
  
## Step 2: User Takes the Quiz

The user is then taken to the [QuizPage.js](../Pages/QuizPage.js) page where they are asked questions based on their selected categories.

See handleAnswer function (line 81) for a better understanding of what happens every single time the user answers a question in the quiz. I'll try to explain it here as well:

```javascript
const handleAnswer = (tagIds, answeredYes) => {
    // STEP 1: Convert Yes/No to number
    const numericAnswer = answeredYes ? 1 : 0;
    
    // STEP 2: Make a shallow copy of existing user tags so we don't accidentally change the original
    const updatedTags = { ...state.userTags };
    
    // STEP 3: Append this answer to all the tags this question relates to
    // Loop through each tag ID for this question
    tagIds.forEach(tid => {
      // For each tag, add the numeric answer to its array of responses
      updatedTags[tid] = [...updatedTags[tid], numericAnswer];
    });

    // STEP 4: Save the updated tags to our global quiz state
    dispatch({ type: 'UPDATE_USER_TAGS', payload: updatedTags });

    // STEP 5: Figure out where to go next in the quiz    
    // Check if this was the last question in the current category
    if (state.currentQuestionIndex === questionsForCategory.length - 1) {
      // Check if there are more categories
      if (state.currentCategoryIndex < state.selectedCategories.length - 1) {
        // This resets currentQuestionIndex to 0 and increments currentCategoryIndex
        dispatch({ type: 'NEXT_CATEGORY' });
      } else {
        // No more categories - we finished the entire quiz!
        dispatch({ type: 'COMPLETE_SURVEY' });
        navigate('/identity');
      }
    } else {
      // Move to next question (increments currentQuestionIndex by 1)
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };
```

Every single time the user selects "Yes" or "No" for a question, the following happens:
1. Their response is sent to handleAnswer, along with the tag IDs that the current question they are on is associated with
2. Their "Yes"/"No" response is converted to a numeric value (1 for Yes, 0 for No)
3. This numeric response is appended to the array for each tag ID that the question is associated with
   - For example, if the question is associated with tag IDs 1 and 3, and the user answered "Yes" aka `true`, then a 1 is appended to the arrays for both tag ID 1 and tag ID 3 in the `userTags` object in the global state
4. The updated `userTags` object is saved back to the global state
5. The app figures out where to go next in the quiz:
   - If there are more questions in the current category, it moves to the next question (increments `currentQuestionIndex` by 1)
   - If there are no more questions in the current category, but there are more categories, it moves to the next category (resets `currentQuestionIndex` to 0 and increments `currentCategoryIndex` by 1)
   - If there are no more questions in the current category and no more categories, it marks the survey as complete and navigates the user to the identity questions page.

Once this entire process is complete for all questions in all selected categories, the user will have a populated `userTags` object in the global state that looks something like this with the interest tags:

```javascript
{ "1": [1, 0, 0], "2": [0, 0, 1], "3": [1, 1, 1], ... }
```
**After this step, this is what's in the following:**
- `userTags`: An array with every tagID as a key, and an array of the user's responses (1s and 0s) as the value for ONLY THE INTEREST TAGS 
- `currentCategoryIndex`: Set to the length of selectedCategories (indicating quiz is complete)
- `surveyComplete`: Set to true
- `currentQuestionIndex`: Set to 0. The Identity questions will start from the beginning

## STEP 3: User Answers Identity Questions

Once the user finishes answering their interest questions, they are taken to the [IdentityPage.js](../Pages/IdentityPage.js) page. Here, they are asked if they are interested in answering some identity questions to help us improve club recommendations.

If the user chooses to answer the identity questions, the following happens:
- the SET_SHOW_IDENTITY_QUESTIONS action is dispatched, setting the `showIdentityQuestions` boolean in the global state to true
- The user is asked the identity questions one by one
- *What happens every time the user selects an answer:*
  - Their selection is added to the `userIdentityResponses` array in the global state
- Once the user answers all the identity questions, the finalizeScoresAndComputeClubs function is called

## STEP 4: The finalizeScoresAndComputeClubs Function

This function is where all the logic behind out calculation happens. It is on ine 123 of [IdentityPage.js](../Pages/IdentityPage.js). Here is a breakdown of what happens in this function:

- It takes in 1 parameter: 
  - `identityResponses`: An array of the user's responses to the identity questions 
    - Looks like this: `["Christian", "Female", "Computer Science", "other", ...]

1. It creates a copy of the state.userTags (containing the interest tags along with the array of the user responses - see above)
2. It calls the *applyCategoryInterestScores* function on the copied userTags to update their scores based on the user's selected categories
  - *applyCategoryInterestScores* function (line 390 in [quizUtils.js](../utils/quizUtils.js)):
    - Takes in 2 parameters:
      - `tempUserTags`: The userTags object
      - `selectedCategories`: The user's selected category names
    - It updates the userTags object by adding an extra 1 to the array associated with each category tag that the user selected
      - For example, if the user selected the "Arts" category, then an extra 1 is added to the array for tag ID/index 8 (the Arts tag)
    - **Returns the updated userTags object**
3. It calculates the final scores for each tag using the *calcUserTagScores* function on the updated userTags
  - *calcUserTagScores* function (line 34 in [quizUtils.js](../utils/quizUtils.js)):
    - Takes in 1 parameter:
      - `userTags`: The userTags object
        - **Reminder:** The userTags object looks something like this: `{ "1": [1, 0, 0], "2": [0, 0, 1], "3": [1, 1, 1], "4": [] ... }` for each of the 40 interest tags
      - For every tag in userTags:
        - If the tag has no responses (meaning thwe user never saw a question associated with that tag), it is given a score of 0
        - If the tag has responses, the average of the responses is calculated to get a score
      - It then applies a boost to specific averaged tags:
        - If the average score is 1 and a question associated with that tag showed up at least 3 times, it is boosted to a score of 2
          - This is because the user is clearly very interested in this tag
      - **Returns an object with the final scores for each interest tag**
        - Looks like this: `{ "1": 0.33, "2": 0.67, "3": 1.0, "4": 0, ... }`
4. Build an array of just the scores from the tagScores object (essentially remove the keys)
   - The userVector now looks like this: `[0.33, 0.67, 1.0, 0, ... ]`
5. Call the *rankClubsBySimilarity* function to get the top club matches for the user as well as to factor in the identity responses
  - We have't done anything with the identity responses up till now becuase theres a chance the user may have chosen not to answer them
  - *rankClubsBySimilarity* function (line 289 in [quizUtils.js](../utils/quizUtils.js)):
    - Takes in 3 parameters:
      - `userVector`: Just the array of the user's final tag scores
        - Looks like this: `[0.33, 0.67, 1.0, 0, ... ]`
      - `clubDataObj`: The clubData object from the global state, containing the club name, link, tag scores on 127 tags (interest + identity), and descriptions
      - `userIdentityCols`: The identityResponses array that was passed into the finalizeScoresAndComputeClubs function
    - First it calls the *getRelevantIdentities* function (line 157 in [quizUtils.js](../utils/quizUtils.js)) to 
      - This removes all the "No" and "Other" responses that the user selected for the identity questions
      - Then, it looks through the rest of the identities that the user selected and:
        - Creates an array that contains all of the identities that the user selected, plus the rest of the options that they did not select
          - For example, if the user selected "Christian" and "Computer Science" for the Religion question, the array would include: `["Christian", "Muslim", "Hindu", "Architecture", "Business", "Computer Science", "Biology", ... ]`
          - If the user selected "Rather not say" for their gender, the array would not include any gender identities: `["Christian", "Muslim", "Hindu", "Architecture", "Business", "Computer Science", "Biology", ...]`
      - This returns the array described above
    - Next, it merges the list of all 40 tags with the returned array of relevant identities to create a final list of tags for that user
    - Then it calls the *keepColumnsAsArray* function (line 191 in [quizUtils.js](../utils/quizUtils.js))
      - Take in 3 parameters:
        - `data`: The clubDataObj.rows array (all the club data - their names, links, tag scores, and descriptions)
        - `columnsToKeep`: The array of columns names that we want to keep for this user (the 40 interest tags + the relevant identity tags)
        - `headerMapping`: The headerMapping object from the clubDataObj that maps what each column in `data` is
      - First it makes sure that every column name in `columnsToKeep` exists in the `headerMapping`. If not, it throws an error
      - Then it returns the `data` passed in but only with the columns that we want to keep for this user 
    - Next in rankClubsBySimilarity, it adds a score to the userVector for each of the identity that we got back from the *getRelevantIdentities* function
      - For each identity column:
        - If the user selected that identity, it gives it a score of 2 (Greek gets 1.0 bcz we noticed that otherwise the results are too skewed towards greek life)
        - If the user did not select that identity, it gives it a score of 0.0
      - This creates an updated userVector that now includes scores for both interest tags and relevant identity tags
    - Checkpoint: We are now at line 294 in [quizUtils.js](../utils/quizUtils.js)
    - For every row in the club data (filtered to only include relevant columns for this user):
      - Create the clubVector for that specific club by extracting the values after the name and link columns
      -  Make sure the clubVector and userVector are the same length (if not, throw an error)
      -  Use the *cosineSimilarity* function [quizUtils.js](../utils/quizUtils.js) (line 101) to calculate the similarity score between the userVector and clubVector
      -  Add the similarity score along with the club's name and link to an array
      -  Return the array of ranked clubs sorted by similarity score (highest to lowest)
6. Now, we have the ranked clubs for the user. We then use the SET_TOP_CLUBS action to save the top 10 clubs to the global state, and set COMPLETE_IDENTITY to true to indicate that the identity questions are complete.
7. Redirect the user to /results page to see their final matches!

## STEP 5: User Sees Their Final Matches
The user is taken to the [ResultsPage.js](../Pages/ResultsPage.js) page where they see their top club matches based on all the calculations done in the previous step.
Here, they also can look at all the clubs on the Cal Poly NOW website if they want to explore more options beyond their top matches, or retake the quiz if they want to try again with different categories or different answers.

 
## AND THATS IT! That's how the entire algorithm works from start to finish. If you have any questions or want me to clarify anything, feel free to reach out!
