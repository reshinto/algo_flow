import type { EducationalContent } from "@/types";

export const trappingRainWaterEducational: EducationalContent = {
  overview:
    "**Trapping Rain Water** is a classic array problem that asks: given an elevation map represented as an array of non-negative integers, how much water can be trapped between the bars after it rains?\n\nThe two-pointer approach solves this in a single pass from both ends simultaneously, using the insight that trapped water at any position is bounded by the shorter of the two maximum heights on either side.",

  howItWorks:
    "1. Place a **left pointer** at the start and a **right pointer** at the end of the array.\n" +
    "2. Track `maxLeft` (tallest bar seen from the left) and `maxRight` (tallest bar seen from the right).\n" +
    "3. Always process the **shorter side** — this is the key invariant:\n" +
    "   - If `heights[left] <= heights[right]`, the left side is the limiting factor.\n" +
    "     * If `heights[left] >= maxLeft`: update `maxLeft` — no water trapped here.\n" +
    "     * Otherwise: water trapped = `maxLeft - heights[left]`.\n" +
    "   - Otherwise process the right side symmetrically.\n" +
    "4. Move the processed pointer inward and repeat until the pointers meet.\n\n" +
    "### Why process the shorter side?\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Example["heights = [0,1,0,2,1,0,1,3,2,1,2,1]"]\n' +
    "    A[0] --- B[1] --- C[0] --- D[2] --- E[1] --- F[0] --- G[1] --- H[3] --- I[2] --- J[1] --- K[2] --- L[1]\n" +
    "    end\n" +
    "```\n\n" +
    "At position 2 (height=0): `maxLeft=1`, `maxRight=3`. Since left side is shorter, water = `1 - 0 = 1 unit`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is visited exactly once as the two pointers converge from the ends.\n" +
    "- No nested loops or recomputation — the single pass is optimal.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- Only a constant number of pointer and tracking variables are used.\n" +
    "- The `waterPerIndex` output array is `O(n)` but is considered part of the output, not auxiliary space.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — Even if no water is trapped (e.g., a strictly increasing or decreasing array), both pointers still traverse the entire array once.\n\n" +
    "**Worst Case: `O(n)`** — The algorithm always processes each element exactly once regardless of input shape.\n\n" +
    "### Comparison with the Prefix/Suffix Max approach\n" +
    "The naive approach precomputes left-max and right-max arrays requiring `O(n)` extra space. The two-pointer approach eliminates this overhead entirely while maintaining the same time complexity.",

  realWorldUses: [
    "**Urban drainage planning:** Modeling water accumulation in city terrain grids to design optimal drainage systems.",
    "**Image processing:** Computing histograms and analyzing depth maps in computer vision pipelines.",
    "**Game development:** Simulating fluid or water physics in 2D tile-based games.",
    "**Stock analysis:** Analogous pattern to finding trapped profit opportunities in price valleys between peaks.",
    "**Civil engineering:** Calculating reservoir capacity from topographic elevation profiles.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — best possible complexity for this problem.",
      "Single-pass algorithm with no preprocessing required.",
      "The two-pointer invariant is elegant: always process the side that limits the water level.",
      "Easily extended to 2D variants (Trapping Rain Water II) using a priority queue.",
    ],
    limitations: [
      "Only works for the 1D case directly — the 2D variant requires a different approach (BFS with min-heap).",
      "Requires understanding the key invariant (process shorter side) which is non-obvious on first encounter.",
      "Does not easily adapt to dynamic height changes without reprocessing the entire array.",
    ],
  },

  whenToUseIt:
    "Use the two-pointer trapping rain water approach whenever you encounter problems involving:\n\n" +
    "- Computing water, area, or capacity **trapped between boundaries**.\n" +
    "- Problems where the answer at each position depends on the **max values from both sides**.\n" +
    "- Any problem that can be reduced to 'what is bounded by the minimum of two maximums'.\n\n" +
    "Avoid it when the problem requires multiple queries on a mutable array — preprocessing with a segment tree or sparse table would be more efficient in that scenario.",
};
