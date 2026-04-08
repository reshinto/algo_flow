import type { EducationalContent } from "@/types";

export const allRootToLeafPathsEducational: EducationalContent = {
  overview:
    "**All Root-to-Leaf Paths** collects every complete path from the root to any leaf node, " +
    'formatted as arrow-separated strings (e.g., `"4->2->1"`).',

  howItWorks:
    "A recursive DFS carries the current path string as it descends:\n\n" +
    "1. Append the current node's value to the path string.\n" +
    "2. At a leaf, push the completed path string into the result array.\n" +
    "3. Recurse left and right with the updated path string.\n\n" +
    "Since each recursive call creates a new string, there's no need to backtrack manually.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)):::root --> B((2)):::visited\n" +
    "  A --> C((7)):::visited\n" +
    "  B --> D((1)):::visited\n" +
    "  B --> E((3)):::visited\n" +
    "  C --> F((6)):::visited\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    'DFS visits 4 → 2 → 1 (leaf, records `"4->2->1"`), backtracks to 2 → 3 (leaf, records `"4->2->3"`), then 4 → 7 → 6 (leaf, records `"4->7->6"`). Result: three path strings.',

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n * h)`** — path string construction is `O(h)` per leaf, and there are `O(n)` nodes.\n\n" +
    "**Space Complexity: `O(L * h)`** where `L` is the number of leaf nodes.",

  bestAndWorstCase:
    "**Best case** is a single node — one path of length 1.\n\n" +
    "**Worst case** is a full binary tree — `n/2` leaves each with paths of length `O(log n)`.",

  realWorldUses: [
    "**Decision tree enumeration:** List all decision sequences from root to outcome.",
    "**File system path listing:** All paths from root directory to files.",
    "**Game walkthrough:** All possible game sequences from start to end states.",
  ],

  strengthsAndLimitations: {
    strengths: ["Returns human-readable path strings without requiring manual backtracking."],
    limitations: [
      "String concatenation at each node creates O(h) intermediate strings per path.",
      "Memory usage scales with number of leaves × path depth.",
    ],
  },

  whenToUseIt:
    "Use when you need to enumerate all root-to-leaf paths for display or validation. " +
    "For just checking whether a target sum exists on any path, `pathSum` is more efficient.",
};
