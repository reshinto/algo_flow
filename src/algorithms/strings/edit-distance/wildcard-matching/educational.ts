/** Educational content for the Wildcard Matching algorithm. */

import type { EducationalContent } from "@/types";

export const wildcardMatchingEducational: EducationalContent = {
  overview:
    "**Wildcard Matching** determines whether a text string fully matches a pattern that may contain two special wildcard characters:\n\n" +
    "- `?` matches **any single character**\n" +
    "- `*` matches **any sequence of characters**, including the empty sequence\n\n" +
    "For example, the pattern `*a*b` matches `adceb` because the first `*` matches nothing, `a` matches `a`, the second `*` matches `dce`, and `b` matches `b`.\n\n" +
    "The algorithm uses **dynamic programming** to decide this in `O(n × m)` time without backtracking.",

  howItWorks:
    "Wildcard Matching uses a 2D DP table where `dp[rowIdx][colIdx]` is `true` if `text[0..rowIdx-1]` fully matches `pattern[0..colIdx-1]`.\n\n" +
    "**1. Initialization:**\n\n" +
    "- `dp[0][0] = true` — empty text matches empty pattern.\n" +
    "- `dp[0][colIdx] = true` only if `pattern[0..colIdx-1]` consists entirely of `'*'` characters, because `*` can match the empty string.\n\n" +
    "**2. Recurrence (for each interior cell):**\n\n" +
    "```\n" +
    "if pattern[colIdx-1] == '*':\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx][colIdx-1]    // '*' matches empty\n" +
    "                       OR dp[rowIdx-1][colIdx]   // '*' matches one more char\n" +
    "elif pattern[colIdx-1] == '?' or pattern[colIdx-1] == text[rowIdx-1]:\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1]  // single char match\n" +
    "else:\n" +
    "    dp[rowIdx][colIdx] = false\n" +
    "```\n\n" +
    "**3. Result:** `dp[textLength][patternLength]` is `true` if the entire text matches the entire pattern.\n\n" +
    '### Example: Matching `"adceb"` against pattern `"*a*b"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    P1["*\\n(match empty)"] --> P2["a\\n(match a)"] --> P3["*\\n(match dce)"] --> P4["b\\n(match b)"]\n' +
    '    T1["(empty)"] --> T2["a"] --> T3["dce"] --> T4["b"]\n' +
    "    P1 -.matches.- T1\n" +
    "    P2 -.matches.- T2\n" +
    "    P3 -.matches.- T3\n" +
    "    P4 -.matches.- T4\n" +
    "    style P1 fill:#f59e0b,stroke:#d97706\n" +
    "    style T1 fill:#f59e0b,stroke:#d97706\n" +
    "    style P2 fill:#06b6d4,stroke:#0891b2\n" +
    "    style T2 fill:#06b6d4,stroke:#0891b2\n" +
    "    style P3 fill:#f59e0b,stroke:#d97706\n" +
    "    style T3 fill:#f59e0b,stroke:#d97706\n" +
    "    style P4 fill:#14532d,stroke:#22c55e\n" +
    "    style T4 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The first `*` (amber) matches zero characters. `a` (cyan) matches the literal `a`. The second `*` (amber) matches `dce`. `b` (green) matches the final character — `dp[5][4] = true`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "Every cell in the `(n+1) × (m+1)` matrix is filled in constant time, giving `O(n × m)` total — where `n = text.length` and `m = pattern.length`.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The full DP matrix is stored. Space can be reduced to `O(m)` by keeping only the current and previous rows, since each cell only depends on the row above and the cell to its left.",

  bestAndWorstCase:
    "**Best case — immediate mismatch:** A non-wildcard pattern character that does not match the first text character allows most cells to remain `false`. The matrix is still filled in `O(n × m)` time — there is no early termination.\n\n" +
    "**Worst case — many `*` wildcards:** Patterns like `*****` or alternating `*?*?` force the algorithm to explore the full table, since each `*` can expand in two directions. Time remains `O(n × m)` but with maximum branching at every cell.\n\n" +
    "Unlike naive recursive matching (which can be exponential), the DP formulation guarantees polynomial time in all cases.",

  realWorldUses: [
    "**File system glob patterns:** Shell wildcards like `*.ts` or `src/**/*.test.ts` use the same `?`/`*` semantics to match file paths.",
    "**Database LIKE queries:** SQL `LIKE 'J%n'` patterns are conceptually equivalent to wildcard matching with `%` acting as `*`.",
    "**Log and event filtering:** Operations tools filter log streams using wildcard patterns to isolate events of interest without full regex overhead.",
    "**URL routing:** Some routers use simplified wildcard patterns (e.g., `/api/*/data`) to dispatch requests before applying stricter regex rules.",
    "**Configuration management:** Tools like `.gitignore` and `.dockerignore` rely on glob/wildcard semantics to select or exclude files.",
    "**Network intrusion detection:** Signature-based IDS systems match packet payloads against wildcard patterns to flag suspicious traffic.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees `O(n × m)` time — no exponential blowup unlike naive recursive matching.",
      "Handles both `?` (single-char) and `*` (multi-char) wildcards with a single unified DP formulation.",
      "Space-optimizable to `O(m)` when only the boolean result is needed.",
      "Straightforward recurrence — easy to extend to additional wildcard types if needed.",
    ],
    limitations: [
      "`O(n × m)` time and space — costly for very long strings or patterns with many wildcards.",
      "Only supports `?` and `*`; full regular expression features (groups, quantifiers, alternation) require a more complex NFA/DFA approach.",
      "No partial-match output — the algorithm only reports whether the full text matches, not where wildcards aligned.",
      "The `*` wildcard always matches greedily in one interpretation; ambiguous patterns can produce surprising match boundaries.",
    ],
  },

  whenToUseIt:
    "Use Wildcard Matching when you need to test whether a string **fully** matches a `?`/`*` glob pattern and the `O(n × m)` cost is acceptable for the input sizes involved. It is the right choice for file-glob evaluation, simple template matching, and any domain where full regex power is unnecessary.\n\n" +
    "Avoid it when you need partial matching (use KMP or Rabin-Karp), when patterns involve complex repetitions or groups (use a full regex engine), or when strings are very long and you need sub-quadratic performance (use NFA simulation with memoization or SIMD-accelerated matching).",
};
