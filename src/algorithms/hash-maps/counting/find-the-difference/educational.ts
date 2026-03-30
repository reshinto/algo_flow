import type { EducationalContent } from "@/types";

export const findTheDifferenceEducational: EducationalContent = {
  overview:
    "Find the Difference identifies the single extra character that was added to a modified version of the original string, using a hash map frequency count.",
  howItWorks:
    "1. Build a frequency map from the original string, counting each character.\n2. Iterate through the modified string, decrementing counts.\n3. When a character's count drops below zero, that character is the extra one.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) where n is the length of the strings.\n\n**Space Complexity:** O(1) — at most 26 lowercase letters in the map.",
  bestAndWorstCase:
    "**Best Case:** The extra character is at the start of the modified string — found immediately in the second pass.\n\n**Worst Case:** The extra character is at the end — requires scanning both strings fully.",
  realWorldUses: [
    "Detecting inserted characters in text editing",
    "File diff utilities for single-character changes",
    "Data integrity checks comparing original and modified payloads",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) time with minimal space usage",
      "Works with any character set, not just lowercase letters",
      "Simple two-pass approach that is easy to understand",
    ],
    limitations: [
      "Only finds one extra character — does not handle multiple additions",
      "Assumes the modified string is exactly one character longer",
    ],
  },
  whenToUseIt:
    "Use when you need to find a single added character between two strings. For multiple differences, consider a full diff algorithm instead.",
};
