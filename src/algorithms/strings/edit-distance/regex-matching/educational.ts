/** Educational content for the Regular Expression Matching algorithm. */

import type { EducationalContent } from "@/types";

export const regexMatchingEducational: EducationalContent = {
  overview:
    "**Regular Expression Matching** determines whether a text string fully matches a pattern that may contain two special metacharacters:\n\n" +
    "- `.` matches **any single character**\n" +
    "- `*` matches **zero or more of the immediately preceding element**\n\n" +
    "For example, the pattern `c*a*b` matches `aab` because `c*` matches zero `c`s, `a*` matches two `a`s, and `b` matches `b`.\n\n" +
    "The algorithm uses **dynamic programming** to decide this in `O(n × m)` time without backtracking.",

  howItWorks:
    "Regular Expression Matching uses a 2D DP table where `dp[rowIdx][colIdx]` is `true` if `text[0..rowIdx-1]` fully matches `pattern[0..colIdx-1]`.\n\n" +
    "**1. Initialization:**\n\n" +
    "- `dp[0][0] = true` — empty text matches empty pattern.\n" +
    "- `dp[0][colIdx] = dp[0][colIdx-2]` if `pattern[colIdx-1] == '*'` — a `*` pair can match zero characters, effectively eliminating the two-character sequence from the pattern.\n\n" +
    "**2. Recurrence (for each interior cell):**\n\n" +
    "```\n" +
    "if pattern[colIdx-1] == '*':\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx][colIdx-2]           // zero occurrences\n" +
    "                       OR (match(rowIdx, colIdx-1)\n" +
    "                           AND dp[rowIdx-1][colIdx])    // one more occurrence\n" +
    "elif pattern[colIdx-1] == '.' or pattern[colIdx-1] == text[rowIdx-1]:\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1]         // single char match\n" +
    "else:\n" +
    "    dp[rowIdx][colIdx] = false\n" +
    "```\n\n" +
    "Where `match(rowIdx, colIdx-1)` checks if the preceding pattern character (the one before `*`) matches `text[rowIdx-1]` — either as a `.` wildcard or an exact character.\n\n" +
    "**3. Result:** `dp[textLength][patternLength]` is `true` if the entire text matches the entire pattern.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "Every cell in the `(n+1) × (m+1)` matrix is filled in constant time, giving `O(n × m)` total — where `n = text.length` and `m = pattern.length`.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The full DP matrix is stored. Space can be reduced to `O(m)` by keeping only the current and previous rows, since each cell depends only on the row above and two columns to the left.",

  bestAndWorstCase:
    "**Best case — immediate mismatch:** A literal pattern character that does not match the first text character causes most cells to remain `false`. The full matrix is still evaluated in `O(n × m)` time — there is no early exit.\n\n" +
    "**Worst case — many `.*` sequences:** Patterns like `.*.*.*` force exploration of many transitions because each `.*` pair can consume an arbitrary number of characters. Time remains `O(n × m)` but every cell requires checking multiple predecessor cells.\n\n" +
    "Unlike naive recursive matching (which can be exponential due to repeated subproblem recomputation), the DP formulation memoizes every subproblem and guarantees polynomial time.",

  realWorldUses: [
    "**Compiler lexers:** Tokenizers use regex engines built on NFA/DFA theory — the DP approach is a direct implementation of the underlying matching logic.",
    "**Search and grep tools:** Tools like `grep`, `sed`, and text editors apply regex matching to filter and transform text streams.",
    "**Input validation:** Web forms validate email addresses, phone numbers, and date formats using regex patterns.",
    "**Log parsing:** Structured log analysis tools extract fields from log lines by matching against patterns with wildcards.",
    "**Database query optimizers:** Some databases use regex-aware pattern matching (e.g., PostgreSQL `~` operator) for flexible text search.",
    "**Bioinformatics:** DNA motif search uses regex-like patterns (with IUPAC codes) to locate binding sites in gene sequences.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees `O(n × m)` time — eliminates the exponential blowup of naive recursive backtracking.",
      "Handles both `.` (single-char) and `*` (zero-or-more) metacharacters with a single unified DP formulation.",
      "Correct for all inputs, including edge cases like empty text, empty pattern, and patterns starting with `*`.",
      "Space-optimizable to `O(m)` when only the boolean result is needed.",
    ],
    limitations: [
      "`O(n × m)` time and space — costly for very long strings or patterns with many metacharacters.",
      "Supports only `.` and `*`; full PCRE features (groups, alternation, lookaheads, backreferences) require NFA simulation.",
      "No partial-match output — reports only whether the full text matches, not where subpatterns aligned.",
      "The `*` operator in this algorithm applies only to the single preceding character, not to groups (for group quantifiers use NFA construction).",
    ],
  },

  whenToUseIt:
    "Use Regular Expression Matching when you need to test whether a string **fully** matches a `.`/`*` pattern and the `O(n × m)` cost is acceptable for your input sizes. It is the right choice for interview-style regex problems, small-scale pattern validation, and learning how regex engines work internally.\n\n" +
    "Avoid it when you need partial matching (use KMP or Rabin-Karp), when patterns require grouping or alternation (use a full NFA-based engine), or when strings are very long and you need sub-quadratic performance (use SIMD-accelerated matching or pre-compiled DFAs).",
};
