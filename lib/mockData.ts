// Carousel items for hub screen
export const CAROUSEL_ITEMS = [
  { id: "c1", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", location: "Ras Mohammed", username: "diver_sarah" },
  { id: "c2", imageUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80", location: "Tiran Island", username: "ocean_mike" },
  { id: "c3", imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=80", location: "Dahab Blue Hole", username: "reef_explorer" },
  { id: "c4", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", location: "Brothers Islands", username: "deep_sea_jen" },
  { id: "c5", imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&q=80", location: "Elphinstone Reef", username: "aqua_lens" },
  { id: "c6", imageUrl: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&q=80", location: "Jackson Reef", username: "dive_master_k" },
];

// Initial user points
export const INITIAL_POINTS = 1250;

// Seasonal challenges
export const CHALLENGES = [
  { id: "ch1", title: "Red Sea Cleanup", progress: 60, reward: 200, icon: "trash-2" as const },
  { id: "ch2", title: "Lionfish Spotted", progress: 33, reward: 150, icon: "eye" as const },
  { id: "ch3", title: "5 Unique Species", progress: 80, reward: 300, icon: "fish" as const },
];

// Rewards list
export const REWARDS = [
  { id: "r1", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80", title: "Free Discovery Dive", description: "Complimentary discovery dive at any partner center", vendor: "Red Sea Divers", location: "Hurghada", points: 500, category: "Dive" },
  { id: "r2", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=200&q=80", title: "Seafood Dinner for Two", description: "Full seafood tasting menu at oceanfront restaurant", vendor: "The Blue Table", location: "Sharm El Sheikh", points: 400, category: "Food" },
  { id: "r3", image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=200&q=80", title: "Premium Snorkel Tour", description: "Half-day guided snorkel tour with marine biologist", vendor: "Reef Guides", location: "Dahab", points: 600, category: "Snorkel" },
  { id: "r4", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80", title: "Spa & Recovery", description: "60-min deep tissue massage after your dive day", vendor: "Azure Spa", location: "Marsa Alam", points: 350, category: "Spa" },
  { id: "r5", image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=200&q=80", title: "Desert Safari + BBQ", description: "Sunset quad biking with traditional Bedouin dinner", vendor: "Desert Fox Adventures", location: "Hurghada", points: 700, category: "Activities" },
  { id: "r6", image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=200&q=80", title: "Boat Day Trip", description: "Full day reef exploration on luxury catamaran", vendor: "Blue Ocean Tours", location: "Sharm El Sheikh", points: 900, category: "Dive" },
];

// Reward categories for filter
export const REWARD_CATEGORIES = ["All", "Spa", "Dive", "Snorkel", "Food", "Activities"];

// Dive sites
export const DIVE_SITES = [
  "Ras Mohammed", "Tiran Island", "Dahab Blue Hole", "Brothers Islands",
  "Elphinstone Reef", "Jackson Reef", "Thomas Reef", "Gordon Reef",
  "Shark & Yolanda Reef", "Abu Dabbab", "Marsa Shagra", "Daedalus Reef",
];

// Stewardship pledges
export const PLEDGES = [
  "I will never touch, stand on, or disturb coral reefs or marine life.",
  "I commit to using only reef-safe sunscreen before every dive.",
  "I will report any signs of reef damage, bleaching, or illegal fishing.",
  "I promise to collect and properly dispose of any underwater debris I find.",
  "I pledge to share my discoveries responsibly and inspire others to protect the Red Sea.",
];

// Fish SVG paths for holographic scanning animation
export const FISH_SILHOUETTES = [
  // Clownfish
  "M 15,50 C 15,35 25,25 40,25 C 55,20 70,25 80,35 C 90,40 95,50 90,55 C 85,65 70,70 55,70 C 40,72 25,65 15,50 Z M 82,35 L 100,28 L 98,48 L 82,45 Z",
  // Angelfish
  "M 20,50 C 20,30 35,15 50,12 C 65,10 80,20 88,35 C 92,45 90,58 82,65 C 70,75 50,78 35,72 C 22,66 18,58 20,50 Z M 75,20 L 85,8 M 78,70 L 88,82",
  // Barracuda
  "M 8,48 C 12,42 25,40 40,41 L 75,40 C 85,39 92,44 98,48 L 102,50 C 98,54 90,58 78,58 L 42,57 C 28,58 14,56 8,48 Z M 90,41 L 108,35 L 106,50 Z",
  // Manta Ray
  "M 50,38 C 35,30 15,22 5,32 C 10,42 22,40 35,38 C 42,36 48,40 50,48 C 52,40 58,36 65,38 C 78,40 90,42 95,32 C 85,22 65,30 50,38 Z M 50,48 L 50,68 C 48,72 50,76 52,72 L 50,68",
  // Seahorse
  "M 50,8 C 56,12 58,22 56,30 C 60,34 58,40 54,44 C 50,48 48,54 50,60 C 52,64 50,70 46,74 C 42,78 40,84 44,88 C 48,90 50,86 50,82 M 56,22 C 64,18 62,12 56,14",
];

// Mock voucher template
export const MOCK_VOUCHER = {
  code: "PROTEUS-2026-ABCD",
  terms: "Valid at participating partner locations. Present QR code at time of redemption. One-time use only.",
};

// Fun facts for species results
export const SPECIES_FUN_FACTS: Record<string, string[]> = {
  default: [
    "The Red Sea is home to over 1,200 species of fish, 10% found nowhere else!",
    "Red Sea coral reefs are among the most resilient in the world.",
    "Water temperatures in the Red Sea range from 20\u00B0C to 30\u00B0C year-round.",
  ],
};
