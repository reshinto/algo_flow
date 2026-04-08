import type { EducationalContent } from "@/types";

export const bstToGreaterTreeIterativeEducational: EducationalContent = {
  overview:
    "**BST to Greater Tree (Iterative)** performs the same reverse in-order accumulation as the recursive version but uses an explicit stack to traverse right subtrees before visiting root nodes.",

  howItWorks:
    "Maintains a stack for reverse in-order (right → root → left):\n1. Push all right-spine nodes first.\n2. Pop a node, accumulate its value into `runningSum`, update the node.\n3. Push the left child's right spine.\n4. Repeat until stack is empty.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)) --> B((2))\n" +
    "  A --> C((6))\n" +
    "  B --> D((1))\n" +
    "  B --> E((3))\n" +
    "  C --> F((5))\n" +
    "  C --> G((7))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Stack init: [4,6,7]. Pop 7 (sum=7→7), pop 6 (sum=13→13), push left-spine of 5 → pop 5 (sum=18→18). Pop 4 (sum=22→22), push right-spine of 2 → [3,2]. Pop 3 (sum=25→25), pop 2 (sum=27→27), push 1 → pop 1 (sum=28→28).",

  timeAndSpaceComplexity: "**Time: `O(n)`**\n\n**Space: `O(h)`** — explicit stack.",

  bestAndWorstCase: "Always O(n) — all nodes updated.",

  realWorldUses: [
    "**Iterative greater-tree transformation:** Used in environments where recursion depth is bounded.",
  ],

  strengthsAndLimitations: {
    strengths: ["No recursion — safe for any tree depth."],
    limitations: ["More code than the recursive version for the same result."],
  },

  whenToUseIt:
    "Choose the iterative variant when the BST may be very deep or when implementing in a language without tail-call optimization.",
};
