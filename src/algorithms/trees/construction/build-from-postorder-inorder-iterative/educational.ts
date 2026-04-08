import type { EducationalContent } from "@/types";

export const buildFromPostorderInorderIterativeEducational: EducationalContent = {
  overview:
    "**Build Tree from Postorder + Inorder (Iterative)** reconstructs a binary tree using a stack, " +
    "mirroring the iterative preorder+inorder approach but reading both sequences right-to-left. " +
    "The postorder array's last element is the root; subsequent elements are processed from right to left, " +
    "with the inorder pointer (also right-to-left) signaling when to shift from right-child to left-child insertion.",

  howItWorks:
    "The algorithm works by processing postorder in reverse (right-to-left):\n\n" +
    "1. **Initialize** — create the root from `postorder[-1]`, push it on the stack, set inorder pointer to `length - 1`.\n" +
    "2. **For each subsequent postorder value (right-to-left):**\n" +
    "   - Peek at the stack top.\n" +
    "   - If the stack top **does not** match `inorder[inorderPointer]`, attach new node as **right child** of the top.\n" +
    "   - Otherwise, **pop** nodes while they match inorder (decrementing pointer); the last popped becomes the **left-child parent**.\n" +
    "3. Always **push** the new node onto the stack.\n\n" +
    "### Key Insight\n\n" +
    "Reading both sequences right-to-left converts the postorder problem into a mirror of the preorder iterative approach.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)):::current --> B((2)):::visited\n" +
    "  A --> C((6)):::visited\n" +
    "  B --> D((1)):::active\n" +
    "  B --> E((3)):::active\n" +
    "  C --> F((5)):::active\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef active fill:#f59e0b,stroke:#d97706\n" +
    "  classDef current fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Tree reconstructed from `postorder=[1,3,2,5,6,4]` and `inorder=[1,2,3,4,5,6]`. Root 4 (cyan) is identified from `postorder[-1]`; the inorder boundary splits green nodes (left subtree) from right. Amber leaves are attached last as the stack unwinds.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each node is pushed and popped from the stack at most once; each element in both arrays is processed once.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The explicit stack holds at most `O(h)` nodes where `h` is tree height.",

  bestAndWorstCase:
    "**Best case** is a balanced tree — stack depth stays `O(log n)` with frequent left/right alternation.\n\n" +
    "**Worst case** is a left-skewed tree — every node is pushed without popping until the entire sequence is consumed, resulting in `O(n)` stack depth.",

  realWorldUses: [
    "**Deep tree safety:** Avoids call-stack overflow for degenerate postorder-inorder inputs.",
    "**Streaming reconstruction:** Well-suited for processing traversal sequences as they arrive in a stream.",
    "**Embedded environments:** Iterative stack-based construction avoids recursion on memory-limited systems.",
    "**Parallel with iterative preorder+inorder:** Demonstrates the duality between the two approaches.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — eliminates call-stack overflow risk for arbitrarily deep trees.",
      "O(n) time with no hash map required.",
      "Elegant mirror of the preorder iterative approach — understanding one makes the other intuitive.",
    ],
    limitations: [
      "Requires both postorder and inorder arrays with distinct values.",
      "The right-to-left traversal direction can be counterintuitive to debug.",
      "Both sequences must be complete and consistent.",
    ],
  },

  whenToUseIt:
    "Choose this algorithm when handling potentially degenerate trees from postorder+inorder input and call-stack depth is a concern. " +
    "For most well-balanced inputs, the recursive variant is clearer and equally performant.",
};
