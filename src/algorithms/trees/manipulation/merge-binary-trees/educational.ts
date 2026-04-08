import type { EducationalContent } from "@/types";

export const mergeBinaryTreesEducational: EducationalContent = {
  overview:
    "**Merge Binary Trees** overlays two binary trees: where both trees have nodes at the same position, their values are summed; where only one tree has a node, that node is used as-is.\n\nImagine placing two trees on top of each other — nodes that overlap are combined, and nodes that stick out on one side are kept.",

  howItWorks:
    "The recursive algorithm handles three cases at each position:\n\n" +
    "1. **Tree A is null** — return Tree B's node directly.\n" +
    "2. **Tree B is null** — return Tree A's node directly.\n" +
    "3. **Both exist** — sum their values into Tree A's node, then recursively merge left and right subtrees.\n\n" +
    "The algorithm modifies Tree A in-place. After merging the default trees (A: values 1–7, B: values 10–70), every node value in the result is the sum of the corresponding positions.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  subgraph Result [Result]\n" +
    "    R((11)) --> S((22))\n" +
    "    R --> T((33))\n" +
    "    S --> U((44))\n" +
    "    S --> V((55))\n" +
    "  end\n" +
    "  subgraph B [Tree B]\n" +
    "    P((10)) --> Q((20))\n" +
    "    P --> BB((30))\n" +
    "    Q --> BL((40))\n" +
    "    Q --> BR((50))\n" +
    "  end\n" +
    "  subgraph A [Tree A]\n" +
    "    A((1)) --> C((2))\n" +
    "    A --> D((3))\n" +
    "    C --> E((4))\n" +
    "    C --> F((5))\n" +
    "  end\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style P fill:#06b6d4,stroke:#0891b2\n" +
    "  style R fill:#14532d,stroke:#22c55e\n" +
    "  style S fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Each overlapping node sums its values (1+10=11, 2+20=22, etc.). Tree A is modified in-place; no new tree allocation is needed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(min(n, m))`** where `n` and `m` are the sizes of the two trees\n\n" +
    "Only the overlapping nodes require a merge step; non-overlapping subtrees are returned directly.\n\n" +
    "**Space Complexity: `O(min(h₁, h₂))`** where `h₁` and `h₂` are the heights of the two trees\n\n" +
    "The recursion depth is bounded by the height of the shallower tree.",

  bestAndWorstCase:
    "**Best case** — one tree is empty: returns the other tree in `O(1)` time.\n\n" +
    "**Worst case** — identical-shaped trees: every node is visited — `O(n)` time.",

  realWorldUses: [
    "**Conflict-free data merging** — Combine distributed tree-structured data by summing at overlap points.",
    "**Game maps** — Merge two tile maps by summing overlapping tile values.",
    "**Priority combining** — Combine two priority trees where shared positions add their weights.",
    "**Sensor fusion** — Aggregate tree-structured sensor readings from two data sources.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple three-case recursive structure directly mirrors the problem definition.",
      "In-place modification of Tree A avoids allocating a new tree.",
      "Short-circuits by reusing non-overlapping subtrees without traversing them.",
    ],
    limitations: [
      "Modifies Tree A in-place — clone if the original must be preserved.",
      "Recursive — may stack overflow for very deep trees.",
      "Not suitable when the merge rule is more complex than simple value addition.",
    ],
  },

  whenToUseIt:
    "Use merge-binary-trees when you need to overlay two trees and combine overlapping nodes. For a non-destructive merge that creates a new tree, allocate new nodes instead of modifying Tree A. Use the iterative variant for deep trees.",
};
