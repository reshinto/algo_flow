/**
 * Educational content for Tournament Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Tournament Sort. */
export const tournamentSortEducational: EducationalContent = {
  overview:
    "**Tournament Sort** uses a **tournament tree** (a complete binary tree used as a min-heap) " +
    "to efficiently find and extract the minimum element repeatedly.\n\n" +
    "Inspired by single-elimination sports tournaments, each comparison between two elements " +
    "produces a 'winner'. Winners advance up the tree until a single champion (the minimum) " +
    "is identified at the root. The champion is extracted, its leaf is replaced with infinity, " +
    "and the tournament is rebuilt in `O(log n)` time.",

  howItWorks:
    "Tournament Sort operates in two phases:\n\n" +
    "### Phase 1: Build Tournament Tree\n" +
    "1. Place all `n` elements as leaves in the bottom half of the tree array.\n" +
    "2. For each internal node, compare its two children and store the smaller value.\n" +
    "3. Repeat bottom-up until the root holds the overall minimum.\n\n" +
    "### Phase 2: Extract Minimum Repeatedly\n" +
    "4. The root is the global minimum — extract it as the next sorted element.\n" +
    "5. Trace the path the winner took to the root and replace that leaf with `∞`.\n" +
    "6. Rebuild internal nodes only along that path (O(log n) updates).\n" +
    "7. Repeat until all elements are extracted.\n\n" +
    "### Visualizing a Tournament Tree on [4, 2, 7, 1, 5, 3, 8, 6]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    root["Root: min=1"] --> L["min=1"]\n' +
    '    root --> R["min=3"]\n' +
    '    L --> LL["min=2"]\n' +
    '    L --> LR["min=1"]\n' +
    '    R --> RL["min=3"]\n' +
    '    R --> RR["min=6"]\n' +
    "    LL --> L4[4] & L2[2]\n" +
    "    LR --> L7[7] & L1[1]\n" +
    "    RL --> L5[5] & L3[3]\n" +
    "    RR --> L8[8] & L6[6]\n" +
    "    style L1 fill:#14532d,stroke:#22c55e\n" +
    "    style root fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "After extracting `1`, the leaf is set to `∞` and only the path from that leaf to root is updated.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n log n)` | Tree build `O(n)` + `n` extractions each `O(log n)` |\n" +
    "| Average | `O(n log n)` | Same — no input-dependent variation |\n" +
    "| Worst | `O(n log n)` | Consistent regardless of input order |\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The tournament tree stores `2n` values (leaves + internal nodes), requiring linear extra space. " +
    "The output array is also `O(n)`, giving overall `O(n)` auxiliary space.",

  bestAndWorstCase:
    "Tournament Sort has **identical complexity in all cases** — `O(n log n)`. This makes it one of the " +
    "few comparison sorts without a worst-case degradation. The tournament tree structure guarantees that " +
    "every extraction requires exactly `O(log n)` comparisons to find the winner's path and rebuild.\n\n" +
    "The initial tree construction is `O(n)` — half the leaves become internal nodes, and each internal " +
    "node requires a single comparison. So building the tree is more efficient than `n` insertions into " +
    "a heap (`O(n)` vs `O(n log n)`).",

  realWorldUses: [
    "**External sorting**: Tournament trees are used in merge-sort passes for files too large to fit in memory — maintaining `k` sorted runs and extracting the global minimum each step.",
    "**K-way merging**: Merging `k` sorted sequences efficiently uses a tournament tree to always extract the overall minimum in `O(log k)` time.",
    "**Priority queues in networking**: Scheduling packets by priority uses tournament-style selection.",
    "**Database query optimization**: Sort-merge joins use tournament trees when merging sorted partitions.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**O(n log n) all cases**: No worst-case degradation — consistent performance.",
      "**O(log n) per extraction**: After the initial build, each element removal is fast.",
      "**Excellent for external sorting**: Naturally extends to multi-way merge scenarios.",
      "**Predictable**: Deterministic behavior regardless of input distribution.",
    ],
    limitations: [
      "**O(n) extra space**: The tournament tree requires a full auxiliary array.",
      "**Not in-place**: Cannot sort without allocating additional memory.",
      "**Not stable**: The path-tracing during extraction can reorder equal elements.",
      "**Higher constant than Heap Sort**: More bookkeeping per extraction compared to a simple binary heap.",
    ],
  },

  whenToUseIt:
    "Use **Tournament Sort** when you need guaranteed `O(n log n)` performance, especially in **external " +
    "sorting** scenarios (sorting data that doesn't fit in RAM). Its tree structure maps directly to " +
    "multi-way merge, making it the algorithm of choice for:\n" +
    "- Merging `k` sorted files/streams.\n" +
    "- Streaming scenarios where a new element replaces each extracted winner.\n\n" +
    "For in-memory sorting, prefer **Heap Sort** (same complexity, less overhead) or **Tim Sort** " +
    "(better cache performance and adaptivity).",
};
