/** Educational content for the Suffix Array Construction algorithm. */

import type { EducationalContent } from "@/types";

export const suffixArrayConstructionEducational: EducationalContent = {
  overview:
    "A **Suffix Array** is a sorted array of all suffixes of a string, represented as their starting indices.\n\n" +
    "For the string `banana`, the suffixes are:\n\n" +
    "| Index | Suffix   |\n" +
    "| ----- | -------- |\n" +
    "| 0     | banana   |\n" +
    "| 1     | anana    |\n" +
    "| 2     | nana     |\n" +
    "| 3     | ana      |\n" +
    "| 4     | na       |\n" +
    "| 5     | a        |\n\n" +
    "When sorted lexicographically, the order becomes: `a`, `ana`, `anana`, `banana`, `na`, `nana` — " +
    "so the suffix array is `[5, 3, 1, 0, 4, 2]`.\n\n" +
    "Suffix arrays are a space-efficient alternative to suffix trees and enable fast string operations like pattern matching, " +
    "longest repeated substring detection, and more.",

  howItWorks:
    "The **naive construction** works in three steps:\n\n" +
    "**1. Generate suffix indices:**\n\n" +
    "Create an array `[0, 1, 2, ..., n-1]` where each integer `idx` represents the suffix starting at position `idx`.\n\n" +
    "**2. Sort by suffix string:**\n\n" +
    "Sort the indices using a comparator that compares the actual suffix strings:\n\n" +
    "```\n" +
    "sort(indices, (a, b) => text.slice(a) < text.slice(b) ? -1 : 1)\n" +
    "```\n\n" +
    "Each comparison takes up to `O(n)` time, and sorting performs `O(n log n)` comparisons, " +
    "giving `O(n log²n)` total for the naive approach.\n\n" +
    "**3. Return sorted indices:**\n\n" +
    "The result is the suffix array — a permutation of `[0..n-1]` where `suffixArray[rank]` is the " +
    "starting index of the `rank`-th smallest suffix.\n\n" +
    "More advanced algorithms (DC3/Skew, SA-IS) achieve `O(n)` construction time.\n\n" +
    '### Example: Suffix array of `"banana"`\n\n' +
    "```mermaid\n" +
    "graph TD\n" +
    '    SA["Suffix Array: [5,3,1,0,4,2]"]\n' +
    '    R0["rank 0: a (idx 5)"]\n' +
    '    R1["rank 1: ana (idx 3)"]\n' +
    '    R2["rank 2: anana (idx 1)"]\n' +
    '    R3["rank 3: banana (idx 0)"]\n' +
    '    R4["rank 4: na (idx 4)"]\n' +
    '    R5["rank 5: nana (idx 2)"]\n' +
    "    SA --> R0 --> R1 --> R2 --> R3 --> R4 --> R5\n" +
    "    style R0 fill:#14532d,stroke:#22c55e\n" +
    "    style R1 fill:#14532d,stroke:#22c55e\n" +
    "    style R2 fill:#14532d,stroke:#22c55e\n" +
    "    style R3 fill:#06b6d4,stroke:#0891b2\n" +
    "    style R4 fill:#f59e0b,stroke:#d97706\n" +
    "    style R5 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "All 6 suffixes are sorted lexicographically. `a`-prefixed suffixes (green) come first, `banana` (cyan) in the middle, and `na`-prefixed suffixes (amber) last.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log²n)`**\n\n" +
    "The sort performs `O(n log n)` comparisons. Each comparison of two suffixes takes up to `O(n)` time " +
    "(comparing character by character until a difference is found), giving `O(n log n × n) = O(n² log n)` " +
    "in the worst case for a naive sort. However, with a proper suffix string sort, it is `O(n log²n)` on average.\n\n" +
    "More advanced algorithms (SA-IS, DC3) achieve `O(n)` construction.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The suffix array itself stores `n` integers. The suffix strings are virtual (slices of the original), " +
    "so no additional `O(n²)` space is required.",

  bestAndWorstCase:
    "**Best case — all unique characters:** When every character is distinct, suffix comparisons " +
    "resolve quickly (often in 1–2 characters), making sort comparisons fast in practice.\n\n" +
    "**Worst case — highly repetitive strings:** Strings like `aaaaaa...` cause every suffix comparison " +
    "to scan many characters before finding a difference, pushing towards `O(n²)` comparison cost.\n\n" +
    "For pathological inputs, O(n)-time algorithms like SA-IS are preferred.",

  realWorldUses: [
    "**Full-text search:** Enables binary-search based pattern matching in `O(m log n)` time after `O(n log²n)` preprocessing — faster than brute force for repeated queries.",
    "**Bioinformatics:** Locating gene subsequences, finding repeated motifs, and aligning DNA/protein sequences across large genomes.",
    "**Data compression (BWT):** The Burrows-Wheeler Transform, used in bzip2 and DNA compression, is computed directly from the suffix array.",
    "**Plagiarism detection:** Finding shared substrings across documents using the Longest Common Extension (LCE) query built on a suffix array.",
    "**Longest Repeated Substring:** Finding the longest substring that appears at least twice in linear time using the suffix array and LCP array.",
    "**String similarity:** Computing the longest common substring between two strings by concatenating them with a separator and building a joint suffix array.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Space-efficient: uses `O(n)` integers versus the `O(n)` pointers but larger constant of a suffix tree.",
      "Cache-friendly: arrays have better memory locality than pointer-based suffix trees.",
      "Simple to implement: the naive version requires only a sort with a custom comparator.",
      "Supports many string operations via augmentation with the LCP (Longest Common Prefix) array.",
    ],
    limitations: [
      "Naive construction is `O(n log²n)` — not linear; large inputs may require SA-IS or DC3.",
      "Querying requires additional structures (LCP array, RMQ) for full-power string operations.",
      "Less intuitive than suffix trees — understanding rank and LCP relationships takes more effort.",
      "For single-query pattern matching on a string that changes, recomputing the suffix array is expensive.",
    ],
  },

  whenToUseIt:
    "Use Suffix Array Construction when you need to perform **multiple pattern matching or substring queries** on a fixed string, " +
    "and cannot afford the memory overhead of a suffix tree. It is the standard choice in competitive programming and " +
    "bioinformatics for exact string matching, longest repeated substring, and BWT-based compression.\n\n" +
    "Prefer **SA-IS or DC3** for very large strings (millions of characters) where `O(n log²n)` is too slow.\n\n" +
    "Avoid suffix arrays when the string changes frequently (use a balanced BST-based structure), " +
    "or when you only need a single substring query (use KMP or Rabin-Karp instead).",
};
