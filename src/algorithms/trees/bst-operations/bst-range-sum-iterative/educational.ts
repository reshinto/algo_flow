import type { EducationalContent } from "@/types";

export const bstRangeSumIterativeEducational: EducationalContent = {
  overview:
    "**BST Range Sum (Iterative)** uses an explicit stack for DFS traversal, summing values in `[low, high]` and pushing children only when they might contain in-range values.",

  howItWorks:
    "Start with root in the stack. At each node:\n1. If the value is in `[low, high]`, add to the running sum.\n2. Push the left child only if `node.value > low` (left subtree could have in-range values).\n3. Push the right child only if `node.value < high`.\n\nThis avoids visiting entire subtrees outside the range.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((10)) --> B((5))\n" +
    "  A --> C((20))\n" +
    "  B --> D((3))\n" +
    "  B --> E((7))\n" +
    "  C --> F((15))\n" +
    "  C --> G((25))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Range [7, 15]: stack pops 10 (in range, sum=10) → pushes 5 (10>7) and 20 (10<15). Pops 5 (out of range) → pushes 7 (5>7? no, skip left), pushes 7 right-child (sum=17). Pops 20 → pushes 15 (in range, sum=32). Subtrees rooted at 3 and 25 are pruned entirely.",

  timeAndSpaceComplexity:
    "**Time: `O(log n + k)`** — same pruning as recursive version.\n\n**Space: `O(h)`** — explicit stack.",

  bestAndWorstCase:
    "**Best case:** Narrow range near a leaf — few nodes visited.\n\n**Worst case:** Range covers all nodes — O(n).",

  realWorldUses: [
    "**Streaming range queries:** Process results as soon as nodes are popped from the stack.",
    "**Stack-safe traversal:** No recursion depth concerns.",
  ],

  strengthsAndLimitations: {
    strengths: ["No recursion.", "Same BST pruning efficiency as recursive version."],
    limitations: ["O(h) stack space for the explicit stack."],
  },

  whenToUseIt:
    "Use when you need range sum without recursion, or when iterating over a generator-style interface.",
};
