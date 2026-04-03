/**
 * Educational content for Heap Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Heap Sort. */
export const heapSortEducational: EducationalContent = {
  overview:
    "**Heap Sort** is an in-place, comparison-based sorting algorithm that uses a **binary max-heap** as an intermediate data structure. It was invented by J.W.J. Williams in 1964.\n\nThe algorithm has two distinct phases: first it builds a max-heap from the input array, then it repeatedly extracts the maximum element from the heap and places it at the end of the sorted region, shrinking the heap by one each iteration.",

  howItWorks:
    "Heap Sort leverages the heap property: every parent node is ≥ its children (max-heap).\n\n" +
    "### Step-by-Step Execution\n" +
    "**Phase 1 — Build Max-Heap:**\n" +
    "1. Treat the array as a binary tree stored in-place.\n" +
    "2. Start from the last internal node (`floor(n/2) - 1`) and sift down to index 0.\n" +
    "3. After this phase, `arr[0]` holds the maximum element.\n\n" +
    "**Phase 2 — Extract and Sort:**\n" +
    "4. Swap `arr[0]` (max) with `arr[heapSize - 1]` — the max is now in its sorted position.\n" +
    "5. Decrement `heapSize` and sift down the new root to restore the heap property.\n" +
    "6. Repeat until `heapSize == 1`.\n\n" +
    "### Heap Tree for [4, 10, 3, 5, 1]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    subgraph Max-Heap after build\n" +
    "    A[10] --> B[5]\n" +
    "    A --> C[3]\n" +
    "    B --> D[4]\n" +
    "    B --> E[1]\n" +
    "    end\n" +
    "    style A fill:#7c3aed,stroke:#a78bfa\n" +
    "    style B fill:#1e3a5f,stroke:#3b82f6\n" +
    "    style C fill:#1e3a5f,stroke:#3b82f6\n" +
    "```\n\n" +
    "- Extract `10` → sorted: `[..., 10]`, heap: `[5, 4, 3, 1]`\n" +
    "- Extract `5` → sorted: `[..., 5, 10]`, heap: `[4, 1, 3]`\n" +
    "- Continue until heap is empty → `[1, 3, 4, 5, 10]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "- **Build Heap:** `O(n)` — Floyd's heapification is linear despite the intuitive `O(n log n)` estimate.\n" +
    "- **Extraction Phase:** `O(n log n)` — `n` extractions × `O(log n)` sift-down each.\n" +
    "- **Best Case:** `O(n log n)` — no adaptive shortcut; always performs both phases fully.\n" +
    "- **Average Case:** `O(n log n)` — consistent regardless of input distribution.\n" +
    "- **Worst Case:** `O(n log n)` — never degrades unlike Quick Sort.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Entirely in-place. The heap is built within the original array. Only constant temporary variables are used.",

  bestAndWorstCase:
    "**Best case** is `O(n log n)` — Heap Sort has no early-exit path and always performs both the build phase and the full extraction phase.\n\n" +
    "**Worst case** is also `O(n log n)` — this is Heap Sort's primary advantage over Quick Sort. A reverse-sorted array does not cause degradation. The tradeoff is that Heap Sort has poor cache performance compared to Quick Sort due to non-sequential memory access during sift-down operations.",

  realWorldUses: [
    "**IntroSort (C++ STL):** Used as the fallback when Quick Sort's recursion depth exceeds `2 log n` to guarantee `O(n log n)` worst case.",
    "**Real-Time Systems:** Guaranteed `O(n log n)` with no worst-case surprises makes it suitable for hard real-time constraints.",
    "**Priority Queues:** The heapification step directly implements the core heap data structure used in Dijkstra, A*, and scheduling algorithms.",
    "**Memory-Constrained Environments:** The `O(1)` space overhead makes it ideal for embedded systems with minimal RAM.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Guaranteed `O(n log n)`:** Never degrades to quadratic time, unlike Quick Sort.",
      "**`O(1)` space:** No auxiliary arrays needed — purely in-place.",
      "**Not susceptible to adversarial inputs:** Unlike Quick Sort, no pivot selection can cause worst-case behavior.",
    ],
    limitations: [
      "**Not stable:** The heap extraction process changes the relative order of equal elements.",
      "**Poor cache performance:** Sift-down operations jump between parent and child indices, causing frequent cache misses.",
      "**Slower in practice than Quick Sort:** Despite identical asymptotic complexity, Quick Sort's cache-friendly sequential access typically wins.",
    ],
  },

  whenToUseIt:
    "Use **Heap Sort** when you need `O(n log n)` worst-case performance AND `O(1)` space — combining guarantees that Merge Sort and Quick Sort cannot both satisfy simultaneously.\n\nThe most common real-world use is as the fallback in **IntroSort** to prevent Quick Sort from degrading on adversarial inputs.\n\nFor pure sorting performance, Quick Sort is usually faster in practice due to better cache behavior.",
};
