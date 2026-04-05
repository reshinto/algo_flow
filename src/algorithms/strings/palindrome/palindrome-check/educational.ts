/** Educational content for Palindrome Check algorithm. */

import type { EducationalContent } from "@/types";

export const palindromeCheckEducational: EducationalContent = {
  overview:
    "**Palindrome Check** determines whether a string reads the same forwards and backwards. " +
    'Examples include `"racecar"`, `"madam"`, and `"abba"`.\n\n' +
    "The two-pointer approach compares characters at opposite ends of the string and moves inward, " +
    "stopping as soon as a mismatch is found. A single-character string or empty string is always a palindrome " +
    "because there are no opposing pairs to compare.",

  howItWorks:
    "Two pointers, `leftIndex` and `rightIndex`, start at the first and last character of the string:\n\n" +
    "1. **Compare** — check whether `text[leftIndex]` equals `text[rightIndex]`.\n" +
    "2. **Mismatch** — if the characters differ, the string is not a palindrome; return `false` immediately.\n" +
    "3. **Match** — if the characters are equal, advance `leftIndex` forward and `rightIndex` backward.\n" +
    "4. **Converge** — when `leftIndex >= rightIndex` all pairs have matched; return `true`.\n\n" +
    "```\n" +
    "text:  r  a  c  e  c  a  r\n" +
    "       ↑                 ↑   r == r  ✓\n" +
    "          ↑           ↑      a == a  ✓\n" +
    "             ↑     ↑         c == c  ✓\n" +
    "                ↑            (converged — palindrome!)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character is visited at most once. The two pointers together traverse at most `n / 2` pairs " +
    "before either a mismatch terminates early or the pointers converge.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two integer pointer variables are maintained regardless of string length. " +
    "No auxiliary data structures or copies of the string are created.",

  bestAndWorstCase:
    "**Best case — `O(1)`:** The first pair of characters mismatches (`text[0] != text[n-1]`), " +
    "so the algorithm returns `false` after a single comparison.\n\n" +
    "**Worst case — `O(n)`:** Every pair matches (or the string is a palindrome), " +
    "requiring all `n / 2` comparisons to confirm the result.\n\n" +
    "Because characters are never re-examined, the worst case is linear regardless of the input content.",

  realWorldUses: [
    "**Input validation:** Checking whether user-supplied tokens or identifiers are palindromes as a warm-up step before more complex string processing.",
    "**DNA analysis:** Identifying palindromic sequences in genomic data, which are recognition sites for restriction enzymes.",
    "**Compiler design:** Recognizing palindromic tokens in certain grammars during lexical analysis.",
    "**Puzzle and game engines:** Validating player-entered words in word games that award bonus points for palindromes.",
    "**Data integrity:** Detecting symmetric patterns in encoded payloads where palindromic structure signals a valid frame.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time and O(1) space — optimal for this problem.",
      "Early exit on first mismatch makes the average case much faster than worst case.",
      "Trivially easy to understand and implement correctly.",
      "Works identically for any character set (Unicode, ASCII, binary).",
    ],
    limitations: [
      "Checks exact character equality — does not handle case-insensitive or alphanumeric-only variants without preprocessing.",
      "Not directly applicable to checking whether a number is a palindrome without converting it to a string first.",
      "For streaming or very large strings, a rolling-hash approach may be preferred to avoid loading the full string into memory.",
    ],
  },

  whenToUseIt:
    "Use the two-pointer palindrome check whenever you need to verify whether a finite, indexable string is a palindrome " +
    "in linear time with constant space. It is the canonical solution for this problem in interview settings and production code alike.\n\n" +
    "If you need to check whether any *substring* is a palindrome (not just the whole string), consider Manacher's algorithm " +
    "(`O(n)`) or dynamic programming (`O(n²) time, O(n²) space`) instead. " +
    "For case-insensitive or alphanumeric-only palindrome checks, normalize the string first with `.toLowerCase()` and a filter pass.",
};
