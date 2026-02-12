export const CAROUSEL_ITEMS = [
  {
    id: "c1",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    location: "Ras Mohammed",
    username: "reef_mira",
  },
  {
    id: "c2",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80",
    location: "Dahab Blue Hole",
    username: "ocean_ali",
  },
  {
    id: "c3",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    location: "Tiran Island",
    username: "salty_nour",
  },
  {
    id: "c4",
    imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1200&q=80",
    location: "Elphinstone",
    username: "deep_reef",
  },
  {
    id: "c5",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80",
    location: "Brothers Islands",
    username: "blue_saba",
  },
];

export const CHALLENGES = [
  { id: "ch1", title: "Red Sea Cleanup", progress: 64, reward: 180 },
  { id: "ch2", title: "Lionfish Spotted", progress: 38, reward: 140 },
];

export const REWARD_CATEGORIES = ["All", "Spa", "Dive", "Snorkel", "Food", "Activities"];

export const REWARDS = [
  {
    id: "r1",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80",
    title: "15% Off Oceanfront Dinner",
    description: "Two-course coastal menu at partner restaurant.",
    vendor: "The Blue Table",
    location: "Sharm El Sheikh",
    points: 420,
    category: "Food",
  },
  {
    id: "r2",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
    title: "Guided Reef Snorkel",
    description: "Small-group snorkel with marine biologist.",
    vendor: "Reef Guides",
    location: "Dahab",
    points: 520,
    category: "Snorkel",
  },
  {
    id: "r3",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    title: "Spa Recovery Session",
    description: "60-minute recovery massage post-dive.",
    vendor: "Azure Spa",
    location: "Marsa Alam",
    points: 380,
    category: "Spa",
  },
  {
    id: "r4",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&q=80",
    title: "Discovery Dive",
    description: "Beginner-friendly discovery dive.",
    vendor: "Red Sea Divers",
    location: "Hurghada",
    points: 610,
    category: "Dive",
  },
  {
    id: "r5",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
    title: "Sunset Desert Safari",
    description: "Off-resort adventure with local guides.",
    vendor: "Desert Fox",
    location: "Hurghada",
    points: 720,
    category: "Activities",
  },
];

export const VOUCHER = {
  title: "15% Off Oceanfront Dinner",
  vendor: "The Blue Table",
  description: "Valid for two guests. Present QR code at seating.",
  code: "PROTEUS-SEA-1526",
};

export const STEWARDSHIP_PLEDGES = [
  "I will never touch or stand on coral reefs.",
  "I will keep a respectful distance from marine life.",
  "I will use reef-safe sunscreen and reduce waste.",
  "I will report any reef damage or unsafe activity.",
  "I will share the Red Sea with care and responsibility.",
];

export const SCAN_RESULTS = {
  pointsAwarded: 250,
  species: [
    {
      name: "Red Sea Clownfish",
      description: "A bright, territorial species that shelters in anemones.",
      funFacts: [
        "Endemic to the Red Sea and Gulf of Aden.",
        "Lives in symbiosis with anemones.",
      ],
    },
    {
      name: "Sohal Surgeonfish",
      description: "A bold, reef-dwelling grazer with sharp tail spines.",
      funFacts: [
        "Patrols large reef territories.",
        "One of the Red Sea's most iconic tangs.",
      ],
    },
  ],
};

export const FISH_SILHOUETTES = [
  "M 14,50 C 14,35 24,24 40,22 C 56,20 74,28 84,40 C 92,48 92,58 84,64 C 72,72 56,76 40,74 C 24,70 14,60 14,50 Z M 84,40 L 104,30 L 100,52 L 84,52 Z",
  "M 18,50 C 18,30 36,16 52,14 C 68,12 84,22 90,36 C 96,48 92,62 80,70 C 64,80 44,80 30,70 C 20,62 16,56 18,50 Z M 78,20 L 90,6 M 80,76 L 92,90",
  "M 8,48 C 12,40 28,38 44,40 L 80,40 C 90,40 98,46 104,50 L 108,52 C 100,58 88,60 76,60 L 44,58 C 28,56 14,54 8,48 Z M 92,40 L 112,34 L 110,52 Z",
];
