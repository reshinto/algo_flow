import type { EducationalContent } from "@/types";

export const longestSubstringWithoutRepeatingEducational: EducationalContent = {
  overview:
    "Longest Substring Without Repeating Characters finds the length of the longest contiguous substring with all unique characters using a sliding window and hash map.",
  howItWorks:
    "Maintain a window [start, end] and a hash map of character → last seen index. Expand end rightward. When a duplicate is found within the window, move start past the previous occurrence. Track the maximum window size.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — each character is visited at most twice.\n\n**Space Complexity:** O(min(n, k)) where k is the alphabet size.",
  bestAndWorstCase:
    "**Best Case:** All characters are unique — window spans the entire string.\n\n**Worst Case:** All characters are the same — window never grows beyond 1.",
  realWorldUses: [
    "Password strength analysis",
    "DNA sequence unique segment detection",
    "Text editor autocomplete substring matching",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) single-pass with O(1) jumps for window start",
      "Works with any character set",
      "Elegant combination of sliding window and hash map",
    ],
    limitations: [
      "Only finds the length, not the actual substring (though easily extended)",
      "Requires extra space for the hash map",
    ],
  },
  whenToUseIt:
    "Use when finding the longest unique-character substring. The sliding window + hash map approach is the standard O(n) solution for this classic problem.",
};
