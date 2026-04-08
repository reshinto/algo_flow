import type { EducationalContent } from "@/types";

export const diagonalTraversalEducational: EducationalContent = {
  overview:
    "**Diagonal Traversal** visits every element of a 2D matrix exactly once, collecting elements along each anti-diagonal — lines running from the top-right toward the bottom-left. For a matrix with `m` rows and `n` columns, there are `m + n - 1` diagonals.\n\n" +
    "Each diagonal is identified by a single index `d`, where `d = 0` contains only `matrix[0][0]`, `d = 1` contains `matrix[0][1]` and `matrix[1][0]`, and so on. Elements on the same diagonal share the same sum of their row and column indices.",

  howItWorks:
    "The algorithm iterates over each diagonal index from `0` to `m + n - 2`. For each diagonal `d`, it computes the starting cell and then walks down-left until a boundary is hit:\n\n" +
    "1. **Start position** — if `d < n`, the diagonal starts at row `0`, column `d`. Otherwise it starts at row `d - n + 1`, column `n - 1` (the rightmost column).\n" +
    "2. **Walk** — from the start cell, increment `row` and decrement `col` until either `row ≥ m` or `col < 0`.\n" +
    "3. **Repeat** for each diagonal until all elements are collected.\n\n" +
    "### Example: 3 × 4 matrix\n\n" +
    "```\n" +
    " 1   2   3   4\n" +
    " 5   6   7   8\n" +
    " 9  10  11  12\n" +
    "```\n\n" +
    "Diagonals:\n" +
    "- d=0: [1]\n" +
    "- d=1: [2, 5]\n" +
    "- d=2: [3, 6, 9]\n" +
    "- d=3: [4, 7, 10]\n" +
    "- d=4: [8, 11]\n" +
    "- d=5: [12]\n\n" +
    "Result: `[1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  D0["d=0\\n[1]"] --> D1["d=1\\n[2,5]"] --> D2["d=2\\n[3,6,9]"] --> D3["d=3\\n[4,7,10]"] --> D4["d=4\\n[8,11]"] --> D5["d=5\\n[12]"]\n' +
    "  style D0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style D1 fill:#14532d,stroke:#22c55e\n" +
    "  style D2 fill:#f59e0b,stroke:#d97706\n" +
    "  style D3 fill:#14532d,stroke:#22c55e\n" +
    "  style D4 fill:#14532d,stroke:#22c55e\n" +
    "  style D5 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each node is one diagonal; elements within it are collected by walking down-left from the start cell. Diagonal `d=2` is the longest, spanning all 3 rows of the 3×4 matrix.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every cell is visited exactly once across all diagonals. The outer loop runs `m + n - 1` times, and the total number of inner iterations sums to `m × n`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "No auxiliary data structures are used. The output array is the required return value and is not counted as extra space. The only additional variables are a handful of integer indices.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: a single collect step, `O(1)`.\n\n" +
    "**Worst case** — any `m × n` matrix: `O(m × n)`. Unlike search algorithms, diagonal traversal has no early-exit path — every element must be visited by definition.\n\n" +
    "All cases are equivalent in complexity because the traversal is exhaustive and data-independent.",

  realWorldUses: [
    "**Wavefront processing:** Diagonal traversal matches the dependency order in dynamic programming problems like edit distance — cells on the same diagonal can be computed in parallel, enabling SIMD or multi-threaded DP.",
    "**Image analysis:** Anti-diagonal scans detect features oriented at 45° in raster images, complementing horizontal and vertical scans.",
    "**Matrix serialization:** Some sparse-matrix formats (e.g., DIA format) store data along diagonals, making diagonal traversal the natural read/write order.",
    "**Game board evaluation:** Chess engines and checkers AI evaluate diagonal attacks by iterating over anti-diagonals of the board.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal, since every element must be visited.",
      "O(1) extra space — no stack, queue, or visited set needed.",
      "Handles non-square matrices and edge cases (single row, single column, 1×1) without special branches.",
      "The start-position formula is closed-form — no lookup tables or pre-computation required.",
    ],
    limitations: [
      "Access pattern is non-sequential — jumping between rows and columns in each diagonal step is cache-unfriendly for large matrices.",
      "Produces a flat list in a fixed order; reversing the diagonal direction or changing traversal order requires code changes.",
      "Less intuitive than row-major or column-major traversal, making it harder to reason about for beginners.",
    ],
  },

  whenToUseIt:
    "Use diagonal traversal when an algorithm's correctness depends on processing elements with the same `row + col` sum together — for example, wavefront DP optimizations, anti-diagonal feature detection in images, or serializing matrices in DIA sparse format. For plain full-matrix scans, row-major traversal is simpler and more cache-friendly. The closed-form start-position formula makes this pattern easy to drop into any DP or image-processing loop without a pre-pass.",
};
