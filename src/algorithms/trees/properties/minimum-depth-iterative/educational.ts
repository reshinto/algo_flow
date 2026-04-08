import type { EducationalContent } from "@/types";

export const minimumDepthIterativeEducational: EducationalContent = {
  overview:
    "**Minimum Depth (Iterative)** uses BFS to find the depth at which the first leaf node appears. " +
    "Since BFS explores level by level, the very first leaf encountered is guaranteed to be at minimum depth — " +
    "enabling an early-exit optimization that the recursive version cannot exploit.",

  howItWorks:
    "1. Enqueue the root at depth 1.\n" +
    "2. Process each node from the queue:\n" +
    "   - If it is a leaf (no children), **immediately return the current depth**.\n" +
    "   - Otherwise, enqueue its children at depth + 1.\n\n" +
    "The early return makes this approach significantly faster than the recursive version when the minimum depth leaf is shallow.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::root --> B((2)):::current\n" +
    "  A --> C((3)):::visited\n" +
    "  C --> D((4)):::visited\n" +
    "  C --> E((5)):::visited\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "BFS processes level 1 (node 1), then level 2. Node 2 is a leaf — returns depth 2 immediately without visiting nodes 4 or 5. Early exit saves processing the entire right subtree.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** worst case, but often much less in practice due to early termination.\n\n" +
    "**Space Complexity: `O(w)`** where `w` is the maximum BFS queue width.",

  bestAndWorstCase:
    "**Best case** is when the root has a leaf child — returns after processing level 1, `O(1)` effectively.\n\n" +
    "**Worst case** is a degenerate right-skewed tree where the only leaf is at depth `n` — " +
    "all nodes must be visited, making it `O(n)`.",

  realWorldUses: [
    "**Short-circuit tree analysis:** When the target is to find any matching leaf as quickly as possible.",
    "**Fewest-steps planning:** BFS naturally finds the shallowest goal in unweighted trees.",
    "**Level-sensitive processing:** The BFS loop naturally groups processing by depth level.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Terminates as soon as the first leaf is found — often much faster than visiting all nodes.",
      "No recursion stack overflow risk.",
    ],
    limitations: [
      "Uses queue memory proportional to tree width.",
      "More verbose implementation than the recursive version.",
    ],
  },

  whenToUseIt:
    "Prefer the BFS iterative version whenever minimum depth must be computed on large or potentially skewed trees. " +
    "The early-exit property makes it faster in average cases.",
};
