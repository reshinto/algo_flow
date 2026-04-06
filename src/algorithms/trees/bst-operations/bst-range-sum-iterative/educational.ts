import type { EducationalContent } from "@/types";

export const bstRangeSumIterativeEducational: EducationalContent = {
  overview:
    "**BST Range Sum (Iterative)** uses an explicit stack for DFS traversal, summing values in `[low, high]` and pushing children only when they might contain in-range values.",

  howItWorks:
    "Start with root in the stack. At each node:\n1. If the value is in `[low, high]`, add to the running sum.\n2. Push the left child only if `node.value > low` (left subtree could have in-range values).\n3. Push the right child only if `node.value < high`.\n\nThis avoids visiting entire subtrees outside the range.",

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
