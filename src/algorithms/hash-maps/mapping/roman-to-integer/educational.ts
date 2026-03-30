import type { EducationalContent } from "@/types";

export const romanToIntegerEducational: EducationalContent = {
  overview:
    '**Roman to Integer** converts a Roman numeral string like `"MCMXCIV"` into its integer value `1994`. The key insight is a static lookup map of seven symbols, combined with a subtraction rule: if a smaller symbol precedes a larger one (e.g., `IV` = 4), subtract it instead of adding.\n\nThe map makes each symbol lookup `O(1)`, and a single left-to-right pass handles the subtraction rule.',

  howItWorks:
    "Build a lookup map: `I→1, V→5, X→10, L→50, C→100, D→500, M→1000`. Then scan each character:\n\n" +
    "1. **Look up current value** using the map.\n" +
    "2. **Peek at the next symbol** — if the next value is greater, subtract the current value.\n" +
    "3. **Otherwise add** the current value to the running total.\n\n" +
    '### Example: `"MCMXCIV"` → 1994\n\n' +
    "```\n" +
    "char  value  next  action         total\n" +
    "M     1000   C     add            1000\n" +
    "C     100    M     subtract       900\n" +
    "M     1000   X     add            1900\n" +
    "X     10     C     subtract       1890\n" +
    "C     100    I     add            1990\n" +
    "I     1      V     subtract       1989\n" +
    "V     5      —     add            1994\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "One pass through the string of length `n`. Each character triggers one map lookup, which is `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The lookup map always holds exactly 7 entries regardless of input length.",

  bestAndWorstCase:
    '**Best case** — a single-character input like `"V"`: one lookup, one addition, constant time.\n\n' +
    '**Worst case** — the input string is as long as possible (e.g., `"MMMCCCXXXIII"`, 12 characters for 3333): all `n` characters are scanned. Time is `O(n)`, space stays `O(1)`.',

  realWorldUses: [
    "**Document processing:** Parsing page numbers or section labels in legal documents, academic papers, and book front matter that use Roman numerals.",
    "**Date parsing:** Decoding year indicators in film credits, monument inscriptions, or historical records formatted as Roman numerals.",
    "**Clock face rendering:** Converting Roman numeral dial positions to numeric time values in digital clock applications.",
    "**Symbol table lookup:** Demonstrates the core pattern of a static mapping table enabling O(1) decode of a fixed symbol set.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — the map has exactly 7 entries, independent of input size.",
      "Single-pass O(n) scan — no backtracking or look-behind required.",
      "The subtraction rule is handled elegantly with a one-symbol lookahead.",
    ],
    limitations: [
      "Assumes valid Roman numeral input — malformed strings (e.g., 'IIII') produce incorrect but non-crashing results.",
      "Limited to values 1–3999; Roman numerals beyond that require extended notation.",
      "The static map must be rebuilt on each call in implementations without a module-level constant.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you have a fixed symbol alphabet that maps to numeric values and the decode rule depends on adjacent symbols. The static lookup map + single-pass scan is the canonical approach. If you need the inverse (integer → Roman), see Integer to Roman, which uses a greedy value-pair list instead.",
};
