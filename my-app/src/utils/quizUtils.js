// Import tag definitions and questions from our data files
// TAG_LIST contains all the different interest categories we track
import { TAG_LIST } from "../data/tags";
// CATEGORY_QUESTIONS contains all the quiz questions organized by category
import { CATEGORY_QUESTIONS } from "../data/questions";
import { ONLY_IDENTITIES } from "../data/identity";

/**
 * Campus Compass Club Matching Engine
 * ===================================
 * This module powers the recommendation system that matches students to clubs
 * based on quiz answers, interests, and identities.
 *
 * High-Level Flow:
 * 1. calcUserTagScores() – Converts quiz answers into weighted tag scores (user vector)
 * 2. rankClubsBySimilarity() – Compares the user vector to each club vector using cosine similarity
 * 3. Filters & Weighting:
 *    - Requires enough overlap in primary interest categories
 *    - Uses a 70% (interest) / 30% (identity) weighting scheme
 *    - Applies boosts for categories explicitly chosen by the user
 * 4. Outputs the top-ranked clubs sorted by similarity score
 *
 * Core Concepts:
 * - Cosine similarity measures how aligned two multidimensional vectors are
 * - Identity vectors add personalized context without dominating interests
 * - Category filtering ensures recommendations stay relevant and meaningful
 *
 * Result:
 * Produces a ranked list of clubs that best fit the user's expressed interests,
 * balancing topic similarity, category alignment, and identity relevance.
 */

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
  // This is like calculating your test average for each subject

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
  // If someone answered many questions about a topic AND got a perfect score, boost them!

  let finalScores = {};

  // Loop through each calculated average
  for (const tagnumber in rawAverages) {
    const avgTag = rawAverages[tagnumber];
    let finalValue = avgTag; // Start with the average

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
    // find the subwarray in ONLY_IDENTITIES that contains this identity
    const group = ONLY_IDENTITIES.find((arr) => arr.includes(identity));
    // if found, return all identities in that group; otherwise, just the identity itself
    return group ? group : [identity];
  });

  return relevantIdentities;
}

/**
 * keepColumnsAsArray - THE DATA FILTER
 * ====================================
 *
 * This function is like using Excel's "filter columns" feature.
 * We have a huge spreadsheet of club data, but we only want certain columns.
 *
 * What it does:
 * - Takes a 2D array
 * - Keeps only the columns we care about
 * - Returns a smaller, focused dataset
 *
 * Why we need this:
 * - The CSV has tons of columns (100+)
 * - We only need specific ones for our calculations
 * - This makes processing faster and cleaner
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
  // Filter out any columns that don't have a mapping (missing from CSV)
  const validColumns = columnsToKeep.filter((col) => {
    // ignore column if it is 'other'
    if (col === "other") {
      console.log(`Skipping 'other' column as it is not needed.`);
      return false; // Skip this column
    }
    // Check if this column exists in our CSV
    const columnExists = mapping.hasOwnProperty(col);

    // Log warning for missing columns (helps with debugging)
    if (!columnExists) {
      console.warn(`Column "${col}" not found in CSV data. Skipping...`);
    }

    return columnExists;
  });

  // STEP 2: Process each row of the spreadsheet using only valid columns
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

  // What this does step-by-step:
  // 1. Validate that requested columns actually exist in the CSV
  // 2. For each row in the data
  // 3. For each valid column we want to keep
  // 4. Look up the column's position using the mapping
  // 5. Extract that data from the row (with safety checks)
  // 6. Return the filtered row with only valid data
}

/**
 * rankClubsBySimilarity - The main club matching algorithm
 *
 * This is the heart of the entire application! 🎯
 * It takes a user's preferences and finds the clubs that match them best.
 * Think of it like a dating app, but for clubs!
 *
 * How the magic happens:
 * 1. Take user's quiz results (their interest vector)
 * 2. Add their identity preferences to the vector (weighted at 1.0, reduced from 2.0)
 * 3. Filter clubs with minimum interest overlap threshold (prevents false positives)
 * 4. Calculate separate similarity scores for interests (70% weight) and identity (30% weight)
 * 5. Combine scores and rank clubs by weighted similarity
 * 6. Return the top matches
 *
 * Improvements:
 * - Interest overlap threshold ensures clubs share relevant interests before matching
 * - Separate scoring prevents identity from overpowering interest-based matching
 * - Weighted combination (70% interests, 30% identity) prioritizes interests while considering identity
 *
 * The vectors explained:
 * - User vector: [0.8, 0.2, 0.9, ...] = "I love leadership, don't like sports, love creativity..."
 * - Club vector: [0.7, 0.1, 0.8, ...] = "This club is leadership-focused, not sports-related, very creative..."
 * - Similarity: How close these vectors are = how good the match is!
 *
 * @param {Array} userVector - User's preference scores for interest tags (0-2 scale) plus identity scores
 * @param {Object} clubDataObj - Object containing club data and mappings
 * @param {Array} userIdentityCols - User's identity responses (like major, year, etc.)
 * @param {Array} selectedCategories - Categories user selected (optional, for category-specific filtering)
 * @returns {Array} - Top club matches with weighted similarity scores
 */
