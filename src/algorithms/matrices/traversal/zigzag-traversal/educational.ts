import type { EducationalContent } from "@/types";

export const zigzagTraversalEducational: EducationalContent = {
  overview:
    "**Zigzag (Diagonal) Traversal** visits every element of a 2D matrix exactly once, following alternating diagonal paths. It is LeetCode 498 — the key insight is that each anti-diagonal is identified by the sum `row + col` being constant.\n\n" +
    "Even-numbered diagonals travel **upward** (bottom-left → top-right), while odd-numbered diagonals travel **downward** (top-right → bottom-left), creating a characteristic zigzag pattern across the matrix.",

  howItWorks:
    "The total number of diagonals is `m + n - 1`. For each diagonal index `d`:\n\n" +
    "**Even diagonal (upward pass):**\n" +
    "- Starting row: `min(d, m - 1)` — clamps to the last row when `d ≥ m`.\n" +
    "- Starting col: `max(0, d - m + 1)` — shifts right when the diagonal extends past the left edge.\n" +
    "- Walk: `row--`, `col++` until out of bounds.\n\n" +
    "**Odd diagonal (downward pass):**\n" +
    "- Starting row: `max(0, d - n + 1)` — shifts down when the diagonal extends past the top.\n" +
    "- Starting col: `min(d, n - 1)` — clamps to the last column when `d ≥ n`.\n" +
    "- Walk: `row++`, `col--` until out of bounds.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\n" +
    "1  2  3\n" +
    "4  5  6\n" +
    "7  8  9\n" +
    "```\n\n" +
    "Diagonal 0 (up): `[1]` → Diagonal 1 (down): `[2, 4]` → Diagonal 2 (up): `[7, 5, 3]` → Diagonal 3 (down): `[6, 8]` → Diagonal 4 (up): `[9]`\n\n" +
    "Result: `[1, 2, 4, 7, 5, 3, 6, 8, 9]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  D0["d=0 ↑\\n[1]"] --> D1["d=1 ↓\\n[2,4]"] --> D2["d=2 ↑\\n[7,5,3]"] --> D3["d=3 ↓\\n[6,8]"] --> D4["d=4 ↑\\n[9]"]\n' +
    "  style D0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style D1 fill:#f59e0b,stroke:#d97706\n" +
    "  style D2 fill:#14532d,stroke:#22c55e\n" +
    "  style D3 fill:#f59e0b,stroke:#d97706\n" +
    "  style D4 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Even diagonals travel upward (row--, col++), odd diagonals travel downward (row++, col--), producing the characteristic zigzag pattern that groups spatially close values for entropy coding.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every cell is visited exactly once — each element is pushed to the result precisely one time across all diagonals.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a handful of integer variables (`diagIdx`, `currentRow`, `currentCol`) are used. The output array is not counted as extra space since it is the required return value.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: a single collect step, `O(1)`.\n\n" +
    "**Worst case** — any `m × n` matrix: `O(m × n)` regardless of shape. All cases are identical; there is no early-exit opportunity because every element must be visited.\n\n" +
    "Non-square matrices are handled correctly by the clamping logic on the starting row and column for each diagonal.",

  realWorldUses: [
    "**Image compression:** JPEG encoding reads DCT coefficient blocks in zigzag order to cluster low-frequency components together before run-length encoding.",
    "**Matrix serialization:** Zigzag order is used to serialize 2D data (e.g., frequency tables, convolution kernels) into a 1D stream that keeps spatially close values adjacent.",
    "**Signal processing:** Anti-diagonal traversal naturally follows the constant-sum lines in 2D frequency domains, useful in filter design.",
    "**Interview problems:** A foundational pattern for understanding diagonal indexing — directly reusable in problems like anti-diagonal sums, diagonal sorting, and Hankel matrix construction.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal since every element must be visited exactly once.",
      "O(1) extra space — no auxiliary stack, queue, or visited array needed.",
      "Handles non-square matrices and edge cases (single row/column, 1×1) without special-casing.",
    ],
    limitations: [
      "Fixed traversal order — produces one specific diagonal pattern; other orderings (e.g., row-major diagonals) require code changes.",
      "Not cache-optimal — the upward passes jump between non-contiguous rows, causing more cache misses than row-major traversal.",
      "The starting-position clamping logic can be non-obvious; off-by-one errors are common when implementing from scratch.",
    ],
  },

  whenToUseIt:
    "Use zigzag traversal whenever an algorithm requires processing anti-diagonals of a matrix — most famously in JPEG encoding. It is also directly applicable to problems where elements sharing the same `row + col` sum must be grouped or processed together. For simple full-matrix scans, row-major order is faster due to cache locality.",
};
