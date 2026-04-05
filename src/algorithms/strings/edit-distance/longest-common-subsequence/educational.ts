/** Educational content for the Longest Common Subsequence algorithm. */

import type { EducationalContent } from "@/types";

export const longestCommonSubsequenceEducational: EducationalContent = {
  overview:
    "**Longest Common Subsequence (LCS)** finds the longest sequence of characters that appears in the same relative order in both strings, though the characters do not need to be contiguous.\n\n" +
    "For example, the LCS of `ABCBDAB` and `BDCAB` is `BCAB` (or `BDAB`), giving a length of **4**.\n\n" +
    "Unlike substring matching, subsequences can skip characters — `ACE` is a subsequence of `ABCDE` because A, C, and E appear in order even though B and D are skipped.\n\n" +
    "LCS is a foundational problem in computer science with direct applications in diff tools, bioinformatics, and version control.",

  howItWorks:
    "LCS uses **dynamic programming** to fill a 2D matrix where `dp[rowIdx][colIdx]` stores the LCS length of `source[0..rowIdx-1]` and `target[0..colIdx-1]`.\n\n" +
    "**1. Initialization:**\n\n" +
    "- `dp[0][colIdx] = 0` — the LCS of an empty source with any target prefix is 0.\n" +
    "- `dp[rowIdx][0] = 0` — the LCS of any source prefix with an empty target is 0.\n\n" +
    "**2. Recurrence (for each interior cell):**\n\n" +
    "```\n" +
    "if source[rowIdx-1] == target[colIdx-1]:\n" +
    "    dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] + 1  // match: extend LCS\n" +
    "else:\n" +
    "    dp[rowIdx][colIdx] = max(\n" +
    "        dp[rowIdx-1][colIdx],    // skip source character\n" +
    "        dp[rowIdx][colIdx-1]     // skip target character\n" +
    "    )\n" +
    "```\n\n" +
    "**3. Result:** `dp[sourceLength][targetLength]` holds the final LCS length.\n\n" +
    "**4. Backtracking:** To reconstruct the actual subsequence, trace from the bottom-right cell:\n" +
    "- If characters matched, move diagonally up-left and record that character.\n" +
    "- Otherwise move toward the cell with the larger value (up or left).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "Every cell in the `(n+1) × (m+1)` matrix is computed in constant time, yielding `O(n × m)` total — where `n = source.length` and `m = target.length`.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The full DP matrix is stored. If only the LCS length is needed (not the actual subsequence), space can be reduced to `O(min(n, m))` by keeping only two rows at a time.",

  bestAndWorstCase:
    "**Best case — identical strings:** Every character on the main diagonal matches, so `dp[i][i] = i` and the LCS equals the string length. The matrix is still filled in `O(n × m)` time — no early exit exists.\n\n" +
    "**Worst case — no common characters:** Every cell is decided by a `max` of neighbours with no diagonal extension. The LCS is 0, but time is still `O(n × m)` because every cell must be evaluated.\n\n" +
    "Unlike greedy approaches, LCS always guarantees the **globally longest** common subsequence.",

  realWorldUses: [
    "**Git diff / patch files:** Computing the minimal set of additions and deletions between two versions of a file to produce human-readable diffs.",
    "**DNA sequence alignment:** Identifying conserved genetic regions by finding the longest common subsequence between two DNA or protein sequences.",
    "**Plagiarism detection:** Measuring similarity between student submissions by comparing their LCS length relative to document length.",
    "**Version control merge tools:** Detecting which lines were preserved, added, or removed when merging two branches of a file.",
    "**Speech recognition post-processing:** Aligning recognized word sequences against known transcripts to evaluate accuracy.",
    "**Data compression:** Identifying repeated structures within data streams to find opportunities for reference-based compression.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally longest common subsequence — exact result with no approximation.",
      "Works on any ordered sequence (strings, arrays, gene sequences) with any element type.",
      "The DP matrix can be back-traced to recover the actual subsequence, not just its length.",
      "Space-optimizable to O(min(n, m)) when only the length is required.",
    ],
    limitations: [
      "O(n × m) time and space — becomes impractical for very long sequences (e.g., large files or genomes).",
      "Does not account for transpositions or near-matches; every position is evaluated independently.",
      "For approximate matching at scale, heuristic methods (suffix arrays, n-gram indexing) are far faster.",
      "No early termination — the entire matrix is filled even if the LCS is known to be short.",
    ],
  },

  whenToUseIt:
    "Use LCS when you need the **exact longest common subsequence** of two short-to-medium strings and `O(n × m)` cost is acceptable. It is the right choice for file diff utilities, biological sequence comparison, or any problem where preserving order matters but contiguity does not.\n\n" +
    "Avoid it for comparing very long texts (use Myers' diff or suffix-array-based algorithms), when you need approximate matching at scale (use BK-trees or n-gram indices), or when transpositions should count as matches (consider Damerau-Levenshtein or more specialized alignment algorithms).",
};
