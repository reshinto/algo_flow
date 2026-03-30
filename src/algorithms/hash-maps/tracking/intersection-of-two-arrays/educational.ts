import type { EducationalContent } from "@/types";

export const intersectionOfTwoArraysEducational: EducationalContent = {
  overview:
    "Intersection of Two Arrays finds the common elements between two arrays using a hash set, returning each common element exactly once.",
  howItWorks:
    "Build a set from the first array. Iterate the second array, checking membership. When found, add to result and remove from set to avoid duplicates.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n + m) where n and m are array sizes.\n\n**Space Complexity:** O(n) for the hash set.",
  bestAndWorstCase:
    "**Best Case:** No intersection — quick membership checks return false.\n\n**Worst Case:** Complete overlap — all elements match.",
  realWorldUses: [
    "Finding common friends in social networks",
    "Database join operations",
    "Set intersection in data analysis",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time vs O(n*m) brute force",
      "Handles duplicates correctly",
      "Simple two-phase approach",
    ],
    limitations: ["Uses O(n) extra space", "Result order depends on second array order"],
  },
  whenToUseIt:
    "Use when finding unique common elements between two collections. The hash set approach is the standard O(n+m) solution.",
};
