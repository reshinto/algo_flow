import type { EducationalContent } from "@/types";

export const missingNumberEducational: EducationalContent = {
  overview:
    "Missing Number finds the one number missing from the range [0, n] in an array of n distinct numbers, using a hash set for O(1) lookups.",
  howItWorks:
    "Insert all array elements into a hash set. Then check each number from 0 to n — the first number not in the set is the missing one.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — two passes.\n\n**Space Complexity:** O(n) — hash set.",
  bestAndWorstCase:
    "**Best Case:** Missing number is 0 — found immediately in the checking phase.\n\n**Worst Case:** Missing number is n — requires checking all values.",
  realWorldUses: [
    "Detecting missing sequence IDs in databases",
    "Verifying complete data transmission",
    "Finding gaps in numbered collections",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Clear two-phase approach",
      "O(n) time with hash set",
      "Easy to understand and implement",
    ],
    limitations: [
      "O(n) space — XOR or math approaches use O(1) space",
      "Only works for contiguous ranges starting at 0",
    ],
  },
  whenToUseIt:
    "Use when you need to find a missing number in a contiguous range. While XOR or sum approaches use O(1) space, the hash set approach clearly demonstrates hash-based lookup.",
};
