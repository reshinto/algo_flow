/** Educational content for the Longest Repeated Substring algorithm. */

import type { EducationalContent } from "@/types";

export const longestRepeatedSubstringEducational: EducationalContent = {
  overview:
    "**Longest Repeated Substring** finds the longest substring that appears at least **twice** (non-overlapping by position) in a given string.\n\n" +
    "For example, in `banana` the answer is `ana` — it appears starting at index 1 and again at index 3.\n\n" +
    "This is solved by comparing the string with itself using a DP table, similar to Longest Common Substring, but with the twist that trivial self-matches along the diagonal are excluded.",

  howItWorks:
    "The algorithm builds a 2D DP matrix of size `(n+1) × (n+1)` where both source and target are the same string `text`.\n\n" +
    "`dp[rowIdx][colIdx]` stores the length of the longest common suffix of `text[0..rowIdx-1]` and `text[0..colIdx-1]`.\n\n" +
    "**Key constraint:** The diagonal (`rowIdx === colIdx`) is skipped entirely. Without this, every position would trivially match itself, always returning the whole string.\n\n" +
    "**Recurrence:**\n\n" +
    "```\n" +
    "if rowIdx == colIdx:\n" +
    "    skip (diagonal — self-match)\n" +
    "elif text[rowIdx-1] == text[colIdx-1]:\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] + 1\n" +
    "else:\n" +
    "    dp[rowIdx][colIdx] = 0\n" +
    "```\n\n" +
    "**Result:** Track the maximum value seen in the matrix and the row index where it occurs. The repeated substring is `text[longestEndIndex - longestLength .. longestEndIndex]`.\n\n" +
    '### Example: Finding the longest repeated substring in `"banana"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    B["b\\n(idx 0)"] --> A1["a\\n(idx 1)"] --> N1["n\\n(idx 2)"] --> A2["a\\n(idx 3)"] --> N2["n\\n(idx 4)"] --> A3["a\\n(idx 5)"]\n' +
    "    A1 -.repeated.- A2\n" +
    "    N1 -.repeated.- N2\n" +
    "    A2 -.repeated.- A3\n" +
    "    style A1 fill:#06b6d4,stroke:#0891b2\n" +
    "    style N1 fill:#14532d,stroke:#22c55e\n" +
    "    style A2 fill:#14532d,stroke:#22c55e\n" +
    "    style N2 fill:#14532d,stroke:#22c55e\n" +
    "    style A3 fill:#14532d,stroke:#22c55e\n" +
    "    style B fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The substring `ana` (green) appears at index 1 and again at index 3 — the DP diagonal records a run of 3, making it the longest repeated substring. `b` (amber) has no off-diagonal match.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "The algorithm fills an `(n+1) × (n+1)` matrix. Each of the `n²` cells is computed in constant time, yielding `O(n²)` total.\n\n" +
    "**Space Complexity: `O(n²)`**\n\n" +
    "The full DP matrix is stored. If only the length (not the actual substring) is needed, space can be reduced to `O(n)` by keeping only two rows at a time.",

  bestAndWorstCase:
    "**Best case — no repeated characters:** When every character in the string is unique (e.g., `abcde`), no off-diagonal cell ever becomes positive. The algorithm still fills the entire matrix in `O(n²)` time, returning an empty string.\n\n" +
    "**Worst case — all identical characters:** When all characters are the same (e.g., `aaaa`), almost every off-diagonal cell has a positive value and the repeated substring approaches half the string in length. Time is still `O(n²)` with maximum cell-update work.\n\n" +
    "Unlike greedy or suffix-array approaches, the DP method always produces the correct answer but does not offer early termination.",

  realWorldUses: [
    "**Genome analysis:** Identifying repeated DNA motifs or tandem repeats within a genomic sequence.",
    "**Plagiarism detection:** Finding the longest passage copied verbatim within a document.",
    "**Data compression:** Detecting repeated patterns to inform dictionary-based compression schemes.",
    "**Log analysis:** Spotting repeated error messages or patterns within application logs.",
    "**String deduplication:** Identifying the longest recurring segment to split or encode more efficiently.",
    "**Bioinformatics:** Discovering repeated regulatory regions or coding sequences in protein strings.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees finding the globally longest repeated substring — no approximation.",
      "Works on any alphabet without modification.",
      "The DP table naturally avoids trivial self-overlaps via diagonal exclusion.",
      "Space can be reduced to O(n) when only the length is required.",
    ],
    limitations: [
      "O(n²) time and space — becomes slow for very long strings (tens of thousands of characters).",
      "The simple diagonal-skip only prevents exact self-overlap at identical indices; adjacent overlaps are still allowed.",
      "For very large inputs, suffix arrays with LCP tables solve this in O(n log n) time.",
      "No early exit — the full matrix is always computed even when the answer is obvious.",
    ],
  },

  whenToUseIt:
    "Use Longest Repeated Substring when you need to find the **exact** longest repeated pattern in a short-to-medium string (up to a few thousand characters) and the `O(n²)` cost is acceptable.\n\n" +
    "It is a natural fit for genome fragment analysis, plagiarism detection on small documents, or educational demonstrations of 2D DP problems.\n\n" +
    "For very long strings, prefer **suffix arrays with LCP (Longest Common Prefix) arrays**, which solve the same problem in `O(n log n)` time and `O(n)` space.",
};