export function rankClubsBySimilarity(
  userVector,
  clubDataObj,
  userIdentityCols,
  selectedCategories = []
) {
  // STEP 1: Process identity responses
  // Get the filtered valid identity responses (excluding null and 'other')
  // We ignore null and 'other' responses since they don't provide filtering value
  // Also brings in the rest of the identities that the user did not select so that we can later
  // assign them a score of 0 to indicate that the user is not related to that identity
  const identitiesToInclude = getRelevantIdentities(userIdentityCols);

  // STEP 2: Set up our data processing
  const { headerMapping, rows } = clubDataObj;
  // Define which columns we need from the club data
  const allCols = ["Club Name", "links", ...TAG_LIST, ...identitiesToInclude];

  // Filter the club data to only include the columns we need
  const userFilteredData = keepColumnsAsArray(rows, allCols, headerMapping);

  // STEP 3: Enhance the user vector with identity scores

  // Add a high score (1.0) for each identity characteristic the user selected, and 0 for the ones they didn't
  // This boosts similarity for clubs that match the user's identity
  for (let i = 0; i < identitiesToInclude.length; i++) {
    if (userIdentityCols.includes(identitiesToInclude[i])) {
      userVector.push(1.0);
    } else {
      userVector.push(0);
    }
  }

  // Debug logging to help understand what's happening
  console.log("User Vector:", userVector);
  console.log("User Identity Columns:", userIdentityCols);
  console.log("Columns to Keep:", allCols);

  // List tag name and associated value for it:
  for (let i = 0; i < userVector.length; i++) {
    const tagName = allCols[i + 2];
    const tagValue = userVector[i];
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
    if (clubVector.length !== userVector.length) {
      console.warn(
        `Vector length mismatch for club "${clubName}": expected ${userVector.length}, got ${clubVector.length}`
      );
      continue;
    }

    // STEP 4a: Check interest overlap threshold and separate scoring
    // Split vectors into interest portions (first TAG_LIST.length elements) and identity portions (rest)
    const numInterestTags = TAG_LIST.length;
    const userInterestVector = userVector.slice(0, numInterestTags);
    const clubInterestVector = clubVector.slice(0, numInterestTags);
    const userIdentityVector = userVector.slice(numInterestTags);
    const clubIdentityVector = clubVector.slice(numInterestTags);

    // Calculate interest overlap (dot product of interest portions)
    // This measures how many shared interests exist between user and club
    let interestOverlap = 0;
    for (let i = 0; i < numInterestTags; i++) {
      interestOverlap += userInterestVector[i] * clubInterestVector[i];
    }

    // STEP 4b: Calculate separate similarity scores for interests and identity
    // This gives explicit control over the balance between interests and identity matching
    const interestSimilarity = cosineSimilarity(
      userInterestVector,
      clubInterestVector
    );

    // Only calculate identity similarity if identity vectors exist
    let identitySimilarity = 0;
    if (userIdentityVector.length > 0 && clubIdentityVector.length > 0) {
      identitySimilarity = cosineSimilarity(
        userIdentityVector,
        clubIdentityVector
      );
    }

    // STEP 4c: Apply multiple filtering thresholds to ensure quality matches

    // Threshold 1: PRIMARY category tag matching (if categories were selected)
    // This is the KEY fix - require strong matches in the PRIMARY tags of selected categories
    // This prevents clubs from matching just because they share many generic tags
    if (selectedCategories.length > 0) {
      const primaryCategoryTagIds =
        getPrimaryCategoryTagIds(selectedCategories);
      let primaryCategoryMatch = 0;

      // Check overlap in PRIMARY category tags only (e.g., tag 19 for Health, tag 20 for Sports, tag 47 for Academic)
      let bestMatchStrength = 0;
      let hasGoodMatch = false;
      const tagMatches = []; // For debug output

      for (const tagId of primaryCategoryTagIds) {
        // Tag IDs are 1-indexed, so subtract 1 to get vector index
        // Convert tagId to number in case Set contains string keys
        const tagNum = typeof tagId === "string" ? parseInt(tagId) : tagId;
        const tagIndex = tagNum - 1;
        if (tagIndex >= 0 && tagIndex < numInterestTags) {
          const userValue = userInterestVector[tagIndex];
          const clubValue = clubInterestVector[tagIndex];
          const matchStrength = userValue * clubValue;
          primaryCategoryMatch += matchStrength;
          bestMatchStrength = Math.max(bestMatchStrength, matchStrength);

          // Store for debug
          tagMatches.push(`tag${tagNum}:${matchStrength.toFixed(2)}`);

          // Consider it a good match if:
          // - User has interest (>= 0.3) AND club has meaningful relevance (>= 0.15)
          // - OR match strength is decent (>= 0.15)
          // This ensures clubs actually align with at least one selected category
          if (
            (userValue >= 0.3 && clubValue >= 0.15) ||
            matchStrength >= 0.15
          ) {
            hasGoodMatch = true;
          }
        }
      }

      // REQUIREMENT: Must have meaningful match in at least ONE primary category tag
      // This ensures clubs align with the core purpose of selected categories

      // Debug logging for problematic clubs (show individual tag matches)
      if (
        clubName.includes("Archaeology") ||
        clubName.includes("Real Estate") ||
        clubName.includes("Republican")
      ) {
        console.log(
          `DEBUG ${clubName}: primaryCategoryMatch=${primaryCategoryMatch.toFixed(
            2
          )}, bestMatchStrength=${bestMatchStrength.toFixed(
            2
          )}, hasGoodMatch=${hasGoodMatch}, tagMatches=[${tagMatches.join(
            ", "
          )}]`
        );
      }

      // REQUIREMENT: Must have at least ONE decent match in a primary category tag
      // This prevents clubs from matching purely on aggregated small overlaps
      const MIN_BEST_MATCH = 0.15; // Must have at least one primary tag match >= 0.15

      if (!hasGoodMatch && bestMatchStrength < MIN_BEST_MATCH) {
        // Skip this club - doesn't have a meaningful match in ANY primary category tag
        // Debug why it failed
        if (
          clubName.includes("Archaeology") ||
          clubName.includes("Real Estate") ||
          clubName.includes("Republican")
        ) {
          console.log(
            `DEBUG FILTERED ${clubName}: hasGoodMatch=${hasGoodMatch}, bestMatchStrength=${bestMatchStrength.toFixed(
              2
            )}`
          );
        }
        continue;
      }
    }

    // Threshold 2: Minimum interest overlap (balanced to allow relevant matches)
    // Requires meaningful shared interest activity before considering a match
    const MIN_INTEREST_OVERLAP = 0.4;
    if (interestOverlap < MIN_INTEREST_OVERLAP) {
      // Skip this club - insufficient interest overlap
      continue;
    }

    // Threshold 3: Minimum interest similarity (balanced requirement)
    // Prevents clubs that only share minimal interests from ranking high
    const MIN_INTEREST_SIMILARITY = 0.25;
    if (interestSimilarity < MIN_INTEREST_SIMILARITY) {
      // Skip this club - interest similarity too low
      continue;
    }

    // Debug logging for final scores of problematic clubs
    if (
      clubName.includes("Archaeology") ||
      clubName.includes("Real Estate") ||
      clubName.includes("Republican")
    ) {
      console.log(
        `DEBUG ${clubName} PASSED FILTERS: interestOverlap=${interestOverlap.toFixed(
          2
        )}, interestSimilarity=${interestSimilarity.toFixed(2)}`
      );
    }

    // STEP 4d: Combine similarity scores with weighted average
    // 70% weight on interests, 30% weight on identity
    // This prioritizes interest-based matching while still considering identity alignment
    const INTEREST_WEIGHT = 0.7;
    const IDENTITY_WEIGHT = 0.3;
    const categorySimilarity =
      interestSimilarity * INTEREST_WEIGHT +
      identitySimilarity * IDENTITY_WEIGHT;
    const fullCosineSim = cosineSimilarity(userVector, clubVector);

    // Skip clubs with invalid similarity scores
    if (isNaN(categorySimilarity) || categorySimilarity < 0) {
      console.warn(
        `Invalid similarity score for club "${clubName}": ${categorySimilarity}`
      );
      continue;
    }
    results.push({ clubName, clubLink, similarity: fullCosineSim });
  }

  // STEP 5: Sort and return best matches

  // Ensure we have results
  if (results.length === 0) {
    console.error("No valid club matches found!");
    return [];
  }

  // Sort by similarity score (highest first)
  results.sort((a, b) => b.similarity - a.similarity);

  // Return only the top 10 matches
  return results.slice(0, 25);
}

