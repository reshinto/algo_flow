/** Educational content for Auto-Complete with Trie. */

import type { EducationalContent } from "@/types";

export const autoCompleteTrieEducational: EducationalContent = {
  overview:
    "**Auto-Complete with Trie** is a classic application of the trie (prefix tree) data structure. " +
    "Given a dictionary of words and a query prefix, the algorithm returns every word in the dictionary " +
    "that begins with that prefix.\n\n" +
    "The two-phase approach is what makes it efficient:\n\n" +
    "- **Phase 1 — Build:** Insert all dictionary words into the trie, character by character, sharing " +
    "prefix nodes across words that start the same way.\n" +
    "- **Phase 2 — Query:** Navigate to the node corresponding to the last character of the prefix, " +
    "then run a depth-first search (DFS) from that node to collect every complete word below it.",

  howItWorks:
    "**Phase 1 — Insert all words:**\n\n" +
    "1. Start at the root node.\n" +
    "2. For each character `c` in the word:\n" +
    "   - If a child edge labelled `c` exists, follow it.\n" +
    "   - Otherwise, create a new child node and edge.\n" +
    "3. Mark the final node as `isEnd = true`.\n" +
    "4. Repeat for every word in the dictionary.\n\n" +
    "**Phase 2 — Query prefix:**\n\n" +
    "1. Start at the root node.\n" +
    "2. For each character `c` in the prefix:\n" +
    "   - If no child edge labelled `c` exists → return an empty list immediately.\n" +
    "   - Otherwise, follow the edge.\n" +
    "3. After reaching the prefix end node, perform a DFS from it:\n" +
    "   - At each node: if `isEnd = true`, record the accumulated path as a suggestion.\n" +
    "   - Recurse into every child, appending its character to the current path.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m + k)`**\n\n" +
    "- `m` — length of the prefix: navigating to the prefix end node costs `O(m)` edge lookups.\n" +
    "- `k` — total characters across all matching words: the DFS visits each relevant node once.\n" +
    "- Build cost is `O(n × l)` for `n` words of average length `l` — paid once, then amortised over all queries.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "In the worst case (no shared prefixes), every character of every word needs its own node. " +
    "With shared prefixes the trie is more compact.",

  bestAndWorstCase:
    "**Best case** — the prefix matches no words, or the prefix node does not exist in the trie: " +
    "the query returns immediately after traversing `m` edges without any DFS, taking `O(m)` time.\n\n" +
    "**Worst case** — the prefix is empty or a single common character, meaning the DFS must " +
    "visit every node in the trie to collect all matching words. " +
    "If all `n` words match, the DFS cost is `O(k)` where `k` is the total length of all words.",

  realWorldUses: [
    "**Search bars:** Web browsers and search engines suggest queries as the user types by traversing a trie of popular queries.",
    "**IDE auto-complete:** Code editors index identifiers in a trie so completions appear with sub-millisecond latency.",
    "**Mobile keyboards:** Predictive text engines store vocabulary in compressed tries to return word suggestions instantly.",
    "**Contact search:** Phone apps find contacts by name prefix — trie lookup beats scanning the full contact list.",
    "**DNS resolution:** Domain-name lookups use trie-like structures to match host names to IP addresses incrementally.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Query time depends only on the prefix length and result set size — not the total dictionary size.",
      "Shared prefixes compress naturally: a million words sharing the prefix 'un' all reuse the same two nodes.",
      "Supports ranked suggestions by augmenting each end-node with a frequency or recency score.",
    ],
    limitations: [
      "Memory usage can be high when the vocabulary has many distinct prefixes (e.g., random strings).",
      "A hash map of words with a linear scan over keys can be simpler for small dictionaries.",
      "Cache performance suffers because trie traversal follows pointer chains through non-contiguous memory.",
    ],
  },

  whenToUseIt:
    "Choose auto-complete with a trie when you need **fast prefix queries** over a large, mostly static dictionary " +
    "and query latency is critical (search boxes, IDE completions, command palettes). " +
    "For a small dictionary or infrequent queries, a simple array filter is easier to maintain. " +
    "If memory is constrained, consider a **DAWG** (directed acyclic word graph) or **radix tree** " +
    "which compress suffixes as well as prefixes.",
};
