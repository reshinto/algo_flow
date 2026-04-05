/** Educational content for Valid Palindrome algorithm. */

import type { EducationalContent } from "@/types";

export const validPalindromeEducational: EducationalContent = {
  overview:
    "**Valid Palindrome** determines whether a string is a palindrome when only alphanumeric " +
    "characters are considered and case is ignored. Punctuation, spaces, and symbols are skipped entirely.\n\n" +
    'Examples: `"A man, a plan, a canal: Panama"` → `true`, `"race a car"` → `false`, `" "` → `true` (no alphanumeric chars).\n\n' +
    "This is a common interview variant that tests whether a candidate can cleanly handle filtering " +
    "while maintaining the O(1) space property of the two-pointer approach.",

  howItWorks:
    "Two pointers, `leftIndex` and `rightIndex`, start at the first and last character of the string:\n\n" +
    "1. **Skip** — advance `leftIndex` forward past any non-alphanumeric character.\n" +
    "2. **Skip** — advance `rightIndex` backward past any non-alphanumeric character.\n" +
    "3. **Compare** — check whether `text[leftIndex]` equals `text[rightIndex]` (case-insensitively).\n" +
    "4. **Mismatch** — if the characters differ, return `false` immediately.\n" +
    "5. **Match** — if the characters are equal, advance both pointers inward.\n" +
    "6. **Converge** — when `leftIndex >= rightIndex` all relevant pairs have matched; return `true`.\n\n" +
    "```\n" +
    'text:  A   " "  m  a  n  ,  " "  a  " "  p  l  a  n  ,  " "  a  " "  c  a  n  a  l  :  " "  P  a  n  a  m  a\n' +
    "       ↑                                                                                              ↑\n" +
    "       A (alphanumeric)                                                                               a (alphanumeric)\n" +
    "       A.toLower() == a.toLower()  ✓  →  advance both inward, skipping non-alphanumeric chars\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character is visited at most once by each pointer. Skipping non-alphanumeric characters does not " +
    "add additional passes — the two pointers together traverse at most `n` characters total.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two integer pointer variables are maintained regardless of input length. " +
    "No filtered copy of the string is created; the original string is read in-place.",

  bestAndWorstCase:
    "**Best case — `O(1)`:** The first pair of alphanumeric characters mismatches after a constant " +
    "number of skips, so the algorithm returns `false` almost immediately.\n\n" +
    "**Worst case — `O(n)`:** Every character is either alphanumeric and matching, or must be skipped. " +
    'The full string is traversed once — e.g., `"A man, a plan, a canal: Panama"` requires visiting every character.\n\n' +
    "Because each character is visited at most once in total across both pointers, the worst case remains linear.",

  realWorldUses: [
    "**Form validation:** Checking whether a user-entered identifier or token is palindromic while ignoring formatting characters such as dashes, spaces, or parentheses.",
    "**Search engines:** Normalizing and comparing query strings that may include punctuation before applying palindrome-based heuristics.",
    "**Bioinformatics:** Identifying palindromic nucleotide sequences in DNA while ignoring non-coding spacer characters.",
    "**Competitive programming:** A canonical preprocessing step for many string problems that require ignoring non-relevant characters.",
    "**Natural language processing:** Detecting palindromic phrases in text where punctuation and whitespace are stripped before comparison.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time and O(1) space — optimal for this problem, no auxiliary string allocation needed.",
      "Early exit on first alphanumeric mismatch keeps the average case much faster than worst case.",
      "Handles edge cases cleanly: empty strings and strings of only non-alphanumeric characters return `true`.",
      "Case-insensitive comparison is built in, making it suitable for natural-language inputs.",
    ],
    limitations: [
      "Only considers alphanumeric characters — if the definition of 'valid' changes (e.g., including spaces), the skip logic must be updated.",
      "Does not identify which specific characters caused a mismatch beyond the first pair found.",
      "For Unicode-aware alphanumeric filtering, the regex or character-class check may need extending beyond ASCII.",
    ],
  },

  whenToUseIt:
    "Use Valid Palindrome whenever you need to check palindromes in real-world text where punctuation, " +
    "spaces, and case differences should be ignored. It is the standard solution for LeetCode 125 and similar interview problems.\n\n" +
    "If you need case-sensitive or character-exact palindrome checking, use the simpler Palindrome Check instead. " +
    "If you need to find the *longest* palindromic substring rather than check the whole string, use Manacher's algorithm or expand-around-center.",
};
