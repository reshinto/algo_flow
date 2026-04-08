import type { EducationalContent } from "@/types";

export const kthSmallestSortedMatrixEducational: EducationalContent = {
  overview:
    "**Kth Smallest Element in Sorted Matrix** finds the k-th smallest value in an n×n matrix where every row and every column is sorted in non-decreasing order.\n\n" +
    "Rather than sorting all n² values (O(n² log n)), the algorithm performs a binary search on the *value range* — from the smallest cell `matrix[0][0]` to the largest `matrix[n-1][n-1]` — and for each candidate mid-value counts how many elements are ≤ mid in O(n) time using a staircase walk.",

  howItWorks:
    "The algorithm never touches an index directly; it searches across possible *values* in the range `[min, max]`:\n\n" +
    "1. **Initialize** `left = matrix[0][0]`, `right = matrix[n-1][n-1]`.\n" +
    "2. **Repeat** while `left < right`:\n" +
    "   - Compute `mid = left + (right - left) / 2`.\n" +
    "   - **Staircase count** — start at the bottom-left corner `(n-1, 0)`:\n" +
    "     - If `matrix[row][col] ≤ mid`: all `row + 1` elements in that column up to this row are ≤ mid — add `row + 1` to count, move right.\n" +
    "     - Otherwise: move up one row.\n" +
    "   - If `count < k`: the kth element is in the right half → `left = mid + 1`.\n" +
    "   - Else: it is in the left half → `right = mid`.\n" +
    "3. **Converge** — when `left === right`, that value is guaranteed to exist in the matrix and is the kth smallest.\n\n" +
    "### Example: 3 × 3 matrix, k = 8\n\n" +
    "```\n" +
    " 1   5   9\n" +
    "10  11  13\n" +
    "12  13  15\n" +
    "```\n\n" +
    "Value range: [1, 15]. Binary search converges to **13** — the 8th smallest.\n\n" +
    "### Diagram: staircase count for mid = 11\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  Start["Start at bottom-left (2,0)=12"]\n' +
    '  Start -->|"12 > 11, move up"| R1C0["(1,0)=10"]\n' +
    '  R1C0 -->|"10 ≤ 11, count+=2, move right"| R1C1["(1,1)=11"]\n' +
    '  R1C1 -->|"11 ≤ 11, count+=2, move right"| R1C2["(1,2)=13"]\n' +
    '  R1C2 -->|"13 > 11, move up"| R0C2["(0,2)=9"]\n' +
    '  R0C2 -->|"9 ≤ 11, count+=1, move right"| Done["Out of bounds — count=5"]\n' +
    "  style Start fill:#06b6d4,stroke:#0891b2\n" +
    "  style R1C1 fill:#f59e0b,stroke:#d97706\n" +
    "  style Done fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The staircase walk starts at the bottom-left and zig-zags right/up, counting entire column prefixes ≤ mid in O(n) steps.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × log(max − min))`**\n\n" +
    "Each binary search iteration runs the O(n) staircase walk. The number of iterations is bounded by log of the value range (not n), which is typically 30–40 for 32-bit integers.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a handful of scalar variables are used — no heap, sorted list, or auxiliary matrix is required.",

  bestAndWorstCase:
    "**Best case** — k = 1 or k = n²: the answer is immediately `matrix[0][0]` or `matrix[n-1][n-1]`, but the binary search still runs its full course because the convergence check happens at the end. Effectively `O(n × log(max − min))`.\n\n" +
    "**Worst case** — large value range with many distinct values: still `O(n × log(max − min))`. For standard 32-bit integers this is at most `O(n × 30)`, making it extremely fast in practice even for large n.",

  realWorldUses: [
    "**Database query optimization:** Finding the kth percentile value across a sorted partitioned table without loading all rows.",
    "**Streaming data analysis:** Maintaining a running kth-order statistic over sorted shards of a dataset.",
    "**Computer graphics:** Finding the kth brightest pixel in a sorted colour map for tone-mapping operations.",
    "**Competitive programming:** A canonical problem demonstrating binary-search-on-answer over a structured matrix.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — no heap or extra array needed, unlike heap-based O(k log n) approaches.",
      "Efficient for large n and small value ranges — the log(max − min) factor is independent of n².",
      "Works on any sorted-row-and-column matrix without modification.",
    ],
    limitations: [
      "Requires the matrix to be sorted both row-wise and column-wise — not applicable to arbitrary matrices.",
      "Value range must be bounded — for floating-point matrices with tiny gaps the convergence can require many iterations.",
      "For very small k (e.g., k ≤ log n), a heap-based approach may be faster in practice.",
    ],
  },

  whenToUseIt:
    "Use this algorithm when you need the kth order statistic of a row-and-column sorted matrix and O(1) space is a constraint. " +
    "If the matrix is unsorted, fall back to quickselect (O(n²) average) or sorting. " +
    "For k very close to 1 or n², consider short-circuiting with a direct cell lookup before running the full binary search.",
};
