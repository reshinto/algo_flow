import type { EducationalContent } from "@/types";

export const maximumPathSumEducational: EducationalContent = {
  overview:
    "**Maximum Path Sum** finds the maximum sum of any path between two nodes in the tree. " +
    "A path can start and end at any nodes — it does not have to pass through the root or touch a leaf. " +
    "Paths must follow parent-child edges.",

  howItWorks:
    "A recursive helper `maxGain(node)` returns the maximum contribution this node can make to its parent:\n\n" +
    "1. Compute `leftGain = max(maxGain(left), 0)` — only use if positive.\n" +
    "2. Compute `rightGain = max(maxGain(right), 0)` — only use if positive.\n" +
    "3. Compute `pathThroughNode = node.value + leftGain + rightGain`.\n" +
    "4. Update the global maximum with `pathThroughNode`.\n" +
    "5. **Return** `node.value + max(leftGain, rightGain)` — the node can only contribute one branch to its parent.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node is visited once.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case** is all positive values — the maximum path spans the entire tree.\n\n" +
    "**Worst case** is all negative values — the maximum path is a single node (the least negative).",

  realWorldUses: [
    "**Maximum profit route:** Finding the most profitable path through a tree of financial decisions.",
    "**Network bandwidth:** Maximum throughput through any tree path in a hierarchical network.",
    "**Gene expression scoring:** Finding the maximum-scoring path in a phylogenetic scoring tree.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles negative values correctly by using max(gain, 0).",
      "O(n) single-pass solution with a global variable for the running maximum.",
    ],
    limitations: [
      "Does not return the actual path — only the sum.",
      "The global state makes it slightly harder to reason about pure function semantics.",
    ],
  },

  whenToUseIt:
    "Use maximum path sum in competitive programming and interview problems asking for maximum inter-node paths. " +
    "The key insight — clamping gains to zero — also applies to related maximum subarray problems.",
};
