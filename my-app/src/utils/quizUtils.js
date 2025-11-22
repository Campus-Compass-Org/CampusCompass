// Import tag definitions and questions from our data files
// TAG_LIST contains all the different interest categories we track
import { TAG_LIST } from "../data/tags";
// CATEGORY_QUESTIONS contains all the quiz questions organized by category
import { CATEGORY_QUESTIONS } from "../data/questions";
import { ONLY_IDENTITIES } from "../data/identity";

/**
 * calcUserTagScores - THE SCORE CALCULATOR
 * ==========================================
 *
 * This function takes all the user's quiz answers and calculates their final preference scores.
 *
 * How it works:
 * 1. For each interest topic (tag), look at all the user's answers about that topic
 * 2. Calculate the average of those answers (1 = Yes, 0 = No, so 0.5 = mixed feelings)
 * 3. Apply special boost: if someone consistently says "Yes" to something, boost their score
 *
 * Why we do this:
 * - Users answer multiple questions about the same topic (like "teamwork")
 * - We need one final score per topic to compare with clubs
 * - The boost rewards people who are REALLY interested in something
 *
 * Example:
 * - User answers 3 questions about "leadership": Yes, Yes, No
 * - Average = (1 + 1 + 0) / 3 = 0.67
 * - Since they answered more than 2 questions and got perfect average (would be 1.0), they get boosted to 2.0
 *
 * @param {Object} userTags - Dictionary where keys are tag IDs and values are arrays of responses
 *                           Example: { "1": [1, 0, 1], "2": [0, 1], "3": [1, 1, 1] }
 * @returns {Object} finalScores - Final preference score for each tag (0-2 scale)
 *                                Example: { "1": 0.67, "2": 0.5, "3": 2.0 }
 */
export function calcUserTagScores(userTags) {
  // STEP 1: Calculate raw averages for each tag
  let rawAverages = {};

  // Loop through each tag (interest topic)
  for (const tagnumber in userTags) {
    const responses = userTags[tagnumber]; // Get all their answers for this topic

    // Check if they never answered questions about this topic
    if (!responses || responses.length === 0) {
      rawAverages[tagnumber] = 0; // Default to 0 (no interest)
    } else {
      // Calculate average: add up all answers, divide by count
      // Example: [1, 0, 1] → (1+0+1)/3 = 0.67
      const sum = responses.reduce((acc, val) => acc + val, 0);
      rawAverages[tagnumber] = sum / responses.length;
    }
  }

  // STEP 2: Apply special boosting rule
  // If someone answered "yes" to a tag 3+ times (avg score of 1), boost them bcz they are clearly interested
  // Boost means set their score for the tag to 2.0 instead of 1.0
  let finalScores = {};

  // Loop through each calculated average
  for (const tagnumber in rawAverages) {
    const avgTag = rawAverages[tagnumber];
    let finalValue = avgTag; // Default final value to the average calculated above

    // BOOST RULE: Perfect score + many questions = extra boost
    // This rewards people who consistently love something
    if (finalValue === 1 && userTags[tagnumber].length > 2) {
      finalValue = 2; // Double boost for strong consistent interest!
    }

    finalScores[tagnumber] = finalValue;
  }

  return finalScores;
}

/**
 * cosineSimilarity - THE SIMILARITY CALCULATOR
 * ============================================
 *
 * This is the core math that determines how similar a user is to a club!
 * It's like asking: "How much do these two things have in common?"
 *
 * What is cosine similarity?
 * - Imagine two arrows pointing in space
 * - If they point in the same direction = very similar (score close to 1)
 * - If they point in opposite directions = very different (score close to 0)
 * - If they're perpendicular = neutral (score around 0.5)
 *
 * In our case:
 * - User vector = [0.8, 0.2, 0.9, ...] (their interest levels)
 * - Club vector = [0.7, 0.1, 0.8, ...] (club's characteristics)
 * - Result = 0.95 means 95% similar!
 *
 * The math:
 * similarity = (A·B) / (|A| × |B|)
 * where A·B is dot product, |A| and |B| are magnitudes
 *
 * @param {Array} vecA - First vector (usually user preferences)
 * @param {Array} vecB - Second vector (usually club characteristics)
 * @returns {number} - Similarity score between 0 and 1 (higher = more similar)
 */
