import type { EducationalContent } from "@/types";

export const bstInsertIterativeEducational: EducationalContent = {
  overview:
    "**BST Insert (Iterative)** inserts a new value without recursion. It tracks the current node and its parent while walking to the correct leaf, then links the new node directly to the parent.",

  howItWorks:
    "1. Create the new node.\n" +
    "2. Walk from root: at each node, compare `insertValue` to decide left or right.\n" +
    "3. When the child slot is `null`, set it to the new node and stop.\n" +
    "4. If the root is `null`, return the new node as the new root.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  C --> F((25))\n" +
    "  C --> G((13))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Inserting 13: pointer walks 20 (go left) → 10 (go right) → 15 (go left, slot is null). Node 13 is linked as the left child of 15. No call stack is needed — only the current and parent pointer variables.",

  timeAndSpaceComplexity:
    "**Time: `O(h)`** — single path to leaf.\n\n**Space: `O(1)`** — no call stack, only pointer variables.",

  bestAndWorstCase:
    "**Best case:** Balanced tree — O(log n).\n\n**Worst case:** Degenerate tree — O(n).",

  realWorldUses: [
    "**Real-time systems:** O(1) space insertion is predictable for memory-constrained environments.",
    "**Bulk loading:** Iteratively inserting pre-sorted data into a BST (though sorting first and using bst-from-sorted-array is better).",
  ],

  strengthsAndLimitations: {
    strengths: ["O(1) space — no recursion overhead.", "Straightforward to implement and debug."],
    limitations: ["Slightly more boilerplate than the recursive version."],
  },

  whenToUseIt:
    "Prefer the iterative insert over recursive when working in stack-constrained environments or when implementing a full BST class.",
};
