# ===============================================
# Generate club embedding scores with new 50 tags + identities
# Output: ClubsScored_withIdentity.csv
# ===============================================

from sentence_transformers import SentenceTransformer
import pandas as pd
import torch
from sklearn import preprocessing

# ---------- SETUP ----------
DEVICE = (
    "mps" if torch.backends.mps.is_available()
    else "cuda" if torch.cuda.is_available()
    else "cpu"
)
model = SentenceTransformer("sentence-transformers/multi-qa-mpnet-base-dot-v1")

# ---------- LOAD SCRAPED CLUB DATA ----------
df = pd.read_csv("NicosScrapedData.csv")
name_desc = df["Club Name"] + " " + df["Description Excerpt"]

# ---------- TAGS + IDENTITIES ----------
all_tags_and_identities = [
    # === 50 NEW INTEREST TAGS ===
    "Coding & Software Development",
    "Hardware & Prototyping",
    "Artificial Intelligence & Machine Learning",
    "Data Science & Analytics",
    "IoT & Embedded Systems",
    "Robotics & Automation",
    "Engineering Design & Manufacturing",
    "Sustainable Engineering & Renewable Energy",
    "Product Management & Startups",
    "Graphic & Visual Design",
    "Fashion & Styling",
    "Music Performance & Production",
    "Film, Media & Journalism",
    "Photography & Visual Arts",
    "Creative Writing & Literature",
    "Theater & Improv Performance",
    "Dance & Movement Arts",
    "Outdoor Adventure & Recreation",
    "Fitness, Wellness & Mindfulness",
    "Sports & Competitive Club Teams",
    "Community Service & Volunteering",
    "Social Entrepreneurship & Impact",
    "Non-profit & Advocacy Engagement",
    "Diversity, Equity & Inclusion",
    "Cultural & Heritage Community",
    "Language Learning & Conversation",
    "International & Global Perspectives",
    "Academic Research & Honor Societies",
    "Professional Development & Networking",
    "Business, Finance & Investing",
    "Sales & Business Analytics",
    "Marketing & Advertising",
    "Urban Planning & Real Estate",
    "Agriculture, Food Systems & Plant Science",
    "Environmental Conservation & Ecology",
    "Wildlife & Natural Resources",
    "Health Sciences & Pre-Professional Tracks",
    "Mental Health & Peer Support",
    "Spiritual-Faith & Religious Community",
    "LGBTQIA+ Advocacy & Safe Spaces",
    "Multicultural Student Communities",
    "Greek Life / Social Leadership",
    "Student Media / Magazine / Editorial",
    "Gaming, eSports & Tabletop",
    "Vehicle/Off-Road & Motorsport Clubs",
    "Skills Training & Career Preparation",
    "Tutoring / Academic Support & Study Groups",
    "Technology for Social Good",
    "Sustainable Lifestyle & Circular Economy",
    "Life Skills & Personal Growth",

    # === IDENTITIES ===
    # Gender
    "woman women",
    "man men",
    "lgbtq",

    # Race
    "White European Italian",
    "Black African American",
    "Native American",
    "Asian",
    "Hispanic",
    "Native Hawaiian or Other Pacific Islander",

    # Greek Life
    "Greek",

    # Religion
    "Christian",
    "Islam",
    "Jewish Community and Judaism",
    "Hindu",
    "Buddhism",
    "Sikh",

    # === MAJORS ===
    "Aerospace Engineering", "Agricultural Business", "Agricultural Communication",
    "Agricultural Science", "Agricultural Systems Management", "Animal Science",
    "Anthropology and Geography", "Architectural Engineering", "Architecture",
    "Art and Design", "Biochemistry", "Biological Sciences", "Biomedical Engineering",
    "BioResource and Agricultural Engineering", "Business Administration", "Chemistry",
    "Child Development", "City and Regional Planning", "Civil Engineering",
    "Communication Studies", "Comparative Ethnic Studies", "Computer Engineering",
    "Computer Science", "Construction Management", "Dairy Science", "Economics",
    "Electrical Engineering", "English", "Environmental Earth and Soil Sciences",
    "Environmental Engineering", "Environmental Management and Protection", "Food Science",
    "Forest and Fire Sciences", "General Engineering", "Graphic Communication", "History",
    "Industrial Engineering", "Industrial Technology and Packaging", "Interdisciplinary Studies",
    "Journalism", "Kinesiology", "Landscape Architecture", "Liberal Arts and Engineering Studies",
    "Liberal Studies", "Manufacturing Engineering", "Marine Sciences", "Materials Engineering",
    "Mathematics", "Mechanical Engineering", "Microbiology", "Music", "Nutrition",
    "Philosophy", "Physics", "Plant Sciences", "Political Science", "Public Health",
    "Psychology", "Recreation, Parks, and Tourism Administration", "Sociology",
    "Software Engineering", "Spanish", "Statistics", "Theatre Arts", "Wine and Viticulture"
]

