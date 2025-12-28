import { supabase } from "../utils/supabase";

/**
 * Handles writing all survey data to Supabase.
 *
 * This function stores:
 * 1. Survey response with user vector and identity answers
 * 2. Two recommendation runs (with and without identity filtering)
 * 3. Club recommendations for both runs
 *
 * @param {Array} params.userVector - User's calculated interest scores
 * @param {Array} params.identityResponses - User's identity question answers
 * @param {Array} params.topClubs - Recommended clubs with identity filtering
 * @param {Array} params.topClubsWithoutIdentity - Recommended clubs without identity filtering
 * @returns {Promise<void>}
 */

export async function storeSurveyInSupabase({
  userVector,
  identityResponses,
  topClubs,
  topClubsWithoutIdentity,
}) {
  // Retrieve the logged-in Supabase user
  const { data: authData } = await supabase.auth.getUser();
  const supabaseUserId = authData?.user?.id;

  if (!supabaseUserId) {
    console.error("No logged-in user. Cannot store survey.");
    return;
  }

  const identityAnswered = identityResponses.length > 0;

  // Convert ordered array to structured identity fields
  const identityMap = {
    gender: identityResponses[0] || null,
    race: identityResponses[1] || null,
    major: identityResponses[2] || null,
    religion: identityResponses[3] || null,
    lgbtq: identityResponses[4] || null,
    greek_life: identityResponses[5] || null,
  };

  // 1. Insert into survey_responses
  const { data: surveyResponse, error: surveyError } = await supabase
    .from("survey_responses")
    .insert({
      user_id: supabaseUserId,
      survey_id: null,
      identity_answered: identityAnswered,
      raw_user_vector: userVector,
      ...identityMap,
    })
    .select()
    .single();

  if (surveyError) {
    console.error("Error inserting survey response:", surveyError);
    return;
  }

  // 2. Insert recommendation runs
  const insertRun = async (mode) => {
    const { data, error } = await supabase
      .from("recommendation_runs")
      .insert({
        response_id: surveyResponse.id,
        mode,
        user_vector: userVector,
      })
      .select()
      .single();
    if (error) console.error("Error inserting run:", error);
    return data;
  };

  const withRun = await insertRun("with_identity");
  if (!withRun) throw new Error("Failed to create with_identity run");
  const withoutRun = await insertRun("without_identity");
  if (!withoutRun) throw new Error("Failed to create without_identity run");

  // 3. Insert 50 club recommendations
  const recRows = [
    ...topClubs.map((club, i) => ({
      run_id: withRun.id,
      org_id: club.id,
      rank: i + 1,
      match_accuracy: club.score,
    })),
    ...topClubsWithoutIdentity.map((club, i) => ({
      run_id: withoutRun.id,
      org_id: club.id,
      rank: i + 1,
      match_accuracy: club.score,
    })),
  ];

  const { error: recError } = await supabase
    .from("survey_recommendations")
    .insert(recRows);

  if (recError) {
    console.error("Error inserting recommendations:", recError);
  }
}
