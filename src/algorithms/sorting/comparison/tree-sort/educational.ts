/**
 * Educational content for Tree Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Tree Sort. */
export const treeSortEducational: EducationalContent = {
  overview:
    "**Tree Sort** is a sorting algorithm that uses a **Binary Search Tree (BST)** as an intermediate " +
    "data structure. Every element is inserted into the BST using standard BST insertion rules, then " +
    "the sorted output is produced by performing an **inorder traversal** — which visits nodes in " +
    "ascending order by definition of the BST property.",

  howItWorks:
    "Tree Sort works in two distinct phases:\n\n" +
    "### Phase 1: BST Construction\n" +
    "For each element in the input array:\n" +
    "1. Start at the root.\n" +
    "2. If the element is **less than** the current node, go left.\n" +
    "3. If the element is **greater than or equal to** the current node, go right.\n" +
    "4. Insert as a leaf when an empty slot is reached.\n\n" +
    "### Phase 2: Inorder Traversal\n" +
    "Traverse the tree **left → root → right** recursively. Because of the BST property, " +
    "this always visits nodes in non-decreasing order.\n\n" +
    "### Visualizing Tree Sort on [5, 3, 7, 1, 4]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[5] --> B[3]\n" +
    "    A --> C[7]\n" +
    "    B --> D[1]\n" +
    "    B --> E[4]\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "    style B fill:#14532d,stroke:#22c55e\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "    style A fill:#14532d,stroke:#22c55e\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Inorder traversal visits: `1 → 3 → 4 → 5 → 7` → sorted output.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n log n)` | Balanced BST — each insertion takes `O(log n)` |\n" +
    "| Average | `O(n log n)` | Random input produces approximately balanced trees |\n" +
    "| Worst | `O(n²)` | Sorted or reverse-sorted input creates a degenerate (linked-list) BST |\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The BST stores `n` nodes, each with a value and two pointers. The recursion stack for the traversal " +
    "adds `O(h)` depth where `h` is tree height — `O(log n)` average, `O(n)` worst case.",

  bestAndWorstCase:
    "**Best case `O(n log n)`:** Random input generates a well-balanced BST. Insertions and traversal " +
    "both complete in `O(n log n)` total.\n\n" +
    "**Worst case `O(n²)`:** Sorted or reverse-sorted input causes every new element to be inserted at " +
    "the very end of a chain — the tree degenerates into a linked list of height `n`. Each insertion " +
    "traverses the full chain, giving `O(n²)` total insertion cost. This is Tree Sort's critical " +
    "weakness. Using a **self-balancing BST** (AVL tree, Red-Black tree) instead guarantees `O(n log n)` " +
    "worst case but adds significant implementation complexity.",

  realWorldUses: [
    "**BST educational content**: Tree Sort is primarily used to demonstrate BST properties and inorder traversal.",
    "**Dynamic sorted sets**: When elements need to be both inserted and iterated in order, a BST structure provides both naturally.",
    "**Database indexing**: B-trees (generalized BSTs) are the backbone of database index structures; understanding Tree Sort builds intuition for this.",
    "**Priority queues**: The BST approach generalizes to heap-based priority queues.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Stable** (with care): If equal elements always go right, relative order is preserved.",
      "**Online algorithm**: Can accept new elements and maintain sorted order dynamically.",
      "**Intuitive**: Directly demonstrates BST properties and inorder traversal.",
    ],
    limitations: [
      "**O(n²) worst case**: Degrades severely on sorted input without balancing.",
      "**O(n) space**: Requires building the entire BST structure in memory.",
      "**Not cache-friendly**: Pointer-based tree traversal causes cache misses.",
      "**Complex implementation**: BST with proper duplicate handling and memory management is non-trivial.",
    ],
  },

  whenToUseIt:
    "Use **Tree Sort** primarily for **educational purposes** — to understand BST insertion, inorder " +
    "traversal, and the connection between tree structure and sorted order.\n\n" +
    "In production, prefer Tim Sort or Intro Sort for general-purpose sorting. If you specifically need " +
    "a tree-based sort with worst-case guarantees, use a **self-balancing BST** variant (which gives " +
    "guaranteed `O(n log n)` at the cost of complexity).",
};
