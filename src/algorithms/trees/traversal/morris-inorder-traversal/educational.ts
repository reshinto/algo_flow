import type { EducationalContent } from "@/types";

export const morrisInorderTraversalEducational: EducationalContent = {
  overview:
    "**Morris In-Order Traversal** performs in-order traversal in `O(1)` auxiliary space by temporarily threading the tree. It creates a temporary link from each node's in-order predecessor to the node itself, uses it to return after traversing the left subtree, then removes the thread before continuing.",

  howItWorks:
    "The algorithm uses two conditions on each iteration:\n\n" +
    "**Case 1 — No left child:**\n" +
    "- Visit the current node and move right (following a thread if present).\n\n" +
    "**Case 2 — Has left child:**\n" +
    "- Find the in-order predecessor (rightmost node in the left subtree).\n" +
    "- **If predecessor's right is null:** Create a thread (predecessor.right = current). Move left.\n" +
    "- **If predecessor's right is current:** Remove the thread. Visit current. Move right.\n\n" +
    "### Example: Morris Traversal on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Visit order:** `1 → 2 → 3 → 4 → 5 → 6 → 7` — sorted ascending, using zero extra heap memory.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each node is visited at most twice — once when creating its thread and once when the thread is used. The predecessor search is amortized `O(1)` per node.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "No stack or queue is used. Threads are stored in the tree's existing right-pointer fields and are fully restored before the function returns.",

  bestAndWorstCase:
    "**Best and worst cases** both have `O(n)` time, as every node requires exactly two passes through the predecessor-finding loop (combined across all iterations).\n\n" +
    "Space is always `O(1)` regardless of tree shape — this is the key advantage over recursive and iterative stack-based variants.",

  realWorldUses: [
    "**Embedded systems with strict memory budgets:** O(1) space traversal is essential when the call stack and heap are severely constrained.",
    "**Database cursor scanning:** In-memory B-tree iterators sometimes use Morris-style threading to avoid separate stack allocation.",
    "**Large tree analysis:** When traversing a tree with millions of nodes, O(1) auxiliary space can be the difference between feasible and infeasible.",
    "**Academic/interview showcase:** Morris traversal demonstrates deep understanding of tree structure and pointer manipulation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "True O(1) auxiliary space — no recursion and no explicit stack.",
      "Produces correct in-order (sorted) output for a valid BST.",
      "Restores the tree to its original structure after traversal — non-destructive.",
    ],
    limitations: [
      "Temporarily modifies the tree (threads), making it unsafe for concurrent reads.",
      "More complex to understand and implement correctly than recursive or stack-based variants.",
      "Cannot be easily adapted for pre-order or post-order without significant changes.",
    ],
  },

  whenToUseIt:
    "Use Morris traversal when O(1) space is a hard requirement — embedded systems, very large trees, or environments with no recursion support. For general-purpose in-order traversal, the recursive or iterative stack-based variant is simpler and more readable.",
};
