/**
 * Educational content for Intro Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Intro Sort. */
export const introSortEducational: EducationalContent = {
  overview:
    "**Intro Sort** (Introspective Sort) is a hybrid sorting algorithm that combines three sorting strategies " +
    "to achieve the best characteristics of each. Created by David Musser in 1997, it is the basis of " +
    "`std::sort` in C++ STL.\n\n" +
    "It starts with **Quick Sort** for average-case speed, monitors recursion depth, and automatically " +
    "switches to **Heap Sort** if the depth limit is exceeded (preventing Quick Sort's O(n²) worst case). " +
    "For small partitions, it falls back to **Insertion Sort** for its low overhead.",

  howItWorks:
    "Intro Sort uses three phases, switching between them automatically:\n\n" +
    "### Decision Logic\n" +
    "- **Partition size ≤ threshold** (16): Use Insertion Sort — fast for small arrays.\n" +
    "- **Depth limit = 0**: Use Heap Sort — guarantees O(n log n) regardless of data.\n" +
    "- **Otherwise**: Use Quick Sort with Lomuto partition, decrement depth limit.\n\n" +
    "### Depth Limit Calculation\n" +
    "The depth limit is set to `2 × floor(log₂(n))`. This is approximately twice the expected " +
    "recursion depth of Quick Sort on balanced partitions, providing a generous buffer before " +
    "switching to the heavier Heap Sort.\n\n" +
    "### Visualizing Intro Sort Decision Tree\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Start with range] --> B{Size ≤ 16?}\n" +
    "    B -- Yes --> C[Insertion Sort]\n" +
    "    B -- No --> D{Depth limit = 0?}\n" +
    "    D -- Yes --> E[Heap Sort]\n" +
    "    D -- No --> F[Quick Sort partition]\n" +
    "    F --> G[Recurse left, depth-1]\n" +
    "    F --> H[Recurse right, depth-1]\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style E fill:#1e3a5f,stroke:#3b82f6\n" +
    "    style F fill:#4a1942,stroke:#a855f7\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n log n)` | Quick Sort on balanced data |\n" +
    "| Average | `O(n log n)` | Quick Sort dominates; depth limit rarely triggered |\n" +
    "| Worst | `O(n log n)` | Heap Sort kicks in before recursion deepens excessively |\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "The recursion stack depth is bounded by the depth limit `2 log₂(n)`, so space usage is logarithmic. " +
    "Unlike Merge Sort, no auxiliary arrays are allocated.",

  bestAndWorstCase:
    "**Best case `O(n log n)`:** Well-balanced partitions, no depth-limit triggers, and small sub-arrays " +
    "handled by Insertion Sort. In practice this is typical for random input.\n\n" +
    "**Worst case `O(n log n)` (guaranteed):** The key innovation of Intro Sort is that it provably " +
    "avoids Quick Sort's `O(n²)` worst case. When the recursion depth exceeds `2 log₂(n)` — which only " +
    "happens with adversarial input — Heap Sort takes over for that subrange, capping the total work at " +
    "`O(n log n)`. This makes Intro Sort strictly superior to pure Quick Sort for production use.",

  realWorldUses: [
    "**C++ STL `std::sort`**: The canonical implementation of Intro Sort in production use.",
    "**.NET Array.Sort**: Microsoft's sorting implementation uses a variant of Intro Sort.",
    "**Competitive programming**: Preferred when Quick Sort's worst case is a concern.",
    "**Game engines**: Where predictable frame-time budgets require worst-case guarantees.",
    "**General-purpose libraries**: Any context where both average-case speed and worst-case safety are required.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**O(n log n) guaranteed**: Never degrades to quadratic time, unlike pure Quick Sort.",
      "**Cache-friendly**: Quick Sort's in-place partitioning maintains memory locality.",
      "**Adaptive**: Small partitions handled by Insertion Sort avoid Quick Sort overhead.",
      "**O(log n) space**: Only recursion stack depth — no auxiliary arrays.",
    ],
    limitations: [
      "**Not stable**: Equal elements may be reordered during partitioning.",
      "**Complex implementation**: Three algorithms in one is significantly harder to implement and debug.",
      "**Not adaptive to existing order**: Does not benefit from partially-sorted input like Tim Sort.",
    ],
  },

  whenToUseIt:
    "Use **Intro Sort** when you need the best general-purpose in-place sort with guaranteed `O(n log n)` " +
    "worst case. It is the production choice for:\n" +
    "- Systems where adversarial input is a concern (e.g., user-provided data).\n" +
    "- Memory-constrained environments where `O(n)` auxiliary space (Merge Sort, Tim Sort) is too expensive.\n" +
    "- C++ or .NET projects where `std::sort` behavior is desired.\n\n" +
    "Choose **Tim Sort** instead when stability or near-sorted input performance matters.",
};
