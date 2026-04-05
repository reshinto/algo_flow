/** Educational content for Aho-Corasick Search. */

import type { EducationalContent } from "@/types";

export const ahoCorasickSearchEducational: EducationalContent = {
  overview:
    "**Aho-Corasick Search** is a multi-pattern string matching algorithm that finds all occurrences of a " +
    "set of patterns in a text in a single linear pass.\n\n" +
    "It combines two ideas:\n\n" +
    "- **Trie**: all patterns are inserted into a prefix tree, giving O(m) build time where m is the total length of all patterns.\n" +
    "- **Failure links** (inspired by KMP): each trie node stores a pointer to the longest proper suffix of its string " +
    "that is also a prefix of some pattern. These links let the algorithm recover from mismatches without re-scanning the text.\n\n" +
    "The result is an automaton that scans the text exactly once, never moving backwards.",

  howItWorks:
    "**Phase 1 — Build the trie:**\n\n" +
    "1. Create an empty root node.\n" +
    "2. For each pattern, walk character by character from the root, creating new nodes when a child edge does not yet exist.\n" +
    "3. Mark the final node with the completed pattern (end-of-word marker).\n\n" +
    "**Phase 2 — Build failure links (BFS):**\n\n" +
    "1. All direct children of root get a failure link pointing back to root.\n" +
    "2. Process nodes level by level (BFS). For node `v` reached by edge character `c` from parent `p`:\n" +
    "   - Follow `p`'s failure link to find the longest proper suffix state `f` that has an outgoing edge on `c`.\n" +
    "   - Set `v`'s failure link to `f.children[c]` (or root if none exists).\n" +
    "3. Propagate output patterns: if `v`'s failure link node matches any pattern, those patterns are copied to `v` as well.\n\n" +
    "**Phase 3 — Search text:**\n\n" +
    "1. Start at root. For each text character `c`:\n" +
    "   - While the current node has no child edge `c`, follow failure links.\n" +
    "   - If a child edge `c` exists, move to that child.\n" +
    "   - Collect all output patterns at the current node (matches at this text position).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m + z)`**\n\n" +
    "- Build trie: `O(m)` — insert `m` total pattern characters.\n" +
    "- Build failure links: `O(m)` — each node is visited once in BFS.\n" +
    "- Search: `O(n + z)` — the text cursor never moves backwards; `z` extra steps emit matches.\n" +
    "- Overall: `O(n + m + z)` where `n` = text length, `m` = total pattern length, `z` = number of matches.\n\n" +
    "**Space Complexity: `O(m × k)`**\n\n" +
    "Each trie node stores up to `k` child pointers (alphabet size). With `m` total pattern characters, " +
    "the trie has at most `m + 1` nodes, giving `O(m × k)` space. Output patterns stored at each node " +
    "add at most `O(m)` extra space in total.",

  bestAndWorstCase:
    "**Best case** — no patterns appear in the text: `O(n + m)`. " +
    "The search phase does `n` steps and emits zero matches, so the `z` term vanishes.\n\n" +
    "**Worst case** — every character of the text matches the start of every pattern, and all patterns are " +
    "found at every position: `O(n + m + z)` where `z` can be as large as `n × p` (p = number of patterns). " +
    "This is unavoidable because reporting each match takes constant time per match, and there genuinely are `z` matches to report.\n\n" +
    "Compared with running `p` separate KMP searches, Aho-Corasick improves the text scan from `O(n × p)` to `O(n + z)`, " +
    "a significant win when the pattern set is large.",

  realWorldUses: [
    "**Anti-virus scanning:** Virus databases contain thousands of byte-sequence signatures; Aho-Corasick scans a file once for all of them simultaneously.",
    "**Network intrusion detection (Snort/Suricata):** Packet payloads are matched against hundreds of attack signatures in a single pass.",
    "**Search engines and grep tools:** Multi-keyword search in large corpora uses Aho-Corasick variants to avoid repeated passes.",
    "**Bioinformatics:** DNA/protein sequence databases are scanned for multiple probe sequences at once.",
    "**Spam and content filters:** Email bodies are checked for many forbidden phrases in a single linear scan.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-pass text scan regardless of how many patterns are searched — critical for large texts.",
      "Optimal worst-case time O(n + m + z); no pattern can individually slow the search.",
      "Once the automaton is built it can be reused for many texts at no extra build cost.",
    ],
    limitations: [
      "Building the automaton takes O(m) time and O(m × k) space upfront — worthwhile only when the text is long or the automaton is reused.",
      "For a single pattern, KMP or Boyer-Moore can have better constants in practice.",
      "The failure-link construction is more complex to implement correctly than naive multi-pattern search.",
    ],
  },

  whenToUseIt:
    "Use Aho-Corasick when you need to search for **multiple patterns simultaneously** in a long text — " +
    "especially when the pattern set is fixed and reused across many texts (e.g., a firewall signature database). " +
    "For a single pattern, prefer KMP. For small texts or one-off searches, a hash-set of substrings may be simpler. " +
    "Consider a compressed trie (Aho-Corasick on a DAWG) when the pattern alphabet is large and memory is constrained.",
};