/**
 * applyCategoryInterestScores - THE CATEGORY BOOSTER
 * ==================================================
 *
 * This function gives extra credit to users for the categories they selected!
 * Think of it like getting bonus points on a test for your favorite subjects.
 *
 * How it works:
 * 1. Look at which top 3 categories the user picked on the home page (like "Sports", "Academic")
 * 2. For each category, add a bonus score to their preferences
 * 3. Selected categories get +1 (boost), unselected get 0 (neutral)
 *
 * Why this matters:
 * - User explicitly said "I'm interested in Sports" by selecting that category
 * - Even if their quiz answers were mixed, we should boost sports-related matches
 * - This ensures their conscious choices influence the results
 *
 * Example:
 * - User selected: ["Sports", "Academic"]
 * - Sports gets +1 boost, Academic gets +1 boost
 * - Arts (not selected) gets 0 boost
 * - Result: User will see more sports and academic clubs in their matches
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
      // They selected it! Give them a stronger boost (2 points instead of 1)
      // This better differentiates selected categories from unselected ones
      // The boost is applied twice to emphasize the user's explicit category selection
      tempUserTags[catTagId].push(1);
      tempUserTags[catTagId].push(1);

      // Additionally, calculate proportional boost based on number of questions in category
      // This rewards categories with more questions (more detailed interests)
      const questionsInCategory = CATEGORY_QUESTIONS[categoryName].length;
      const proportionalBoost = Math.min(questionsInCategory * 0.1, 0.5); // Cap at 0.5 extra boost
      if (proportionalBoost > 0 && tempUserTags[catTagId].length > 0) {
        // Add proportional boost as additional "Yes" responses
        const numBoosts = Math.floor(proportionalBoost * 10); // Convert to integer count
        for (let i = 0; i < numBoosts; i++) {
          tempUserTags[catTagId].push(1);
        }
      }
      // Cap total boost to avoid overinflation
      const MAX_TAG_BOOST = 2.0;
      if (tempUserTags[catTagId].length > MAX_TAG_BOOST) {
        tempUserTags[catTagId] = tempUserTags[catTagId].slice(0, MAX_TAG_BOOST);
      }
    }
    // If they didn't select it, don't do anything special
  }

  return tempUserTags;
}

/**
 * getCategoryTagIds
 * ----------------
 * Gets all tag IDs associated with the selected categories.
 * This helps filter clubs to ensure they match tags from selected categories.
 *
 * @param {Array} selectedCategories - Array of category names
 * @returns {Set} - Set of tag IDs associated with selected categories
 */
