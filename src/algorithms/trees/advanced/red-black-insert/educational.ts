import type { EducationalContent } from "@/types";

export const redBlackInsertEducational: EducationalContent = {
  overview:
    "**Red-Black Tree Insertion** maintains a self-balancing BST using a two-color invariant. Every node is colored **red** or **black**, and four properties ensure the tree remains approximately balanced: (1) root is black, (2) red nodes have only black children, (3) every path from a node to its null descendants has the same number of black nodes, and (4) null leaves are black.\n\nAfter each insertion, the tree is fixed with a combination of **recoloring** and **rotations**.",

  howItWorks:
    "Insertion follows three cases based on the uncle node's color:\n\n" +
    "1. **Case 1 — Uncle is red:** Recolor parent, uncle to black and grandparent to red. Move up the tree.\n" +
    "2. **Case 2 — Uncle is black, triangle:** Rotate the parent in the opposite direction to convert to Case 3.\n" +
    "3. **Case 3 — Uncle is black, line:** Recolor and rotate the grandparent.\n\n" +
    "At most 2 rotations and O(log n) recolorings are needed per insert.\n\n" +
    "**Case 1 recoloring** — uncle is red, so parent and uncle recolor to black, grandparent to red:\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20B)):::visited --> B((10R)):::active\n" +
    "  A --> C((30R)):::active\n" +
    "  B --> D((5R)):::current\n" +
    "  B --> E((15)):::visited\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef active fill:#f59e0b,stroke:#d97706\n" +
    "  classDef current fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Node 5 (cyan) is newly inserted. Its parent 10 and uncle 30 (amber) are both red — a Case 1 violation. Both are recolored black and grandparent 20 (green) is recolored red, then the fix-up moves upward.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`** per insertion (tree height is bounded by 2 log₂(n+1)).\n\n" +
    "**Space Complexity: `O(log n)`** (call stack for fix-up traversal).",

  bestAndWorstCase:
    "**Best case:** Insertion requires only recoloring with no rotations — O(log n).\n\n" +
    "**Worst case:** Two rotations needed plus O(log n) recoloring passes — still O(log n). Red-black trees require fewer rotations than AVL trees on insert-heavy workloads.",

  realWorldUses: [
    "**C++ STL:** `std::map` and `std::set` use red-black trees internally.",
    "**Java TreeMap/TreeSet:** Java's sorted collections are red-black tree implementations.",
    "**Linux Kernel:** Completely Fair Scheduler (CFS) uses red-black trees for task scheduling.",
    "**Nginx:** Uses red-black trees to manage timers.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "At most 2 rotations per insert — faster insertions than AVL trees.",
      "Well-studied with proven performance guarantees.",
      "Used in OS schedulers and language standard libraries — battle-tested.",
    ],
    limitations: [
      "More complex to implement than AVL trees — 3 cases for insert, more for delete.",
      "Lookup slightly slower than AVL trees (tree can be up to 2× as tall).",
      "Color metadata per node — small memory overhead.",
    ],
  },

  whenToUseIt:
    "Use a red-black tree when you need fast insertions and deletions alongside O(log n) lookups. If reads dominate, an AVL tree gives better lookup performance. For mostly static data, a sorted array with binary search beats both.",
};
