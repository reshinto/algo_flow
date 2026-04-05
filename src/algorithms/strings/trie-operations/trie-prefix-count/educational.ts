/** Educational content for Trie Prefix Count. */

import type { EducationalContent } from "@/types";

export const triePrefixCountEducational: EducationalContent = {
  overview:
    "**Trie Prefix Count** extends the basic trie with a `prefixCount` field on every node. " +
    "Each time a word is inserted, every node along the insertion path has its count incremented by one. " +
    "After the trie is built, counting words that start with a given prefix is a simple `O(m)` lookup — " +
    "traverse the trie following the prefix characters and read `prefixCount` from the last node reached.\n\n" +
    "This technique powers real-time suggestions in search engines and autocomplete bars, " +
    "where knowing *how many* results exist for a partial query is as important as finding them.",

  howItWorks:
    "**Insert phase (per word):**\n\n" +
    "1. Start at the root node.\n" +
    "2. For each character `c` in the word:\n" +
    "   - If a child edge labelled `c` exists, follow it; increment that child's `prefixCount`.\n" +
    "   - Otherwise, create a new child node with `prefixCount = 1`.\n" +
    "3. Mark the final node as `isEnd = true`.\n\n" +
    "After inserting all words, every node stores exactly the number of inserted words that pass through it.\n\n" +
    "**Search phase (prefix lookup):**\n\n" +
    "1. Start at the root node.\n" +
    "2. For each character `c` in the prefix:\n" +
    "   - If no child edge labelled `c` exists → return `0` (no words match).\n" +
    "   - Otherwise, follow the edge.\n" +
    "3. Return `prefixCount` of the node reached after consuming all prefix characters.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- Build: `O(n × m)` — inserting `n` words of average length `m` visits at most `n × m` nodes.\n" +
    "- Prefix search: `O(m)` — follows exactly `m` edges where `m` is the prefix length.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "In the worst case (no shared prefixes), all `n × m` characters occupy distinct nodes. " +
    "With shared prefixes the actual node count is much smaller. " +
    "The `prefixCount` field adds one integer per node — negligible overhead.",

  bestAndWorstCase:
    "**Best case** — all words share a long common prefix: " +
    "the trie has very few nodes and most insert steps traverse existing ones. " +
    "The prefix search terminates quickly at a deeply shared node with a large count.\n\n" +
    "**Worst case** — no words share any prefix (e.g., `['abc', 'def', 'ghi']`): " +
    "every character in every word creates a new node, reaching `O(n × m)` total nodes. " +
    "A prefix search for a missing first character still terminates immediately in `O(1)`.",

  realWorldUses: [
    "**Search autocomplete:** Show '(42 results)' next to each suggestion by reading `prefixCount` during traversal.",
    "**Typeahead filtering:** Instantly filter a contact list or file browser by prefix, reporting match counts.",
    "**Log analytics:** Count how many log lines start with a given prefix pattern without scanning all logs.",
    "**URL routing:** Count registered routes matching a URL prefix in API gateways or routers.",
    "**Genome databases:** Count how many DNA sequences begin with a given k-mer prefix.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m) prefix count query — independent of how many words are stored in the trie.",
      "Incrementally updatable — inserting a new word simply increments counts along its path.",
      "No hash collisions and deterministic lookup time, unlike hash-map approaches.",
    ],
    limitations: [
      "Requires one extra integer per node compared to a basic trie — memory cost grows with trie size.",
      "Deletion is non-trivial: removing a word must decrement counts along the path and remove orphan nodes.",
      "For a single exact-match query, a hash set is simpler and uses less memory.",
    ],
  },

  whenToUseIt:
    "Use Trie Prefix Count when you need **fast prefix cardinality queries** — " +
    "knowing how many items start with a given prefix without enumerating them all. " +
    "If you only need existence checks, a basic trie without `prefixCount` is lighter. " +
    "If the dataset is small or static, a sorted array with binary search can achieve the same with less memory overhead.",
};
