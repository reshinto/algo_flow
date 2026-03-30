import type { EducationalContent } from "@/types";

export const numberOfGoodPairsEducational: EducationalContent = {
  overview:
    "Number of Good Pairs counts how many index pairs (i, j) exist where i < j and numbers[i] equals numbers[j], using a hash map to track frequencies.",
  howItWorks:
    "For each element, check how many times it has appeared before (its current count). Each previous occurrence forms a new pair with the current element. Add the current count to the total, then increment the frequency.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — single pass.\n\n**Space Complexity:** O(n) — frequency map.",
  bestAndWorstCase:
    "**Best Case:** All elements are distinct — zero pairs, still O(n) scan.\n\n**Worst Case:** All elements are the same — n*(n-1)/2 pairs.",
  realWorldUses: [
    "Counting matching event pairs in logs",
    "Finding duplicate record pairs in databases",
    "Social network mutual connection counting",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) single-pass solution",
      "Avoids O(n²) brute force",
      "Simple mathematical insight: count before incrementing",
    ],
    limitations: ["Only counts exact equality pairs", "Uses extra space for the frequency map"],
  },
  whenToUseIt:
    "Use when you need to count all pairs of equal elements efficiently. The key insight is that when an element appears for the kth time, it forms k-1 new pairs.",
};
