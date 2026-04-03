/**
 * Educational content for Cycle Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Cycle Sort. */
export const cycleSortEducational: EducationalContent = {
  overview:
    "**Cycle Sort** is an in-place, comparison-based sorting algorithm that is theoretically **optimal " +
    "for minimizing writes** to the array. It was designed for situations where the cost of writing to " +
    "memory is significantly higher than the cost of reading or comparing.\n\n" +
    "The algorithm is based on the idea that any permutation can be decomposed into **cycles**. " +
    "Each element is placed directly into its correct position, and displaced elements are cycled " +
    "through until the cycle closes.",

  howItWorks:
    "Cycle Sort works by decomposing the permutation into cycles:\n\n" +
    "### For each starting position:\n" +
    "1. **Count position**: Count how many elements are smaller than the current element to find its correct index.\n" +
    "2. **Skip duplicates**: Advance the target position past any equal elements.\n" +
    "3. **Place element**: Write the current element to its correct position, saving the displaced value.\n" +
    "4. **Cycle**: Repeat steps 1–3 with the displaced value until returning to the cycle start.\n\n" +
    "### Visualizing Cycle Sort on [3, 1, 5, 2, 4]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["Start: [3,1,5,2,4]"] --> B["3 belongs at index 2 (two smaller: 1,2)"]\n' +
    '    B --> C["Swap 3↔5: displaced=5, placed=3"]\n' +
    '    C --> D["5 belongs at index 4, swap 5↔4: displaced=4"]\n' +
    '    D --> E["4 belongs at index 3, swap 4↔2: displaced=2"]\n' +
    '    E --> F["2 belongs at index 1, swap 2↔1: displaced=1"]\n' +
    '    F --> G["1 belongs at index 0 = cycle start → cycle closed"]\n' +
    '    G --> H["Result: [1,2,3,4,5]"]\n' +
    "    style H fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n²)` | Must count positions even when no writes needed |\n" +
    "| Average | `O(n²)` | Two nested loops: outer for cycles, inner for counting |\n" +
    "| Worst | `O(n²)` | Identical — counting pass always scans the full unsorted portion |\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Sorting is entirely in-place. Only a constant number of temporary variables are needed " +
    "(current value, displaced value, position counter).\n\n" +
    "**Write Complexity: `O(n)`** (theoretical minimum)\n\n" +
    "Cycle Sort performs at most `n - 1` writes, which is the theoretical minimum for any " +
    "comparison-based sorting algorithm. This is its primary advantage.",

  bestAndWorstCase:
    "**Best case** is still `O(n²)` for comparisons. Even when the array is already sorted, " +
    "Cycle Sort must scan the entire unsorted portion for every position to count smaller elements " +
    "and confirm the position is correct. There is no early termination.\n\n" +
    "**Worst case** is also `O(n²)` — the comparison count never varies. However, the number of " +
    "writes varies: a sorted array requires **0 writes**, while a fully reversed array requires " +
    "approximately **n/2 writes** (one per cycle).\n\n" +
    "This makes Cycle Sort unique: it has the **worst time complexity** among O(n²) sorts (tied " +
    "with Selection Sort), but the **best write complexity** of any comparison sort.",

  realWorldUses: [
    "**EEPROM and Flash memory**: Memory cells degrade with each write. Cycle Sort's minimum-write guarantee extends the lifetime of storage hardware.",
    "**Write-once media**: Optical discs and certain persistent storage systems benefit from minimizing writes.",
    "**Cache invalidation studies**: Cycle Sort is used to demonstrate write-minimization theory in computer architecture courses.",
    "**Educational content**: Cycle decomposition of permutations is a fundamental concept in abstract algebra — Cycle Sort makes it tangible.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Minimum writes**: Provably optimal write count — at most `n - 1` writes regardless of input.",
      "**In-place**: Requires only `O(1)` auxiliary space.",
      "**Theoretically complete**: Based on rigorous permutation cycle theory.",
    ],
    limitations: [
      "**O(n²) always**: No scenario avoids the quadratic comparison count.",
      "**Not adaptive**: Cannot benefit from any existing order in the input.",
      "**Not stable**: Cycle rotation can displace equal elements.",
      "**Rarely used in practice**: The write-minimization benefit is only relevant in specialized storage contexts.",
    ],
  },

  whenToUseIt:
    "Use **Cycle Sort** exclusively when **write operations are extremely costly** and the array is " +
    "small enough that `O(n²)` comparisons are acceptable. The canonical example is sorting data " +
    "stored in **EEPROM or Flash memory** where each write operation wears out the hardware.\n\n" +
    "For virtually all other contexts, **Selection Sort** achieves the same minimum-swap property " +
    "with simpler implementation, and **Tim Sort** or **Intro Sort** dominate in performance.",
};
