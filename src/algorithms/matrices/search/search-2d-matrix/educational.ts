import type { EducationalContent } from "@/types";

export const search2DMatrixEducational: EducationalContent = {
  overview:
    "**Search a 2D Matrix** exploits a special property: each row is sorted left-to-right and the first element of every row is strictly greater than the last element of the previous row. This means the entire matrix can be treated as a single flattened sorted array, enabling a standard binary search.\n\n" +
    "Given a matrix with `m` rows and `n` columns, binary search runs over `m × n` virtual indices, converting each midpoint index back to a `(row, col)` pair using integer division and modulo.",

  howItWorks:
    "Map the virtual 1D index space `[0, m×n − 1]` onto the matrix:\n\n" +
    "- `midRow = Math.floor(midIndex / colCount)`\n" +
    "- `midCol = midIndex % colCount`\n\n" +
    "Then run standard binary search:\n\n" +
    "1. Set `leftIdx = 0`, `rightIdx = m×n − 1`.\n" +
    "2. Compute `midIndex = Math.floor((leftIdx + rightIdx) / 2)`.\n" +
    "3. Look up `matrix[midRow][midCol]`.\n" +
    "4. If equal to target → return `true`.\n" +
    "5. If less than target → `leftIdx = midIndex + 1` (search right half).\n" +
    "6. If greater than target → `rightIdx = midIndex − 1` (search left half).\n" +
    "7. If `leftIdx > rightIdx` → return `false`.\n\n" +
    "### Example: 3 × 4 matrix, target = 11\n\n" +
    "```\n" +
    " 1   3   5   7\n" +
    "10  11  16  20\n" +
    "23  30  34  60\n" +
    "```\n\n" +
    "Virtual range: `[0, 11]`. Mid = 5 → `[1][1]` = 11 → found!",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log(m × n))`**\n\n" +
    "Binary search halves the search space each iteration. With `m × n` total elements the search performs at most `⌈log₂(m × n)⌉` comparisons — equivalent to `log₂(m) + log₂(n)` in practice.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index variables are maintained. No auxiliary array or recursion stack is required.",

  bestAndWorstCase:
    "**Best case** — target is at the exact midpoint of the virtual array: found in `O(1)` comparisons.\n\n" +
    "**Worst case** — target is absent or at either boundary: `O(log(m × n))` comparisons before the search space is exhausted.\n\n" +
    "This algorithm does **not** work on matrices that only guarantee row-sorted order without the cross-row guarantee (use Search a 2D Matrix II for that case).",

  realWorldUses: [
    "**Database index lookups:** Sorted page tables in B-tree nodes share the same virtual 1D binary search pattern.",
    "**Sorted 2D lookup tables:** Embedded systems often store calibration or configuration data in row-continuous sorted blocks.",
    "**Memory-mapped file search:** Searching within a block-aligned, fully sorted binary file without loading it all into memory.",
    "**Interview preparation:** LeetCode 74 — a canonical example of reducing a 2D problem to a 1D abstraction.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(log(m × n))` time — best possible for searching a sorted structure of this size.",
      "O(1) space — index arithmetic replaces any need for auxiliary storage.",
      "Elegant: the row-continuity guarantee collapses a 2D problem to a single binary search.",
    ],
    limitations: [
      "Requires the strict row-continuity property (first of next row > last of current row). Without it, this approach is incorrect.",
      "Not applicable to matrices that are only sorted per-row and per-column independently — use the staircase search for that variant.",
      "Slightly less intuitive than a two-pointer staircase approach when explaining to others.",
    ],
  },

  whenToUseIt:
    "Use this algorithm whenever the matrix satisfies the strict sorted-row-continuity property (LeetCode 74 variant). If the matrix is only guaranteed to be sorted per row and per column independently (LeetCode 240 variant), use the staircase search instead — it handles a more general shape at the cost of `O(m + n)` rather than `O(log(m × n))` time.",
};
