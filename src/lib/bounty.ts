export type BountyLevel = {
  name: string;
  minScore: number;
  baseAmount: number;
  color: string;
};

// Configurable bounty levels
export const bountyLevels: BountyLevel[] = [
  {
    name: "[P1] Critical",
    minScore: 9.0,
    baseAmount: 10000,
    color: "text-red-500"
  },
  {
    name: "[P2] High",
    minScore: 7.0,
    baseAmount: 2500,
    color: "text-orange-500"
  },
  {
    name: "[P3] Medium",
    minScore: 4.0,
    baseAmount: 1000,
    color: "text-yellow-500"
  },
  {
    name: "[P4] Low",
    minScore: 0.1,
    baseAmount: 250,
    color: "text-green-500"
  }
];

export const calculateBounty = (score: number): number => {
  const level = bountyLevels.find(level => score >= level.minScore) || bountyLevels[bountyLevels.length - 1];
  // Calculate bounty based on score within the level
  const bounty = Math.round(level.baseAmount * (score / 10));
  return bounty;
};