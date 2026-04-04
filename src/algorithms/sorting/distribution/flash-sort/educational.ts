/**
 * Educational content for Flash Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Flash Sort. */
export const flashSortEducational: EducationalContent = {
  overview:
    "**Flash Sort** is a distribution-based sorting algorithm that achieves linear average-case performance by dividing elements into classes based on their value range, permuting them into approximately correct positions, and finishing with a single insertion sort pass.\n\nInvented by Karl-Dietrich Neubert in 1998, Flash Sort exploits the observation that if you know an element's approximate rank, you can place it near its final position in one step — much like finding the right chapter in a book before searching within it.",

  howItWorks:
    "Flash Sort operates in three distinct phases:\n\n" +
    "### Phase 1: Classification\n" +
    "1. Find the minimum and maximum values to establish the value range.\n" +
    "2. Divide the range into `m ≈ 0.45n` classes of equal width.\n" +
    "3. Count how many elements fall into each class — `O(n)` time.\n" +
    "4. Convert counts to prefix sums, giving each class its upper boundary index.\n\n" +
    "### Phase 2: Permutation (Cycle Sort)\n" +
    "5. Cycle through the array, placing each element into the highest unfilled slot of its class.\n" +
    "6. Each cycle moves at least one element to its approximate final position.\n" +
    "7. This phase runs in `O(n)` time with `O(1)` extra space — true in-place redistribution.\n\n" +
    "### Phase 3: Insertion Sort Cleanup\n" +
    "8. A single insertion sort pass over the whole array corrects small remaining disorder.\n" +
    "9. Because elements are already near their correct positions, this pass is nearly linear on average.\n\n" +
    "### Visualizing Flash Sort on [64, 34, 25, 12, 22, 11, 90]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Input: 64 34 25 12 22 11 90] --> B[Classify into 3 classes]\n" +
    "    B --> C[Class 0: 11-37 → 34 25 12 22 11]\n" +
    "    B --> D[Class 1: 37-63 → empty]\n" +
    "    B --> E[Class 2: 63-90 → 64 90]\n" +
    "    C --> F[Permutation: cycle elements to class slots]\n" +
    "    D --> F\n" +
    "    E --> F\n" +
    "    F --> G[Insertion sort cleanup]\n" +
    "    G --> H[Sorted: 11 12 22 25 34 64 90]\n" +
    "```\n\n" +
    "- **Step 1:** Min=11, Max=90, classCount=3\n" +
    "- **Step 2:** Class 0 (11–43): 5 elements; Class 1 (43–63): 0; Class 2 (63–90): 2\n" +
    "- **Step 3:** Permutation cycles each element into its class slot\n" +
    "- **Step 4:** Insertion sort finalizes order within each class",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n)` — when elements are uniformly distributed, all three phases run in linear time.\n" +
    "- **Average Case:** `O(n)` — uniform distribution assumption holds statistically for most real inputs.\n" +
    "- **Worst Case:** `O(n²)` — when all elements map to the same class (e.g., all identical values), the insertion sort cleanup becomes quadratic.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Requires an auxiliary class vector of size `m ≈ 0.45n`, so linear additional space.\n" +
    "The permutation and insertion phases are in-place beyond this class vector.",

  bestAndWorstCase:
    "**Best case** occurs with uniformly distributed data: each class receives roughly the same number of elements, the permutation phase completes quickly, and the insertion sort pass encounters very little disorder.\n\n" +
    "**Worst case** occurs when all elements hash to the same class — such as an array of identical values or a very skewed distribution. In this scenario, the insertion sort cleanup must perform `O(n²)` comparisons. For adversarial inputs, Flash Sort degrades worse than comparison-based algorithms.\n\n" +
    "The **sweet spot** is numerical data with a roughly uniform distribution across a known range — for example, random integers in [0, 10000] or floating-point measurements from a sensor.",

  realWorldUses: [
    "**Scientific Computing:** Sorting large arrays of uniformly distributed floating-point sensor readings or simulation outputs where O(n) average performance is critical.",
    "**Database Index Building:** Accelerating initial distribution passes before B-tree construction when value ranges are known.",
    "**Embedded Firmware:** When average-case linear performance is needed and value ranges are bounded and predictable.",
    "**Signal Processing:** Sorting sampled amplitude values where the signal range is constrained to a known interval.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Linear average time:** `O(n)` average case outperforms all comparison-based algorithms for uniform distributions.",
      "**In-place permutation:** The permutation phase uses only the class vector — no large auxiliary arrays needed beyond the `O(n)` class vector itself.",
      "**Cache-friendly:** Sequential access patterns during classification and insertion sort benefit from CPU cache.",
    ],
    limitations: [
      "**Worst case `O(n²)`:** Degenerate inputs (skewed distributions, many duplicates) cause quadratic behavior.",
      "**Fragile performance:** Depends heavily on input distribution — performs poorly on non-uniform data.",
      "**Complex implementation:** The permutation cycle logic is subtle and error-prone compared to simpler algorithms.",
      "**Numeric only:** Requires comparable numeric values to compute class indices — not directly applicable to strings or complex objects.",
    ],
  },

  whenToUseIt:
    "Use **Flash Sort** when sorting large arrays of **numeric data with a roughly uniform distribution** where average-case linear time is a priority. It excels in scientific or signal-processing workloads where value ranges are known in advance.\n\nAvoid it for adversarial inputs, sorted/reverse-sorted arrays, data with many duplicates, or non-numeric keys. For robust general-purpose sorting, prefer Timsort or Introsort which guarantee `O(n log n)` worst-case performance.",
};
