truncate table tag_dictionary;
truncate table clubs;
-- populating tag_dictionary
begin;

-- 1) Interest tags (1..44)
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (1,'Leadership',false),
 (2,'Teamwork',false),
 (3,'Community Service',false),
 (4,'Advocacy',false),
 (5,'Social Justice',false),
 (6,'Architecture & Urban Planning',false),
 (7,'Technology',false),
 (8,'Arts & Crafts',false),
 (9,'Performing Arts',false),
 (10,'Cultural Expression',false),
 (11,'Diversity & Inclusion',false),
 (12,'Mentorship',false),
 (13,'Career Growth',false),
 (14,'Networking',false),
 (15,'Entrepreneurship',false),
 (16,'Research',false),
 (17,'Fitness',false),
 (18,'Competitive Sports',false),
 (19,'Outdoor Activities',false),
 (20,'Wellness',false),
 (21,'Mental Health',false),
 (22,'Academic Focus',false),
 (23,'Debate & Discussion',false),
 (24,'Virtual Reality',false),
 (25,'Social Events',false),
 (26,'Media & Film',false),
 (27,'Journalism',false),
 (28,'Music',false),
 (29,'Dance',false),
 (30,'UI Design',false),
 (31,'Hospitality',false),
 (32,'International Relations',false),
 (33,'Political Action',false),
 (34,'Fundraising',false),
 (35,'Tutoring & Teaching',false),
 (36,'DIY & Making',false),
 (37,'Ethics',false),
 (38,'Professional Skills',false),
 (39,'Public Speaking',false),
 (40,'Problem Solving',false),
 (41,'Analytics',false),
 (42,'Robotics & AI',false),
 (43,'Space & Astronomy',false),
 (44,'Gaming & eSports',false)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

-- 2) Identities (start at 45) — order matches ONLY_IDENTITIES

-- Gender (2)
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (45,'man men',true),
 (46,'woman women',true)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

-- Race (6)
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (47,'White European Italian',true),
 (48,'Black African American',true),
 (49,'Native American',true),
 (50,'Asian',true),
 (51,'Hispanic',true),
 (52,'Native Hawaiian or Other Pacific Islander',true)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

-- Majors (65) 53..117
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (53,'Aerospace Engineering',true),
 (54,'Agricultural Business',true),
 (55,'Agricultural Communication',true),
 (56,'Agricultural Science',true),
 (57,'Agricultural Systems Management',true),
 (58,'Animal Science',true),
 (59,'Anthropology and Geography',true),
 (60,'Architectural Engineering',true),
 (61,'Architecture',true),
 (62,'Art and Design',true),
 (63,'Biochemistry',true),
 (64,'Biological Sciences',true),
 (65,'Biomedical Engineering',true),
 (66,'BioResource and Agricultural Engineering',true),
 (67,'Business Administration',true),
 (68,'Chemistry',true),
 (69,'Child Development',true),
 (70,'City and Regional Planning',true),
 (71,'Civil Engineering',true),
 (72,'Communication Studies',true),
 (73,'Comparative Ethnic Studies',true),
 (74,'Computer Engineering',true),
 (75,'Computer Science',true),
 (76,'Construction Management',true),
 (77,'Dairy Science',true),
 (78,'Economics',true),
 (79,'Electrical Engineering',true),
 (80,'English',true),
 (81,'Environmental Earth and Soil Sciences',true),
 (82,'Environmental Engineering',true),
 (83,'Environmental Management and Protection',true),
 (84,'Food Science',true),
 (85,'Forest and Fire Sciences',true),
 (86,'General Engineering',true),
 (87,'Graphic Communication',true),
 (88,'History',true),
 (89,'Industrial Engineering',true),
 (90,'Industrial Technology and Packaging',true),
 (91,'Interdisciplinary Studies',true),
 (92,'Journalism',true),
 (93,'Kinesiology',true),
 (94,'Landscape Architecture',true),
 (95,'Liberal Arts and Engineering Studies',true),
 (96,'Liberal Studies',true),
 (97,'Manufacturing Engineering',true),
 (98,'Marine Sciences',true),
 (99,'Materials Engineering',true),
 (100,'Mathematics',true),
 (101,'Mechanical Engineering',true),
 (102,'Microbiology',true),
 (103,'Music',true),
 (104,'Nutrition',true),
 (105,'Philosophy',true),
 (106,'Physics',true),
 (107,'Plant Sciences',true),
 (108,'Political Science',true),
 (109,'Public Health',true),
 (110,'Psychology',true),
 (111,'Recreation, Parks, and Tourism Administration',true),
 (112,'Sociology',true),
 (113,'Software Engineering',true),
 (114,'Spanish',true),
 (115,'Statistics',true),
 (116,'Theatre Arts',true),
 (117,'Wine and Viticulture',true)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

-- Religion (6) 118..123
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (118,'Christian',true),
 (119,'Jewish Community and Judaism',true),
 (120,'Islam',true),
 (121,'Hindu',true),
 (122,'Buddhism',true),
 (123,'Sikh',true)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

-- LGBTQ (1) 124
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (124,'lgbtq',true)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

-- Greek (1) 125
insert into tag_dictionary (tag_number, tag_label, is_identity) values
 (125,'Greek',true)
on conflict (tag_number) do update
  set tag_label=excluded.tag_label, is_identity=excluded.is_identity;

commit;