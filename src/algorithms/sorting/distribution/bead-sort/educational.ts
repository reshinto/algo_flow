/**
 * Educational content for Bead Sort (Gravity Sort).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Bead Sort. */
export const beadSortEducational: EducationalContent = {
  overview:
    "**Bead Sort** (also called **Gravity Sort**) is a natural sorting algorithm inspired by a physical abacus. It was proposed by Joshua Tenenbaum and colleagues in 2004 as a thought experiment about computation in physical systems.\n\nThe algorithm imagines each number `k` as a row of `k` beads on horizontal rods. When the rods are held vertically and gravity is applied, beads fall to the bottom. After all beads have settled, counting the beads in each row from bottom to top gives the sorted sequence.",

  howItWorks:
    "Bead Sort operates through a physical gravity simulation:\n\n" +
    "### Phase 1: Build the Abacus Grid\n" +
    "1. Create a 2D grid with `n` rows (one per element) and `max` columns (one per unit of the maximum value).\n" +
    "2. For element with value `k`, fill the first `k` columns of its row with beads (1), leaving the rest empty (0).\n" +
    "3. This creates a visual representation of each number as beads on a rod.\n\n" +
    "### Phase 2: Apply Gravity Column by Column\n" +
    "4. For each column from left to right, count the total number of beads in that column.\n" +
    "5. Clear all beads from the column, then refill from the bottom — stack `beadCount` beads at the bottom of the column.\n" +
    "6. This simulates gravity pulling all beads downward simultaneously.\n\n" +
    "### Phase 3: Read the Sorted Values\n" +
    "7. After all columns have been gravity-processed, read each row's bead count.\n" +
    "8. The rows from bottom to top now contain values in non-decreasing order.\n\n" +
    "### Visualizing Bead Sort on [3, 1, 4, 2]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Before Gravity\n" +
    "    A[Row 0: ● ● ●  ]\n" +
    "    B[Row 1: ●      ]\n" +
    "    C[Row 2: ● ● ● ●]\n" +
    "    D[Row 3: ● ●    ]\n" +
    "    end\n" +
    "    subgraph After Gravity\n" +
    "    E[Row 0: ●      ]\n" +
    "    F[Row 1: ● ●    ]\n" +
    "    G[Row 2: ● ● ●  ]\n" +
    "    H[Row 3: ● ● ● ●]\n" +
    "    end\n" +
    "    Before --> After\n" +
    "```\n\n" +
    "- **Column 1:** 4 beads → fall to rows 0–3 (all 4 rows filled)\n" +
    "- **Column 2:** 3 beads → fall to rows 1–3 (bottom 3 rows)\n" +
    "- **Column 3:** 2 beads → fall to rows 2–3 (bottom 2 rows)\n" +
    "- **Column 4:** 1 bead → falls to row 3 only\n" +
    "- **Reading rows:** Row 0=1, Row 1=2, Row 2=3, Row 3=4 → sorted!",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × max)` (digital simulation)**\n\n" +
    "- **Best Case:** `O(n × max)` — even with small values, all columns must be processed.\n" +
    "- **Average Case:** `O(n × max)` — proportional to the product of array length and maximum value.\n" +
    "- **Worst Case:** `O(n × max)` — no data-dependent branching; always processes all `max` columns.\n\n" +
    "**Space Complexity: `O(n × max)`**\n\n" +
    "The bead grid requires `n × max` cells. For large values, this can be enormous — sorting [1, 1000000] requires a 2 × 1,000,000 grid.\n\n" +
    "**Note on Physical vs Digital:**\n" +
    "In the physical abacus model, gravity acts in parallel — all beads fall simultaneously in `O(1)` physical time (or `O(max)` for the slowest column). The digital simulation cannot achieve this parallelism and requires explicit column-by-column processing.",

  bestAndWorstCase:
    "**Best case** is an array of small non-negative integers — for example, `[1, 2, 3]`. The grid is 3 × 3 and takes 9 cell operations plus 3 reads.\n\n" +
    "**Worst case** is when the maximum value is very large relative to the array length — for example, `[1, 1000000]`. The grid becomes 2 × 1,000,000 and the algorithm processes one million columns for just two elements. In this scenario, any comparison-based sort is vastly faster.\n\n" +
    "Bead Sort is fundamentally limited by the **magnitude** of values, not just their count. It is impractical for general integers but conceptually important as a demonstration of how physical processes can perform computation.",

  realWorldUses: [
    "**Educational Demonstrations:** Illustrates how computation can emerge from physical phenomena — gravity performing sorting without explicit comparisons.",
    "**Parallel Hardware:** In theory, custom abacus hardware could sort in O(1) physical time using gravity on all columns simultaneously — explored in physical computing research.",
    "**Small Integer Multisets:** Sorting small collections of small non-negative integers (e.g., dice roll results, card values) where max is bounded and small.",
    "**Algorithm Theory:** Used to motivate discussions of non-comparison sorting, physical computing, and the distinction between abstract and physical time complexity.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Conceptually elegant:** The physical intuition of gravity sorting is immediately understandable and memorable.",
      "**No comparisons:** Like Counting Sort, Bead Sort never directly compares elements — it sorts purely by value magnitude.",
      "**Naturally stable:** Elements with equal values fall to adjacent rows, preserving relative order.",
    ],
    limitations: [
      "**`O(n × max)` space:** Memory requirements scale with the maximum value — completely impractical for large integers.",
      "**`O(n × max)` time:** Slower than comparison-based sorts for large values; a single large outlier destroys performance.",
      "**Non-negative integers only:** Cannot sort negative numbers or non-integers without preprocessing (offset or scaling).",
      "**No practical advantage:** Every realistic use case is better served by Counting Sort, Radix Sort, or Timsort.",
    ],
  },

  whenToUseIt:
    "Use **Bead Sort** only when sorting **small collections of small non-negative integers** in educational or experimental contexts. The algorithm is valuable as a teaching tool to illustrate physical computing and non-comparison sorting, not as a production algorithm.\n\nNever use Bead Sort when: values are large, the array is long, memory is limited, or performance matters. For any practical sorting task, Timsort, Counting Sort, or Radix Sort will be dramatically more efficient.",
};
