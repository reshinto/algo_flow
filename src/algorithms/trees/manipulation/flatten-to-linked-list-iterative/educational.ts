import type { EducationalContent } from "@/types";

export const flattenToLinkedListIterativeEducational: EducationalContent = {
  overview:
    "**Flatten Binary Tree to Linked List (Iterative)** uses a Morris-traversal-inspired technique to transform a binary tree into a right-skewed linked list in-place without recursion and in `O(1)` extra space.\n\nFor each node with a left child, the algorithm locates the rightmost node of the left subtree, connects the original right subtree there, then moves the entire left subtree to the right before advancing.",

  howItWorks:
    "The algorithm walks through the tree one node at a time:\n\n" +
    "1. **Initialize** — point `current` at the root.\n" +
    "2. **Check left** — if the current node has no left child, advance to `current.right`.\n" +
    "3. **Find rightmost** — walk `current.left` all the way right to find the tail of the left subtree.\n" +
    "4. **Connect** — attach `current.right` (original right subtree) to that tail's right pointer.\n" +
    "5. **Move left to right** — set `current.right = current.left`, then `current.left = null`.\n" +
    "6. **Advance** — move `current` to `current.right` (the former left child).\n" +
    "7. **Repeat** — continue until `current` is null.\n\n" +
    "This is sometimes called the Morris Flatten because it shares the rightmost-predecessor logic with Morris traversal.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)) --> B((2))\n" +
    "  A --> C((5))\n" +
    "  B --> D((3))\n" +
    "  B --> E((4))\n" +
    "  R1((1)) --> R2((2))\n" +
    "  R2 --> R3((3))\n" +
    "  R3 --> R4((4))\n" +
    "  R4 --> R5((5))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style R1 fill:#14532d,stroke:#22c55e\n" +
    "  style R2 fill:#14532d,stroke:#22c55e\n" +
    "  style R3 fill:#14532d,stroke:#22c55e\n" +
    "  style R4 fill:#14532d,stroke:#22c55e\n" +
    "  style R5 fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Top: original tree. Bottom: after flattening — all nodes form a right-skewed chain in preorder (1→2→3→4→5), left pointers all null.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each node is visited at most twice (once as `current`, once as `rightmost` during the inner walk), giving amortized `O(n)` total.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "No recursion stack or auxiliary data structures are needed — all pointers are rewired in-place.",

  bestAndWorstCase:
    "**Best case** — already-right-skewed tree: no left children, so the inner loop never runs — `O(n)` time, `O(1)` space.\n\n" +
    "**Worst case** — perfectly balanced tree: every node triggers an inner rightmost walk, but each node is visited at most twice total — still `O(n)` time.",

  realWorldUses: [
    "**Memory-constrained environments** — Flatten without any extra stack or queue allocation.",
    "**Streaming tree processors** — Walk nodes sequentially without holding the whole call stack.",
    "**Compiler IR linearization** — Convert expression trees to linear instruction sequences.",
    "**Morris-like traversal extensions** — Base pattern for other pointer-threading algorithms.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "`O(1)` extra space — no recursion stack or auxiliary queues needed.",
      "Avoids stack overflow risk for arbitrarily deep trees.",
      "Runs in a single forward pass through the tree.",
    ],
    limitations: [
      "More complex than the recursive version — harder to understand at a glance.",
      "Modifies the original tree — clone if the original must be preserved.",
      "The inner rightmost loop can be mistaken for `O(n²)` complexity without careful analysis.",
    ],
  },

  whenToUseIt:
    "Use the iterative variant when working in memory-constrained environments or when trees may be arbitrarily deep. For clarity and simpler code, the recursive version is preferred. Both run in `O(n)` time; only the iterative version achieves `O(1)` space.",
};
