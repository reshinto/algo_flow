import type { EducationalContent } from "@/types";

export const nRepeatedElementEducational: EducationalContent = {
  overview:
    "N-Repeated Element finds the element that appears exactly n times in an array of size 2n containing n+1 unique elements.",
  howItWorks:
    "Build a frequency map while iterating. When any element's count reaches n (half the array size), return it immediately. The guarantee of exactly one such element means early termination is always possible.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — single pass through the array.\n\n**Space Complexity:** O(n) — frequency map stores at most n+1 unique elements.",
  bestAndWorstCase:
    "**Best Case:** The repeated element clusters at the start — found in the first n elements.\n\n**Worst Case:** The repeated elements are spread throughout, requiring a full scan.",
  realWorldUses: [
    "Detecting dominant values in sensor data streams",
    "Finding the most common category in balanced datasets",
    "Quality control — identifying the repeated defect type",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Simple single-pass O(n) solution",
      "Early termination when the answer is found",
      "Works with any comparable data type",
    ],
    limitations: [
      "Requires the specific constraint of size 2n with n+1 unique elements",
      "Uses O(n) extra space for the frequency map",
    ],
  },
  whenToUseIt:
    "Use when you have a specially structured array where exactly one element repeats n times out of 2n total elements.",
};