export function getCategoryTagIds(selectedCategories) {
  const tagIds = new Set();

  for (const categoryName of selectedCategories) {
    const questions = CATEGORY_QUESTIONS[categoryName];
    if (questions) {
      // Extract all tag IDs from questions in this category
      for (const question of questions) {
        if (Array.isArray(question) && question.length >= 2) {
          const tags = question[1]; // Second element is array of tag IDs
          if (Array.isArray(tags)) {
            tags.forEach((tagId) => tagIds.add(tagId));
          }
        }
      }
    }
  }

  return tagIds;
}

/**
 * getPrimaryCategoryTagIds
 * ------------------------
 * Gets the PRIMARY tag ID for each selected category (the main representative tag).
 * These are the core tags that must have strong matches for a club to be relevant.
 *
 * @param {Array} selectedCategories - Array of category names
 * @returns {Set} - Set of primary tag IDs for selected categories
 */
export function getPrimaryCategoryTagIds(selectedCategories) {
  const categoryMap = {
    // 🚀 TECHNOLOGY & ENGINEERING
    // Includes everything related to software, hardware, AI, robotics, sustainability, and product innovation
    "Technology & Engineering": [
      1, // Coding & Software Development
      2, // Hardware & Prototyping
      3, // Artificial Intelligence & Machine Learning
      4, // Data Science & Analytics
      5, // IoT & Embedded Systems
      6, // Robotics & Automation
      7, // Engineering Design & Manufacturing
      8, // Sustainable Engineering & Renewable Energy
      9, // Product Management & Startups
      48, // Technology for Social Good
    ],

    // 🎨 ARTS & CULTURE
    // Covers creative, expressive, and cultural mediums
    "Arts & Culture": [
      10, // Graphic & Visual Design
      11, // Fashion & Styling
      12, // Music Performance & Production
      13, // Film, Media & Journalism
      14, // Photography & Visual Arts
      15, // Creative Writing & Literature
      16, // Theater & Improv Performance
      17, // Dance & Movement Arts
      25, // Cultural & Heritage Community
      26, // Language Learning & Conversation
    ],

    // 🏃‍♂️ SPORTS & RECREATION
    // Includes fitness, wellness, outdoor adventure, and organized sports
    "Sports & Recreation": [
      18, // Outdoor Adventure & Recreation
      19, // Fitness, Wellness & Mindfulness
      20, // Sports & Competitive Club Teams
      45, // Vehicle/Off-Road & Motorsport Clubs
      44, // Gaming, eSports & Tabletop (competitive recreation)
    ],

    // 💼 PROFESSIONAL DEVELOPMENT & NETWORKING
    // Business, leadership, and skill-building organizations
    "Professional Development & Networking": [
      29, // Professional Development & Networking
      30, // Business, Finance & Investing
      31, // Sales & Business Analytics
      32, // Marketing & Advertising
      33, // Urban Planning & Real Estate
      46, // Skills Training & Career Preparation
      9, // Product Management & Startups
    ],

    // 💖 HEALTH & WELLNESS
    // Personal and collective wellbeing, mental and physical health
    "Health & Wellness": [
      19, // Fitness, Wellness & Mindfulness
      37, // Health Sciences & Pre-Professional Tracks
      38, // Mental Health & Peer Support
      39, // Spiritual-Faith & Religious Community
      50, // Life Skills & Personal Growth
    ],

    // 🤝 COMMUNITY SERVICE & ADVOCACY
    // Service, equity, diversity, social impact, and volunteering
    "Community Service & Advocacy": [
      21, // Community Service & Volunteering
      22, // Social Entrepreneurship & Impact
      23, // Non-profit & Advocacy Engagement
      24, // Diversity, Equity & Inclusion
      25, // Cultural & Heritage Community
      40, // LGBTQIA+ Advocacy & Safe Spaces
      41, // Multicultural Student Communities
      48, // Technology for Social Good
      49, // Sustainable Lifestyle & Circular Economy
    ],

    // 🎓 ACADEMIC & EDUCATIONAL
    // Scholarly, research, and tutoring-based clubs
    "Academic & Educational": [
      28, // Academic Research & Honor Societies
      47, // Tutoring / Academic Support & Study Groups
      46, // Skills Training & Career Preparation
      27, // International & Global Perspectives
      35, // Environmental Conservation & Ecology
      34, // Agriculture, Food Systems & Plant Science
    ],
  };

  const ids = new Set();
  selectedCategories.forEach((cat) =>
    (categoryMap[cat] || []).forEach((id) => ids.add(id))
  );
  return ids;
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