export function cosineSimilarity(vecA, vecB) {
  // Validate input vectors
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    console.error("Invalid vectors for cosine similarity calculation");
    return 0;
  }

  // Initialize our three key calculations
  let dotProduct = 0; // How much vectors "agree" with each other
  let normA = 0; // "Length" of vector A
  let normB = 0; // "Length" of vector B

  // Calculate all three values in one loop (efficient!)
  for (let i = 0; i < vecA.length; i++) {
    // Dot product: multiply corresponding elements and sum them
    // Example: [0.8, 0.2] · [0.7, 0.1] = (0.8×0.7) + (0.2×0.1) = 0.56 + 0.02 = 0.58
    dotProduct += vecA[i] * vecB[i];

    // Calculate magnitude components (we'll square root these later)
    // This measures how "long" each vector is
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  // Prevent division by zero
  const magnitudeA = Math.sqrt(normA);
  const magnitudeB = Math.sqrt(normB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    console.warn("Zero magnitude vector detected in cosine similarity");
    return 0; // Return 0 similarity for zero vectors
  }

  // Final calculation: normalize the dot product by vector lengths
  // This ensures the result is always between 0 and 1
  const similarity = dotProduct / (magnitudeA * magnitudeB);

  // Ensure result is valid
  if (isNaN(similarity)) {
    console.error("NaN result in cosine similarity calculation");
    return 0;
  }

  return similarity;
}

/**
 * getRelevantIdentities - THE IDENTITY FILTER
 * ==========================
 * This function filters out the user's identity responses to find relevant identities.
 * It removes any 'other' or null responses and returns a list of identities that can be used for
 * matchmaking.
 * @param {Array} selectedIdentities - Array of user's identity responses (e.g., ["man men", "Theatre Arts", "other"])
 * @returns {Array} - Array of all relevant identities
 */

export function getRelevantIdentities(selectedIdentities) {
  // Filter out any 'other' or null responses
  const startList = selectedIdentities.filter(
    (identity) => identity !== "other" && identity !== null
  );

  // get all other valid identities in that same question
  const relevantIdentities = startList.flatMap((identity) => {
    // find the subarray in ONLY_IDENTITIES that contains this identity
    const group = ONLY_IDENTITIES.find((arr) => arr.includes(identity));
    // if found, return all identities in that group; otherwise just return the identity itself
    return group ? group : [identity];
  });

  return relevantIdentities;
}

/**
 * keepColumnsAsArray - THE DATA FILTER
 * ====================================
 * What it does:
 * - Takes a 2D array
 * - Keeps only the columns we care about
 *
 * Example:
 * Input:  [["Club", "Link", "Sport", "Academic", "Other"],
 *          ["Chess", "url1", 0.1, 0.9, 0.2]]
 * Keep:   ["Club", "Academic"]
 * Output: [["Chess"], [0.9]]
 *
 * @param {Array} data - 2D array representing spreadsheet data
 * @param {Array} columnsToKeep - Array of column names we want to keep
 * @param {Object} mapping - Maps column names to their index positions
 * @returns {Array} - Filtered 2D array with only the desired columns
 */
export function keepColumnsAsArray(data, columnsToKeep, mapping) {
  // STEP 1: Validate which columns actually exist in the CSV
  // Filter out any columnsToKeep that don't appear in the mapping
  const validColumns = columnsToKeep.filter((col) => {
    // Check if this column exists in our CSV
    const columnExists = mapping.hasOwnProperty(col);
    if (!columnExists) {
      console.warn(`Column "${col}" not found in CSV data. Skipping...`);
    }

    return columnExists;
  });

  // STEP 2: Return a new array containing data with only the valid columnsToKeep
  return data.map((row, rowIndex) =>
    validColumns.map((col) => {
      const columnIndex = mapping[col]; // the column index in the CSV
      const value = row[columnIndex];

      // Convert to number if it's a string representation of a number
      if (typeof value === "string") {
        const numericValue = parseFloat(value);
        return isNaN(numericValue) ? value : numericValue;
      }

      // Return the value as-is, or 0 if somehow undefined (should not happen with complete data)
      return value !== undefined ? value : 0;
    })
  );
}

/**
 * Takes user preferences and finds the clubs that match them best.
 *
 * How the magic happens:
 * 1. Take user's quiz results (their interest vector)
 * 2. Add their identity preferences to the vector
 * 3. Compare their vector to every club's vector
 * 4. Rank clubs by similarity score
 * 5. Return the top 10 matches
 *
 * The vectors explained:
 * - User vector: [0.8, 0.2, 0.9, ...] = "I love leadership, don't like sports, love creativity..."
 * - Club vector: [0.7, 0.1, 0.8, ...] = "This club is leadership-focused, not sports-related, very creative..."
 * - Similarity: How close these vectors are = how good the match is!
 *
 * @param {Array} userVector - User's preference scores for the 40 interest tags (0-1 scale)
 * @param {Object} clubDataObj - Object containing club data and mappings.
 *    Structure: { headerMapping: {"Club Name": 0, "links": 1, "Leadership": 2}, rows: [["Club Name", "links", "Leadership"],["Chess Club", "url1", 0.8]] }
 * @param {Array} userIdentityCols - User's identity responses (like major, year, etc.)
 * @returns {Array} - Top 10 club matches with similarity scores
 */
