/** Educational content for the Levenshtein Distance algorithm. */

import type { EducationalContent } from "@/types";

export const levenshteinDistanceEducational: EducationalContent = {
  overview:
    "**Levenshtein Distance** (also called *edit distance*) measures how different two strings are by counting the minimum number of single-character **insertions**, **deletions**, or **replacements** needed to transform one string into the other.\n\n" +
    "For example, transforming `kitten` into `sitting` requires 3 edits:\n\n" +
    "1. `k` → `s` (replace)\n" +
    "2. `e` → `i` (replace)\n" +
    "3. `` → `g` (insert at end)\n\n" +
    "The result is 3 — the edit distance between the two words.",

  howItWorks:
    "Levenshtein Distance uses **dynamic programming** to fill a 2D matrix where `dp[rowIdx][colIdx]` stores the edit distance between `source[0..rowIdx-1]` and `target[0..colIdx-1]`.\n\n" +
    "**1. Initialization:**\n\n" +
    "- `dp[0][colIdx] = colIdx` — turning an empty string into `target[0..colIdx-1]` requires `colIdx` insertions.\n" +
    "- `dp[rowIdx][0] = rowIdx` — turning `source[0..rowIdx-1]` into an empty string requires `rowIdx` deletions.\n\n" +
    "**2. Recurrence (for each interior cell):**\n\n" +
    "```\n" +
    "if source[rowIdx-1] == target[colIdx-1]:\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1]          // no edit needed\n" +
    "else:\n" +
    "    dp[rowIdx][colIdx] = 1 + min(\n" +
    "        dp[rowIdx-1][colIdx-1],  // replace\n" +
    "        dp[rowIdx-1][colIdx],    // delete\n" +
    "        dp[rowIdx][colIdx-1]     // insert\n" +
    "    )\n" +
    "```\n\n" +
    "**3. Result:** `dp[sourceLength][targetLength]` holds the final edit distance.\n\n" +
    "The edit path can be traced back through the matrix from the bottom-right cell to the top-left, recording which operation was chosen at each step.\n\n" +
    '### Example: Transforming `"cat"` → `"cut"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    C1["c\\n(match)"] --> A["a\\n(replace→u)"] --> T1["t\\n(match)"]\n' +
    '    C2["c"] --> U["u"] --> T2["t"]\n' +
    "    C1 -.match.- C2\n" +
    "    A -.replace.- U\n" +
    "    T1 -.match.- T2\n" +
    "    style C1 fill:#14532d,stroke:#22c55e\n" +
    "    style C2 fill:#14532d,stroke:#22c55e\n" +
    "    style T1 fill:#14532d,stroke:#22c55e\n" +
    "    style T2 fill:#14532d,stroke:#22c55e\n" +
    "    style A fill:#f59e0b,stroke:#d97706\n" +
    "    style U fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Characters `c` and `t` (green) match at no cost. Only `a` → `u` (amber) requires a replacement, giving edit distance **1**.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "Every cell in the `(n+1) × (m+1)` matrix is computed exactly once in constant time, giving `O(n × m)` total — where `n = source.length` and `m = target.length`.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The full DP matrix is stored. If only the final distance is needed (not the edit path), space can be reduced to `O(min(n, m))` by keeping only the current and previous rows.",

  bestAndWorstCase:
    "**Best case — identical strings:** When `source === target`, every cell on the diagonal resolves to zero cost and the result is 0. Time is still `O(n × m)` because every cell must be visited.\n\n" +
    "**Worst case — completely different strings:** When every character differs (e.g., `source = 'aaa'`, `target = 'bbb'`), every off-diagonal cell requires a +1 cost lookup, and the edit distance equals `max(n, m)`. Time is still `O(n × m)` — the DP structure has no early exit.\n\n" +
    "Unlike greedy or heuristic approaches, Levenshtein always guarantees the **optimal** (minimum) edit distance.",

  realWorldUses: [
    "**Spell checkers:** Suggesting corrections by ranking dictionary words closest in edit distance to the misspelled word.",
    "**DNA sequencing:** Measuring similarity between gene sequences where insertions and deletions (indels) are biologically meaningful edits.",
    "**Git diff / merge tools:** Computing minimal edit scripts to display the differences between two versions of a file.",
    "**Fuzzy search engines:** Enabling typo-tolerant queries in search bars and autocomplete systems.",
    "**Plagiarism detection:** Identifying near-duplicate documents after normalization.",
    "**OCR post-processing:** Correcting recognized text by finding the closest valid word using edit distance.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally optimal (minimum) edit distance — no heuristic approximation.",
      "Works on any alphabet — effective for strings, DNA sequences, and binary data alike.",
      "The full DP matrix can be back-traced to recover the exact sequence of edits, not just the distance.",
      "Space-optimizable to O(min(n, m)) when only the distance value is needed.",
    ],
    limitations: [
      "O(n × m) time and space — impractical for very long strings (e.g., comparing full documents).",
      "Treats all edits (insert, delete, replace) as equal-cost; does not model transpositions (Damerau-Levenshtein handles those).",
      "For large-scale fuzzy search, approximate algorithms (BK-trees, SimHash) are far more efficient.",
      "No early termination — always fills the entire matrix even when the distance exceeds a threshold.",
    ],
  },

  whenToUseIt:
    "Use Levenshtein Distance when you need the **exact minimum edit distance** between two short-to-medium strings and the `O(n × m)` cost is acceptable. It is the right choice for spell-checking word dictionaries, comparing biological sequences of a few thousand characters, or computing diff scripts between small files.\n\n" +
    "Avoid it for comparing very long strings (use Myers' diff or similar), when transpositions matter (use Damerau-Levenshtein), or when you need approximate matching at scale (use BK-trees, n-gram indexing, or locality-sensitive hashing instead).",
};
