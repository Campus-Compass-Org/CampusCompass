/**
 * ALL_TAGS
 * A mapping of tag IDs to an array containing the tag name.
 * The second element in the array is the tag ID itself, maintained for compatibility with existing logic.
 */
export const ALL_TAGS = {
  1: ["Coding & Software Development", 1],
  2: ["Hardware & Prototyping", 2],
  3: ["Artificial Intelligence & Machine Learning", 3],
  4: ["Data Science & Analytics", 4],
  5: ["IoT & Embedded Systems", 5],
  6: ["Robotics & Automation", 6],
  7: ["Engineering Design & Manufacturing", 7],
  8: ["Sustainable Engineering & Renewable Energy", 8],
  9: ["Product Management & Startups", 9],
  10: ["Graphic & Visual Design", 10],
  11: ["Fashion & Styling", 11],
  12: ["Music Performance & Production", 12],
  13: ["Film, Media & Journalism", 13],
  14: ["Photography & Visual Arts", 14],
  15: ["Creative Writing & Literature", 15],
  16: ["Theater & Improv Performance", 16],
  17: ["Dance & Movement Arts", 17],
  18: ["Outdoor Adventure & Recreation", 18],
  19: ["Fitness, Wellness & Mindfulness", 19],
  20: ["Sports & Competitive Club Teams", 20],
  21: ["Community Service & Volunteering", 21],
  22: ["Social Entrepreneurship & Impact", 22],
  23: ["Non-profit & Advocacy Engagement", 23],
  24: ["Diversity, Equity & Inclusion", 24],
  25: ["Cultural & Heritage Community", 25],
  26: ["Language Learning & Conversation", 26],
  27: ["International & Global Perspectives", 27],
  28: ["Academic Research & Honor Societies", 28],
  29: ["Professional Development & Networking", 29],
  30: ["Business, Finance & Investing", 30],
  31: ["Sales & Business Analytics", 31],
  32: ["Marketing & Advertising", 32],
  33: ["Urban Planning & Real Estate", 33],
  34: ["Agriculture, Food Systems & Plant Science", 34],
  35: ["Environmental Conservation & Ecology", 35],
  36: ["Wildlife & Natural Resources", 36],
  37: ["Health Sciences & Pre-Professional Tracks", 37],
  38: ["Mental Health & Peer Support", 38],
  39: ["Spiritual-Faith & Religious Community", 39],
  40: ["LGBTQIA+ Advocacy & Safe Spaces", 40],
  41: ["Multicultural Student Communities", 41],
  42: ["Greek Life / Social Leadership", 42],
  43: ["Student Media / Magazine / Editorial", 43],
  44: ["Gaming, eSports & Tabletop", 44],
  45: ["Vehicle/Off-Road & Motorsport Clubs", 45],
  46: ["Skills Training & Career Preparation", 46],
  47: ["Tutoring / Academic Support & Study Groups", 47],
  48: ["Technology for Social Good", 48],
  49: ["Sustainable Lifestyle & Circular Economy", 49],
  50: ["Life Skills & Personal Growth", 50],
};

/**
 * TAG_LIST
 * A simple list of tag names corresponding to the keys in ALL_TAGS.
 */
export const TAG_LIST = Object.values(ALL_TAGS).map((tag) => tag[0]);