export function rankClubsBySimilarity(
  userVector,
  clubDataObj,
  userIdentityCols
) {
  // Create a mutable copy of the userVector to avoid modifying the original array
  const mutableUserVector = [...userVector];

  // STEP 1: Process identity responses
  // We ignore null and 'other' responses since they don't provide filtering value
  // Also brings in the rest of the identities that the user did not select so that we can later
  // assign them a score of 0 to indicate that the user is not related to that identity
  const identitiesToInclude = getRelevantIdentities(userIdentityCols);

  // STEP 2: Set up our data processing
  const { headerMapping, rows } = clubDataObj;
  // Define which columns we need from the club data
  const allCols = ["Club Name", "links", ...TAG_LIST, ...identitiesToInclude];

  // Filter the club data to only include the columns we need
  // slicing off the first row bcz its the header row (not actual data)
  const userFilteredData = keepColumnsAsArray(
    rows.slice(1),
    allCols,
    headerMapping
  );

  // STEP 3: Add the idenntity scores to the user vector (right now it just contains their averages for interest tag scores)
  // Add a 2.0 for each identity the user selected, and 0 for the ones they didn't
  // This makes clubs that match the user's identities rank higher and those that don't rank lower
  for (let i = 0; i < identitiesToInclude.length; i++) {
    const identity = identitiesToInclude[i];
    if (userIdentityCols.includes(identity)) {
      if (identity === "Greek") {
        // SPECIAL CASE: Greek life gets a lower boost (1.0 instead of 2.0)
        // This is because we noticed when this is set to 2.0, results are heavily skewed
        mutableUserVector.push(1.0);
      } else {
        mutableUserVector.push(2.0);
      }
    } else {
      mutableUserVector.push(0);
    }
  }

  // Debug logging to help understand what's happening
  console.log("User Vector:", mutableUserVector);
  console.log("User Identity Columns:", userIdentityCols);
  console.log("Columns to Keep:", allCols);

  // List tag name and associated value for it:
  for (let i = 0; i < mutableUserVector.length; i++) {
    const tagName = allCols[i + 2];
    const tagValue = mutableUserVector[i];
    console.log(`Tag: ${tagName}, Value: ${tagValue}`);
  }

  // STEP 4: Calculate similarity for each club
  let results = [];

  // Loop through each club (skip header row, so start at index 1)
  for (let i = 1; i < userFilteredData.length; i++) {
    const row = userFilteredData[i];

    // Skip empty or invalid rows
    if (!row || row.length < 3) {
      console.warn(`Skipping invalid row at index ${i}`);
      continue;
    }

    // Extract club information
    const clubName = row[0]; // Club name for display
    const clubLink = row[1]; // Link to club's page

    // Skip rows with missing essential data
    if (!clubName || clubName.trim() === "") {
      console.warn(`Skipping row with missing club name at index ${i}`);
      continue;
    }

    // Extract club's characteristic vector (everything after name and link)
    // Convert strings to numbers for mathematical comparison
    const clubVector = row.slice(2).map((val) => {
      const num = parseFloat(val);
      if (isNaN(num)) {
        console.warn(
          `Invalid number found in club vector for "${clubName}" at index ${i}: ${val}`
        );
        return 0;
      }
      return num; // Default to 0 for invalid numbers
    });

    // Ensure vectors have the same length
    if (clubVector.length !== mutableUserVector.length) {
      console.warn(
        `Vector length mismatch for club "${clubName}": expected ${mutableUserVector.length}, got ${clubVector.length}`
      );
      continue;
    }

    // THE MAGIC MOMENT: Calculate how similar this club is to the user
    const categorySimilarity = cosineSimilarity(mutableUserVector, clubVector);

    // Skip clubs with invalid similarity scores
    if (isNaN(categorySimilarity) || categorySimilarity < 0) {
      console.warn(
        `Invalid similarity score for club "${clubName}": ${categorySimilarity}`
      );
      continue;
    }

    // Store the result with all the info we need
    results.push({ clubName, clubLink, similarity: categorySimilarity });
  }

  // STEP 5: Sort and return best matches

  // Ensure we have results
  if (results.length === 0) {
    console.error("No valid club matches found!");
    return [];
  }

  // Sort by similarity score (highest first)
  results.sort((a, b) => b.similarity - a.similarity);

  // Return the top 25 matches
  return results.slice(0, 25);
}

