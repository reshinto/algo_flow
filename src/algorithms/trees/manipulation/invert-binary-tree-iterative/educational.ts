import type { EducationalContent } from "@/types";

export const invertBinaryTreeIterativeEducational: EducationalContent = {
  overview:
    "**Invert Binary Tree (Iterative)** mirrors a binary tree using a BFS queue, swapping left and right children level by level. This avoids the recursive call stack entirely, making it safe for very deep trees that would otherwise risk a stack overflow.",

  howItWorks:
    "The algorithm uses a BFS queue approach:\n\n" +
    "1. **Initialize** — add the root node to the queue.\n" +
    "2. **Dequeue** — take the front node from the queue.\n" +
    "3. **Swap** — exchange the node's left and right child pointers.\n" +
    "4. **Enqueue children** — add the non-null children to the queue.\n" +
    "5. **Repeat** — continue until the queue is empty.\n\n" +
    "Processing level by level means all nodes at depth `d` are swapped before moving to depth `d+1`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  subgraph After [After Invert]\n" +
    "    P((4)) --> Q((6))\n" +
    "    P --> R((2))\n" +
    "    Q --> S((7))\n" +
    "    Q --> T((5))\n" +
    "    R --> U((3))\n" +
    "    R --> V((1))\n" +
    "  end\n" +
    "  subgraph Before [Before Invert]\n" +
    "    A((4)) --> B((2))\n" +
    "    A --> C((6))\n" +
    "    B --> D((1))\n" +
    "    B --> E((3))\n" +
    "    C --> F((5))\n" +
    "    C --> G((7))\n" +
    "  end\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style P fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "BFS processes level 0 (root swap), then level 1 (swap 2↔6's children), then level 2. Each level's swaps are batched before the next.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is dequeued exactly once and its children swapped in `O(1)` time.\n\n" +
    "**Space Complexity: `O(w)` where `w` is the maximum tree width**\n\n" +
    "The BFS queue holds at most one full level of the tree. For balanced trees, the maximum width is `n/2` at the leaf level, so space is `O(n)` in the worst case.",

  bestAndWorstCase:
    "**Best case** — a single-node or skewed tree: queue holds at most one node at a time — `O(1)` space.\n\n" +
    "**Worst case** — a complete binary tree: the bottom level has `n/2` nodes in the queue simultaneously — `O(n)` space.\n\n" +
    "Time is always `O(n)` for any tree shape.",

  realWorldUses: [
    "**Memory-safe mirroring** — Invert large trees where recursive stack depth would be a risk.",
    "**Level-by-level visualization** — BFS order makes it easy to animate the inversion per level.",
    "**Parallel processing** — Each level's swaps are independent and can be parallelized.",
    "**Iterators and streaming** — BFS naturally fits iterator-based or streaming tree processing APIs.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — safe for arbitrarily deep trees without stack overflow risk.",
      "BFS order makes it easy to observe the inversion progress level by level.",
      "Straightforward queue-based implementation widely understood by engineers.",
    ],
    limitations: [
      "Uses `O(w)` extra memory for the queue, which can be `O(n)` for wide trees.",
      "Slightly more verbose than the elegant single-line recursive version.",
      "BFS traversal order may be less intuitive than post-order recursion for tree problems.",
    ],
  },

  whenToUseIt:
    "Prefer the iterative BFS variant over recursion when working with trees that may be very deep or have unpredictable depth. Use the recursive version for shallow trees where code clarity is more important than stack safety.",
};
