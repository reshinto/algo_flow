import type { EducationalContent } from "@/types";

export const wordBreakMemoizationEducational: EducationalContent = {
  overview:
    "**Word Break (Memoization)** determines whether a string `text` can be segmented into a sequence of words all found in a given `dictionary`, using a **top-down dynamic programming** approach.\n\n" +
    "At each position `i` in the text, the algorithm tries every dictionary word as a prefix starting at `i`. If a word matches and the remainder of the string (starting after that word) can also be broken, the answer is `true`. Memoization caches `W(i)` — whether `text[i..]` is segmentable — so each starting position is resolved exactly once, reducing an exponential brute-force recursion to `O(n × m × k)`.",

  howItWorks:
    "1. Call `canBreak(0)` recursively on the full string from index `0`.\n" +
    "2. **Base case W(n):** If `startIndex === text.length`, the entire text has been consumed — return `true`.\n" +
    "3. **Cache hit:** If `memo` already contains `W(startIndex)`, return it immediately.\n" +
    "4. **Push call frame:** Record `W(startIndex)` on the call stack for visualization.\n" +
    "5. **Try each word:** For every word in the dictionary, check if it matches `text[startIndex..startIndex+word.length]`.\n" +
    "6. **Recurse on match:** If the word matches, call `canBreak(startIndex + word.length)` — if that returns `true`, cache `true` and return.\n" +
    "7. **No match found:** If no word leads to a valid segmentation, cache `false`, pop the call frame, and return `false`.\n\n" +
    '### Call Tree for `"leetcode"` with `["leet", "code"]`\n\n' +
    "```mermaid\n" +
    "graph TD\n" +
    '    W0["W(0)"] --> W4["W(4)"]\n' +
    '    W4 --> W8["W(8) ✓ base case"]\n' +
    "    style W8 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    '`W(0)` tries `"leet"` → matches `text[0..4]`, recurses to `W(4)`. `W(4)` tries `"code"` → matches `text[4..8]`, recurses to `W(8)` which is the base case and returns `true`. Both results propagate back and are cached.',

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m × k)`**\n\n" +
    "There are at most `n + 1` unique starting positions (subproblems). For each uncached position, the algorithm iterates over `m` dictionary words and compares up to `k` characters (where `k` is the maximum word length). Each subproblem is computed once, giving `O(n × m × k)` total.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n + 1` boolean entries. The recursive call stack reaches depth `O(n)` in the worst case (e.g. a text of length `n` with single-character words).",

  bestAndWorstCase:
    "**Best case:** `O(k)` — the first dictionary word matches the entire text as a single segment, resolving with one recursive call.\n\n" +
    "**Worst case:** `O(n × m × k)` — every position must be evaluated (no early cache hits), and each position tries all `m` dictionary words. This occurs when no valid segmentation exists and all dictionary words partially match at each position.\n\n" +
    'A classic worst-case example is `text = "aaaaab"` with `dictionary = ["a", "aa", "aaa", "aaaa"]` — many overlapping prefixes are tried at every position before determining that `"b"` cannot be segmented.',

  realWorldUses: [
    "**Natural Language Processing:** Tokenizing a raw character stream (e.g. a URL or search query with no spaces) into valid dictionary words.",
    '**Search Engine Query Parsing:** Splitting a space-free query like `"newyorktimes"` into meaningful terms for ranking.',
    "**Spell Checking:** Determining if a concatenated string can be decomposed into correctly spelled words.",
    "**Compiler Lexing:** Checking whether an identifier or literal can be split according to a language's keyword vocabulary.",
    "**Algorithm Education:** A canonical example of top-down DP on strings with overlapping subproblems and variable-length branching.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Converts an exponential brute-force recursion to `O(n × m × k)` with a simple boolean cache.",
      "Only evaluates starting positions that are actually reachable — unreachable suffixes are never explored.",
      "The recursive structure mirrors the problem definition directly, making it straightforward to derive from first principles.",
    ],
    limitations: [
      "Deep recursion on long strings can hit the JavaScript call stack limit.",
      "Cache lookup adds constant overhead per call compared to tabulation's direct array indexing.",
      "String slicing for each word comparison (`text.slice(startIndex, endIndex)`) allocates a new string on each call — using `startsWith` or index-based comparison avoids allocation.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the top-down recursive structure is clearer or when not all starting positions will be visited (sparse access). Prefer **tabulation** when the full table must always be filled, call stack depth is a concern, or you want predictable sequential memory access. For very large inputs, consider an iterative BFS/queue approach that avoids recursion entirely.",
};
