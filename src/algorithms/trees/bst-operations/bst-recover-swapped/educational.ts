import type { EducationalContent } from "@/types";

export const bstRecoverSwappedEducational: EducationalContent = {
  overview:
    "**BST Recover Swapped Nodes** fixes a BST where exactly two nodes have been accidentally swapped, violating the BST property.\n\nAn in-order traversal of a valid BST produces strictly ascending values. Two swapped nodes create one or two positions where the sequence dips — the algorithm detects these violations and swaps the node values back.",

  howItWorks:
    "Perform a recursive in-order traversal tracking `previousNode`:\n1. At each node, check if `previousNode.value > currentNode.value` (descending — a violation).\n2. The **first violation**: `previousNode` is the first swapped node.\n3. The **second violation** (may be adjacent): `currentNode` is the second swapped node.\n4. After traversal, swap the values of the two detected nodes.\n\n**Two cases:**\n- **Adjacent swap** (e.g., swap nodes 2 and 3 in `[1,2,3,4,5]`): Only one violation found. `firstViolation = 2`, `secondViolation = 3`.\n- **Non-adjacent swap** (e.g., swap 1 and 5): Two violations. `firstViolation` set at first dip, `secondViolation` updated at second dip.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((3)) --> B((10))\n" +
    "  A --> C((5))\n" +
    "  B --> D((2))\n" +
    "  B --> E((4))\n" +
    "  C --> F((null))\n" +
    "  C --> G((7))\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Corrupted BST: nodes 3 and 10 were swapped. In-order yields [2, 10↓, 3↓, 4, 5, 7] — two violations detected (10>3 and 3 after expected 4). Swap 10 and 3 back to restore [2, 3, 4, 5, 7, 10].",

  timeAndSpaceComplexity:
    "**Time: `O(n)`** — full in-order traversal needed.\n\n**Space: `O(h)`** — recursion stack.",

  bestAndWorstCase:
    "**Best case:** Swapped nodes are adjacent in in-order — one violation, early detection possible.\n\n**Worst case:** Swapped nodes are at opposite ends (first and last) — full traversal needed.",

  realWorldUses: [
    "**Database tree repair:** Recover a corrupted BST index after a bad write or bit-flip.",
    "**Serialization/deserialization bugs:** Detect and fix transposition errors in serialized BSTs.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-pass O(n) solution — no extra memory for paths or lookups.",
      "Handles both adjacent and non-adjacent swap cases correctly.",
    ],
    limitations: [
      "Assumes exactly two nodes are swapped — cannot recover from arbitrary corruption.",
      "Mutates node values in-place.",
    ],
  },

  whenToUseIt:
    "Use when exactly two BST nodes have been swapped and you need to restore the BST property without rebuilding the entire tree. Morris traversal can reduce space to O(1) for the iterative variant.",
};
