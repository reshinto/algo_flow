import type { EducationalContent } from "@/types";

export const buildFromPreorderInorderIterativeEducational: EducationalContent = {
  overview:
    "**Build Tree from Preorder + Inorder (Iterative)** reconstructs a binary tree using a stack instead of recursion. " +
    "It simulates the call stack of the recursive approach, consuming preorder values one by one and using the inorder sequence to determine when to switch from left-child insertion to right-child insertion.",

  howItWorks:
    "The stack-based algorithm processes preorder elements left to right:\n\n" +
    "1. **Initialize** — create the root from `preorder[0]` and push it onto the stack.\n" +
    "2. **For each subsequent preorder value:**\n" +
    "   - Peek at the stack top.\n" +
    "   - If the stack top's value **does not** match the current inorder element, attach the new node as the **left child** of the top.\n" +
    "   - Otherwise, **pop** nodes from the stack as long as they match the inorder sequence (moving the inorder pointer forward). The last popped node becomes the parent for a **right child**.\n" +
    "3. Always **push** the new node onto the stack.\n\n" +
    "### Key Insight\n\n" +
    "The inorder pointer acts as a boundary detector. When the stack top equals `inorder[pointer]`, we've finished the left subtree of that node and must start building its right subtree.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)):::current --> B((2)):::visited\n" +
    "  A --> C((6)):::visited\n" +
    "  B --> D((1)):::active\n" +
    "  B --> E((3)):::active\n" +
    "  C --> F((5)):::active\n" +
    "  C --> G((7)):::active\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef active fill:#f59e0b,stroke:#d97706\n" +
    "  classDef current fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Tree built from `preorder=[4,2,1,3,6,5,7]` and `inorder=[1,2,3,4,5,6,7]`. Root 4 (cyan) is created first; nodes 2 and 6 (green) are created and pushed while building left spines; leaves 1, 3, 5, 7 (amber) are attached when the inorder boundary is crossed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each of the `n` nodes is pushed and popped from the stack at most once, and each preorder element is processed exactly once.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The stack holds at most `O(h)` nodes where `h` is the tree height. In the worst case (skewed tree), `h = O(n)`.",

  bestAndWorstCase:
    "**Best case** is a balanced tree — the stack depth stays at `O(log n)` and alternation between left and right insertions is frequent.\n\n" +
    "**Worst case** is a right-skewed tree — every node is pushed without being popped until the very end, giving `O(n)` stack depth.",

  realWorldUses: [
    "**Stack-overflow prevention:** Converts the recursive approach to an iterative one that is safe for very deep trees.",
    "**Streaming tree reconstruction:** Suitable for processing traversal sequences as a data stream.",
    "**Embedded systems:** Iterative tree construction avoids call-stack limitations on memory-constrained platforms.",
    "**Compiler backends:** Reconstructing parse trees from serialized traversal sequences without deep recursion.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates recursion — no risk of call-stack overflow even for deeply skewed trees.",
      "O(n) time and O(n) space with no hash map needed for the core algorithm.",
      "Mirrors the recursive logic closely — straightforward to derive from the recursive version.",
    ],
    limitations: [
      "Requires both preorder and inorder arrays with all distinct values.",
      "The stack management logic is less intuitive than the recursive version.",
      "Both sequences must be complete — partial or corrupted sequences yield incorrect results.",
    ],
  },

  whenToUseIt:
    "Prefer the iterative version over the recursive one when input trees may be very deep (e.g., degenerate linked-list-shaped trees) " +
    "and call-stack depth is a concern. In most practical cases, the recursive version with a hash map is simpler and equally fast.",
};
