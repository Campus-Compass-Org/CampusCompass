CREATE OR REPLACE FUNCTION public.migrate_clubs_data()
RETURNS VOID AS $$
DECLARE
    -- The list of all numbered columns (e.g., "1", "2", ..., "132") for the INSERT target list
    target_columns_list TEXT;
    -- The list of SELECT expressions, mapping raw columns to target columns (e.g., "raw_data.Leadership" AS "1")
    select_expressions_list TEXT;
    -- The final dynamic INSERT query string
    final_query TEXT;
    -- Set of all club numeric IDs (1 to 132), matching the numeric columns in public.clubs
    all_club_ids INTEGER[] := ARRAY(SELECT generate_series(1, 132));
    -- Variable to hold the complete column list for INSERT
    full_target_columns TEXT := 'club_name, link, description';
    -- Variable to hold the complete select list for INSERT
    full_select_expressions TEXT;
BEGIN
    -- STEP 1: Dynamically build the SELECT expressions by joining tag_dictionary.
    
    WITH dynamic_map AS (
        SELECT
            td.tag_number AS id,
            -- CRITICAL FIX: Dynamically determine the correct raw column name from clubs_stage_raw.
            -- If is_identity is TRUE, we must append '_1' to the base tag_label 
            -- to match the imported column name (e.g., 'Journalism_1').
            CASE 
                WHEN td.is_identity 
                     AND lower(td.tag_label) IN ('journalism', 'music')
                THEN td.tag_label || '_1'
                ELSE td.tag_label
            END AS raw_column
        FROM
            public.tag_dictionary td
        WHERE
            td.tag_number = ANY(all_club_ids)
    )
    SELECT
        -- Constructs the list of target columns in the clubs table (e.g., "1", "2", "3", ...)
        STRING_AGG(format('"%s"', i), ', ' ORDER BY i),
        -- Constructs the list of SELECT expressions for the dynamic columns.
        STRING_AGG(
            COALESCE(
                -- Look up the dynamically calculated raw_column name from the CTE
                (SELECT format('csr."%s" AS "%s"', dm.raw_column, dm.id)
                 FROM dynamic_map dm
                 WHERE dm.id = i),
                -- If no mapping exists for this ID, use NULL
                format('NULL AS "%s"', i)
            ),
            ', '
            ORDER BY i
        )
    INTO
        target_columns_list,
        select_expressions_list
    FROM
        unnest(all_club_ids) AS i;

    -- CHECK: If no tags are defined, prevent constructing an invalid query
    IF target_columns_list IS NULL OR target_columns_list = '' THEN
        RAISE EXCEPTION 'Tag dictionary is empty or does not contain valid tag_numbers (1-132). Cannot construct migration query.';
    END IF;

    -- STEP 2: Combine fixed and dynamic parts, handling the comma correctly.
    
    -- The full list of target columns
    full_target_columns := full_target_columns || ', ' || target_columns_list;
    
    -- The full list of SELECT expressions
    full_select_expressions := 
        E'csr."Club Name", csr.links, csr."Description", ' || select_expressions_list;

    -- STEP 3: Construct the final dynamic INSERT query.
    final_query := 
        'INSERT INTO public.clubs (' || full_target_columns || ') ' ||
        'SELECT ' || full_select_expressions || ' ' ||
        'FROM public.clubs_stage_raw csr ' ||
        'ON CONFLICT (club_name) DO UPDATE SET ' ||
        'link = EXCLUDED.link, ' ||
        'description = EXCLUDED.description, ' ||
        'updated_at = NOW();';

    -- STEP 4: Execute the query.
    RAISE NOTICE 'Executing club data migration query: %', final_query;
    EXECUTE final_query;

END;
$$ LANGUAGE plpgsql;


-- To run this function after populating the tag_dictionary:
-- SELECT public.migrate_clubs_data();