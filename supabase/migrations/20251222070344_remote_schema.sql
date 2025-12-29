drop extension if exists "pg_net";

create type "public"."rec_mode" as enum ('with_identity', 'without_identity');

create sequence "public"."clubs_id_seq";


  create table "public"."clubs" (
    "1" numeric,
    "2" numeric,
    "3" numeric,
    "4" numeric,
    "5" numeric,
    "6" numeric,
    "7" numeric,
    "8" numeric,
    "9" numeric,
    "10" numeric,
    "11" numeric,
    "12" numeric,
    "13" numeric,
    "14" numeric,
    "15" numeric,
    "16" numeric,
    "17" numeric,
    "18" numeric,
    "19" numeric,
    "20" numeric,
    "21" numeric,
    "22" numeric,
    "23" numeric,
    "24" numeric,
    "25" numeric,
    "26" numeric,
    "27" numeric,
    "28" numeric,
    "29" numeric,
    "30" numeric,
    "31" numeric,
    "32" numeric,
    "33" numeric,
    "34" numeric,
    "35" numeric,
    "36" numeric,
    "37" numeric,
    "38" numeric,
    "39" numeric,
    "40" numeric,
    "41" numeric,
    "42" numeric,
    "43" numeric,
    "44" numeric,
    "45" numeric,
    "46" numeric,
    "47" numeric,
    "48" numeric,
    "49" numeric,
    "50" numeric,
    "51" numeric,
    "52" numeric,
    "53" numeric,
    "54" numeric,
    "55" numeric,
    "56" numeric,
    "57" numeric,
    "58" numeric,
    "59" numeric,
    "60" numeric,
    "61" numeric,
    "62" numeric,
    "63" numeric,
    "64" numeric,
    "65" numeric,
    "66" numeric,
    "67" numeric,
    "68" numeric,
    "69" numeric,
    "70" numeric,
    "71" numeric,
    "72" numeric,
    "73" numeric,
    "74" numeric,
    "75" numeric,
    "76" numeric,
    "77" numeric,
    "78" numeric,
    "79" numeric,
    "80" numeric,
    "81" numeric,
    "82" numeric,
    "83" numeric,
    "84" numeric,
    "85" numeric,
    "86" numeric,
    "87" numeric,
    "88" numeric,
    "89" numeric,
    "90" numeric,
    "91" numeric,
    "92" numeric,
    "93" numeric,
    "94" numeric,
    "95" numeric,
    "96" numeric,
    "97" numeric,
    "98" numeric,
    "99" numeric,
    "100" numeric,
    "101" numeric,
    "102" numeric,
    "103" numeric,
    "104" numeric,
    "105" numeric,
    "106" numeric,
    "107" numeric,
    "108" numeric,
    "109" numeric,
    "110" numeric,
    "111" numeric,
    "112" numeric,
    "113" numeric,
    "114" numeric,
    "115" numeric,
    "116" numeric,
    "117" numeric,
    "118" numeric,
    "119" numeric,
    "120" numeric,
    "121" numeric,
    "122" numeric,
    "123" numeric,
    "124" numeric,
    "125" numeric,
    "126" numeric,
    "127" numeric,
    "128" numeric,
    "129" numeric,
    "130" numeric,
    "131" numeric,
    "132" numeric,
    "id" integer not null default nextval('public.clubs_id_seq'::regclass),
    "club_name" text not null,
    "link" text,
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."clubs" enable row level security;


  create table "public"."clubs_stage_raw" (
    "Club Name" text,
    "links" text,
    "Leadership" double precision,
    "Teamwork" double precision,
    "Community Service" double precision,
    "Advocacy" double precision,
    "Social Justice" double precision,
    "Architecture & Urban Planning" double precision,
    "Technology" double precision,
    "Arts & Crafts" double precision,
    "Performing Arts" double precision,
    "Cultural Expression" double precision,
    "Diversity & Inclusion" double precision,
    "Mentorship" double precision,
    "Career Growth" double precision,
    "Networking" double precision,
    "Entrepreneurship" double precision,
    "Research" double precision,
    "Fitness" double precision,
    "Competitive Sports" double precision,
    "Outdoor Activities" double precision,
    "Wellness" double precision,
    "Mental Health" double precision,
    "Academic Focus" double precision,
    "Debate & Discussion" double precision,
    "Virtual Reality" double precision,
    "Social Events" double precision,
    "Media & Film" double precision,
    "Journalism" double precision,
    "Music" double precision,
    "Dance" double precision,
    "UI Design" double precision,
    "Hospitality" double precision,
    "International Relations" double precision,
    "Political Action" double precision,
    "Fundraising" double precision,
    "Tutoring & Teaching" double precision,
    "DIY & Making" double precision,
    "Ethics" double precision,
    "Professional Skills" double precision,
    "Public Speaking" double precision,
    "Problem Solving" double precision,
    "Analytics" double precision,
    "Robotics & AI" double precision,
    "Space & Astronomy" double precision,
    "Gaming & eSports" double precision,
    "woman women" double precision,
    "man men" double precision,
    "lgbtq" double precision,
    "White European Italian" double precision,
    "Black African American" double precision,
    "Native American" double precision,
    "Asian" double precision,
    "Hispanic" double precision,
    "Native Hawaiian or Other Pacific Islander" double precision,
    "Greek" double precision,
    "Christian" double precision,
    "Islam" double precision,
    "Jewish Community and Judaism" double precision,
    "Hindu" double precision,
    "Buddhism" double precision,
    "Sikh" double precision,
    "Aerospace Engineering" double precision,
    "Agricultural Business" double precision,
    "Agricultural Communication" double precision,
    "Agricultural Science" double precision,
    "Agricultural Systems Management" double precision,
    "Animal Science" double precision,
    "Anthropology and Geography" double precision,
    "Architectural Engineering" double precision,
    "Architecture" double precision,
    "Art and Design" double precision,
    "Biochemistry" double precision,
    "Biological Sciences" double precision,
    "Biomedical Engineering" double precision,
    "BioResource and Agricultural Engineering" double precision,
    "Business Administration" double precision,
    "Chemistry" double precision,
    "Child Development" double precision,
    "City and Regional Planning" double precision,
    "Civil Engineering" double precision,
    "Communication Studies" double precision,
    "Comparative Ethnic Studies" double precision,
    "Computer Engineering" double precision,
    "Computer Science" double precision,
    "Construction Management" double precision,
    "Dairy Science" double precision,
    "Economics" double precision,
    "Electrical Engineering" double precision,
    "English" double precision,
    "Environmental Earth and Soil Sciences" double precision,
    "Environmental Engineering" double precision,
    "Environmental Management and Protection" double precision,
    "Food Science" double precision,
    "Forest and Fire Sciences" double precision,
    "General Engineering" double precision,
    "Graphic Communication" double precision,
    "History" double precision,
    "Industrial Engineering" double precision,
    "Industrial Technology and Packaging" double precision,
    "Interdisciplinary Studies" double precision,
    "Journalism_1" double precision,
    "Kinesiology" double precision,
    "Landscape Architecture" double precision,
    "Liberal Arts and Engineering Studies" double precision,
    "Liberal Studies" double precision,
    "Manufacturing Engineering" double precision,
    "Marine Sciences" double precision,
    "Materials Engineering" double precision,
    "Mathematics" double precision,
    "Mechanical Engineering" double precision,
    "Microbiology" double precision,
    "Music_1" double precision,
    "Nutrition" double precision,
    "Philosophy" double precision,
    "Physics" double precision,
    "Plant Sciences" double precision,
    "Political Science" double precision,
    "Public Health" double precision,
    "Psychology" double precision,
    "Recreation, Parks, and Tourism Administration" double precision,
    "Sociology" double precision,
    "Software Engineering" double precision,
    "Spanish" double precision,
    "Statistics" double precision,
    "Theatre Arts" double precision,
    "Wine and Viticulture" double precision,
    "Description" text not null
      );


alter table "public"."clubs_stage_raw" enable row level security;


  create table "public"."recommendation_runs" (
    "id" uuid not null default gen_random_uuid(),
    "response_id" uuid not null,
    "mode" public.rec_mode not null,
    "user_vector" jsonb,
    "rating" integer,
    "feedback_comment" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."recommendation_runs" enable row level security;


  create table "public"."survey_recommendations" (
    "id" uuid not null default gen_random_uuid(),
    "run_id" uuid not null,
    "org_id" integer not null,
    "rank" integer not null,
    "match_accuracy" double precision,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."survey_recommendations" enable row level security;


  create table "public"."survey_responses" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "survey_id" uuid,
    "created_at" timestamp with time zone default now(),
    "raw_user_vector" jsonb,
    "identity_answered" boolean default false,
    "gender" text,
    "race" text,
    "major" text,
    "religion" text,
    "lgbtq" text,
    "greek_life" text
      );


alter table "public"."survey_responses" enable row level security;


  create table "public"."tag_dictionary" (
    "tag_number" integer not null,
    "tag_label" text not null,
    "is_identity" boolean not null default false
      );


alter table "public"."tag_dictionary" enable row level security;


  create table "public"."users" (
    "user_id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "profile_completed" boolean default false,
    "class_year" integer,
    "major" text,
    "pronouns" text,
    "top_clubs" jsonb,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "tag_1_score" numeric,
    "tag_2_score" numeric,
    "tag_3_score" numeric,
    "tag_4_score" numeric,
    "tag_5_score" numeric,
    "tag_6_score" numeric,
    "tag_7_score" numeric,
    "tag_8_score" numeric,
    "tag_9_score" numeric,
    "tag_10_score" numeric,
    "tag_11_score" numeric,
    "tag_12_score" numeric,
    "tag_13_score" numeric,
    "tag_14_score" numeric,
    "tag_15_score" numeric,
    "tag_16_score" numeric,
    "tag_17_score" numeric,
    "tag_18_score" numeric,
    "tag_19_score" numeric,
    "tag_20_score" numeric,
    "tag_21_score" numeric,
    "tag_22_score" numeric,
    "tag_23_score" numeric,
    "tag_24_score" numeric,
    "tag_25_score" numeric,
    "tag_26_score" numeric,
    "tag_27_score" numeric,
    "tag_28_score" numeric,
    "tag_29_score" numeric,
    "tag_30_score" numeric,
    "tag_31_score" numeric,
    "tag_32_score" numeric,
    "tag_33_score" numeric,
    "tag_34_score" numeric,
    "tag_35_score" numeric,
    "tag_36_score" numeric,
    "tag_37_score" numeric,
    "tag_38_score" numeric,
    "tag_39_score" numeric,
    "tag_40_score" numeric,
    "tag_41_score" numeric,
    "tag_42_score" numeric,
    "tag_43_score" numeric,
    "tag_44_score" numeric,
    "tag_45_score" numeric,
    "tag_46_score" numeric,
    "tag_47_score" numeric,
    "tag_48_score" numeric,
    "tag_49_score" numeric,
    "tag_50_score" numeric,
    "tag_51_score" numeric,
    "tag_52_score" numeric,
    "tag_53_score" numeric,
    "tag_54_score" numeric,
    "tag_55_score" numeric,
    "tag_56_score" numeric,
    "tag_57_score" numeric,
    "tag_58_score" numeric,
    "tag_59_score" numeric,
    "tag_60_score" numeric,
    "tag_61_score" numeric,
    "tag_62_score" numeric,
    "tag_63_score" numeric,
    "tag_64_score" numeric,
    "tag_65_score" numeric,
    "tag_66_score" numeric,
    "tag_67_score" numeric,
    "tag_68_score" numeric,
    "tag_69_score" numeric,
    "tag_70_score" numeric,
    "tag_71_score" numeric,
    "tag_72_score" numeric,
    "tag_73_score" numeric,
    "tag_74_score" numeric,
    "tag_75_score" numeric,
    "tag_76_score" numeric,
    "tag_77_score" numeric,
    "tag_78_score" numeric,
    "tag_79_score" numeric,
    "tag_80_score" numeric,
    "tag_81_score" numeric,
    "tag_82_score" numeric,
    "tag_83_score" numeric,
    "tag_84_score" numeric,
    "tag_85_score" numeric,
    "tag_86_score" numeric,
    "tag_87_score" numeric,
    "tag_88_score" numeric,
    "tag_89_score" numeric,
    "tag_90_score" numeric,
    "tag_91_score" numeric,
    "tag_92_score" numeric,
    "tag_93_score" numeric,
    "tag_94_score" numeric,
    "tag_95_score" numeric,
    "tag_96_score" numeric,
    "tag_97_score" numeric,
    "tag_98_score" numeric,
    "tag_99_score" numeric,
    "tag_100_score" numeric,
    "tag_101_score" numeric,
    "tag_102_score" numeric,
    "tag_103_score" numeric,
    "tag_104_score" numeric,
    "tag_105_score" numeric,
    "tag_106_score" numeric,
    "tag_107_score" numeric,
    "tag_108_score" numeric,
    "tag_109_score" numeric,
    "tag_110_score" numeric,
    "tag_111_score" numeric,
    "tag_112_score" numeric,
    "tag_113_score" numeric,
    "tag_114_score" numeric,
    "tag_115_score" numeric,
    "tag_116_score" numeric,
    "tag_117_score" numeric,
    "tag_118_score" numeric,
    "tag_119_score" numeric,
    "tag_120_score" numeric,
    "tag_121_score" numeric,
    "tag_122_score" numeric,
    "tag_123_score" numeric,
    "tag_124_score" numeric,
    "tag_125_score" numeric,
    "tag_126_score" numeric,
    "tag_127_score" numeric,
    "tag_128_score" numeric,
    "tag_129_score" numeric,
    "tag_130_score" numeric,
    "tag_131_score" numeric,
    "tag_132_score" numeric
      );


alter table "public"."users" enable row level security;

alter sequence "public"."clubs_id_seq" owned by "public"."clubs"."id";

CREATE UNIQUE INDEX clubs_name_uidx ON public.clubs USING btree (club_name);

CREATE UNIQUE INDEX clubs_pkey ON public.clubs USING btree (id);

CREATE UNIQUE INDEX clubs_stage_raw_pkey ON public.clubs_stage_raw USING btree ("Description");

CREATE UNIQUE INDEX recommendation_runs_pkey ON public.recommendation_runs USING btree (id);

CREATE UNIQUE INDEX recommendation_runs_response_id_mode_key ON public.recommendation_runs USING btree (response_id, mode);

CREATE UNIQUE INDEX survey_recommendations_pkey ON public.survey_recommendations USING btree (id);

CREATE UNIQUE INDEX survey_recommendations_run_id_org_id_key ON public.survey_recommendations USING btree (run_id, org_id);

CREATE UNIQUE INDEX survey_recommendations_run_id_rank_key ON public.survey_recommendations USING btree (run_id, rank);

CREATE UNIQUE INDEX survey_responses_pkey ON public.survey_responses USING btree (id);

CREATE UNIQUE INDEX tag_dictionary_label_isid_uidx ON public.tag_dictionary USING btree (lower(tag_label), is_identity);

CREATE UNIQUE INDEX tag_dictionary_pkey ON public.tag_dictionary USING btree (tag_number);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

alter table "public"."clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

alter table "public"."clubs_stage_raw" add constraint "clubs_stage_raw_pkey" PRIMARY KEY using index "clubs_stage_raw_pkey";

alter table "public"."recommendation_runs" add constraint "recommendation_runs_pkey" PRIMARY KEY using index "recommendation_runs_pkey";

alter table "public"."survey_recommendations" add constraint "survey_recommendations_pkey" PRIMARY KEY using index "survey_recommendations_pkey";

alter table "public"."survey_responses" add constraint "survey_responses_pkey" PRIMARY KEY using index "survey_responses_pkey";

alter table "public"."tag_dictionary" add constraint "tag_dictionary_pkey" PRIMARY KEY using index "tag_dictionary_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."clubs" add constraint "chk_100_range" CHECK ((("100" IS NULL) OR (("100" >= (0)::numeric) AND ("100" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_100_range";

alter table "public"."clubs" add constraint "chk_101_range" CHECK ((("101" IS NULL) OR (("101" >= (0)::numeric) AND ("101" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_101_range";

alter table "public"."clubs" add constraint "chk_102_range" CHECK ((("102" IS NULL) OR (("102" >= (0)::numeric) AND ("102" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_102_range";

alter table "public"."clubs" add constraint "chk_103_range" CHECK ((("103" IS NULL) OR (("103" >= (0)::numeric) AND ("103" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_103_range";

alter table "public"."clubs" add constraint "chk_104_range" CHECK ((("104" IS NULL) OR (("104" >= (0)::numeric) AND ("104" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_104_range";

alter table "public"."clubs" add constraint "chk_105_range" CHECK ((("105" IS NULL) OR (("105" >= (0)::numeric) AND ("105" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_105_range";

alter table "public"."clubs" add constraint "chk_106_range" CHECK ((("106" IS NULL) OR (("106" >= (0)::numeric) AND ("106" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_106_range";

alter table "public"."clubs" add constraint "chk_107_range" CHECK ((("107" IS NULL) OR (("107" >= (0)::numeric) AND ("107" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_107_range";

alter table "public"."clubs" add constraint "chk_108_range" CHECK ((("108" IS NULL) OR (("108" >= (0)::numeric) AND ("108" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_108_range";

alter table "public"."clubs" add constraint "chk_109_range" CHECK ((("109" IS NULL) OR (("109" >= (0)::numeric) AND ("109" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_109_range";

alter table "public"."clubs" add constraint "chk_10_range" CHECK ((("10" IS NULL) OR (("10" >= (0)::numeric) AND ("10" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_10_range";

alter table "public"."clubs" add constraint "chk_110_range" CHECK ((("110" IS NULL) OR (("110" >= (0)::numeric) AND ("110" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_110_range";

alter table "public"."clubs" add constraint "chk_111_range" CHECK ((("111" IS NULL) OR (("111" >= (0)::numeric) AND ("111" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_111_range";

alter table "public"."clubs" add constraint "chk_112_range" CHECK ((("112" IS NULL) OR (("112" >= (0)::numeric) AND ("112" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_112_range";

alter table "public"."clubs" add constraint "chk_113_range" CHECK ((("113" IS NULL) OR (("113" >= (0)::numeric) AND ("113" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_113_range";

alter table "public"."clubs" add constraint "chk_114_range" CHECK ((("114" IS NULL) OR (("114" >= (0)::numeric) AND ("114" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_114_range";

alter table "public"."clubs" add constraint "chk_115_range" CHECK ((("115" IS NULL) OR (("115" >= (0)::numeric) AND ("115" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_115_range";

alter table "public"."clubs" add constraint "chk_116_range" CHECK ((("116" IS NULL) OR (("116" >= (0)::numeric) AND ("116" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_116_range";

alter table "public"."clubs" add constraint "chk_117_range" CHECK ((("117" IS NULL) OR (("117" >= (0)::numeric) AND ("117" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_117_range";

alter table "public"."clubs" add constraint "chk_118_range" CHECK ((("118" IS NULL) OR (("118" >= (0)::numeric) AND ("118" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_118_range";

alter table "public"."clubs" add constraint "chk_119_range" CHECK ((("119" IS NULL) OR (("119" >= (0)::numeric) AND ("119" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_119_range";

alter table "public"."clubs" add constraint "chk_11_range" CHECK ((("11" IS NULL) OR (("11" >= (0)::numeric) AND ("11" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_11_range";

alter table "public"."clubs" add constraint "chk_120_range" CHECK ((("120" IS NULL) OR (("120" >= (0)::numeric) AND ("120" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_120_range";

alter table "public"."clubs" add constraint "chk_121_range" CHECK ((("121" IS NULL) OR (("121" >= (0)::numeric) AND ("121" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_121_range";

alter table "public"."clubs" add constraint "chk_122_range" CHECK ((("122" IS NULL) OR (("122" >= (0)::numeric) AND ("122" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_122_range";

alter table "public"."clubs" add constraint "chk_123_range" CHECK ((("123" IS NULL) OR (("123" >= (0)::numeric) AND ("123" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_123_range";

alter table "public"."clubs" add constraint "chk_124_range" CHECK ((("124" IS NULL) OR (("124" >= (0)::numeric) AND ("124" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_124_range";

alter table "public"."clubs" add constraint "chk_125_range" CHECK ((("125" IS NULL) OR (("125" >= (0)::numeric) AND ("125" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_125_range";

alter table "public"."clubs" add constraint "chk_126_range" CHECK ((("126" IS NULL) OR (("126" >= (0)::numeric) AND ("126" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_126_range";

alter table "public"."clubs" add constraint "chk_127_range" CHECK ((("127" IS NULL) OR (("127" >= (0)::numeric) AND ("127" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_127_range";

alter table "public"."clubs" add constraint "chk_128_range" CHECK ((("128" IS NULL) OR (("128" >= (0)::numeric) AND ("128" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_128_range";

alter table "public"."clubs" add constraint "chk_129_range" CHECK ((("129" IS NULL) OR (("129" >= (0)::numeric) AND ("129" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_129_range";

alter table "public"."clubs" add constraint "chk_12_range" CHECK ((("12" IS NULL) OR (("12" >= (0)::numeric) AND ("12" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_12_range";

alter table "public"."clubs" add constraint "chk_130_range" CHECK ((("130" IS NULL) OR (("130" >= (0)::numeric) AND ("130" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_130_range";

alter table "public"."clubs" add constraint "chk_131_range" CHECK ((("131" IS NULL) OR (("131" >= (0)::numeric) AND ("131" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_131_range";

alter table "public"."clubs" add constraint "chk_132_range" CHECK ((("132" IS NULL) OR (("132" >= (0)::numeric) AND ("132" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_132_range";

alter table "public"."clubs" add constraint "chk_13_range" CHECK ((("13" IS NULL) OR (("13" >= (0)::numeric) AND ("13" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_13_range";

alter table "public"."clubs" add constraint "chk_14_range" CHECK ((("14" IS NULL) OR (("14" >= (0)::numeric) AND ("14" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_14_range";

alter table "public"."clubs" add constraint "chk_15_range" CHECK ((("15" IS NULL) OR (("15" >= (0)::numeric) AND ("15" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_15_range";

alter table "public"."clubs" add constraint "chk_16_range" CHECK ((("16" IS NULL) OR (("16" >= (0)::numeric) AND ("16" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_16_range";

alter table "public"."clubs" add constraint "chk_17_range" CHECK ((("17" IS NULL) OR (("17" >= (0)::numeric) AND ("17" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_17_range";

alter table "public"."clubs" add constraint "chk_18_range" CHECK ((("18" IS NULL) OR (("18" >= (0)::numeric) AND ("18" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_18_range";

alter table "public"."clubs" add constraint "chk_19_range" CHECK ((("19" IS NULL) OR (("19" >= (0)::numeric) AND ("19" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_19_range";

alter table "public"."clubs" add constraint "chk_1_range" CHECK ((("1" IS NULL) OR (("1" >= (0)::numeric) AND ("1" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_1_range";

alter table "public"."clubs" add constraint "chk_20_range" CHECK ((("20" IS NULL) OR (("20" >= (0)::numeric) AND ("20" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_20_range";

alter table "public"."clubs" add constraint "chk_21_range" CHECK ((("21" IS NULL) OR (("21" >= (0)::numeric) AND ("21" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_21_range";

alter table "public"."clubs" add constraint "chk_22_range" CHECK ((("22" IS NULL) OR (("22" >= (0)::numeric) AND ("22" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_22_range";

alter table "public"."clubs" add constraint "chk_23_range" CHECK ((("23" IS NULL) OR (("23" >= (0)::numeric) AND ("23" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_23_range";

alter table "public"."clubs" add constraint "chk_24_range" CHECK ((("24" IS NULL) OR (("24" >= (0)::numeric) AND ("24" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_24_range";

alter table "public"."clubs" add constraint "chk_25_range" CHECK ((("25" IS NULL) OR (("25" >= (0)::numeric) AND ("25" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_25_range";

alter table "public"."clubs" add constraint "chk_26_range" CHECK ((("26" IS NULL) OR (("26" >= (0)::numeric) AND ("26" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_26_range";

alter table "public"."clubs" add constraint "chk_27_range" CHECK ((("27" IS NULL) OR (("27" >= (0)::numeric) AND ("27" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_27_range";

alter table "public"."clubs" add constraint "chk_28_range" CHECK ((("28" IS NULL) OR (("28" >= (0)::numeric) AND ("28" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_28_range";

alter table "public"."clubs" add constraint "chk_29_range" CHECK ((("29" IS NULL) OR (("29" >= (0)::numeric) AND ("29" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_29_range";

alter table "public"."clubs" add constraint "chk_2_range" CHECK ((("2" IS NULL) OR (("2" >= (0)::numeric) AND ("2" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_2_range";

alter table "public"."clubs" add constraint "chk_30_range" CHECK ((("30" IS NULL) OR (("30" >= (0)::numeric) AND ("30" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_30_range";

alter table "public"."clubs" add constraint "chk_31_range" CHECK ((("31" IS NULL) OR (("31" >= (0)::numeric) AND ("31" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_31_range";

alter table "public"."clubs" add constraint "chk_32_range" CHECK ((("32" IS NULL) OR (("32" >= (0)::numeric) AND ("32" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_32_range";

alter table "public"."clubs" add constraint "chk_33_range" CHECK ((("33" IS NULL) OR (("33" >= (0)::numeric) AND ("33" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_33_range";

alter table "public"."clubs" add constraint "chk_34_range" CHECK ((("34" IS NULL) OR (("34" >= (0)::numeric) AND ("34" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_34_range";

alter table "public"."clubs" add constraint "chk_35_range" CHECK ((("35" IS NULL) OR (("35" >= (0)::numeric) AND ("35" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_35_range";

alter table "public"."clubs" add constraint "chk_36_range" CHECK ((("36" IS NULL) OR (("36" >= (0)::numeric) AND ("36" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_36_range";

alter table "public"."clubs" add constraint "chk_37_range" CHECK ((("37" IS NULL) OR (("37" >= (0)::numeric) AND ("37" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_37_range";

alter table "public"."clubs" add constraint "chk_38_range" CHECK ((("38" IS NULL) OR (("38" >= (0)::numeric) AND ("38" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_38_range";

alter table "public"."clubs" add constraint "chk_39_range" CHECK ((("39" IS NULL) OR (("39" >= (0)::numeric) AND ("39" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_39_range";

alter table "public"."clubs" add constraint "chk_3_range" CHECK ((("3" IS NULL) OR (("3" >= (0)::numeric) AND ("3" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_3_range";

alter table "public"."clubs" add constraint "chk_40_range" CHECK ((("40" IS NULL) OR (("40" >= (0)::numeric) AND ("40" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_40_range";

alter table "public"."clubs" add constraint "chk_41_range" CHECK ((("41" IS NULL) OR (("41" >= (0)::numeric) AND ("41" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_41_range";

alter table "public"."clubs" add constraint "chk_42_range" CHECK ((("42" IS NULL) OR (("42" >= (0)::numeric) AND ("42" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_42_range";

alter table "public"."clubs" add constraint "chk_43_range" CHECK ((("43" IS NULL) OR (("43" >= (0)::numeric) AND ("43" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_43_range";

alter table "public"."clubs" add constraint "chk_44_range" CHECK ((("44" IS NULL) OR (("44" >= (0)::numeric) AND ("44" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_44_range";

alter table "public"."clubs" add constraint "chk_45_range" CHECK ((("45" IS NULL) OR (("45" >= (0)::numeric) AND ("45" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_45_range";

alter table "public"."clubs" add constraint "chk_46_range" CHECK ((("46" IS NULL) OR (("46" >= (0)::numeric) AND ("46" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_46_range";

alter table "public"."clubs" add constraint "chk_47_range" CHECK ((("47" IS NULL) OR (("47" >= (0)::numeric) AND ("47" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_47_range";

alter table "public"."clubs" add constraint "chk_48_range" CHECK ((("48" IS NULL) OR (("48" >= (0)::numeric) AND ("48" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_48_range";

alter table "public"."clubs" add constraint "chk_49_range" CHECK ((("49" IS NULL) OR (("49" >= (0)::numeric) AND ("49" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_49_range";

alter table "public"."clubs" add constraint "chk_4_range" CHECK ((("4" IS NULL) OR (("4" >= (0)::numeric) AND ("4" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_4_range";

alter table "public"."clubs" add constraint "chk_50_range" CHECK ((("50" IS NULL) OR (("50" >= (0)::numeric) AND ("50" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_50_range";

alter table "public"."clubs" add constraint "chk_51_range" CHECK ((("51" IS NULL) OR (("51" >= (0)::numeric) AND ("51" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_51_range";

alter table "public"."clubs" add constraint "chk_52_range" CHECK ((("52" IS NULL) OR (("52" >= (0)::numeric) AND ("52" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_52_range";

alter table "public"."clubs" add constraint "chk_53_range" CHECK ((("53" IS NULL) OR (("53" >= (0)::numeric) AND ("53" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_53_range";

alter table "public"."clubs" add constraint "chk_54_range" CHECK ((("54" IS NULL) OR (("54" >= (0)::numeric) AND ("54" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_54_range";

alter table "public"."clubs" add constraint "chk_55_range" CHECK ((("55" IS NULL) OR (("55" >= (0)::numeric) AND ("55" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_55_range";

alter table "public"."clubs" add constraint "chk_56_range" CHECK ((("56" IS NULL) OR (("56" >= (0)::numeric) AND ("56" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_56_range";

alter table "public"."clubs" add constraint "chk_57_range" CHECK ((("57" IS NULL) OR (("57" >= (0)::numeric) AND ("57" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_57_range";

alter table "public"."clubs" add constraint "chk_58_range" CHECK ((("58" IS NULL) OR (("58" >= (0)::numeric) AND ("58" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_58_range";

alter table "public"."clubs" add constraint "chk_59_range" CHECK ((("59" IS NULL) OR (("59" >= (0)::numeric) AND ("59" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_59_range";

alter table "public"."clubs" add constraint "chk_5_range" CHECK ((("5" IS NULL) OR (("5" >= (0)::numeric) AND ("5" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_5_range";

alter table "public"."clubs" add constraint "chk_60_range" CHECK ((("60" IS NULL) OR (("60" >= (0)::numeric) AND ("60" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_60_range";

alter table "public"."clubs" add constraint "chk_61_range" CHECK ((("61" IS NULL) OR (("61" >= (0)::numeric) AND ("61" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_61_range";

alter table "public"."clubs" add constraint "chk_62_range" CHECK ((("62" IS NULL) OR (("62" >= (0)::numeric) AND ("62" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_62_range";

alter table "public"."clubs" add constraint "chk_63_range" CHECK ((("63" IS NULL) OR (("63" >= (0)::numeric) AND ("63" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_63_range";

alter table "public"."clubs" add constraint "chk_64_range" CHECK ((("64" IS NULL) OR (("64" >= (0)::numeric) AND ("64" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_64_range";

alter table "public"."clubs" add constraint "chk_65_range" CHECK ((("65" IS NULL) OR (("65" >= (0)::numeric) AND ("65" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_65_range";

alter table "public"."clubs" add constraint "chk_66_range" CHECK ((("66" IS NULL) OR (("66" >= (0)::numeric) AND ("66" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_66_range";

alter table "public"."clubs" add constraint "chk_67_range" CHECK ((("67" IS NULL) OR (("67" >= (0)::numeric) AND ("67" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_67_range";

alter table "public"."clubs" add constraint "chk_68_range" CHECK ((("68" IS NULL) OR (("68" >= (0)::numeric) AND ("68" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_68_range";

alter table "public"."clubs" add constraint "chk_69_range" CHECK ((("69" IS NULL) OR (("69" >= (0)::numeric) AND ("69" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_69_range";

alter table "public"."clubs" add constraint "chk_6_range" CHECK ((("6" IS NULL) OR (("6" >= (0)::numeric) AND ("6" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_6_range";

alter table "public"."clubs" add constraint "chk_70_range" CHECK ((("70" IS NULL) OR (("70" >= (0)::numeric) AND ("70" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_70_range";

alter table "public"."clubs" add constraint "chk_71_range" CHECK ((("71" IS NULL) OR (("71" >= (0)::numeric) AND ("71" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_71_range";

alter table "public"."clubs" add constraint "chk_72_range" CHECK ((("72" IS NULL) OR (("72" >= (0)::numeric) AND ("72" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_72_range";

alter table "public"."clubs" add constraint "chk_73_range" CHECK ((("73" IS NULL) OR (("73" >= (0)::numeric) AND ("73" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_73_range";

alter table "public"."clubs" add constraint "chk_74_range" CHECK ((("74" IS NULL) OR (("74" >= (0)::numeric) AND ("74" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_74_range";

alter table "public"."clubs" add constraint "chk_75_range" CHECK ((("75" IS NULL) OR (("75" >= (0)::numeric) AND ("75" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_75_range";

alter table "public"."clubs" add constraint "chk_76_range" CHECK ((("76" IS NULL) OR (("76" >= (0)::numeric) AND ("76" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_76_range";

alter table "public"."clubs" add constraint "chk_77_range" CHECK ((("77" IS NULL) OR (("77" >= (0)::numeric) AND ("77" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_77_range";

alter table "public"."clubs" add constraint "chk_78_range" CHECK ((("78" IS NULL) OR (("78" >= (0)::numeric) AND ("78" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_78_range";

alter table "public"."clubs" add constraint "chk_79_range" CHECK ((("79" IS NULL) OR (("79" >= (0)::numeric) AND ("79" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_79_range";

alter table "public"."clubs" add constraint "chk_7_range" CHECK ((("7" IS NULL) OR (("7" >= (0)::numeric) AND ("7" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_7_range";

alter table "public"."clubs" add constraint "chk_80_range" CHECK ((("80" IS NULL) OR (("80" >= (0)::numeric) AND ("80" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_80_range";

alter table "public"."clubs" add constraint "chk_81_range" CHECK ((("81" IS NULL) OR (("81" >= (0)::numeric) AND ("81" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_81_range";

alter table "public"."clubs" add constraint "chk_82_range" CHECK ((("82" IS NULL) OR (("82" >= (0)::numeric) AND ("82" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_82_range";

alter table "public"."clubs" add constraint "chk_83_range" CHECK ((("83" IS NULL) OR (("83" >= (0)::numeric) AND ("83" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_83_range";

alter table "public"."clubs" add constraint "chk_84_range" CHECK ((("84" IS NULL) OR (("84" >= (0)::numeric) AND ("84" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_84_range";

alter table "public"."clubs" add constraint "chk_85_range" CHECK ((("85" IS NULL) OR (("85" >= (0)::numeric) AND ("85" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_85_range";

alter table "public"."clubs" add constraint "chk_86_range" CHECK ((("86" IS NULL) OR (("86" >= (0)::numeric) AND ("86" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_86_range";

alter table "public"."clubs" add constraint "chk_87_range" CHECK ((("87" IS NULL) OR (("87" >= (0)::numeric) AND ("87" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_87_range";

alter table "public"."clubs" add constraint "chk_88_range" CHECK ((("88" IS NULL) OR (("88" >= (0)::numeric) AND ("88" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_88_range";

alter table "public"."clubs" add constraint "chk_89_range" CHECK ((("89" IS NULL) OR (("89" >= (0)::numeric) AND ("89" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_89_range";

alter table "public"."clubs" add constraint "chk_8_range" CHECK ((("8" IS NULL) OR (("8" >= (0)::numeric) AND ("8" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_8_range";

alter table "public"."clubs" add constraint "chk_90_range" CHECK ((("90" IS NULL) OR (("90" >= (0)::numeric) AND ("90" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_90_range";

alter table "public"."clubs" add constraint "chk_91_range" CHECK ((("91" IS NULL) OR (("91" >= (0)::numeric) AND ("91" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_91_range";

alter table "public"."clubs" add constraint "chk_92_range" CHECK ((("92" IS NULL) OR (("92" >= (0)::numeric) AND ("92" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_92_range";

alter table "public"."clubs" add constraint "chk_93_range" CHECK ((("93" IS NULL) OR (("93" >= (0)::numeric) AND ("93" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_93_range";

alter table "public"."clubs" add constraint "chk_94_range" CHECK ((("94" IS NULL) OR (("94" >= (0)::numeric) AND ("94" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_94_range";

alter table "public"."clubs" add constraint "chk_95_range" CHECK ((("95" IS NULL) OR (("95" >= (0)::numeric) AND ("95" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_95_range";

alter table "public"."clubs" add constraint "chk_96_range" CHECK ((("96" IS NULL) OR (("96" >= (0)::numeric) AND ("96" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_96_range";

alter table "public"."clubs" add constraint "chk_97_range" CHECK ((("97" IS NULL) OR (("97" >= (0)::numeric) AND ("97" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_97_range";

alter table "public"."clubs" add constraint "chk_98_range" CHECK ((("98" IS NULL) OR (("98" >= (0)::numeric) AND ("98" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_98_range";

alter table "public"."clubs" add constraint "chk_99_range" CHECK ((("99" IS NULL) OR (("99" >= (0)::numeric) AND ("99" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_99_range";

alter table "public"."clubs" add constraint "chk_9_range" CHECK ((("9" IS NULL) OR (("9" >= (0)::numeric) AND ("9" <= (2)::numeric)))) not valid;

alter table "public"."clubs" validate constraint "chk_9_range";

alter table "public"."recommendation_runs" add constraint "recommendation_runs_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."recommendation_runs" validate constraint "recommendation_runs_rating_check";

alter table "public"."recommendation_runs" add constraint "recommendation_runs_response_id_fkey" FOREIGN KEY (response_id) REFERENCES public.survey_responses(id) ON DELETE CASCADE not valid;

alter table "public"."recommendation_runs" validate constraint "recommendation_runs_response_id_fkey";

alter table "public"."recommendation_runs" add constraint "recommendation_runs_response_id_mode_key" UNIQUE using index "recommendation_runs_response_id_mode_key";

alter table "public"."survey_recommendations" add constraint "survey_recommendations_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.clubs(id) ON DELETE CASCADE not valid;

alter table "public"."survey_recommendations" validate constraint "survey_recommendations_org_id_fkey";

alter table "public"."survey_recommendations" add constraint "survey_recommendations_rank_check" CHECK (((rank >= 1) AND (rank <= 25))) not valid;

alter table "public"."survey_recommendations" validate constraint "survey_recommendations_rank_check";

alter table "public"."survey_recommendations" add constraint "survey_recommendations_run_id_fkey" FOREIGN KEY (run_id) REFERENCES public.recommendation_runs(id) ON DELETE CASCADE not valid;

alter table "public"."survey_recommendations" validate constraint "survey_recommendations_run_id_fkey";

alter table "public"."survey_recommendations" add constraint "survey_recommendations_run_id_org_id_key" UNIQUE using index "survey_recommendations_run_id_org_id_key";

alter table "public"."survey_recommendations" add constraint "survey_recommendations_run_id_rank_key" UNIQUE using index "survey_recommendations_run_id_rank_key";

alter table "public"."survey_responses" add constraint "survey_responses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE not valid;

alter table "public"."survey_responses" validate constraint "survey_responses_user_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.migrate_clubs_data()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.populate_clubs_from_raw()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
  r      record;   -- row from raw table
  d      record;   -- one tag row (with label_rank)
  j      jsonb;    -- row as json
  keys   text[];   -- all matching keys in this row for d.tag_label
  picked text;     -- chosen column name to read from
  val    numeric;  -- parsed numeric value
  escaped_label text; -- escaped tag label for regex
begin
  -- Iterate raw rows
  for r in select * from public.clubs_stage_raw loop
    j := to_jsonb(r);

    -- Upsert base metadata (be forgiving with header names)
    insert into public.clubs (club_name, link, description)
    values (
      r."Club Name",
      coalesce(r."links", r."Link", r."URL"),
      coalesce(r."Description", r."Description Excerpt", r."Desc")
    )
    on conflict (club_name) do update
      set link        = excluded.link,
          description = excluded.description;

    -- Iterate tags; interest=1, identity=2 when labels duplicate
    for d in
      with td as (
        select
          tag_number,
          tag_label,
          is_identity,
          row_number() over (
            partition by lower(tag_label)
            order by (is_identity = false) desc, tag_number
          ) as label_rank
        from public.tag_dictionary
      )
      select * from td
      order by tag_number
    loop
      -- Escape regex metacharacters in the label (portable)
      -- This puts a backslash before any regex-special char.
      escaped_label := regexp_replace(
         d.tag_label,
         '([.^$|()\\[\\]{}*+?\\\\])',
         '\\\\\1',
         'g'
      );

      -- Build ordered list of keys that match this label:
      -- exact match first, then suffixed keys (_1, _2, ...) in numeric order
      select array_cat(
               array(
                 select k
                 from jsonb_object_keys(j) as k
                 where k = d.tag_label
               ),
               array(
                 select k
                 from jsonb_object_keys(j) as k
                 where k ~ ('^' || escaped_label || '_[0-9]+$')
                 order by substring(k from '_(\\d+)$')::int
               )
             )
        into keys;

      picked := null;

      -- Pick Nth key, where N = label_rank (1=interest, 2=identity)
      if keys is not null and array_length(keys,1) >= d.label_rank then
        picked := keys[d.label_rank];
      elsif keys is not null and array_length(keys,1) >= 1 then
        picked := keys[1];
      end if;

      -- Extract and cast
      if picked is not null then
        val := nullif(j ->> picked, '')::numeric;
      else
        val := null;
      end if;

      -- Write into numeric column if we got a number
      if val is not null then
        execute format(
          'update public.clubs set %I = $1 where club_name = $2',
          d.tag_number::text
        )
        using val, r."Club Name";
      end if;
    end loop;
  end loop;
end $function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at := now();
  return new;
end $function$
;

grant delete on table "public"."clubs" to "anon";

grant insert on table "public"."clubs" to "anon";

grant references on table "public"."clubs" to "anon";

grant select on table "public"."clubs" to "anon";

grant trigger on table "public"."clubs" to "anon";

grant truncate on table "public"."clubs" to "anon";

grant update on table "public"."clubs" to "anon";

grant delete on table "public"."clubs" to "authenticated";

grant insert on table "public"."clubs" to "authenticated";

grant references on table "public"."clubs" to "authenticated";

grant select on table "public"."clubs" to "authenticated";

grant trigger on table "public"."clubs" to "authenticated";

grant truncate on table "public"."clubs" to "authenticated";

grant update on table "public"."clubs" to "authenticated";

grant delete on table "public"."clubs" to "service_role";

grant insert on table "public"."clubs" to "service_role";

grant references on table "public"."clubs" to "service_role";

grant select on table "public"."clubs" to "service_role";

grant trigger on table "public"."clubs" to "service_role";

grant truncate on table "public"."clubs" to "service_role";

grant update on table "public"."clubs" to "service_role";

grant delete on table "public"."clubs_stage_raw" to "anon";

grant insert on table "public"."clubs_stage_raw" to "anon";

grant references on table "public"."clubs_stage_raw" to "anon";

grant select on table "public"."clubs_stage_raw" to "anon";

grant trigger on table "public"."clubs_stage_raw" to "anon";

grant truncate on table "public"."clubs_stage_raw" to "anon";

grant update on table "public"."clubs_stage_raw" to "anon";

grant delete on table "public"."clubs_stage_raw" to "authenticated";

grant insert on table "public"."clubs_stage_raw" to "authenticated";

grant references on table "public"."clubs_stage_raw" to "authenticated";

grant select on table "public"."clubs_stage_raw" to "authenticated";

grant trigger on table "public"."clubs_stage_raw" to "authenticated";

grant truncate on table "public"."clubs_stage_raw" to "authenticated";

grant update on table "public"."clubs_stage_raw" to "authenticated";

grant delete on table "public"."clubs_stage_raw" to "service_role";

grant insert on table "public"."clubs_stage_raw" to "service_role";

grant references on table "public"."clubs_stage_raw" to "service_role";

grant select on table "public"."clubs_stage_raw" to "service_role";

grant trigger on table "public"."clubs_stage_raw" to "service_role";

grant truncate on table "public"."clubs_stage_raw" to "service_role";

grant update on table "public"."clubs_stage_raw" to "service_role";

grant delete on table "public"."recommendation_runs" to "anon";

grant insert on table "public"."recommendation_runs" to "anon";

grant references on table "public"."recommendation_runs" to "anon";

grant select on table "public"."recommendation_runs" to "anon";

grant trigger on table "public"."recommendation_runs" to "anon";

grant truncate on table "public"."recommendation_runs" to "anon";

grant update on table "public"."recommendation_runs" to "anon";

grant delete on table "public"."recommendation_runs" to "authenticated";

grant insert on table "public"."recommendation_runs" to "authenticated";

grant references on table "public"."recommendation_runs" to "authenticated";

grant select on table "public"."recommendation_runs" to "authenticated";

grant trigger on table "public"."recommendation_runs" to "authenticated";

grant truncate on table "public"."recommendation_runs" to "authenticated";

grant update on table "public"."recommendation_runs" to "authenticated";

grant delete on table "public"."recommendation_runs" to "service_role";

grant insert on table "public"."recommendation_runs" to "service_role";

grant references on table "public"."recommendation_runs" to "service_role";

grant select on table "public"."recommendation_runs" to "service_role";

grant trigger on table "public"."recommendation_runs" to "service_role";

grant truncate on table "public"."recommendation_runs" to "service_role";

grant update on table "public"."recommendation_runs" to "service_role";

grant delete on table "public"."survey_recommendations" to "anon";

grant insert on table "public"."survey_recommendations" to "anon";

grant references on table "public"."survey_recommendations" to "anon";

grant select on table "public"."survey_recommendations" to "anon";

grant trigger on table "public"."survey_recommendations" to "anon";

grant truncate on table "public"."survey_recommendations" to "anon";

grant update on table "public"."survey_recommendations" to "anon";

grant delete on table "public"."survey_recommendations" to "authenticated";

grant insert on table "public"."survey_recommendations" to "authenticated";

grant references on table "public"."survey_recommendations" to "authenticated";

grant select on table "public"."survey_recommendations" to "authenticated";

grant trigger on table "public"."survey_recommendations" to "authenticated";

grant truncate on table "public"."survey_recommendations" to "authenticated";

grant update on table "public"."survey_recommendations" to "authenticated";

grant delete on table "public"."survey_recommendations" to "service_role";

grant insert on table "public"."survey_recommendations" to "service_role";

grant references on table "public"."survey_recommendations" to "service_role";

grant select on table "public"."survey_recommendations" to "service_role";

grant trigger on table "public"."survey_recommendations" to "service_role";

grant truncate on table "public"."survey_recommendations" to "service_role";

grant update on table "public"."survey_recommendations" to "service_role";

grant delete on table "public"."survey_responses" to "anon";

grant insert on table "public"."survey_responses" to "anon";

grant references on table "public"."survey_responses" to "anon";

grant select on table "public"."survey_responses" to "anon";

grant trigger on table "public"."survey_responses" to "anon";

grant truncate on table "public"."survey_responses" to "anon";

grant update on table "public"."survey_responses" to "anon";

grant delete on table "public"."survey_responses" to "authenticated";

grant insert on table "public"."survey_responses" to "authenticated";

grant references on table "public"."survey_responses" to "authenticated";

grant select on table "public"."survey_responses" to "authenticated";

grant trigger on table "public"."survey_responses" to "authenticated";

grant truncate on table "public"."survey_responses" to "authenticated";

grant update on table "public"."survey_responses" to "authenticated";

grant delete on table "public"."survey_responses" to "service_role";

grant insert on table "public"."survey_responses" to "service_role";

grant references on table "public"."survey_responses" to "service_role";

grant select on table "public"."survey_responses" to "service_role";

grant trigger on table "public"."survey_responses" to "service_role";

grant truncate on table "public"."survey_responses" to "service_role";

grant update on table "public"."survey_responses" to "service_role";

grant delete on table "public"."tag_dictionary" to "anon";

grant insert on table "public"."tag_dictionary" to "anon";

grant references on table "public"."tag_dictionary" to "anon";

grant select on table "public"."tag_dictionary" to "anon";

grant trigger on table "public"."tag_dictionary" to "anon";

grant truncate on table "public"."tag_dictionary" to "anon";

grant update on table "public"."tag_dictionary" to "anon";

grant delete on table "public"."tag_dictionary" to "authenticated";

grant insert on table "public"."tag_dictionary" to "authenticated";

grant references on table "public"."tag_dictionary" to "authenticated";

grant select on table "public"."tag_dictionary" to "authenticated";

grant trigger on table "public"."tag_dictionary" to "authenticated";

grant truncate on table "public"."tag_dictionary" to "authenticated";

grant update on table "public"."tag_dictionary" to "authenticated";

grant delete on table "public"."tag_dictionary" to "service_role";

grant insert on table "public"."tag_dictionary" to "service_role";

grant references on table "public"."tag_dictionary" to "service_role";

grant select on table "public"."tag_dictionary" to "service_role";

grant trigger on table "public"."tag_dictionary" to "service_role";

grant truncate on table "public"."tag_dictionary" to "service_role";

grant update on table "public"."tag_dictionary" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

CREATE TRIGGER trg_clubs_updated_at BEFORE UPDATE ON public.clubs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


