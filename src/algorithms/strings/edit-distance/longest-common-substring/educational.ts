/** Educational content for the Longest Common Substring algorithm. */

import type { EducationalContent } from "@/types";

export const longestCommonSubstringEducational: EducationalContent = {
  overview:
    "**Longest Common Substring** finds the longest contiguous sequence of characters that appears in both a source string and a target string.\n\n" +
    "Unlike the *Longest Common Subsequence* (LCS), the characters must be adjacent — they cannot skip positions. For example, the longest common substring of `ABABC` and `BABCBA` is `BABC`, which has length **4**.\n\n" +
    "The algorithm uses dynamic programming to efficiently check every possible alignment of the two strings in a single pass.",

  howItWorks:
    "Longest Common Substring uses a 2D DP matrix where `dp[rowIdx][colIdx]` stores the length of the longest common substring ending **exactly** at `source[rowIdx-1]` and `target[colIdx-1]`.\n\n" +
    "**Recurrence:**\n\n" +
    "```\n" +
    "if source[rowIdx-1] == target[colIdx-1]:\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] + 1   // extend the match\n" +
    "else:\n" +
    "    dp[rowIdx][colIdx] = 0                             // reset — no match here\n" +
    "```\n\n" +
    "**Key insight:** When characters differ the cell resets to 0, because a common substring must be contiguous. This is the critical difference from LCS, where mismatches carry forward the best prior value.\n\n" +
    "**Base cases:** Row 0 and column 0 are initialized to 0, representing an empty source or target.\n\n" +
    "**Result:** The answer is the maximum value ever written into the matrix, tracked as the cells are filled.\n\n" +
    '### Example: Longest common substring of `"ABABC"` and `"BABCBA"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A1["A"] --> B1["B"] --> A2["A"] --> B2["B"] --> C1["C"]\n' +
    '    B3["B"] --> A3["A"] --> B4["B"] --> C2["C"] --> B5["B"] --> A4["A"]\n' +
    "    B1 -.extend.- B3\n" +
    "    A2 -.extend.- A3\n" +
    "    B2 -.extend.- B4\n" +
    "    C1 -.extend.- C2\n" +
    "    style B1 fill:#14532d,stroke:#22c55e\n" +
    "    style A2 fill:#14532d,stroke:#22c55e\n" +
    "    style B2 fill:#14532d,stroke:#22c55e\n" +
    "    style C1 fill:#14532d,stroke:#22c55e\n" +
    "    style B3 fill:#14532d,stroke:#22c55e\n" +
    "    style A3 fill:#14532d,stroke:#22c55e\n" +
    "    style B4 fill:#14532d,stroke:#22c55e\n" +
    "    style C2 fill:#14532d,stroke:#22c55e\n" +
    "    style A1 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The diagonal run `BABC` (green) extends four cells before the strings diverge. `A` at the start of `ABABC` (amber) has no partner at the same position, so that diagonal resets to 0.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "Every cell in the `(n+1) × (m+1)` matrix is computed exactly once in `O(1)` time, giving `O(n × m)` total — where `n = source.length` and `m = target.length`.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The full DP matrix is stored. If only the length is needed (not the substring itself), space can be reduced to `O(min(n, m))` by keeping only the current and previous rows, since each cell depends only on the diagonal predecessor.",

  bestAndWorstCase:
    "**Best case — no common characters:** When source and target share no characters at all, every cell in the matrix is 0. The algorithm still runs in `O(n × m)` because every cell must be visited, but the result is 0.\n\n" +
    "**Typical case:** Partial overlap produces a sparse pattern of non-zero diagonals. The algorithm correctly isolates the longest contiguous run.\n\n" +
    "**Worst case — identical strings:** When `source === target`, the longest diagonal of the matrix equals the full string length. The result equals `n`, but the time cost is still `O(n²)` because all cells are visited.\n\n" +
    "Unlike Levenshtein Distance, there is no concept of a 'best' input for performance — the matrix must always be fully evaluated.",

  realWorldUses: [
    "**Plagiarism detection:** Identifying verbatim copied passages between documents after tokenization.",
    "**Bioinformatics:** Finding conserved regions (motifs) in DNA or protein sequences where exact alignment matters.",
    "**Version control diff tools:** Locating the longest unchanged code block between two file revisions.",
    "**Data deduplication:** Discovering repeated byte sequences in file systems and compression codecs.",
    "**Search engine query matching:** Highlighting the longest exact phrase match within a document snippet.",
    "**Intrusion detection:** Comparing network packet payloads against known attack signatures for exact-match detection.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally optimal (longest) contiguous match — no heuristic approximation.",
      "Simple recurrence: cells either extend a diagonal run by 1 or reset to 0.",
      "The full DP matrix can be inspected to find all common substrings, not just the longest.",
      "Space-reducible to O(min(n, m)) when only the length is required.",
    ],
    limitations: [
      "O(n × m) time and space — impractical for comparing large documents or binary files directly.",
      "Finds only one longest common substring; ties require additional bookkeeping to enumerate.",
      "Sensitive to minor formatting differences — a single extra space breaks an otherwise matching run.",
      "No early termination — the full matrix must be computed even if a long match is found early.",
    ],
  },

  whenToUseIt:
    "Use Longest Common Substring when you need the **exact longest contiguous match** between two short-to-medium strings and `O(n × m)` cost is acceptable. It is the right choice for plagiarism checks on paragraphs, motif finding in gene sequences, or exact-phrase highlighting in search results.\n\n" +
    "Prefer **Longest Common Subsequence** (LCS) when the characters do not need to be contiguous — for example, in diff algorithms that track structural edits across non-adjacent lines. For very long strings or large-scale approximate matching, use suffix arrays (O(n log n) construction) or rolling-hash approaches (Rabin-Karp) instead.",
};
