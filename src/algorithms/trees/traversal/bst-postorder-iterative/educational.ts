import type { EducationalContent } from "@/types";

export const bstPostorderIterativeEducational: EducationalContent = {
  overview:
    "**BST Post-Order Traversal (Iterative)** visits every node in LRN order using two explicit stacks. Stack 1 builds a reversed post-order sequence; stack 2 accumulates it in the correct post-order for final output. This avoids both recursion and the complexity of a single-stack post-order approach.",

  howItWorks:
    "The algorithm uses two stacks in two phases:\n\n" +
    "**Phase 1 — Build reversed post-order on stack 2:**\n" +
    "1. Push root onto stack 1.\n" +
    "2. Pop from stack 1, push to stack 2.\n" +
    "3. Push left child, then right child onto stack 1.\n" +
    "4. Repeat until stack 1 is empty.\n\n" +
    "**Phase 2 — Visit nodes in post-order:**\n" +
    "5. Pop from stack 2 and record each value — this is the LRN order.\n\n" +
    "### Example: Iterative Post-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Visit order:** `1 → 3 → 2 → 5 → 7 → 6 → 4` — identical to recursive post-order.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is pushed/popped from each stack exactly once.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Both stacks together hold at most `n` nodes. Unlike in-order and pre-order iterative variants, post-order iterative uses `O(n)` space because all nodes must be buffered in stack 2 before any visits begin.",

  bestAndWorstCase:
    "**Best case** — balanced tree: stack 1 never exceeds `O(log n)` elements at once, but stack 2 always accumulates all `n` nodes.\n\n" +
    "**Worst case** — degenerate tree: same `O(n)` space for both stacks.\n\n" +
    "This `O(n)` space usage is the trade-off for avoiding recursive call stack depth.",

  realWorldUses: [
    "**Safe tree deletion in garbage collectors:** Post-order ensures children are freed before parents, preventing dangling pointer issues.",
    "**AST bottom-up evaluation without recursion:** Language interpreters evaluate expression trees iteratively when recursion depth is a concern.",
    "**Parallel tree processing:** The two-stack approach naturally separates traversal planning from processing, enabling pipelining.",
    "**Streaming post-order output:** Phase 2 can be made lazy — pop from stack 2 on demand rather than all at once.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — safe for arbitrarily deep trees without call-stack overflow.",
      "Produces correct LRN post-order, suitable for deletion and bottom-up evaluation.",
      "Conceptually clean two-phase algorithm compared to single-stack post-order variants.",
    ],
    limitations: [
      "Uses O(n) space for stack 2, unlike in-order/pre-order iterative variants which use O(h).",
      "All nodes must be processed in phase 1 before any visits begin — not streaming-friendly as written.",
      "More complex than iterative pre-order; requires managing two stacks.",
    ],
  },

  whenToUseIt:
    "Use iterative post-order when you need bottom-up processing without recursion, and O(n) extra memory is acceptable. For tighter memory bounds on deep trees, a single-stack approach (using a 'last visited' pointer) reduces space to O(h). For sorted output, use iterative in-order instead.",
};
