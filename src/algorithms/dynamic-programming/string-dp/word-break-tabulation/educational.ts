import type { EducationalContent } from "@/types";

export const wordBreakTabulationEducational: EducationalContent = {
  overview:
    "**Word Break (Tabulation)** determines whether a string can be segmented into one or more words that all appear in a given dictionary.\n\n" +
    "Tabulation builds the answer bottom-up: `dp[i]` stores `1` if the prefix `text[0..i-1]` can be fully decomposed into dictionary words, and `0` otherwise. " +
    "Each cell is filled by scanning every dictionary word and checking whether it ends exactly at position `i` and whether the prefix before it was itself segmentable.",

  howItWorks:
    "1. **Initialize:** allocate a table of size `n+1`. Set `W(0) = 1` — the empty prefix is trivially segmentable.\n" +
    "2. **Fill left to right** from `endIndex = 1` to `n`:\n" +
    "   - For each `word` in the dictionary:\n" +
    "     - If `endIndex ≥ word.length`, extract `segment = text[endIndex - word.length .. endIndex]`.\n" +
    "     - If `segment === word` and `W(endIndex - word.length) === 1`, set `W(endIndex) = 1`.\n" +
    "3. Return `W(n)` — `true` if the full string is segmentable, `false` otherwise.\n\n" +
    "### Table Build-Up for `'leetcode'` with `['leet', 'code']`\n\n" +
    "```\n" +
    "Position i:  0  1  2  3  4  5  6  7  8\n" +
    "Prefix:      ''  l  le lee leet leetc leetco leetcod leetcode\n" +
    "W(i):         1  0   0   0   1    0    0    0    1\n" +
    "```\n\n" +
    "- `W(0) = 1` — base case\n" +
    "- `W(4) = 1` — `'leet'` ends at 4 and `W(0) = 1`\n" +
    "- `W(8) = 1` — `'code'` ends at 8 and `W(4) = 1`\n\n" +
    "The lookback distance is variable: it equals the length of the candidate word being checked.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["W(0)=1\\n(empty)"]:::base\n' +
    '  B["W(1..3)=0\\n(no match)"]:::cached\n' +
    "  C[\"W(4)=1\\n'leet' ends here\"]:::cached\n" +
    '  D["W(5..7)=0\\n(no match)"]:::cached\n' +
    "  E[\"W(8)=1\\n'code' ends here ✓\"]:::current\n" +
    "  A --> B --> C --> D --> E\n" +
    "  classDef base fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef cached fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "`W(8)` is set because `'code'` ends at position 8 and `W(4)` — the position before `'code'` starts — is already `1`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m × k)`**\n\n" +
    "Where `n` is the text length, `m` is the number of dictionary words, and `k` is the maximum word length. " +
    "For each of the `n` positions, every `m` words is checked, and the `substring` call costs up to `O(k)` per comparison. " +
    "In practice, most substrings fail the equality check early.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table holds `n+1` integers. The dictionary is not copied — only referenced during the fill pass.",

  bestAndWorstCase:
    "**Best case:** The first dictionary word matches a prefix immediately, and all subsequent positions resolve in one check — still `O(n × m × k)` in the worst orientation.\n\n" +
    "**Worst case:** `O(n × m × k)` — every position checks every word and no match is found until the very end (or not at all). " +
    "Example: `text = 'aaaaaab'` with dictionary `['a', 'aa', 'aaa', 'aaaa']` — all prefixes check all words but the full string never segments.\n\n" +
    "Unlike Fibonacci-style DP with a fixed lookback of 1–2, Word Break has a *variable* lookback determined by word lengths, so the inner loop cost scales with the dictionary.",

  realWorldUses: [
    "**Search Autocomplete:** Determine whether a run-together query (e.g., `'javascriptreact'`) can be split into known search tokens.",
    "**Tokenization in NLP:** Segment a whitespace-free character stream into valid morphemes or vocabulary items during preprocessing.",
    "**Spell Checking:** Verify that a user-typed compound word (e.g., `'wordbreak'`) decomposes into valid dictionary entries.",
    "**URL Slug Validation:** Confirm that a slug like `/learnalgorithms` can be split into meaningful path segments before routing.",
    "**Code Minification Analysis:** Check whether a concatenated identifier can be parsed back into component keywords.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates exponential brute-force enumeration of all substring splits.",
      "Iterative — no recursion, no call-stack growth regardless of text length.",
      "The filled table reveals exactly which prefixes are segmentable, enabling reconstruction of all valid splits with a backtrack pass.",
      "Generalizes naturally to counting splits, finding the minimum number of words, or enumerating all segmentations.",
    ],
    limitations: [
      "Time cost scales with dictionary size and maximum word length — a large dictionary with long words can make the inner loop expensive.",
      "A trie over the dictionary reduces per-position work to `O(n)` prefix traversals instead of `O(m × k)` equality checks, outperforming tabulation for very large dictionaries.",
      "Only answers the yes/no segmentability question; recovering the actual word sequence requires an additional backtracking pass over the filled table.",
    ],
  },

  whenToUseIt:
    "Use this pattern when you need to **decide whether a string decomposes into valid tokens** from a fixed vocabulary and want all intermediate segmentability data (e.g., for visualization or reconstruction). " +
    "The recurrence `W(i) = 1 if ∃ word ending at i such that W(i - word.length) = 1` is the canonical variable-lookback string DP. " +
    "Choose tabulation over memoization when you want a clear left-to-right fill order with no recursion overhead. " +
    "Switch to a trie-based approach when the dictionary is large (thousands of words) and raw substring comparison becomes the bottleneck.",
};
