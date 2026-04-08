import type { EducationalContent } from "@/types";

export const integerToRomanEducational: EducationalContent = {
  overview:
    "Integer to Roman converts a decimal number into its Roman numeral representation using a greedy algorithm with a value-symbol lookup table.",
  howItWorks:
    "The algorithm defines 13 value-symbol pairs in descending order (including subtractive forms like CM=900, CD=400). Starting from the largest value, it repeatedly subtracts the largest possible value from the remaining number and appends the corresponding symbol to the result string.\n\n" +
    "### Example: `1994`\n\n" +
    "```\n" +
    "remaining  largest-fit  symbol  result\n" +
    "1994       1000         M       'M'\n" +
    " 994        900         CM      'MCM'\n" +
    "  94         90         XC      'MCMXC'\n" +
    "   4          4         IV      'MCMXCIV'\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["num=1994"] -->|subtract 1000| B["append \'M\' → rem=994"]\n' +
    "  B -->|subtract 900| C[\"append 'CM' → rem=94\"]\n" +
    "  C -->|subtract 90| D[\"append 'XC' → rem=4\"]\n" +
    "  D -->|subtract 4| E[\"append 'IV' → rem=0\"]\n" +
    "  E --> F[\"result: 'MCMXCIV'\"]\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The greedy pass always picks the largest symbol that fits, so each subtraction step moves the remainder as far down as possible.",
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
