export const lunarMonths = [
  {
    index: 1,
    name: "Wolf Moon",
    keywords: ["listening", "stillness", "beginnings"]
  },
  {
    index: 2,
    name: "Snow Moon",
    keywords: ["nourishment", "stability", "warmth"]
  },
  {
    index: 3,
    name: "Worm Moon",
    keywords: ["growth", "curiosity", "tending"]
  },
  {
    index: 4,
    name: "Pink Moon",
    keywords: ["expression", "radiance", "connection"]
  },
  {
    index: 5,
    name: "Flower Moon",
    keywords: ["creativity", "beauty", "play"]
  },
  {
    index: 6,
    name: "Strawberry Moon",
    keywords: ["harvest", "gratitude", "reflection"]
  },
  {
    index: 7,
    name: "Buck Moon",
    keywords: ["direction", "protection", "trust"]
  },
  {
    index: 8,
    name: "Sturgeon Moon",
    keywords: ["depth", "restoration", "courage"]
  },
  {
    index: 9,
    name: "Corn Moon",
    keywords: ["planning", "stewardship", "clarity"]
  },
  {
    index: 10,
    name: "Harvest Moon",
    keywords: ["balance", "reverence", "integration"]
  },
  {
    index: 11,
    name: "Hunter's Moon",
    keywords: ["insight", "guidance", "illumination"]
  },
  {
    index: 12,
    name: "Beaver Moon",
    keywords: ["preparation", "compassion", "craft"]
  },
  {
    index: 13,
    name: "Cold Moon",
    keywords: ["closure", "release", "renewal"]
  }
];

export const LUNAR_MONTH_LENGTH = 28;
export const LUNAR_YEAR_LENGTH = lunarMonths.length * LUNAR_MONTH_LENGTH;

export const lunarDayMap = Array.from(
  { length: LUNAR_YEAR_LENGTH },
  (_, index) => {
    const monthIndex = Math.floor(index / LUNAR_MONTH_LENGTH);
    const dayInMonth = (index % LUNAR_MONTH_LENGTH) + 1;
    const month = lunarMonths[monthIndex];
    return {
      dayOfYear: index + 1,
      monthIndex: month.index,
      monthName: month.name,
      dayInMonth,
      keywords: month.keywords
    };
  }
);

export const cycleDays = [
  {
    day: 1,
    moonName: "Wolf Moon",
    phase: "New Moon",
    archetype: "The Listener",
    affirmation: "I slow down to hear what is quietly beginning."
  },
  {
    day: 2,
    moonName: "Wolf Moon",
    phase: "Waxing Crescent",
    archetype: "The Spark",
    affirmation: "Small steps are enough to kindle momentum."
  },
  {
    day: 3,
    moonName: "Snow Moon",
    phase: "Waxing Crescent",
    archetype: "The Keeper",
    affirmation: "I nourish the steady warmth within."
  },
  {
    day: 4,
    moonName: "Snow Moon",
    phase: "Waxing Crescent",
    archetype: "The Builder",
    affirmation: "I shape gentle structure for what matters."
  },
  {
    day: 5,
    moonName: "Snow Moon",
    phase: "First Quarter",
    archetype: "The Ally",
    affirmation: "I ask for support and offer it in return."
  },
  {
    day: 6,
    moonName: "Worm Moon",
    phase: "Waxing Gibbous",
    archetype: "The Gardener",
    affirmation: "I tend to growth with patient care."
  },
  {
    day: 7,
    moonName: "Worm Moon",
    phase: "Waxing Gibbous",
    archetype: "The Explorer",
    affirmation: "Curiosity guides me to fresh ground."
  },
  {
    day: 8,
    moonName: "Pink Moon",
    phase: "Waxing Gibbous",
    archetype: "The Messenger",
    affirmation: "I share what is true with kindness."
  },
  {
    day: 9,
    moonName: "Pink Moon",
    phase: "Full Moon",
    archetype: "The Radiant",
    affirmation: "I let myself be seen in my wholeness."
  },
  {
    day: 10,
    moonName: "Flower Moon",
    phase: "Waning Gibbous",
    archetype: "The Weaver",
    affirmation: "I connect threads into living patterns."
  },
  {
    day: 11,
    moonName: "Flower Moon",
    phase: "Waning Gibbous",
    archetype: "The Artist",
    affirmation: "I create space for beauty and play."
  },
  {
    day: 12,
    moonName: "Strawberry Moon",
    phase: "Waning Gibbous",
    archetype: "The Harvester",
    affirmation: "I savor what is ready and ripe."
  },
  {
    day: 13,
    moonName: "Strawberry Moon",
    phase: "Last Quarter",
    archetype: "The Mirror",
    affirmation: "I reflect on what serves and what can soften."
  },
  {
    day: 14,
    moonName: "Buck Moon",
    phase: "Waning Crescent",
    archetype: "The Pathfinder",
    affirmation: "I trust the quiet trail beneath my feet."
  },
  {
    day: 15,
    moonName: "Buck Moon",
    phase: "Waning Crescent",
    archetype: "The Protector",
    affirmation: "I honor boundaries that keep me steady."
  },
  {
    day: 16,
    moonName: "Sturgeon Moon",
    phase: "Waning Crescent",
    archetype: "The Deep Diver",
    affirmation: "I go beneath the surface with courage."
  },
  {
    day: 17,
    moonName: "Sturgeon Moon",
    phase: "New Moon",
    archetype: "The Restorer",
    affirmation: "I reset and return to center."
  },
  {
    day: 18,
    moonName: "Corn Moon",
    phase: "Waxing Crescent",
    archetype: "The Planner",
    affirmation: "I map my intentions with clarity."
  },
  {
    day: 19,
    moonName: "Corn Moon",
    phase: "Waxing Crescent",
    archetype: "The Steward",
    affirmation: "I care for resources with gratitude."
  },
  {
    day: 20,
    moonName: "Harvest Moon",
    phase: "First Quarter",
    archetype: "The Balancer",
    affirmation: "I choose equilibrium over urgency."
  },
  {
    day: 21,
    moonName: "Harvest Moon",
    phase: "Waxing Gibbous",
    archetype: "The Pilgrim",
    affirmation: "I move forward with reverence and ease."
  },
  {
    day: 22,
    moonName: "Hunter's Moon",
    phase: "Waxing Gibbous",
    archetype: "The Seeker",
    affirmation: "I welcome insight from every direction."
  },
  {
    day: 23,
    moonName: "Hunter's Moon",
    phase: "Full Moon",
    archetype: "The Beacon",
    affirmation: "I shine gently for myself and others."
  },
  {
    day: 24,
    moonName: "Beaver Moon",
    phase: "Waning Gibbous",
    archetype: "The Architect",
    affirmation: "I prepare foundations that will last."
  },
  {
    day: 25,
    moonName: "Beaver Moon",
    phase: "Waning Gibbous",
    archetype: "The Healer",
    affirmation: "I offer compassion without fixing."
  },
  {
    day: 26,
    moonName: "Cold Moon",
    phase: "Last Quarter",
    archetype: "The Archivist",
    affirmation: "I gather lessons from the cycle behind me."
  },
  {
    day: 27,
    moonName: "Cold Moon",
    phase: "Waning Crescent",
    archetype: "The Dreamer",
    affirmation: "I allow possibility to soften the edges."
  },
  {
    day: 28,
    moonName: "Cold Moon",
    phase: "Waning Crescent",
    archetype: "The Threshold",
    affirmation: "I release what is complete and welcome renewal."
  }
];
