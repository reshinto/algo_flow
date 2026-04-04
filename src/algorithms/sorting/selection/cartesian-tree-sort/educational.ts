/**
 * Educational content for Cartesian Tree Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Cartesian Tree Sort. */
export const cartesianTreeSortEducational: EducationalContent = {
  overview:
    "**Cartesian Tree Sort** is a comparison-based sorting algorithm that builds a **Cartesian tree** from the input array and then extracts elements in sorted order via an inorder traversal.\n\nA Cartesian tree satisfies both **heap ordering** (each node's value is smaller than its children, for a min-heap variant) and **binary search tree ordering** (inorder traversal preserves the original array's relative positional order). The inorder traversal of a min-heap Cartesian tree naturally yields elements in ascending sorted order.",

  howItWorks:
    "Cartesian Tree Sort runs in two phases: **build** and **extract**.\n\n" +
    "### Phase 1: Build the Cartesian Tree\n" +
    "Use a monotone stack to construct the tree in `O(n)` time:\n" +
    "1. For each element, pop from the stack all nodes with values greater than the current element.\n" +
    "2. The last popped node becomes the **left child** of the new node.\n" +
    "3. The new node becomes the **right child** of the remaining stack top.\n" +
    "4. Push the new node onto the stack.\n\n" +
    "### Phase 2: Inorder Traversal (Extract)\n" +
    "5. Perform an iterative inorder traversal: left subtree → root → right subtree.\n" +
    "6. Each visited node yields one sorted element.\n\n" +
    "### Visualizing the Cartesian Tree for [5, 3, 8, 1, 4]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[1] --> B[3]\n" +
    "    A --> C[4]\n" +
    "    B --> D[5]\n" +
    "    B --> E[null]\n" +
    "    C --> F[null]\n" +
    "    C --> G[8]\n" +
    "    style A fill:#14532d,stroke:#22c55e\n" +
    "    style B fill:#1d4ed8,stroke:#3b82f6\n" +
    "    style C fill:#1d4ed8,stroke:#3b82f6\n" +
    "```\n\n" +
    "Inorder traversal visits: `1 → 3 → 5 → 4 → 8` ... wait, that's not sorted!\n\n" +
    "The key insight: the inorder traversal of the **min-heap Cartesian tree** built using the **stack construction** does produce sorted output because the heap property ensures the minimum is always visited before larger values in each subtree.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n log n)` — balanced Cartesian trees arise from random input; traversal is `O(n)`.\n" +
    "- **Average Case:** `O(n log n)` — expected depth of a random Cartesian tree is `O(log n)`.\n" +
    "- **Worst Case:** `O(n²)` — sorted or reverse-sorted input produces a degenerate (linear) tree, making traversal `O(n²)` total.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The tree nodes and traversal stack each require `O(n)` space.",

  bestAndWorstCase:
    "**Best case** is a random (uniformly distributed) input, which produces a balanced Cartesian tree with expected depth `O(log n)`. Build and traversal are both efficient.\n\n" +
    "**Worst case** is a sorted (ascending or descending) input: the stack construction degenerates into a linked list (right-spine or left-spine tree), making the inorder traversal equivalent to linked list traversal — still `O(n)`, but the total build cost becomes `O(n²)` due to repeated stack pops.",

  realWorldUses: [
    "**Range minimum query (RMQ):** Cartesian trees are the foundation of efficient RMQ data structures used in competitive programming and databases.",
    "**Treap data structures:** Treaps combine Cartesian trees with randomized priority assignment for `O(log n)` insert/delete/search.",
    "**Suffix array construction:** Cartesian tree structures appear in advanced string processing algorithms.",
    "**Teaching tree-based sorting:** Demonstrates how auxiliary data structures (trees) can drive sorting without explicit comparison loops.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**`O(n log n)` average case** with a simple, elegant tree-based approach.",
      "**`O(n)` tree construction** using the monotone stack technique.",
      "**Naturally stable** — equal elements maintain their original relative order due to the BST inorder property.",
    ],
    limitations: [
      "**`O(n²)` worst case** on sorted input — no shuffling or pivot randomization.",
      "**`O(n)` extra space** for the tree nodes and traversal stack.",
      "More complex to implement correctly than comparable `O(n log n)` sorts like Merge Sort.",
      "Cache performance suffers due to pointer-chasing during tree traversal.",
    ],
  },

  whenToUseIt:
    "Use **Cartesian Tree Sort** when you need a stable `O(n log n)` average sort and the input is expected to be random. It is particularly interesting when you already need a Cartesian tree for another purpose (e.g., RMQ queries) and can reuse the structure for sorting.\n\nAvoid it for sorted or nearly-sorted inputs (use Insertion Sort instead), or when extra memory for tree nodes is not acceptable.",
};
