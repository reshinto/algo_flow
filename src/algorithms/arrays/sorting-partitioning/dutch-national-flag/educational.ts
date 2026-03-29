import type { EducationalContent } from "@/types";

export const dutchNationalFlagEducational: EducationalContent = {
  overview:
    "**The Dutch National Flag algorithm**, designed by Edsger W. Dijkstra, sorts an array of 0s, 1s, and 2s " +
    "in a single pass using three pointers: `lowPointer`, `midPointer`, and `highPointer`. " +
    "It partitions the array into three regions — all 0s on the left, all 1s in the middle, and all 2s on the right — " +
    "achieving `O(n)` time and `O(1)` space. It is the canonical example of 3-way partitioning.",

  howItWorks:
    "1. Initialize `lowPointer = 0`, `midPointer = 0`, `highPointer = array.length - 1`.\n" +
    "2. While `midPointer <= highPointer`, examine `array[midPointer]`:\n" +
    "   * **Value is 0**: Swap `array[midPointer]` with `array[lowPointer]`. Advance both `lowPointer` and `midPointer`.\n" +
    "   * **Value is 1**: It is already in the correct region — advance `midPointer` only.\n" +
    "   * **Value is 2**: Swap `array[midPointer]` with `array[highPointer]`. Retreat `highPointer` (do *not* advance `midPointer` — the swapped element is unexamined).\n" +
    "3. When `midPointer > highPointer`, the array is sorted.\n\n" +
    "### The Key Insight\n\n" +
    "The algorithm maintains three invariants simultaneously:\n" +
    "- `array[0 .. lowPointer-1]` contains only 0s\n" +
    "- `array[lowPointer .. midPointer-1]` contains only 1s\n" +
    "- `array[highPointer+1 .. end]` contains only 2s\n" +
    "- `array[midPointer .. highPointer]` is the unsorted middle that shrinks each step.\n\n" +
    "### Walkthrough with `[2, 0, 1, 2, 1, 0]`\n\n" +
    "| Step | Array             | low | mid | high | Action                    |\n" +
    "|------|-------------------|-----|-----|------|---------------------------|\n" +
    "| init | [2, 0, 1, 2, 1, 0]| 0   | 0   | 5    | initialize                |\n" +
    "| 1    | [0, 2, 1, 2, 1, 0]| 0   | 0   | 4    | arr[0]=2 → swap with high |\n" +
    "| 2    | [0, 2, 1, 2, 1, 0]| 1   | 1   | 4    | arr[0]=0 → swap with low  |\n" +
    "| 3    | [0, 2, 1, 2, 1, 0]| 1   | 2   | 4    | arr[1]=2 → swap with high |\n" +
    "| 4    | [0, 1, 1, 2, 2, 0]| 1   | 2   | 3    | arr[1]=1 → wait, see step 3|\n" +
    "| ...  | [0, 0, 1, 1, 2, 2]| —   | —   | —    | complete                  |\n\n" +
    "**Result**: `[0, 0, 1, 1, 2, 2]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each element is processed at most once: when `arr[mid] === 0` or `arr[mid] === 1`, `midPointer` advances, " +
    "so no element is visited more than once in those branches. When `arr[mid] === 2`, `highPointer` retreats " +
    "without advancing `midPointer`, but the unsorted window still shrinks by one. " +
    "The total number of operations is bounded by `n`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only three pointer variables are maintained. The sort is done in-place with no auxiliary arrays.",

  bestAndWorstCase:
    "**Best, average, and worst cases are all `O(n)`** — the algorithm always makes one pass.\n\n" +
    "- **All elements identical** (e.g., all 1s): `midPointer` increments every step, `n` steps total.\n" +
    "- **Already sorted `[0,0,1,1,2,2]`**: 0s cause low/mid to advance; 1s advance mid; 2s trigger a swap with high " +
    "but high is already correct. Still `n` steps.\n" +
    "- **Reverse sorted `[2,2,1,1,0,0]`**: 2s trigger high swaps first, then 0s trigger low swaps. Still `n` steps.\n\n" +
    "### Compared to General Sorting\n\n" +
    "A comparison sort (e.g., quicksort) on this input would be `O(n log n)` in the average case. " +
    "Because the value domain is known (0, 1, 2), the Dutch National Flag exploits that constraint for a linear solution.",

  realWorldUses: [
    "**3-Way Quicksort:** The partition step in 3-way quicksort uses this exact technique to handle arrays with many duplicate keys, achieving `O(n)` on uniform arrays.",
    "**DNA Sequence Sorting:** Sorting nucleotide sequences with three base types (A/T/G or similar encodings) in genome analysis pipelines.",
    "**Traffic Signal Classification:** Grouping sensor readings into three priority levels (low, medium, high) in real-time systems.",
    "**Image Segmentation:** Classifying pixels into three categories (background, edge, foreground) in a single scan.",
    "**Game Logic:** Sorting game objects into three state buckets (inactive, active, destroyed) for efficient frame processing.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — achieves the theoretical lower bound for this constrained problem.",
      "In-place `O(1)` space — no auxiliary arrays needed.",
      "Single-pass — reads each element at most once (amortized), making it cache-friendly.",
      "Naturally generalizes to `k`-way partitioning for small fixed value domains.",
      "Elegant invariant-based design makes it easy to verify correctness formally.",
    ],
    limitations: [
      "Only applicable when the value domain is exactly three distinct values (or can be mapped to three groups).",
      "Not stable — the relative order of equal elements is not preserved.",
      "Not suitable as a general-purpose sort — for arbitrary keys, use a comparison or radix sort.",
      "The `arr[mid] === 2` branch does not advance `midPointer`, which can be confusing to reason about.",
    ],
  },

  whenToUseIt:
    "Use the **Dutch National Flag algorithm** when you need to sort or partition an array that contains " +
    "exactly three distinct values (or can be mapped to three groups) and need `O(n)` time with `O(1)` space.\n\n" +
    "Look for problems involving *sort colors*, *3-way partition*, or *group elements by category*.\n\n" +
    "**Do not use** for general sorting of arbitrary values — a comparison sort or radix sort is needed there. " +
    "Also avoid when stability (preserving the original order of equal elements) is required.",
};
