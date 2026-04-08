import type { EducationalContent } from "@/types";

export const bstFloorCeilIterativeEducational: EducationalContent = {
  overview:
    "**BST Floor & Ceil (Iterative)** finds both boundary values in a single while-loop pass, tracking the best candidate seen so far for each:\n- **Floor candidate:** last node where `node.value ≤ target`\n- **Ceil candidate:** last node where `node.value ≥ target`",

  howItWorks:
    "Start at root. At each node:\n- If `value === target`: exact match — return it as both floor and ceil immediately.\n- If `target < value`: current node is a ceil candidate; move left to find a smaller ceil.\n- If `target > value`: current node is a floor candidate; move right to find a larger floor.\n\nWhen the loop ends, the tracked candidates are the answer.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  C --> F((25))\n" +
    "  C --> G((40))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Searching for target 17: walk 20 (ceil=20, move left) → 10 (floor=10, move right) → 15 (floor=15, move right, null). Result: floor=15, ceil=20. Both candidates are updated in a single pass without recursion.",

  timeAndSpaceComplexity:
    "**Time: `O(h)`** — single pass from root to a leaf.\n\n**Space: `O(1)`** — two pointer variables, no call stack.",

  bestAndWorstCase:
    "**Best case:** Exact match at root — O(1).\n\n**Worst case:** Target outside the range of all stored values — must walk to a leaf.",

  realWorldUses: [
    "**Memory-constrained lookups:** O(1) space makes this suitable for embedded or real-time environments.",
    "**Interval scheduling:** Quickly find the next available slot ≥ a given start time.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — no recursion.",
      "Finds both floor and ceil in a single traversal pass.",
    ],
    limitations: ["Slightly more variable management than the recursive version."],
  },

  whenToUseIt:
    "Use the iterative variant over the recursive one when O(1) space is a hard requirement or when the tree may be deep.",
};
