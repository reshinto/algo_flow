/**
 * Educational content for Comb Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Comb Sort. */
export const combSortEducational: EducationalContent = {
  overview:
    "**Comb Sort** improves upon Bubble Sort by comparing elements that are far apart rather than only adjacent ones. It uses a **shrinking gap** (reduced by a factor of 1.3 each pass) to efficiently eliminate inversions between distant elements — fixing the *turtle problem* that plagues plain Bubble Sort.\n\nAs the gap shrinks to 1, Comb Sort degenerates to a final Bubble Sort pass to clean up remaining inversions, resulting in a sorted array.",

  howItWorks:
    "Comb Sort begins with a large gap equal to the array length, then repeatedly shrinks it by dividing by 1.3 (rounded down) until the gap reaches 1.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. **Set initial gap** = `floor(arrayLength / 1.3)`. If gap ≤ 1, set gap = 1 and assume sorted.\n" +
    "2. **Compare pass** — for each `startIndex` from 0 to `arrayLength - gap - 1`, compare `arr[startIndex]` with `arr[startIndex + gap]`. Swap if out of order.\n" +
    "3. If any swap occurred, the array is not yet sorted.\n" +
    "4. **Shrink gap** → go to step 1.\n" +
    "5. When gap = 1 and a full pass produces no swaps, the array is sorted.\n\n" +
    "### Why factor 1.3?\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[gap = n] -->|÷1.3| B[gap = n/1.3]\n" +
    "    B -->|÷1.3| C[gap = n/1.69]\n" +
    "    C -->|...| D[gap = 1]\n" +
    "    D -->|no swaps| E[Sorted!]\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    'Empirical testing showed that 1.3 minimizes comparisons across random inputs. Gaps of 9 and 10 are also skipped (they produce suboptimal results) — sometimes referred to as the "combsort11" variant.',

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n log n)` | Large gaps eliminate most inversions quickly |\n" +
    "| Average | `O(n²/2^p)` | `p` is number of gap-shrink increments |\n" +
    "| Worst | `O(n²)` | Pathological input where final gap-1 passes do heavy work |\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "All operations are performed in-place. Only the gap counter and temporary swap variable are needed.",

  bestAndWorstCase:
    "**Best case `O(n log n)`** occurs when the large gap passes efficiently move most elements to their correct positions, leaving little work for the final gap-1 sweep.\n\n" +
    "**Worst case `O(n²)`** occurs on pathological inputs where elements remain highly disordered even after large-gap passes. In practice Comb Sort significantly outperforms Bubble Sort even in bad cases due to the early large-gap work.\n\n" +
    "**Practical performance:** On random data, Comb Sort typically runs 3–5× faster than Bubble Sort and approaches the constant factor of Shell Sort, making it a viable simple algorithm for moderate-sized datasets.",

  realWorldUses: [
    "**Moderate-sized arrays:** Offers substantially better real-world performance than Bubble Sort with similar code complexity.",
    "**Educational tool:** Demonstrates how comparing non-adjacent elements accelerates sorting — a key insight behind Shell Sort.",
    "**Embedded systems:** Simple gap logic with no recursion or auxiliary structures fits tight memory constraints.",
    "**Hardware implementations:** The regular access pattern of gap-based comparisons maps well to pipelined or SIMD hardware.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Much faster than Bubble Sort in practice** — large-gap passes eliminate distant inversions early.",
      "**In-place:** `O(1)` auxiliary space.",
      "**Simple implementation:** Only a gap counter and a `sorted` flag added on top of Bubble Sort.",
      "**No recursion:** Avoids call stack overhead.",
    ],
    limitations: [
      "**Not stable:** Swapping non-adjacent elements can reorder equal values.",
      "**Worst-case `O(n²)`** — not competitive with Merge Sort, Heap Sort, or Timsort for large inputs.",
      "The shrink factor of 1.3 is empirically determined, not theoretically optimal.",
    ],
  },

  whenToUseIt:
    "Use **Comb Sort** when you need a simple in-place sort that is meaningfully faster than Bubble Sort, and stability is not required. It is an excellent drop-in improvement over Bubble Sort for datasets in the hundreds.\n\nAvoid it for large datasets or when stability is required — prefer Timsort, Merge Sort, or Introsort instead.",
};
