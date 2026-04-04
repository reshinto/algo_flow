/**
 * Educational content for Tim Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Tim Sort. */
export const timSortEducational: EducationalContent = {
  overview:
    "**Tim Sort** is a hybrid sorting algorithm derived from **Insertion Sort** and **Merge Sort**. " +
    "It was designed by Tim Peters in 2002 for use in Python and is now also used in Java's `Arrays.sort` " +
    "for objects.\n\n" +
    "The key insight is that real-world data frequently contains **natural runs** — sequences that are already " +
    "partially sorted. Tim Sort exploits this by identifying or building small sorted runs, then merging them " +
    "efficiently using a merge sort variant.",

  howItWorks:
    "Tim Sort works in two phases:\n\n" +
    "### Phase 1: Build Runs\n" +
    "1. Divide the array into small chunks called **runs** of size `MIN_RUN` (typically 32–64, here 4 for visibility).\n" +
    "2. Sort each run using **Insertion Sort** — efficient for small arrays due to low overhead.\n" +
    "3. Natural ascending runs are kept; descending runs are reversed.\n\n" +
    "### Phase 2: Merge Runs\n" +
    "4. Merge adjacent sorted runs using a stable merge, doubling the merge width each pass.\n" +
    "5. Continue until the entire array is one sorted run.\n\n" +
    "### Visualizing Tim Sort on [8, 3, 6, 1, 5, 2, 7, 4]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Input: [8,3,6,1,5,2,7,4]"] --> B["Run 1: [8,3,6,1] → insertion sort → [1,3,6,8]"]\n' +
    '    A --> C["Run 2: [5,2,7,4] → insertion sort → [2,4,5,7]"]\n' +
    '    B --> D["Merge [1,3,6,8] + [2,4,5,7]"]\n' +
    "    C --> D\n" +
    '    D --> E["Result: [1,2,3,4,5,6,7,8]"]\n' +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Galloping Mode** (production variant): When one run repeatedly wins comparisons, Tim Sort switches " +
    "to binary search to skip ahead faster — an optimization omitted in this visualization for clarity.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n)` | Already-sorted input — each run is found and no merges needed |\n" +
    "| Average | `O(n log n)` | Runs of size `MIN_RUN` merged in `log(n/MIN_RUN)` passes |\n" +
    "| Worst | `O(n log n)` | Fully reverse-sorted — maximum work in both phases |\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Merge Sort requires auxiliary space proportional to the input. Tim Sort uses `O(n)` extra memory " +
    "during the merge phase for the temporary left/right slices.",

  bestAndWorstCase:
    "**Best case `O(n)`:** An already-sorted (or nearly-sorted) array hits Tim Sort's sweet spot. " +
    "Each chunk is already a valid run, insertion sort does no work within the chunk, and the merge phase " +
    "detects that runs are already in order, completing in linear time.\n\n" +
    "**Worst case `O(n log n)`:** A reverse-sorted array forces insertion sort to perform maximum swaps " +
    "in every run and requires full merging across all passes. Even so, it never degrades below `O(n log n)`, " +
    "unlike Quick Sort which can reach `O(n²)`.",

  realWorldUses: [
    "**Python's built-in `sort()`**: Tim Sort has been Python's default sorting algorithm since Python 2.3.",
    "**Java's `Arrays.sort` for objects**: Used for reference types where stability is required.",
    "**Android and V8**: Used in production runtimes where data is frequently partially ordered.",
    "**Database engines**: Sorting result sets that come from ordered indexes benefits from Tim Sort's run detection.",
    "**File system operations**: Directory listings often arrive in near-sorted order.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Adaptive**: Exploits existing order in the data, achieving `O(n)` on nearly-sorted inputs.",
      "**Stable**: Preserves the relative order of equal elements.",
      "**`O(n log n)` worst case**: Unlike Quick Sort, never degrades to quadratic time.",
      "**Practical speed**: Outperforms pure Merge Sort on real-world datasets due to insertion sort's efficiency on small runs.",
    ],
    limitations: [
      "**`O(n)` space**: Requires auxiliary memory for merging — unsuitable for memory-constrained environments.",
      "**Complexity**: Significantly more complex to implement correctly than Merge Sort or Quick Sort.",
      "**Overhead on random data**: For fully random input, the run-detection overhead adds constant factors.",
    ],
  },

  whenToUseIt:
    "Use **Tim Sort** when you need a general-purpose, stable, `O(n log n)` sort that performs well on " +
    "real-world data (which is rarely fully random). It is the right choice when:\n" +
    "- Stability (preserving equal-element order) is required.\n" +
    "- The data may be partially sorted.\n" +
    "- You need guaranteed `O(n log n)` worst case.\n\n" +
    "Avoid it when memory is severely constrained (`O(1)` space algorithms like Heap Sort are preferable) " +
    "or when simplicity of implementation is prioritized over performance.",
};
