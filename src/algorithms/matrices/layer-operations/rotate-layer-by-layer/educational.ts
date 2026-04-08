import type { EducationalContent } from "@/types";

export const rotateLayerByLayerEducational: EducationalContent = {
  overview:
    "**Rotate Layer by Layer** rotates an n×n matrix 90° clockwise in-place by processing each concentric ring (layer) from the outermost inward. Each element participates in a single 4-way cyclic swap — no extra matrix is needed.\n\n" +
    "This is a fundamentally different technique from the **transpose + reverse-rows** approach: instead of two full-matrix passes, it processes the matrix as nested rings and rotates all four sides of each ring simultaneously.",

  howItWorks:
    "For an n×n matrix, there are `Math.floor(n / 2)` layers. For layer `layerIdx`, the four boundary indices are:\n\n" +
    "- `topRow = layerIdx`, `bottomRow = n − 1 − layerIdx`\n" +
    "- `leftCol = layerIdx`, `rightCol = n − 1 − layerIdx`\n\n" +
    "For each `offset` from `0` to `(ring length − 1)`, four cells participate in a cyclic swap:\n\n" +
    "1. **Save** `temp = top`\n" +
    "2. **Left → Top:** `top = left`\n" +
    "3. **Bottom → Left:** `left = bottom`\n" +
    "4. **Right → Bottom:** `bottom = right`\n" +
    "5. **Temp → Right:** `right = temp`\n\n" +
    "This moves every element exactly one position clockwise around the ring.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\n" +
    "Input:         Output:\n" +
    "1  2  3        7  4  1\n" +
    "4  5  6   →    8  5  2\n" +
    "7  8  9        9  6  3\n" +
    "```\n\n" +
    "Layer 0 cycles (0,0)↔(0,2)↔(2,2)↔(2,0), then (0,1)↔(1,2)↔(2,1)↔(1,0). The center (1,1) never moves.\n\n" +
    "### Diagram: one 4-way cyclic swap at offset 0, layer 0\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  Top["Top (0,0) = 1"]\n' +
    '  Right["Right (0,2) = 3"]\n' +
    '  Bottom["Bottom (2,2) = 9"]\n' +
    '  Left["Left (2,0) = 7"]\n' +
    '  Center["Center (1,1) = 5 — unchanged"]\n' +
    '  Left -->|"left → top"| Top\n' +
    '  Bottom -->|"bottom → left"| Left\n' +
    '  Right -->|"right → bottom"| Bottom\n' +
    '  Top -->|"temp → right"| Right\n' +
    "  style Top fill:#f59e0b,stroke:#d97706\n" +
    "  style Right fill:#14532d,stroke:#22c55e\n" +
    "  style Bottom fill:#14532d,stroke:#22c55e\n" +
    "  style Left fill:#14532d,stroke:#22c55e\n" +
    "  style Center fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "The four corner cells rotate clockwise in a single cyclic swap; the center cell (cyan) is never touched.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Every element in the matrix is touched exactly once. For each of the `⌊n/2⌋` layers, the ring contains `4 × (n − 1 − 2 × layerIdx)` elements — summing to n² − (center cell if n is odd) ≈ n² total operations.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single `temp` variable is needed for the cyclic swap. No auxiliary matrix or queue is allocated.",

  bestAndWorstCase:
    "**Best case** — a 1×1 matrix: zero layers, zero swaps, returns immediately in `O(1)`.\n\n" +
    "**Worst case** — any n×n matrix (n > 1): `O(n²)` regardless of content. All cases are equivalent since every element must be rotated; there is no early exit.\n\n" +
    "Compared to transpose + reverse, this approach performs the same asymptotic work but with a different memory access pattern — elements on opposing sides of a ring are accessed together rather than in two separate sequential passes.",

  realWorldUses: [
    "**Image rotation:** Rotating pixel buffers 90° in graphics pipelines where memory allocation is costly (embedded systems, GPU kernels).",
    "**Game development:** Rotating tile maps or grid-based game boards in-place without allocating a second grid.",
    "**Competitive programming:** A classic in-place matrix rotation technique required in many interview and contest problems.",
    "**Cache-efficient ring processing:** For very large matrices, processing one ring at a time can improve spatial locality compared to two full-matrix passes.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space — only one temp variable, no auxiliary matrix.",
      "Single logical pass — all four sides of each ring rotate together, making the algorithm intuitive to visualize.",
      "Handles any n×n matrix including odd-sized ones (center element is untouched).",
    ],
    limitations: [
      "Works only on square (n×n) matrices — non-square matrices require a different approach with O(m×n) auxiliary space.",
      "Only handles 90° clockwise rotation directly — other angles require multiple calls or a modified offset direction.",
      "Slightly more complex indexing than transpose + reverse, which can be harder to derive from scratch under time pressure.",
    ],
  },

  whenToUseIt:
    "Use the layer-by-layer approach when you need O(1) space and a single conceptual pass over concentric rings is clearer than two full-matrix passes. It is ideal for interviews and problems that explicitly require an in-place layer rotation technique. If you need to rotate a non-square matrix, or if simplicity matters more than technique distinction, the transpose + reverse approach may be more practical.",
};
