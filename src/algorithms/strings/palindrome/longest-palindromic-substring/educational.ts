/** Educational content for Longest Palindromic Substring algorithm. */

import type { EducationalContent } from "@/types";

export const longestPalindromicSubstringEducational: EducationalContent = {
  overview:
    "**Longest Palindromic Substring** finds the longest contiguous portion of a string that reads " +
    'the same forwards and backwards. For example, in `"babad"` the answer is `"bab"` (or `"aba"`), ' +
    'and in `"cbbd"` the answer is `"bb"`.\n\n' +
    "The **Expand Around Center** technique treats each character (and each gap between adjacent characters) " +
    "as a potential palindrome center, then stretches outward as long as both sides continue to match. " +
    "This avoids any auxiliary storage and runs in O(n²) time with O(1) extra space.",

  howItWorks:
    "For a string of length `n` there are `2n − 1` possible centers: `n` single-character centers " +
    "(odd-length palindromes) and `n − 1` gap centers (even-length palindromes).\n\n" +
    "**For each center:**\n" +
    "1. **Expand** — move left and right pointers outward one step at a time.\n" +
    "2. **Compare** — check whether `text[left] === text[right]`.\n" +
    "3. **Match** — if equal, continue expanding.\n" +
    "4. **Mismatch / boundary** — stop when characters differ or a pointer reaches the edge.\n" +
    "5. **Update longest** — if the current palindrome is longer than the recorded best, save its start and length.\n\n" +
    "```\n" +
    "text:  b  a  b  a  d\n" +
    "            ↑         center = 'b' (index 2)\n" +
    "         ↑     ↑      a == a  ✓  radius = 1\n" +
    "      ↑           ↑   b != d  ✗  stop\n" +
    '  → palindrome: "bab" (length 3)\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Each of the `2n − 1` centers can expand at most `n / 2` steps, giving `O(n)` work per center and " +
    "`O(n²)` overall. In the best case (all unique characters) every center stops after one comparison — " +
    "making the actual runtime closer to `O(n)` on random inputs.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a handful of integer variables are maintained (center index, radius, best start and length). " +
    "No auxiliary arrays, DP tables, or recursive call stacks are needed.",

  bestAndWorstCase:
    '**Best case — `O(n)`:** The string has all unique characters (e.g., `"abcde"`). ' +
    "Every center expands zero times because the immediate neighbors never match, so the loop " +
    "does a single comparison per center.\n\n" +
    '**Worst case — `O(n²)`:** The string consists of a single repeated character (e.g., `"aaaa"`). ' +
    "The center at index `k` expands `min(k, n − 1 − k)` times, and summing across all centers gives " +
    "a quadratic total. Manacher's algorithm solves this in `O(n)`, but requires `O(n)` extra space.",

  realWorldUses: [
    "**Bioinformatics:** Finding palindromic sequences in DNA strands, which are cut by restriction enzymes used in molecular cloning and gene editing.",
    '**Text editors:** Powering "select palindromic word" features and regex-based palindrome matchers in IDE plugins.',
    "**Natural language processing:** Identifying symmetric patterns in tokenized text for language model pre-processing steps.",
    "**Cryptography:** Analyzing symmetric structures in hash outputs or encoded strings as part of collision-resistance research.",
    "**Competitive programming:** Serves as a building block for harder problems such as palindrome partitioning and minimum cuts.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space — nothing beyond a few integer variables is allocated.",
      "Simple to implement correctly with no tricky edge cases beyond even/odd center handling.",
      "Early-stop per center keeps average-case runtime well below the worst-case bound.",
      "Handles all Unicode characters without any special casing.",
    ],
    limitations: [
      "O(n²) worst-case time — Manacher's algorithm achieves O(n) but is significantly more complex.",
      "Returns only one longest palindrome; if multiple exist with the same length, the first found is returned.",
      "Not suitable for streaming or very long strings where O(n²) is too slow — use Manacher's or suffix arrays instead.",
    ],
  },

  whenToUseIt:
    "Use Expand Around Center when you need the longest palindromic substring and `O(n²)` time is " +
    "acceptable (strings up to ~10 000 characters are typically fast enough). It is the standard " +
    "interview answer due to its simplicity and optimal space usage.\n\n" +
    "Switch to **Manacher's algorithm** when the input can be very large and you need guaranteed `O(n)` " +
    "time, at the cost of a more complex implementation. " +
    'Use **dynamic programming** if you also need to answer range queries ("is substring `[i, j]` a ' +
    'palindrome?") at the expense of `O(n²)` space.',
};
