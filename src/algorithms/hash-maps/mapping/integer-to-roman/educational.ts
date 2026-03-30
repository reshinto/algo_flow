import type { EducationalContent } from "@/types";

export const integerToRomanEducational: EducationalContent = {
  overview:
    "Integer to Roman converts a decimal number into its Roman numeral representation using a greedy algorithm with a value-symbol lookup table.",
  howItWorks:
    "The algorithm defines 13 value-symbol pairs in descending order (including subtractive forms like CM=900, CD=400). Starting from the largest value, it repeatedly subtracts the largest possible value from the remaining number and appends the corresponding symbol to the result string.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(1) — the number of Roman numeral symbols is bounded (max value 3999 requires at most 15 symbols).\n\n**Space Complexity:** O(1) — the lookup table has a fixed 13 entries.",
  bestAndWorstCase:
    "**Best Case:** Small numbers like 1 require a single lookup.\n\n**Worst Case:** Numbers like 3888 (MMMDCCCLXXXVIII) produce the longest Roman numeral string but still execute in constant time.",
  realWorldUses: [
    "Clock faces and watch displays",
    "Book chapter and section numbering",
    "Movie sequel numbering and copyright dates",
    "Formal document outlining (legal, academic)",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Simple greedy approach with O(1) time",
      "The subtractive pairs handle all special cases cleanly",
      "No recursion or complex data structures needed",
    ],
    limitations: [
      "Only handles values 1-3999 in standard Roman numerals",
      "Not a true hash map algorithm — uses an ordered lookup table",
      "Roman numeral system has no zero representation",
    ],
  },
  whenToUseIt:
    "Use when you need to convert integers to Roman numeral strings for display purposes. The greedy approach with ordered value-symbol pairs is the standard solution.",
};
