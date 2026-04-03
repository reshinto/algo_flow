/**
 * Educational content for Cube Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Cube Sort. */
export const cubeSortEducational: EducationalContent = {
  overview:
    "**Cube Sort** is a parallel merge sort variant that organizes data into **cube-root-sized blocks**. It divides the array into `∛n` blocks, sorts each block independently (using insertion sort for small blocks), then merges all sorted blocks together using a k-way merge.\n\nThe name comes from the cube-root block-size strategy, which is designed to balance the cost of sorting blocks against the cost of merging them — a concept borrowed from parallel sorting algorithms.",

  howItWorks:
    "Cube Sort operates in two phases:\n\n" +
    "### Phase 1: Divide and Sort Blocks\n" +
    "1. Compute block size as `⌈∛n⌉` (cube root of the array length, rounded up).\n" +
    "2. Divide the array into `⌈n / blockSize⌉` blocks.\n" +
    "3. Sort each block independently using insertion sort (optimal for small blocks).\n\n" +
    "### Phase 2: K-Way Merge\n" +
    "1. Maintain a pointer to the current minimum element in each sorted block.\n" +
    "2. Repeatedly extract the global minimum from all block fronts.\n" +
    "3. Advance the pointer in the block from which the minimum was taken.\n" +
    "4. Write results into a result array, then copy back.\n\n" +
    "### Visualizing Cube Sort on [9, 5, 2, 8, 3, 7, 1, 6, 4]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Input: [9,5,2,8,3,7,1,6,4]"] --> B["Block 1: [9,5,2]"] & C["Block 2: [8,3,7]"] & D["Block 3: [1,6,4]"]\n' +
    '    B --> E["Sorted: [2,5,9]"]\n' +
    '    C --> F["Sorted: [3,7,8]"]\n' +
    '    D --> G["Sorted: [1,4,6]"]\n' +
    '    E & F & G --> H["K-way merge → [1,2,3,4,5,6,7,8,9]"]\n' +
    "    style H fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- Block size for n=9: `⌈∛9⌉ = ⌈2.08⌉ = 3` → 3 blocks of size 3",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "- **Best Case:** `O(n log n)` — all cases require sorting and merging the blocks.\n" +
    "- **Average Case:** `O(n log n)` — insertion sort within blocks is O(b²) per block × (n/b) blocks + merge O(n log(n/b)), summing to O(n log n).\n" +
    "- **Worst Case:** `O(n log n)` — guaranteed regardless of input order.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The k-way merge requires a result array of size n to write the merged output before copying back. No in-place merging is performed.",

  bestAndWorstCase:
    "**Best case** and **worst case** both yield `O(n log n)`. Unlike adaptive sorts such as Insertion Sort or Smooth Sort, Cube Sort does not short-circuit on nearly-sorted input — it always divides into blocks and merges them.\n\n" +
    "The key insight is that the **cube-root block size** balances two competing costs: smaller blocks are cheaper to sort (insertion sort is O(b²) per block), but produce more blocks that are more expensive to merge. The cube-root choice theoretically minimizes the constant factor in multi-pass parallel merge settings.",

  realWorldUses: [
    "**Parallel sorting systems:** The block-divide strategy maps naturally onto parallel architectures where each block can be sorted independently on a separate processor.",
    "**External sorting:** When data is too large for memory, dividing into manageable blocks and performing a k-way merge is a standard technique (similar to merge sort in database systems).",
    "**Educational tool:** Cube Sort illustrates the divide-and-conquer merge pattern in a way that's more visual than plain merge sort, thanks to the distinct blocking phase.",
    "**Cache-efficient sorting:** Sorting small blocks that fit in L1/L2 cache before merging can improve cache utilization compared to recursive merge sort.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Parallelizable:** Each block can be sorted independently, making the algorithm naturally parallel.",
      "**Predictable:** O(n log n) in all cases with no pathological worst-case behavior.",
      "**Modular:** The inner sorting algorithm (insertion sort for small blocks) can be swapped for any suitable algorithm.",
    ],
    limitations: [
      "**Not adaptive:** Does not benefit from nearly-sorted input the way Insertion Sort or Tim Sort do.",
      "**Extra space:** Requires O(n) additional memory for the merge output array.",
      "**Not stable in all configurations:** Stability depends on the stability of the inner block sort and the merge strategy.",
      "**Cube-root heuristic:** The block size optimality assumption is derived from theoretical parallel models and may not match real hardware cache hierarchies.",
    ],
  },

  whenToUseIt:
    "Use **Cube Sort** when you need a predictable O(n log n) sort with a clear divide-and-merge structure that maps well to parallel or external-memory settings. It is a good teaching example for k-way merge patterns.\n\nAvoid it when memory is constrained (requires O(n) extra space), when input is expected to be nearly sorted (use Tim Sort or Insertion Sort instead), or when stability with minimal overhead is required (use Merge Sort).",
};