/**
 * applyCategoryInterestScores - THE CATEGORY BOOSTER
 * ==================================================
 * This function gives extra credit to users for the categories they selected!
 *
 * How it works:
 * 1. Look at which top 3 categories the user picked on the home page (like "Sports", "Academic")
 * 2. For each category, add a bonus score to their preferences
 * 3. Selected categories get +1 (boost), unselected get 0 (neutral)
 *
 * Why this matters:
 * - User explicitly said "I'm interested in Sports" by selecting that category
 * - Even if their quiz answers were mixed, we should boost sports-related matches
 *
 * @param {Object} tempUserTags - Copy of user's quiz responses
 * @param {Array} selectedCategories - Categories user chose on home page
 * @returns {Object} - Updated user tags with category bonuses added
 */
export function applyCategoryInterestScores(tempUserTags, selectedCategories) {
  // Get all available category names from our questions data
  const categoryKeys = Object.keys(CATEGORY_QUESTIONS);

  // Loop through each category and apply appropriate score
  for (let categoryName of categoryKeys) {
    // Convert category name to its corresponding tag number
    const catTagId = renameCategoryToNumber(categoryName);

    // Check if user selected this category
    if (selectedCategories.includes(categoryName)) {
      // They selected it! Give them a bonus point (1)
      tempUserTags[catTagId].push(1);
    }
    // If they didn't select it, don't do anything special
  }

  return tempUserTags;
}

export function removeNonrelevantIdentities(
  clubData,
  identityResponses,
  IDENTITY_OPTIONS
) {
  const headers = clubData["headerMapping"]; //{Club Name: 0, links: 1, Leadership: 2, Teamwork: 3, ...}
  let clubs = clubData["rows"].slice(1); //[['Club1', 'link1', '0.12', '0.32', ...], ['Club2', 'link2', '0.12', '0.32', ...]]
  // identity responses  ["identity1", "identity2", ...]
  console.log("CLUBS (none filtered):    ", clubs);

  // -- filter out greek --
  const greek_idx = headers["Greek"];
  if (!identityResponses.includes("Greek")) {
    clubs = clubs.filter((club) => Number(club[greek_idx]) === 0.0);
  }

  console.log("CLUBS (greek filtered):    ", clubs);

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

  console.log("CLUBS (religion filtered):    ", clubs);

  // gender filters
  const userGenderIdentity = identityResponses[0]; // hardcoded, may need to be updated if changes are made
  if (userGenderIdentity === "man men") {
    clubs = clubs.filter(
      (club) =>
        !(
          Number(club[headers["woman women"]]) === 1.0 &&
          Number(club[headers["man men"]]) === 0.0
        )
    );
  }
  if (userGenderIdentity === "woman women") {
    clubs = clubs.filter(
      (club) =>
        !(
          Number(club[headers["man men"]]) === 1.0 &&
          Number(club[headers["woman women"]]) === 0.0
        )
    );
  }

  console.log("CLUBS (gender filtered):    ", clubs);

  // -- race filters --
  let ethnicityQuestion = null;
  for (const key in IDENTITY_OPTIONS) {
    if (key.includes("race") || key.includes("Race")) {
      ethnicityQuestion = key;
    }
  }
  // get list of races
  const raceList = IDENTITY_OPTIONS[ethnicityQuestion].map(
    (option) => option["value"] // [religion1, religion2, ...]
  );
  // get corresponding header value for each key
  const raceDict = {}; // ex: {race1: 56, race2: 58, ... }
  for (const race of raceList) {
    raceDict[race] = headers[race];
  }
  // filter for each club
  for (const race of raceList) {
    clubs = clubs.filter(
      (club) =>
        Number(club[raceDict[race]]) === 1 ||
        race === "other" ||
        identityResponses.includes(race)
    );
  }

  console.log("CLUBS (race filtered):    ", clubs);

  // -- lgbtq filters --
  if (!identityResponses.includes("lgbtq")) {
    clubs = clubs.filter((club) => Number(club[headers["lgbtq"]]) === 0.0);
  }

  console.log("CLUBS (lgbt filtered):    ", clubs);
  return clubs;
}

/**
 * renameCategoryToNumber
 * -------------------
 * Maps a category name to a corresponding tag number.
 */
export function renameCategoryToNumber(categoryName) {
  if (categoryName === "Community Service & Advocacy") return 3; // Community Service is tag 3
  if (categoryName === "Arts & Culture") return 8; // Creative Expression is tag 8
  if (categoryName === "Sports & Recreation") return 18; // Physical Fitness is tag 18
  if (categoryName === "Professional Development & Networking") return 13; // Professional Networking is tag 13
  if (categoryName === "Technology & Engineering") return 7; // Technology & Computing is tag 7
  if (categoryName === "Health & Wellness") return 20; // Health & Wellness is tag 20
  if (categoryName === "Academic & Educational") return 22; // Academic Support is tag 22

  console.warn(
    `Unknown category: ${categoryName}, defaulting to Academic Support`
  );
  return null; // Default to Academic Support instead of Leadership
}
