/**
 * Educational content for Odd-Even Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Odd-Even Sort. */
export const oddEvenSortEducational: EducationalContent = {
  overview:
    "**Odd-Even Sort** (also called Brick Sort or Odd-Even Transposition Sort) is a variation of Bubble Sort that alternates between two phases each pass: an **odd phase** comparing pairs at positions (1,2), (3,4), (5,6)... and an **even phase** comparing pairs at positions (0,1), (2,3), (4,5)...\n\nThis alternating strategy is parallelizable — in hardware or parallel computing, all comparisons within a single phase can execute simultaneously, making it a foundational algorithm in parallel sorting networks.",

  howItWorks:
    "Odd-Even Sort repeatedly alternates odd-phase and even-phase passes until a complete round produces no swaps.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. **Odd phase:** Compare and possibly swap each pair `(arr[1], arr[2])`, `(arr[3], arr[4])`, `(arr[5], arr[6])`, ...\n" +
    "2. **Even phase:** Compare and possibly swap each pair `(arr[0], arr[1])`, `(arr[2], arr[3])`, `(arr[4], arr[5])`, ...\n" +
    "3. If neither phase made any swaps, the array is sorted — stop.\n" +
    "4. Otherwise repeat from step 1.\n\n" +
    "### Visualizing on [5, 3, 1, 4, 2]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Start: 5 3 1 4 2]\n" +
    "    B[Odd phase: compare 3↔1, 4↔2 → 5 1 3 2 4]\n" +
    "    C[Even phase: compare 5↔1, 3↔2, 4 → 1 5 2 3 4]\n" +
    "    D[Odd phase: compare 5↔2, 3↔4 → 1 2 5 3 4]\n" +
    "    E[Even phase: compare 1↔2, 5↔3 → 1 2 3 5 4]\n" +
    "    F[Odd phase: compare 2↔3, 5↔4 → 1 2 3 4 5]\n" +
    "    G[Even phase: no swaps → Sorted!]\n" +
    "    A --> B --> C --> D --> E --> F --> G\n" +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n)` | Already sorted — single pass with no swaps |\n" +
    "| Average | `O(n²)` | Elements traverse many positions |\n" +
    "| Worst | `O(n²)` | Reverse-sorted requires maximum passes |\n\n" +
    "**Parallel Complexity: `O(n)`** — when all comparisons within a phase execute simultaneously on `n/2` processors.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Fully in-place with only loop counters and a temporary swap variable.",

  bestAndWorstCase:
    "**Best case `O(n)`** occurs on an already-sorted array. The first odd phase and first even phase both complete without any swaps, so the sorted flag remains true and the algorithm terminates after a single round.\n\n" +
    "**Worst case `O(n²)`** occurs on a reverse-sorted array. Each round of two phases can move an element at most two positions toward its destination, so it takes up to `n/2` full rounds — each with `O(n)` comparisons — yielding `O(n²)` total work.\n\n" +
    "**Parallel advantage:** In a parallel model with `n/2` processors, both phases take `O(1)` time each, so the total parallel time is `O(n)` — making Odd-Even Sort optimal for parallel sorting networks.",

  realWorldUses: [
    "**Parallel sorting networks:** The canonical use case — each phase's independent comparisons map to concurrent hardware comparators.",
    "**SIMD / GPU sorting:** Used in GPU sort kernels where independent warp-level comparisons execute in lock-step.",
    "**Distributed systems:** Nodes in a ring topology can sort using odd-even transposition with neighbors.",
    "**Educational tool:** Clearly demonstrates the concept of data-parallel sorting and sorting network theory.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Highly parallelizable:** Each phase consists of independent comparisons that can run simultaneously.",
      "**Stable:** Preserves relative order of equal elements.",
      "**In-place:** `O(1)` auxiliary space.",
      "**Early termination:** Detects sorted input in a single round.",
    ],
    limitations: [
      "`O(n²)` sequential time — no better than Bubble Sort in a single-core execution.",
      "Requires `n/2` processors to achieve the `O(n)` parallel speedup.",
      "Not widely used in single-threaded applications where simpler algorithms suffice.",
    ],
  },

  whenToUseIt:
    "Use **Odd-Even Sort** when studying parallel sorting algorithms, implementing sorting networks, or working with SIMD/GPU architectures where independent comparisons within each phase can execute simultaneously. Its simple two-phase structure maps cleanly to data-parallel hardware.\n\nAvoid it for single-threaded applications on large datasets — Timsort, Merge Sort, or Introsort are far more efficient there.",
};
