export interface RedSeaSpecies {
  scientificName: string;
  commonName: string;
  family: string;
}

export const RED_SEA_SPECIES: RedSeaSpecies[] = [
  // Butterflyfish (Chaetodontidae)
  { scientificName: "Chaetodon fasciatus", commonName: "Red Sea Raccoon Butterflyfish", family: "Chaetodontidae" },
  { scientificName: "Chaetodon larvatus", commonName: "Hooded Butterflyfish", family: "Chaetodontidae" },
  { scientificName: "Chaetodon semilarvatus", commonName: "Golden Butterflyfish", family: "Chaetodontidae" },
  { scientificName: "Chaetodon paucifasciatus", commonName: "Red Sea Melon Butterflyfish", family: "Chaetodontidae" },
  { scientificName: "Heniochus intermedius", commonName: "Red Sea Bannerfish", family: "Chaetodontidae" },

  // Angelfish (Pomacanthidae)
  { scientificName: "Pomacanthus maculosus", commonName: "Yellowbar Angelfish", family: "Pomacanthidae" },
  { scientificName: "Pomacanthus imperator", commonName: "Emperor Angelfish", family: "Pomacanthidae" },
  { scientificName: "Pygoplites diacanthus", commonName: "Royal Angelfish", family: "Pomacanthidae" },

  // Damselfish (Pomacentridae)
  { scientificName: "Chromis viridis", commonName: "Blue Green Chromis", family: "Pomacentridae" },
  { scientificName: "Dascyllus trimaculatus", commonName: "Threespot Dascyllus", family: "Pomacentridae" },
  { scientificName: "Dascyllus aruanus", commonName: "Whitetail Dascyllus", family: "Pomacentridae" },
  { scientificName: "Chromis dimidiata", commonName: "Half and Half Chromis", family: "Pomacentridae" },

  // Parrotfish (Scaridae)
  { scientificName: "Scarus ferrugineus", commonName: "Rusty Parrotfish", family: "Scaridae" },
  { scientificName: "Scarus ghobban", commonName: "Blue Barred Parrotfish", family: "Scaridae" },
  { scientificName: "Chlorurus sordidus", commonName: "Bullethead Parrotfish", family: "Scaridae" },

  // Wrasse (Labridae)
  { scientificName: "Thalassoma rueppellii", commonName: "Klunzinger's Wrasse", family: "Labridae" },
  { scientificName: "Coris aygula", commonName: "Clown Coris", family: "Labridae" },
  { scientificName: "Cheilinus lunulatus", commonName: "Broomtail Wrasse", family: "Labridae" },

  // Grouper (Serranidae)
  { scientificName: "Cephalopholis miniata", commonName: "Coral Grouper", family: "Serranidae" },
  { scientificName: "Epinephelus fasciatus", commonName: "Blacktip Grouper", family: "Serranidae" },

  // Surgeonfish (Acanthuridae)
  { scientificName: "Acanthurus sohal", commonName: "Sohal Surgeonfish", family: "Acanthuridae" },
  { scientificName: "Zebrasoma xanthurum", commonName: "Purple Tang", family: "Acanthuridae" },
  { scientificName: "Naso unicornis", commonName: "Bluespine Unicornfish", family: "Acanthuridae" },

  // Moray Eels (Muraenidae)
  { scientificName: "Gymnothorax javanicus", commonName: "Giant Moray", family: "Muraenidae" },
  { scientificName: "Siderea grisea", commonName: "Geometric Moray", family: "Muraenidae" },
];

export function isRedSeaSpecies(scientificName: string): boolean {
  return RED_SEA_SPECIES.some(
    species => species.scientificName.toLowerCase() === scientificName.toLowerCase()
  );
}

export function findRedSeaSpecies(scientificName: string): RedSeaSpecies | undefined {
  return RED_SEA_SPECIES.find(
    species => species.scientificName.toLowerCase() === scientificName.toLowerCase()
  );
}