# ---------- EMBEDDING & SCORING ----------
print("⚙️ Encoding club descriptions and tags...")
desc_embeddings = model.encode(name_desc, show_progress_bar=True, device=DEVICE)
tag_embeddings = model.encode(all_tags_and_identities, show_progress_bar=True, device=DEVICE)

print("📈 Calculating similarity matrix...")
similarity_matrix = model.similarity(desc_embeddings, tag_embeddings)

# Normalize similarities to [0, 1]
scaler = preprocessing.MinMaxScaler()
scaled_matrix = scaler.fit_transform(similarity_matrix)

# ---------- BUILD DATAFRAME ----------
sim_df = pd.DataFrame(scaled_matrix, columns=all_tags_and_identities)
sim_df.insert(0, "Club Name", df["Club Name"])
sim_df.insert(1, "links", df["tablescraper-selected-row href"])
sim_df["Description"] = df["Description Excerpt"]

# ---------- THRESHOLDING FOR IDENTITIES ----------
def race_threshold(thresh_value, race_list, dataframe):
    for i, row in dataframe.iterrows():
        race_vals = row[race_list].to_list()
        max_val = max(race_vals)
        max_index = race_vals.index(max_val)
        for col in race_list:
            dataframe.at[i, col] = 0.0
        if max_val >= thresh_value:
            dataframe.at[i, race_list[max_index]] = 1.0
        else:
            for col in race_list:
                dataframe.at[i, col] = 1.0

def gender_threshold(dataframe, thresh_value):
    women_words = {"woman", "women", "sisterhood", "sorority"}
    men_words = {"man", "men", "brotherhood", "fraternity"}
    for i, row in dataframe.iterrows():
        desc = str(row["Description"]).lower()
        if any(w in desc for w in women_words):
            dataframe.at[i, "woman women"] = 1.0
            dataframe.at[i, "man men"] = 0.0
        elif any(w in desc for w in men_words):
            dataframe.at[i, "woman women"] = 0.0
            dataframe.at[i, "man men"] = 1.0
        else:
            w, m = row["woman women"], row["man men"]
            if abs(w - m) < 0.1:
                dataframe.at[i, "woman women"] = 1.0
                dataframe.at[i, "man men"] = 1.0
            elif w > m:
                dataframe.at[i, "woman women"] = 1.0
                dataframe.at[i, "man men"] = 0.0
            else:
                dataframe.at[i, "woman women"] = 0.0
                dataframe.at[i, "man men"] = 1.0

def greek_threshold(dataframe):
    greek_keywords = {"greek", "fraternity", "sorority", "alpha", "beta", "gamma", "delta",
                      "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu",
                      "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi",
                      "chi", "psi", "omega"}
    for i, row in dataframe.iterrows():
        desc = str(row["Description"]).lower()
        dataframe.at[i, "Greek"] = 1.0 if any(word in desc for word in greek_keywords) else 0.0

def lgbtq_threshold(dataframe, thresh_value):
    dataframe["lgbtq"] = dataframe["lgbtq"].apply(lambda x: 1.0 if x >= thresh_value else 0.0)

print("🔧 Applying identity thresholds...")
race_threshold(0.6, [
    "White European Italian", "Black African American", "Native American",
    "Asian", "Hispanic", "Native Hawaiian or Other Pacific Islander"
], sim_df)
gender_threshold(sim_df, 0.575)
greek_threshold(sim_df)
lgbtq_threshold(sim_df, 0.65)

# ---------- SAVE ----------
out_name = "ClubsScored_withIdentity.csv"
sim_df.to_csv(out_name, index=False)
print(f"✅ Done! Saved combined tags + identities → {out_name}")
print(f"Device used: {DEVICE}")
