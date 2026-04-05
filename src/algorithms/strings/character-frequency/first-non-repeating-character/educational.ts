/** Educational content for First Non-Repeating Character — all 7 required sections. */

import type { EducationalContent } from "@/types";

export const firstNonRepeatingCharacterEducational: EducationalContent = {
  overview:
    "**First Non-Repeating Character** finds the first character in a string that appears exactly once — returning its index, or `-1` if every character repeats.\n\n" +
    'For example, in `"leetcode"` the character `\'l\'` at index `0` appears only once, so the answer is `0`. In `"aabb"` every character repeats, so the answer is `-1`.\n\n' +
    "The algorithm uses a **frequency map** to count occurrences in a first pass, then scans left-to-right in a second pass to find the first entry whose count is exactly `1`.",

  howItWorks:
    "The algorithm runs in two passes:\n\n" +
    "**Pass 1 — Build frequency map** (O(n)):\n\n" +
    "Iterate over every character in the string. For each character, increment its count in the map:\n\n" +
    '```\ntext = "leetcode"\nmap = { l:1, e:3, t:1, c:1, o:1, d:1 }\n```\n\n' +
    "**Pass 2 — Scan for first unique** (O(n)):\n\n" +
    "Iterate over the string again from left to right. For each character, check its count in the map. Return the index of the first character whose count equals `1`:\n\n" +
    "```\nindex 0: 'l' → count 1 → return 0\n```\n\n" +
    "If no character has count `1` after the full scan, return `-1`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Both passes iterate over a string of length `n` exactly once. Each map lookup and update is `O(1)` for a bounded alphabet.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The frequency map holds at most one entry per unique character. For lowercase English letters that is at most 26 entries — constant space regardless of input length.",

  bestAndWorstCase:
    '**Best case** — `O(n)`: the first character of the string is non-repeating (e.g., `"leetcode"`). Pass 1 still completes the full build, but pass 2 exits at index `0`.\n\n' +
    '**Worst case** — `O(n)`: either the non-repeating character is at the very end, or no such character exists at all (e.g., `"aabb"`). Both passes run to completion without early exit.\n\n' +
    "In practice the algorithm is always linear — there is no quadratic case.",

  realWorldUses: [
    "**Stream processing:** Finding the first unique event identifier in a log stream (e.g., a telemetry pipeline detecting rare error codes).",
    "**Text editors:** Highlighting the first character that breaks a palindrome or repeating pattern.",
    "**Data deduplication:** Quickly identifying the first unique token in a tokenized document stream.",
    "**Competitive programming:** Foundational building block for harder frequency-map problems involving uniqueness constraints.",
    "**Game development:** Detecting the first non-duplicate tile or move in a match-3 or word-game board state.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — two linear passes with no nested iteration.",
      "O(1) space for bounded alphabets — the frequency map never grows beyond the alphabet size.",
      "Simple, readable two-pass structure that is easy to verify for correctness.",
    ],
    limitations: [
      "Does not short-circuit during pass 1 — the full frequency map must be built before any index can be returned.",
      "Treats characters as case-sensitive by default — `'A'` and `'a'` are counted separately unless normalized first.",
      "Returns only the first non-repeating character; finding all non-repeating characters in order requires a different return type.",
    ],
  },

  whenToUseIt:
    "Use First Non-Repeating Character when you need to identify the leftmost unique element in a linear sequence with a bounded value domain. It is the canonical `O(n)` solution and should be preferred over `O(n²)` naïve comparison approaches.\n\n" +
    "If you need to handle an unbounded or very large alphabet (full Unicode), the space complexity becomes `O(k)` where `k` is the number of distinct characters — still linear but worth noting for memory-constrained environments.",
};
