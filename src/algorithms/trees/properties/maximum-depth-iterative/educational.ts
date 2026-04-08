import type { EducationalContent } from "@/types";

export const maximumDepthIterativeEducational: EducationalContent = {
  overview:
    "**Maximum Depth (Iterative)** computes tree height using BFS (level-order traversal). " +
    "Each time all nodes at a given level are processed, the depth counter increments. " +
    "The final depth count equals the maximum depth of the tree.",

  howItWorks:
    "The algorithm processes the tree level by level:\n\n" +
    "1. Enqueue the root.\n" +
    "2. For each level, snapshot the current queue size — that is how many nodes are at this level.\n" +
    "3. Process exactly that many nodes, enqueueing their children.\n" +
    "4. Increment depth by 1 after processing each complete level.\n\n" +
    "When the queue empties, depth holds the maximum tree depth.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((3)):::root --> B((9)):::visited\n" +
    "  A --> C((20)):::visited\n" +
    "  C --> D((15)):::current\n" +
    "  C --> E((7)):::current\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "BFS level 1: processes node 3 (depth=1). Level 2: processes nodes 9 and 20 (depth=2). Level 3: processes nodes 15 and 7 (depth=3). Queue empties — maximum depth is 3.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — every node is visited once.\n\n" +
    "**Space Complexity: `O(w)`** where `w` is the maximum width of the tree. " +
    "For a balanced tree this is `O(n/2)` at the leaf level. Better than the recursive version for skewed trees.",

  bestAndWorstCase:
    "**Best case** is a single-node tree — one level processed immediately.\n\n" +
    "**Worst case** is a wide balanced tree — the queue holds up to `n/2` nodes simultaneously at the leaf level.",

  realWorldUses: [
    "**Avoiding recursion limits:** Preferred over the recursive version in Python (default recursion limit 1000) or environments with tight stack constraints.",
    "**Parallel level processing:** BFS naturally groups nodes by level, useful when level-based operations are needed.",
    "**Memory-safe traversal:** Stack overflow is impossible since only a queue is used.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No risk of stack overflow — uses an explicit queue instead of the call stack.",
      "Naturally produces level-by-level processing, useful for multi-purpose BFS passes.",
    ],
    limitations: [
      "Uses O(w) queue memory which can be O(n) for wide balanced trees.",
      "More verbose than the elegant recursive version.",
    ],
  },

  whenToUseIt:
    "Use the iterative BFS variant in environments with recursion limits or when processing very deep trees. " +
    "If level-order metadata (level number, nodes per level) is needed alongside depth, BFS is the natural choice.",
};
