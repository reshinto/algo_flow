import type { EducationalContent } from "@/types";

export const bstFromSortedArrayEducational: EducationalContent = {
  overview:
    "**BST from Sorted Array** builds a **height-balanced** BST from a sorted array by recursively choosing the middle element as the root at each level.\n\nChoosing the midpoint ensures equal-sized left and right subtrees, producing an optimally balanced tree with height `O(log n)`.",

  howItWorks:
    "1. If the subarray is empty — return `null` (base case).\n" +
    "2. Compute `mid = floor((left + right) / 2)`.\n" +
    "3. Create a root node with `array[mid]`.\n" +
    "4. Recursively build the left subtree from `array[left..mid-1]`.\n" +
    "5. Recursively build the right subtree from `array[mid+1..right]`.\n\n" +
    "The recursion halves the subarray at each level — the same divide-and-conquer strategy as merge sort.",

  timeAndSpaceComplexity:
    "**Time: `O(n)`** — each element is processed exactly once.\n\n**Space: `O(n)`** — `n` nodes are created; call stack is `O(log n)` for the balanced result.",

  bestAndWorstCase: "Always O(n) time regardless of input — every element must become a node.",

  realWorldUses: [
    "**BST construction from sorted data:** Building an index from a sorted file.",
    "**Static lookup tables:** Convert a sorted array into an optimal BST for repeated searches.",
    "**Database B-tree initialization:** Pre-load sorted keys into a balanced structure.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Always produces a perfectly balanced BST — O(log n) search guaranteed.",
      "Simple recursive divide-and-conquer structure.",
      "O(n) time — optimal since all elements must be visited.",
    ],
    limitations: [
      "Requires the input to be sorted — add an O(n log n) sort step if not already sorted.",
      "Produces a static tree — insertions after construction may unbalance it.",
    ],
  },

  whenToUseIt:
    "Use when you have a sorted array and need an optimal BST for lookups. For dynamic data, use a self-balancing BST (AVL, red-black) that maintains balance through insertions.",
};
