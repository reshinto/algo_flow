import type { EducationalContent } from "@/types";

export const heapSortVisualizationEducational: EducationalContent = {
  overview:
    "**Heap Sort (Tree View)** visualizes the heap sort algorithm from the **heap tree perspective**, showing how the max-heap shrinks as elements are extracted to their final sorted positions. Unlike bar-chart sorting visualizations, this view reveals the heap's tree structure at every step.\n\nHeap sort runs in guaranteed `O(n log n)` time with `O(1)` auxiliary space — no recursion, no extra arrays, purely in-place.",

  howItWorks:
    "Heap sort proceeds in two distinct phases:\n\n" +
    "**Phase 1 — Build Max-Heap (heapify):**\n" +
    "Starting from the last non-leaf node and working toward the root, call sift-down on each node. This builds a valid max-heap in `O(n)` time (not `O(n log n)` — most nodes sift a short distance).\n\n" +
    "**Phase 2 — Extraction Loop:**\n" +
    "1. Swap the root (current maximum) with the last element of the active heap.\n" +
    "2. The swapped element is now in its final sorted position — mark it settled.\n" +
    "3. Shrink the active heap by one (exclude the settled element).\n" +
    "4. Sift-down the new root to restore max-heap property.\n" +
    "5. Repeat until one element remains.\n\n" +
    "### Example: [9, 5, 7, 1, 3, 8, 2, 6, 4]\n\n" +
    "```\n" +
    "After heapify:     9\n" +
    "                  / \\\n" +
    "                 6   8\n" +
    "                / \\ / \\\n" +
    "               5  3 7  2\n" +
    "              / \\\n" +
    "             1   4\n\n" +
    "Extract 9 → swap with 4 → settled: [_, _, _, _, _, _, _, _, 9]\n" +
    "Sift-down 4 → heap shrinks, 8 becomes root\n" +
    "Extract 8 → swap with 1 → settled: [_, _, _, _, _, _, _, 8, 9]\n" +
    "... continues until sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n" +
    "```\n\n" +
    "### Max-Heap After Heapify — Before First Extraction\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n9((9)) --> n6((6))\n" +
    "    n9 --> n8((8))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n3((3))\n" +
    "    n8 --> n7((7))\n" +
    "    n8 --> n2((2))\n" +
    "    n5 --> n4((4))\n" +
    "    style n9 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n4 fill:#f59e0b,stroke:#d97706\n" +
    "    style n2 fill:#14532d,stroke:#22c55e\n" +
    "    style n3 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The root (cyan) is always the current maximum. Node 4 (amber) is the last array element — it will swap with 9 when extraction begins.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)` — all cases**\n\n" +
    "- Phase 1 (build heap): `O(n)` — most sift-down operations are short; the sum of heights is `O(n)`.\n" +
    "- Phase 2 (extraction loop): `n-1` extractions × `O(log n)` sift-down each = `O(n log n)`.\n" +
    "- Total: `O(n log n)` in best, average, and worst cases — no pivot-selection luck needed.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "All operations are in-place on the input array. Only a constant number of index variables are used.",

  bestAndWorstCase:
    "**Best case — `O(n log n)`:** Even on an already-sorted array, heap sort must build the heap and run all extractions. There is no early exit.\n\n" +
    "**Worst case — `O(n log n)`:** The guarantee holds regardless of input distribution — heapsort is not susceptible to adversarial inputs that degrade quicksort to `O(n²)`.\n\n" +
    "**Practical note:** Despite identical asymptotic bounds, heapsort is typically slower than quicksort in practice due to poor cache locality. The heap accesses memory in non-sequential patterns, causing frequent cache misses. Introsort (used by C++ `std::sort`) switches to heapsort only as a worst-case fallback.",

  realWorldUses: [
    "**Introsort fallback:** C++ STL's `std::sort` and many production sort implementations use heapsort as a guaranteed O(n log n) fallback when quicksort's recursion depth exceeds a threshold.",
    "**Real-time systems:** Heapsort's predictable O(n log n) worst case makes it suitable for real-time scheduling where variable-time algorithms are unacceptable.",
    "**Priority queue drain:** Sorting all elements of a priority queue by repeatedly extracting the maximum is equivalent to heapsort.",
    "**Selection algorithms:** The first phase (heapify) alone enables O(n + k log n) selection of the k largest elements.",
    "**Memory-constrained environments:** O(1) auxiliary space makes heapsort attractive when the input array itself is the only available memory.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guaranteed O(n log n) in all cases — no adversarial inputs can degrade it.",
      "O(1) auxiliary space — true in-place sorting with no recursion stack.",
      "No need for extra memory allocation — suitable for embedded or constrained environments.",
    ],
    limitations: [
      "Not stable — elements with equal values may swap relative order during sift operations.",
      "Poor cache performance — heap accesses jump around memory non-sequentially, causing frequent cache misses.",
      "Slower than quicksort in practice — the constant factor is higher despite identical Big-O bounds.",
    ],
  },

  whenToUseIt:
    "Choose heap sort when you need a guaranteed `O(n log n)` sort with `O(1)` auxiliary space and stability is not required. It shines in memory-constrained environments and as a fallback in hybrid sort algorithms. Prefer quicksort or merge sort for general-purpose sorting where cache performance matters. Use merge sort when stability is required.",
};
