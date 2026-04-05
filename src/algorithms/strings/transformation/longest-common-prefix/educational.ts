/** Educational content for Longest Common Prefix algorithm. */

import type { EducationalContent } from "@/types";

export const longestCommonPrefixEducational: EducationalContent = {
  overview:
    "**Longest Common Prefix** finds the longest string that is a prefix of every string in an input array.\n\n" +
    'A prefix is any leading substring — `"fl"` is a prefix of both `"flower"` and `"flight"`. ' +
    "The algorithm scans characters vertically (column by column across all words simultaneously) rather than comparing pairs of strings, " +
    "stopping as soon as any column produces a mismatch or any string runs out of characters.",

  howItWorks:
    "The algorithm treats the first word as the candidate prefix and scans one column at a time.\n\n" +
    "For each column index `c` starting from `0`:\n\n" +
    "1. **Read** `firstWord[c]` — the reference character for this column.\n" +
    "2. **Compare** `words[i][c]` for every other word `i`. If `words[i][c]` differs from the reference, or the word is shorter than `c+1`, stop immediately.\n" +
    "3. **Extend** the prefix length by 1 if all words matched this column.\n\n" +
    "The loop terminates either on a mismatch or after exhausting the first word's length.\n\n" +
    "```\n" +
    "  f  l  o  w  e  r\n" +
    "  f  l  o  w\n" +
    "  f  l  i  g  h  t\n" +
    "  ^  ^  ^\n" +
    "col 0: f=f=f  ✓\n" +
    "col 1: l=l=l  ✓\n" +
    'col 2: o≠i    ✗ → prefix = "fl"\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n * m)`**\n\n" +
    "Where `n` is the number of strings and `m` is the length of the shortest string. " +
    "In the worst case (all strings are identical), every character of every string is visited once.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a handful of integer indices and a single character variable are used during scanning. " +
    "The output prefix is a slice of the input — no additional buffer proportional to input size is allocated.",

  bestAndWorstCase:
    "**Best case — mismatch at column 0:** `O(n)` — the first character differs across words, so only one pass through all `n` strings is needed.\n\n" +
    "**Worst case — all strings are identical:** `O(n * m)` — every character in every string is compared before the loop terminates naturally at the end of the first word.\n\n" +
    "An empty input array or a single-element array short-circuits to `O(1)` — no character comparisons are made.",

  realWorldUses: [
    "**Autocomplete engines:** Finding the longest common prefix of all matching entries determines what can be inserted automatically into a search box without ambiguity.",
    "**File system path compression:** Tools like `git` and shell tab-completion use common prefix detection to shorten displayed paths.",
    "**Trie construction:** Longest common prefix is the foundational operation when building or querying prefix trees (tries) for dictionary lookups.",
    "**DNS resolution caching:** Routers group destination addresses by common prefix to compress routing tables (longest prefix matching).",
    "**Data deduplication:** Storage systems identify shared prefixes across sorted keys to reduce index storage in columnar databases.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) auxiliary space — no secondary buffers or data structures required.",
      "Early termination — stops at the first mismatch, often visiting far fewer characters than the theoretical worst case.",
      "Simple and predictable — a single nested loop with no recursion or backtracking.",
    ],
    limitations: [
      "Always O(n*m) in the worst case (identical strings) — no pruning possible when all strings fully agree.",
      "Operates on the first word as a reference — if the shortest word is not first, the outer loop runs longer than necessary without pre-sorting.",
      "Not Unicode-aware at the code-unit level — multi-byte graphemes (emoji, surrogate pairs) require grapheme-cluster splitting for correct results.",
    ],
  },

  whenToUseIt:
    "Use Longest Common Prefix when you need the shared leading substring of a collection of strings and want minimal memory overhead. " +
    "It is the canonical interview solution for prefix detection and the natural building block for trie-based algorithms.\n\n" +
    "Avoid it for very large string sets where sorting first and comparing only the first and last strings (`O(n log n + m)`) would be faster in practice. " +
    "Also avoid the naive implementation for Unicode text with multi-code-unit characters — use a grapheme-aware library instead.",
};
