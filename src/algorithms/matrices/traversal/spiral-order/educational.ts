import type { EducationalContent } from "@/types";

export const spiralOrderEducational: EducationalContent = {
  overview:
    "**Spiral Order Traversal** visits every element of a 2D matrix exactly once, following a clockwise spiral path from the outermost ring inward. It is a classic boundary-shrinking problem with no recursion needed — just four moving pointers.\n\n" +
    "The traversal proceeds in four passes per ring: **right** → **down** → **left** → **up**, then all four boundaries shrink by one and the process repeats on the next inner ring.",

  howItWorks:
    "Maintain four boundary variables: `top`, `bottom`, `left`, `right`. Each loop iteration processes one full ring:\n\n" +
    "1. **Right** — traverse `matrix[top][left..right]`, then `top++`.\n" +
    "2. **Down** — traverse `matrix[top..bottom][right]`, then `right--`.\n" +
    "3. **Left** — traverse `matrix[bottom][right..left]` (guard: `top ≤ bottom`), then `bottom--`.\n" +
    "4. **Up** — traverse `matrix[bottom..top][left]` (guard: `left ≤ right`), then `left++`.\n\n" +
    "The guards prevent double-counting when the matrix is reduced to a single row or column.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\n" +
    "1  2  3\n" +
    "4  5  6\n" +
    "7  8  9\n" +
    "```\n\n" +
    "Result: `[1, 2, 3, 6, 9, 8, 7, 4, 5]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  R["→ Right\\n1,2,3"] --> D["↓ Down\\n6,9"] --> L["← Left\\n8,7"] --> U["↑ Up\\n4"] --> C["Center\\n5"]\n' +
    "  style R fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style L fill:#f59e0b,stroke:#d97706\n" +
    "  style U fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The outer ring is peeled in four directional passes — right along the top, down the right side, left along the bottom, up the left side — then the boundaries shrink inward until only the center remains.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every cell is visited exactly once — each element is pushed to the result precisely one time.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only four integer boundary variables are used. The output array is not counted as extra space since it is the required return value.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: a single collect step, `O(1)`.\n\n" +
    "**Worst case** — any `m × n` matrix: `O(m × n)` regardless of shape. All cases are equal; there is no shortcutting because every element must be visited.\n\n" +
    "Non-square matrices (e.g., a single row or single column) are handled correctly by the two boundary guards before the left and up passes.",

  realWorldUses: [
    "**Image processing:** Reading or writing pixel data in a spiral pattern from the outside in (used in some JPEG-like encoding schemes).",
    "**Robotics path planning:** Coverage algorithms where a robot sweeps an area in concentric rectangles.",
    "**Cache-friendly matrix iteration:** Spiral order can improve cache locality compared to simple row-major traversal for certain matrix operations.",
    "**Printing / display grids:** Generating visually interesting output for rectangular grids in games, terminals, or animations.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal since every element must be visited.",
      "O(1) extra space — no auxiliary stack, queue, or visited array needed.",
      "Handles non-square matrices and edge cases (single row/column) cleanly with two guards.",
    ],
    limitations: [
      "Single-direction only — produces one fixed spiral order; reversing or choosing spiral direction requires code changes.",
      "Not cache-optimal for large matrices — access pattern jumps between rows and columns rather than following a single stride.",
      "Generalizing to 3D tensors or arbitrary polygons requires significant restructuring.",
    ],
  },

  whenToUseIt:
    "Use spiral order traversal whenever you need to visit all matrix elements in a concentric ring pattern — typically as part of a larger algorithm (e.g., layer-by-layer matrix rotation). For simple full-matrix scans, row-major order is faster in practice due to cache locality. The boundary-shrinking pattern here is directly reusable for matrix rotation and layer-peeling problems.",
};
