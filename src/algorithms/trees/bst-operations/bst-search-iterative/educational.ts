import type { EducationalContent } from "@/types";

export const bstSearchIterativeEducational: EducationalContent = {
  overview:
    "**BST Search (Iterative)** performs the same binary search as the recursive variant but uses a `while` loop instead of recursion, eliminating the call stack overhead entirely.\n\nA `current` pointer starts at the root and walks the tree until it finds the target or reaches a `null` leaf.",

  howItWorks:
    "1. Set `current = root`.\n" +
    "2. While `current !== null`:\n" +
    "   - If `current.value === target` — return `current`.\n" +
    "   - If `target < current.value` — move left: `current = current.left`.\n" +
    "   - Otherwise — move right: `current = current.right`.\n" +
    "3. If the loop exits without a match, return `null`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  C --> F((25))\n" +
    "  C --> G((40))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Searching for 15: current=20 (15<20, go left) → current=10 (15>10, go right) → current=15 (match, return node). Only one pointer variable advances — no call stack consumed.",

  timeAndSpaceComplexity:
    "**Time: `O(log n)` average, `O(n)` worst case** — same as the recursive version.\n\n**Space: `O(1)`** — no call stack; only a single pointer variable is maintained.",

  bestAndWorstCase:
    "**Best case:** Target equals the root — one comparison, O(1).\n\n**Worst case:** Degenerate tree — traversal visits every node, O(n).",

  realWorldUses: [
    "**Embedded systems:** Where stack space is limited and recursion is avoided.",
    "**High-performance lookups:** Loop-based code benefits from better CPU branch prediction than recursive calls.",
    "**Iterative BST implementations:** Used as a building block for iterative insert and delete.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — no recursive call stack.",
      "Faster in practice due to eliminated function-call overhead.",
      "Easier to reason about stack safety for very tall trees.",
    ],
    limitations: [
      "Slightly more verbose code than the elegant recursive version.",
      "Still degrades to O(n) on unbalanced trees.",
    ],
  },

  whenToUseIt:
    "Prefer the iterative variant when memory is constrained or when stack overflow is a concern on potentially tall trees.",
};
