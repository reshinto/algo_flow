import type { EducationalContent } from "@/types";

export const cyclicSortEducational: EducationalContent = {
  overview:
    "**Cyclic Sort** is an in-place sorting algorithm that runs in `O(n)` time when the input array contains values " +
    "in the range `1` to `n` (one value per index). Instead of comparing elements, it uses the known mapping: " +
    "the value `v` belongs at index `v - 1`. The algorithm iterates through the array and, for each element not " +
    "in its correct position, swaps it directly to where it belongs — forming a *cycle* of displacements. " +
    "This gives it the minimum possible number of writes for permutation-based arrays.",

  howItWorks:
    "1. Set `currentIndex = 0`.\n" +
    "2. While `currentIndex < array.length`:\n" +
    "   * Compute `correctIndex = array[currentIndex] - 1`.\n" +
    "   * If `array[currentIndex] !== currentIndex + 1`:\n" +
    "     Swap `array[currentIndex]` with `array[correctIndex]`. Do **not** advance `currentIndex`.\n" +
    "   * Else: the element is already home — advance `currentIndex`.\n" +
    "3. When `currentIndex` reaches the end, every element is at its correct position.\n\n" +
    "### The Key Insight\n\n" +
    "By not advancing `currentIndex` after a swap, the algorithm re-examines whatever new value landed at " +
    "`currentIndex`. This chains swaps into a *cycle* until the correct value arrives at the current position, " +
    "then the index advances. Each element is moved at most once, yielding `O(n)` total writes.\n\n" +
    "### Walkthrough with `[3, 5, 2, 1, 4, 6]`\n\n" +
    "| currentIndex | Array                  | Action                         |\n" +
    "|--------------|------------------------|--------------------------------|\n" +
    "| 0            | [3, 5, 2, 1, 4, 6]     | arr[0]=3 → swap with index 2   |\n" +
    "| 0            | [2, 5, 3, 1, 4, 6]     | arr[0]=2 → swap with index 1   |\n" +
    "| 0            | [5, 2, 3, 1, 4, 6]     | arr[0]=5 → swap with index 4   |\n" +
    "| 0            | [4, 2, 3, 1, 5, 6]     | arr[0]=4 → swap with index 3   |\n" +
    "| 0            | [1, 2, 3, 4, 5, 6]     | arr[0]=1 → in place, advance   |\n" +
    "| 1            | [1, 2, 3, 4, 5, 6]     | arr[1]=2 → in place, advance   |\n" +
    "| ...          | [1, 2, 3, 4, 5, 6]     | all remaining in place         |\n\n" +
    "**Result**: `[1, 2, 3, 4, 5, 6]` — sorted in 4 swaps.\n\n" +
    "### Swap Chain Diagram (first cycle on `[3, 5, 2, 1, 4]`)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["idx 0\\n3"] -->|"swap→idx 2"| B["idx 2\\n2"]\n' +
    '  B -->|"swap→idx 1"| C["idx 1\\n5"]\n' +
    '  C -->|"swap→idx 4"| D["idx 4\\n4"]\n' +
    '  D -->|"swap→idx 3"| E["idx 3\\n1"]\n' +
    '  E -->|"swap→idx 0"| F["idx 0\\n1 ✓"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each swap sends a value directly to its correct index (`value - 1`). The cycle completes when value `1` lands at index `0`, and `currentIndex` advances.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Although the outer `while` loop may appear to revisit `currentIndex` during swap chains, " +
    "each element is moved to its correct position at most once. Once placed correctly, it is never moved again. " +
    "The total number of swaps is therefore at most `n - 1`, giving `O(n)` total operations.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The sort is done fully in-place using only two index variables and a temporary swap variable. " +
    "No auxiliary arrays or recursion stack is needed.",

  bestAndWorstCase:
    "**Best case `O(n)`**: The array is already sorted `[1, 2, 3, ..., n]`. " +
    "The `currentIndex` advances every step with no swaps — `n` comparisons, `0` swaps.\n\n" +
    "**Worst case `O(n)`**: The array is a single large cycle, e.g., `[2, 3, 4, 5, ..., n, 1]`. " +
    "Every element requires a swap before the index can advance — `n - 1` swaps.\n\n" +
    "In all cases the time complexity is exactly `O(n)` comparisons and at most `n - 1` swaps. " +
    "Cyclic Sort achieves the **minimum possible number of writes** for sorting permutation arrays, " +
    "making it ideal when writes are expensive (e.g., flash memory or HDDs).\n\n" +
    "### Compared to Other Sorts\n\n" +
    "| Algorithm    | Time       | Space | Min Writes? | Constraint          |\n" +
    "|--------------|------------|-------|-------------|---------------------|\n" +
    "| Cyclic Sort  | `O(n)`     | `O(1)`| Yes         | Values must be 1..n |\n" +
    "| Counting Sort| `O(n+k)`   | `O(k)`| No          | Integer keys only   |\n" +
    "| Selection Sort| `O(n²)`   | `O(1)`| Near-min    | Any comparable      |\n" +
    "| Merge Sort   | `O(n log n)`| `O(n)`| No         | Any comparable      |",

  realWorldUses: [
    "**Finding Missing Numbers:** Cyclic Sort is the foundation of an `O(n)` algorithm for finding one or more missing values in a range-1-to-n array.",
    "**Finding Duplicate Numbers:** Adapting the sort to detect when swapping would overwrite an equal value reveals duplicates in `O(n)` time and `O(1)` space.",
    "**Flash Memory Optimization:** Minimizing write cycles on storage media where each write has a cost or wear limit.",
    "**Permutation Validation:** Quickly verifying or restoring a permutation to canonical order during data integrity checks.",
    "**Competitive Programming:** A standard building block for a family of array-manipulation problems involving 1-to-n value ranges.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — matches the theoretical lower bound for this constrained input.",
      "Minimum number of writes — at most `n - 1` swaps regardless of input order.",
      "In-place `O(1)` space — no auxiliary arrays or recursion stack.",
      "Forms the basis for several `O(n)` / `O(1)` missing/duplicate number algorithms.",
      "Simple implementation — a single `while` loop with one conditional swap.",
    ],
    limitations: [
      "Only applicable when array values are exactly the integers `1` to `n` (one of each).",
      "Not stable — relative order of equal elements is not preserved (though equal values break the 1..n assumption).",
      "Cannot be used for general sorting of arbitrary keys — use comparison or radix sort for that.",
      "The do-not-advance-on-swap pattern requires careful understanding to avoid accidental infinite loops.",
    ],
  },

  whenToUseIt:
    "Use **Cyclic Sort** when the problem guarantees that the input contains exactly the integers `1` through `n` " +
    "(or a small, known integer range), and you need an `O(n)` time, `O(1)` space solution.\n\n" +
    "It is the go-to algorithm for a family of LeetCode-style problems: " +
    "*find the missing number*, *find all duplicates*, *find the smallest missing positive*, etc.\n\n" +
    "**Do not use** for general-purpose sorting — the 1-to-n constraint is mandatory. " +
    "For arbitrary keys, prefer merge sort (stable, `O(n log n)`) or a radix sort for integers.",
};
