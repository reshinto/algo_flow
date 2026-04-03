/**
 * Educational content for Cocktail Shaker Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Cocktail Shaker Sort. */
export const cocktailShakerSortEducational: EducationalContent = {
  overview:
    '**Cocktail Shaker Sort** (also called Bidirectional Bubble Sort or Shaker Sort) is an improvement on Bubble Sort that sorts in **both directions** on each pass. Instead of only bubbling large elements rightward, it also bubbles small elements leftward, cutting the number of passes roughly in half.\n\nLike Bubble Sort it is an in-place, comparison-based, stable sort — but the bidirectional sweep gives it a practical advantage on real-world data with small values near the end of the array (the "turtle" problem in Bubble Sort).',

  howItWorks:
    "Cocktail Shaker Sort maintains two shrinking bounds — a `leftBound` and a `rightBound` — that converge toward the center.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. **Forward pass** — sweep from `leftBound` to `rightBound`, swapping any adjacent pair where `arr[i] > arr[i+1]`. The largest unsorted element reaches `rightBound`.\n" +
    "2. Decrement `rightBound` (that position is now sorted).\n" +
    "3. If no swap occurred in the forward pass, the array is sorted — stop.\n" +
    "4. **Backward pass** — sweep from `rightBound` down to `leftBound`, swapping any adjacent pair where `arr[i-1] > arr[i]`. The smallest unsorted element reaches `leftBound`.\n" +
    "5. Increment `leftBound` (that position is now sorted).\n" +
    "6. Repeat until `leftBound >= rightBound`.\n\n" +
    "### Visualizing on [5, 1, 4, 2, 8, 3]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Forward Pass 1\n" +
    "    A[5] -->|swap 5>1| B[1]\n" +
    "    C[4] -->|swap 4>2| D[2]\n" +
    "    E[3] -->|8 bubbles right| F[8]\n" +
    "    end\n" +
    "    subgraph Backward Pass 1\n" +
    "    G[1] -->|1 already at left| H[...]\n" +
    "    end\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1 forward:** `[1, 4, 2, 5, 3, 8]` — `8` settles at right\n" +
    "- **Pass 1 backward:** `[1, 2, 4, 3, 5, 8]` — `1` settles at left\n" +
    "- **Pass 2 forward:** `[1, 2, 3, 4, 5, 8]` — sorted!",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n)` | Already sorted — forward pass detects no swaps immediately |\n" +
    "| Average | `O(n²)` | Each element may need to travel many positions |\n" +
    "| Worst | `O(n²)` | Reverse-sorted input requires maximum passes |\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Sorts entirely in-place. Only a handful of scalar variables (`leftBound`, `rightBound`, `swapped`, `temporaryValue`) are needed regardless of input size.",

  bestAndWorstCase:
    "**Best case `O(n)`** occurs when the array is already sorted. The first forward pass finds no swaps and the algorithm terminates immediately — the same early-exit behavior as Bubble Sort.\n\n" +
    "**Worst case `O(n²)`** occurs on a reverse-sorted array. Every adjacent pair must swap on every pass, and the bounds shrink only one position per direction per round.\n\n" +
    "**Practical advantage over Bubble Sort:** Bubble Sort suffers from the *turtle problem* — small values near the tail of the array take O(n) passes to migrate left, because each bubble pass moves them only one position leftward. Cocktail Shaker's backward pass transports these turtles efficiently, giving it measurably better performance on partially sorted real-world data.",

  realWorldUses: [
    "**Educational tools:** Its symmetric, easy-to-visualize motion makes it ideal for teaching sorting concepts.",
    "**Nearly-sorted datasets:** Outperforms plain Bubble Sort when small values are clustered near the end.",
    "**Embedded systems:** Minimal code size and in-place operation suit constrained environments where simplicity beats raw speed.",
    "**Parallel hardware:** The forward and backward passes can be pipelined on simple SIMD-style processors.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Stable:** Preserves the relative order of equal elements.",
      "**In-place:** `O(1)` extra memory.",
      "**Early termination:** Detects already-sorted arrays in a single pass.",
      "**Turtle fix:** Bidirectional sweep eliminates Bubble Sort's worst-case migration problem for small elements.",
    ],
    limitations: [
      "Still `O(n²)` average and worst case — not competitive with `O(n log n)` sorts on large datasets.",
      "More complex control flow than Bubble Sort for only a modest constant-factor improvement.",
      "Not suitable for large production datasets.",
    ],
  },

  whenToUseIt:
    "Use **Cocktail Shaker Sort** when you need a simple, stable, in-place sort and your data is known to be nearly sorted or small (under ~50 elements). It is a natural upgrade over Bubble Sort wherever the turtle problem is observable.\n\nAvoid it for large inputs or performance-critical paths — prefer Timsort, Introsort, or Merge Sort instead.",
};
