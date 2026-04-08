/** Educational content for Longest Word in Trie. */

import type { EducationalContent } from "@/types";

export const longestWordInTrieEducational: EducationalContent = {
  overview:
    "**Longest Word in Trie** finds the longest word in a set where every prefix of that word is also a valid word in the set.\n\n" +
    'For example, given `["w", "wo", "wor", "worl", "world"]`, the answer is `"world"` because each prefix — ' +
    '`"w"`, `"wo"`, `"wor"`, `"worl"` — is also present in the set.\n\n' +
    "The algorithm first builds a trie from all words, then performs a **DFS traversal** that only follows edges " +
    "whose destination node is marked as an end-of-word. This constraint ensures every step along the path " +
    "corresponds to a word in the original set.",

  howItWorks:
    "**Phase 1 — Build the Trie:**\n\n" +
    "1. Start with an empty root node.\n" +
    "2. For each word in the input, insert it character by character — create new nodes as needed.\n" +
    "3. Mark the final node of each word as `isEnd = true`.\n\n" +
    "**Phase 2 — DFS Traversal (prefix-constrained):**\n\n" +
    "1. Push the root node onto a DFS stack with an empty string accumulator.\n" +
    "2. While the stack is non-empty:\n" +
    "   - Pop the top entry `(node, wordSoFar)`.\n" +
    "   - For each child of the current node:\n" +
    "     - If the child is **not** marked `isEnd`, skip it — every prefix along the path must be a word.\n" +
    "     - Otherwise, form `nextWord = wordSoFar + char`.\n" +
    "     - If `nextWord` is longer than the current best (or same length but lexicographically smaller), update the result.\n" +
    "     - Push `(child, nextWord)` onto the stack to continue deeper.\n" +
    "3. Return the longest word found.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  R((root)) -->|w| W((w ✓))\n" +
    "  W -->|o| WO((wo ✓))\n" +
    "  WO -->|r| WOR((wor ✓))\n" +
    "  WOR -->|l| WORL((worl ✓))\n" +
    "  WORL -->|d| WORLD((world ✓))\n" +
    "  WO -->|e| WOE((woe ✗))\n" +
    "  style R fill:#06b6d4,stroke:#0891b2\n" +
    "  style W fill:#14532d,stroke:#22c55e\n" +
    "  style WO fill:#14532d,stroke:#22c55e\n" +
    "  style WOR fill:#14532d,stroke:#22c55e\n" +
    "  style WORL fill:#14532d,stroke:#22c55e\n" +
    "  style WORLD fill:#14532d,stroke:#22c55e\n" +
    "  style WOE fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "DFS follows only nodes marked `isEnd` (green), so the path `w→wo→wor→worl→world` is valid and wins. The `woe` branch (amber, not marked `isEnd`) is skipped — breaking the incremental-word constraint.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "- Trie construction: `O(n × m)` — inserting `n` words of average length `m`.\n" +
    "- DFS traversal: in the worst case every node is visited once — also `O(n × m)`.\n" +
    "- Total: `O(n × m)` where `n` is the number of words and `m` is the average word length.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The trie stores up to `n × m` nodes when there are no shared prefixes. " +
    "The DFS stack depth is at most the length of the longest word.",

  bestAndWorstCase:
    '**Best case** — words share long common prefixes (e.g., `["a", "ab", "abc"]`): ' +
    "the trie is compact and DFS visits few nodes. If the longest valid path is found early, " +
    "fewer comparisons update the result.\n\n" +
    "**Worst case** — words share no prefixes and all form valid chains: " +
    "the trie has `O(n × m)` nodes and every node is visited during DFS. " +
    "No early termination is possible since any branch could contain a longer valid word.",

  realWorldUses: [
    "**Autocomplete validation:** Ensuring suggestions build incrementally on confirmed dictionary prefixes.",
    "**Spell-check suggestions:** Finding the longest correctly-spelled extension of a partially typed word.",
    "**Domain name generation:** Discovering the longest valid compound word built from known root forms.",
    "**Word chain games:** Verifying and extending word ladders where each prefix must be a standalone word.",
    "**Natural language processing:** Segmenting text by identifying the longest valid word-by-word decomposition.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n × m) time — efficient for large word sets because the trie eliminates repeated prefix scanning.",
      "The prefix constraint is enforced structurally: skipping non-isEnd nodes is a single boolean check per edge.",
      "Easily extended to return all valid longest words (with tie-breaking) rather than just one.",
    ],
    limitations: [
      "Requires building and storing the full trie — O(n × m) memory even if the answer is short.",
      "DFS order is sensitive to child iteration order, which may affect which word is returned when lengths tie.",
      "For very large alphabets (e.g., Unicode), each node's child map grows significantly.",
    ],
  },

  whenToUseIt:
    "Use Longest Word in Trie when you need to find the **longest incrementally valid sequence** from a set of strings — " +
    "where every step along the path must itself be a member of the set. " +
    "If you only need exact-match lookup, a hash set is simpler. " +
    "If you need multiple results or prefix counting, extend the DFS to collect all qualifying paths. " +
    "Avoid this approach for very large datasets where memory is constrained — a sorted array with binary search " +
    "can solve the problem in O(n log n) time with O(1) extra space.",
};
