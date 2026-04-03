/**
 * Educational content for Double Selection Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Double Selection Sort. */
export const doubleSelectionSortEducational: EducationalContent = {
  overview:
    "**Double Selection Sort** is an optimization of Selection Sort that finds **both the minimum and maximum** elements in a single scan, then places both in their correct positions simultaneously.\n\nThis halves the number of passes needed — where standard Selection Sort does `n - 1` full scans, Double Selection Sort does only `⌊n / 2⌋` scans. Comparisons are reduced by roughly half, though the overall complexity remains `O(n²)`.",

  howItWorks:
    "Double Selection Sort shrinks the unsorted region from **both ends** simultaneously.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Start with `leftBound = 0` and `rightBound = n - 1`.\n" +
    "2. Scan from `leftBound` to `rightBound`, tracking both `minimumIndex` and `maximumIndex`.\n" +
    "3. **Swap minimum** to `leftBound`. If the maximum happened to be at `leftBound`, update `maximumIndex` to follow the swap.\n" +
    "4. **Swap maximum** to `rightBound`.\n" +
    "5. Advance `leftBound` right and `rightBound` left.\n" +
    "6. Repeat until bounds meet.\n\n" +
    "### Visualizing Double Selection Sort on [64, 34, 25, 12, 22, 11, 90]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Pass 1 - find min=11 at idx 5, max=90 at idx 6\n" +
    "    A[64] -.->|swap min| B[11]\n" +
    "    C[90] -.->|already at right| D[90]\n" +
    "    end\n" +
    "    subgraph After Pass 1\n" +
    "    E[11] --- F[34] --- G[25] --- H[12] --- I[22] --- J[64] --- K[90]\n" +
    "    end\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "    style K fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1:** min=`11`, max=`90` → place `11` at index 0, `90` at index 6\n" +
    "- **Pass 2:** Scan [1..5], min=`12`, max=`64` → place `12` at index 1, `64` at index 5\n" +
    "- **Pass 3:** Scan [2..4], min=`22`, max=`34` → place `22` at index 2, `34` at index 4\n" +
    "- **Middle:** `25` is already in place",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "- **Best Case:** `O(n²)` — still performs `n(n-1)/4` comparisons per pass regardless of input order.\n" +
    "- **Average Case:** `O(n²)` — roughly half the passes of standard Selection Sort, but still quadratic.\n" +
    "- **Worst Case:** `O(n²)` — identical asymptotic behavior, though the constant factor is approximately half.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Fully in-place. Only a constant number of index and temporary variables are needed.",

  bestAndWorstCase:
    "**Best case** and worst case are both `O(n²)` comparisons — there is no early-exit condition and the number of comparisons is fixed regardless of the initial order.\n\n" +
    "The practical improvement over standard Selection Sort is a **constant factor reduction of ~2× in passes** (and thus swaps), not a reduction in asymptotic complexity. On already-sorted or nearly-sorted inputs there is no special advantage.",

  realWorldUses: [
    "**Embedded systems:** Reduced swap count (at most `n - 1` swaps total) benefits flash or EEPROM write-limited storage.",
    "**Small arrays in graphics pipelines:** Sorting 4–8 vertex attributes quickly with minimal overhead.",
    "**Teaching material:** Demonstrates that loop structure optimization can reduce constant factors without changing Big-O class.",
    "**Competitive programming:** Fast and simple to implement when `n ≤ 1000` and a stable sort is not needed.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**~2× fewer passes** than standard Selection Sort — each pass sorts two elements instead of one.",
      "**Minimal swaps:** At most `n - 1` total swaps.",
      "**In-place:** `O(1)` auxiliary space.",
      "**Simple to implement** with just one extra tracked index.",
    ],
    limitations: [
      "Still `O(n²)` — not suitable for large datasets.",
      "**Not stable:** Swapping elements can displace equal elements.",
      "The minimum-maximum edge case (max at `leftBound`) requires careful handling to avoid incorrect placement.",
    ],
  },

  whenToUseIt:
    "Use **Double Selection Sort** when you want standard Selection Sort's benefits (minimal swaps, simple code) with a practical speed improvement from halving the number of passes. It is best suited for small arrays (under ~50 elements) where cache-friendly linear scans dominate.\n\nAvoid it for large arrays or when stability (preserving equal-element order) is required.",
};
