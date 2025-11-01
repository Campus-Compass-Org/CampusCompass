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

