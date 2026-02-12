export const CAROUSEL_ITEMS = [
  { id: "c1", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop", location: "Ras Mohammed", username: "Sarah M." },
  { id: "c2", imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=600&h=400&fit=crop", location: "Jackson Reef", username: "Ahmed K." },
  { id: "c3", imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=400&fit=crop", location: "Brothers Islands", username: "Maria L." },
  { id: "c4", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop", location: "Tiran Strait", username: "Omar H." },
  { id: "c5", imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop", location: "Dahab Blue Hole", username: "Fatima A." },
  { id: "c6", imageUrl: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&h=400&fit=crop", location: "Elphinstone Reef", username: "James R." },
];

export const CHALLENGES = [
  { id: "ch1", title: "Scan 5 species", progress: 60, reward: 200, icon: "\u{1F420}" },
  { id: "ch2", title: "Visit 3 dive sites", progress: 33, reward: 150, icon: "\u{1F4CD}" },
  { id: "ch3", title: "Earn 2000 points", progress: 62, reward: 300, icon: "\u{2B50}" },
];

export const REWARDS = [
  { id: "r1", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop", title: "Sunset Snorkel Tour", description: "2-hour guided snorkeling at Ras Mohammed", vendor: "Red Sea Divers", location: "Sharm el-Sheikh", points: 500, category: "experiences" },
  { id: "r2", image: "https://images.unsplash.com/photo-1565361849078-294849288de5?w=200&h=200&fit=crop", title: "Dive Computer Rental", description: "Full-day Suunto dive computer rental", vendor: "Sinai Dive Club", location: "Dahab", points: 300, category: "gear" },
  { id: "r3", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop", title: "Marine Biology Course", description: "Online Red Sea ecosystem certification", vendor: "KAUST Ocean", location: "Online", points: 800, category: "courses" },
  { id: "r4", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop", title: "Reef-Safe Sunscreen Kit", description: "Ocean-friendly SPF50 sunscreen pack", vendor: "Blue Guard", location: "Delivery", points: 200, category: "gear" },
  { id: "r5", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop", title: "Night Dive Experience", description: "Guided fluorescent night dive", vendor: "Aqua Blue", location: "Hurghada", points: 600, category: "experiences" },
  { id: "r6", image: "https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?w=200&h=200&fit=crop", title: "Proteus T-Shirt", description: "Limited edition coral guardian tee", vendor: "Proteus Store", location: "Delivery", points: 150, category: "merch" },
];

export const REWARD_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "experiences", label: "Experiences" },
  { id: "gear", label: "Gear" },
  { id: "courses", label: "Courses" },
  { id: "merch", label: "Merch" },
];

export const DIVE_SITES = [
  "Ras Mohammed", "Jackson Reef", "Thomas Reef", "Woodhouse Reef",
  "Gordon Reef", "Tiran Strait", "Dahab Blue Hole", "The Canyon",
  "Elphinstone Reef", "Brothers Islands", "Abu Dabbab", "Marsa Alam",
];

export const PLEDGES = [
  { id: "p1", text: "I will not touch or stand on coral reefs" },
  { id: "p2", text: "I will use reef-safe sunscreen only" },
  { id: "p3", text: "I will collect any trash I find underwater" },
  { id: "p4", text: "I will maintain safe distance from marine life" },
  { id: "p5", text: "I will report any reef damage I observe" },
];

export const FISH_SILHOUETTES = [
  "M10 80 Q30 10, 80 50 Q120 80, 100 120 Q70 140, 30 120 Q0 100, 10 80 Z",
  "M20 60 Q60 10, 120 40 Q160 60, 140 100 Q100 140, 50 120 Q10 100, 20 60 Z",
  "M15 70 Q50 20, 100 50 Q140 70, 130 110 Q90 150, 40 120 Q5 95, 15 70 Z",
  "M25 65 Q65 15, 115 45 Q155 65, 135 105 Q95 145, 45 115 Q10 90, 25 65 Z",
  "M30 75 Q55 25, 95 55 Q130 75, 120 105 Q85 135, 45 110 Q15 90, 30 75 Z",
];

export const INITIAL_POINTS = 1250;

export const MOCK_VOUCHER = {
  terms: "Valid for 30 days from redemption. Present QR code at vendor location. Non-transferable. One-time use only.",
};

export const SPECIES_FUN_FACTS: Record<string, string> = {
  "Clownfish": "Clownfish are immune to the sting of sea anemones thanks to a special mucus coating.",
  "Blue Tang": "Blue tangs can make themselves semi-transparent to confuse predators.",
  "Lionfish": "Lionfish are invasive in the Red Sea and can consume prey up to half their own size.",
  "Parrotfish": "Parrotfish produce up to 90kg of sand per year by eating coral.",
  "Moray Eel": "Moray eels have a second set of jaws (pharyngeal jaws) that extend from their throat.",
  default: "This species is part of the incredible Red Sea marine biodiversity.",
};
