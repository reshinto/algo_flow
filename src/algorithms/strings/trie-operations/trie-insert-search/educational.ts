/** Educational content for Trie Insert and Search. */

import type { EducationalContent } from "@/types";

export const trieInsertSearchEducational: EducationalContent = {
  overview:
    "A **trie** (also called a prefix tree) is a tree data structure where each node represents a single character. " +
    "Words are stored along root-to-node paths, and a boolean flag marks nodes that complete a valid word.\n\n" +
    "**Trie Insert and Search** covers the two fundamental trie operations:\n\n" +
    "- **Insert** — walk the trie character by character, creating new nodes for characters that don't yet exist, " +
    "then mark the final node as an end-of-word.\n" +
    "- **Search** — walk the trie character by character; if any character is missing or the final node is not " +
    "marked as end-of-word, the word is not in the trie.",

  howItWorks:
    "**Insert (per word):**\n\n" +
    "1. Start at the root node.\n" +
    "2. For each character `c` in the word:\n" +
    "   - If a child edge labelled `c` exists, follow it (traverse edge).\n" +
    "   - Otherwise, create a new child node and add the edge (create node).\n" +
    "3. Mark the final node as `isEnd = true` (end-of-word marker).\n\n" +
    "**Search:**\n\n" +
    "1. Start at the root node.\n" +
    "2. For each character `c` in the search word:\n" +
    "   - If no child edge labelled `c` exists → return `false` immediately.\n" +
    "   - Otherwise, follow the edge.\n" +
    "3. After consuming all characters, return `true` only if the current node is `isEnd = true`. " +
    'This distinguishes exact words from mere prefixes (e.g., `"ap"` is a prefix of `"apple"` but not a stored word).\n\n' +
    "```mermaid\n" +
    "graph TD\n" +
    "  R((root)) -->|a| A((a))\n" +
    "  A -->|p| AP((ap))\n" +
    "  AP -->|p| APP((app))\n" +
    "  APP -->|l| APPL((appl))\n" +
    "  APPL -->|e| APPLE((apple ✓))\n" +
    "  AP -->|e| APE((ape ✓))\n" +
    "  style R fill:#06b6d4,stroke:#0891b2\n" +
    "  style APPLE fill:#14532d,stroke:#22c55e\n" +
    "  style APE fill:#14532d,stroke:#22c55e\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style AP fill:#f59e0b,stroke:#d97706\n" +
    "  style APP fill:#f59e0b,stroke:#d97706\n" +
    "  style APPL fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Inserting `apple` and `ape` shares the prefix path `a → ap` (amber). Searching for `ap` reaches the amber node but finds `isEnd = false` — returning `false` since `ap` is a prefix only, not a stored word.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m)` per operation**\n\n" +
    "- Insert: `O(m)` — at most `m` node creations or traversals for a word of length `m`.\n" +
    "- Search: `O(m)` — at most `m` edge lookups.\n" +
    "- Inserting `n` words of average length `m`: `O(n × m)` total build time.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "In the worst case (no shared prefixes), each of the `n` words of length `m` occupies `m` nodes. " +
    "With shared prefixes the actual node count can be much smaller.",

  bestAndWorstCase:
    '**Best case** — all words share a long common prefix (e.g., `["abcde", "abcdf", "abcdg"]`): ' +
    "most insert steps traverse existing nodes rather than creating new ones. " +
    "Search also terminates early on a mismatch.\n\n" +
    "**Worst case** — no shared prefixes (e.g., completely different first characters): " +
    "every character in every word requires a new node, so total space reaches `O(n × m)`. " +
    "Search is still `O(m)` regardless because it only scans the search word length.",

  realWorldUses: [
    "**Autocomplete engines:** Browsers, search bars, and IDEs suggest completions by traversing a trie prefix.",
    "**Spell checkers:** Validate whether a typed word is a known dictionary entry in O(m).",
    "**IP routing tables:** Longest-prefix matching on binary tries routes network packets efficiently.",
    "**Contact search:** Mobile apps index contact names in a trie for instant prefix filtering as the user types.",
    "**Genome databases:** DNA sequence lookup uses tries where the alphabet is {A, C, G, T}.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m) per insert and search — independent of how many words are already stored.",
      "Prefix operations are natural: finding all words with a given prefix requires only one traversal.",
      "No hash collisions — unlike hash maps, tries guarantee deterministic lookup time.",
    ],
    limitations: [
      "Memory-intensive: each node may store up to 26 (or more) child pointers even when most are null.",
      "Cache-unfriendly: pointer-chasing through sparse nodes performs worse than compact arrays in practice.",
      "Hash maps with string keys are often faster for simple exact-match lookups with a small dictionary.",
    ],
  },

  whenToUseIt:
    "Choose a trie when you need **prefix-sensitive operations** — autocomplete, prefix counting, or longest-prefix matching. " +
    "For pure exact-match lookup on a static dictionary, a hash set is simpler and typically faster. " +
    "Use a compressed trie (radix tree) when memory is tight and the dictionary has long shared prefixes.",
};
