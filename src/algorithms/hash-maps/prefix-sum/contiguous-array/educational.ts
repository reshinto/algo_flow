import type { EducationalContent } from "@/types";

export const contiguousArrayEducational: EducationalContent = {
  overview:
    "Contiguous Array finds the longest subarray with an equal number of 0s and 1s by converting the problem into a prefix sum lookup using a hash map.",
  howItWorks:
    "Convert 0s to -1. Maintain a running sum. If the same running sum appears at two different indices, the subarray between them has equal 0s and 1s. Store the first occurrence of each sum in a hash map, and track the maximum length found.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — single pass.\n\n**Space Complexity:** O(n) — prefix sum map.",
  bestAndWorstCase:
    "**Best Case:** The entire array is balanced — found when sum returns to 0.\n\n**Worst Case:** All elements are the same — no balanced subarray exists.",
  realWorldUses: [
    "Balanced signal analysis in digital communications",
    "Finding equal distribution windows in binary data streams",
    "Load balancing period detection",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Elegant reduction to prefix sum problem",
      "O(n) time using hash map",
      "Handles edge cases naturally with the (0, -1) seed",
    ],
    limitations: ["Only works for binary arrays (0s and 1s)", "Requires O(n) extra space"],
  },
  whenToUseIt:
    "Use when finding the longest balanced binary subarray. The prefix sum + hash map technique is the standard O(n) approach.",
};
