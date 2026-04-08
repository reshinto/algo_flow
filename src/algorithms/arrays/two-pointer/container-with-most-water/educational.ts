import type { EducationalContent } from "@/types";

export const containerWithMostWaterEducational: EducationalContent = {
  overview:
    "**Container With Most Water** finds two vertical bars in a height array that, together with the x-axis, form the container holding the most water.\n\n" +
    "The area of water between bar `leftPointer` and bar `rightPointer` equals `min(heights[leftPointer], heights[rightPointer]) × (rightPointer - leftPointer)`. The challenge is to maximize this value without testing all `O(n²)` pairs — a **two-pointer** approach achieves `O(n)` by always moving the shorter bar inward.",

  howItWorks:
    "1. Place `leftPointer` at index `0` and `rightPointer` at the last index.\n" +
    "2. Compute `currentArea = min(heights[leftPointer], heights[rightPointer]) × (rightPointer - leftPointer)`.\n" +
    "3. If `currentArea > maxArea`, update `maxArea`, `bestLeft`, and `bestRight`.\n" +
    "4. Move the **shorter** bar's pointer one step inward:\n" +
    "   - If `heights[leftPointer] ≤ heights[rightPointer]`: increment `leftPointer`.\n" +
    "   - Otherwise: decrement `rightPointer`.\n" +
    "5. Repeat until the pointers meet.\n\n" +
    "**Why move the shorter bar?** The current area is limited by the shorter bar. Moving the taller bar can only decrease the width without increasing the minimum height — the area cannot improve. Moving the shorter bar is the only action that could yield a larger area.\n\n" +
    "### Trace (`[1, 8, 6, 2, 5, 4, 8, 3, 7]`)\n\n" +
    "```\n" +
    "L=0(h=1), R=8(h=7): area = min(1,7)×8 = 8    maxArea=8\n" +
    "L=1(h=8), R=8(h=7): area = min(8,7)×7 = 49   maxArea=49\n" +
    "L=1(h=8), R=7(h=3): area = min(8,3)×6 = 18   maxArea=49\n" +
    "L=1(h=8), R=6(h=8): area = min(8,8)×5 = 40   maxArea=49\n" +
    "... (remaining pairs all < 49)\n" +
    "Final: maxArea=49, leftIndex=1, rightIndex=8\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  L["L→ h=1"] --> A["h=8"]\n' +
    '  A --> B["h=6"]\n' +
    '  B --> C["h=2"]\n' +
    '  C --> D["h=5"]\n' +
    '  D --> E["h=4"]\n' +
    '  E --> F["h=8"]\n' +
    '  F --> R["h=7 ←R"]\n' +
    "  style L fill:#f59e0b,stroke:#d97706\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style F fill:#06b6d4,stroke:#0891b2\n" +
    "  style R fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Pointers start at the outer edges (amber). After moving the shorter left bar inward, the best container is found between indices 1 (h=8) and 8 (h=7), cyan, yielding area = 7 × 7 = 49.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each pointer starts at one end and moves monotonically toward the center.\n" +
    "- Total pointer moves: at most `n - 1` — one for every step until they meet.\n" +
    "- The algorithm makes exactly `n - 1` area computations.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- Only a constant number of variables (`leftPointer`, `rightPointer`, `maxArea`, `bestLeft`, `bestRight`) are used — no auxiliary data structures.",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** The maximum container is formed by the first and last bars. The algorithm still scans all pairs systematically — there is no early exit because a larger area might always exist before the pointers meet.\n\n" +
    "**Worst Case — `O(n)`:** Every iteration only advances one pointer by one position. In all cases, both pointers traverse the array a combined total of `n - 1` steps, giving a tight `O(n)` bound with a very small constant.\n\n" +
    "Unlike brute-force `O(n²)` which tests every pair, the two-pointer proof guarantees that the optimal pair is never skipped.",

  realWorldUses: [
    "**Rainwater Trapping (LeetCode #42):** A related problem — trap rainwater between bars — uses an extension of the two-pointer idea with left and right max-height arrays.",
    "**Reservoir Sizing:** Civil engineering calculations for reservoir capacity given bank elevation profiles.",
    "**Load Balancing:** Finding the two most distant servers with compatible capacity, minimizing overall workload while respecting the bottleneck constraint.",
    "**Signal Framing:** In audio and video processing, finding the widest time window bounded by signal peaks above a threshold.",
    "**Two-Pointer Interview Pattern:** This problem is the canonical example taught for two-pointer convergence, applicable wherever a monotone argument proves that one direction of pointer movement cannot improve the answer.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — matches the lower bound for this problem.",
      "Single pass — clean and cache-friendly with no backtracking.",
      "The greedy proof is rigorous: moving the shorter bar is the only possible improvement direction.",
      "Easily extended to return all containers with area equal to the maximum.",
    ],
    limitations: [
      "Only works for the 'maximum area' variant; the 'trap rainwater' variant requires counting individual cells and needs a different approach.",
      "Requires the array to represent bar heights on a uniform grid — does not generalize to arbitrary 2D geometries.",
      "Does not enumerate all pairs achieving the maximum — only one optimal pair is returned.",
      "The greedy argument is subtle; an incorrect pivot rule (e.g., always moving the taller bar) silently produces wrong answers.",
    ],
  },

  whenToUseIt:
    "Use **Container With Most Water** (two-pointer convergence) whenever you need to maximize a function of the form `f(leftIndex, rightIndex) = g(leftValue, rightValue) × (rightIndex - leftIndex)` where `g` is bounded by the smaller value.\n\n" +
    "This pattern applies directly to LeetCode #11 and its variants. The key insight is the monotone argument: once you can prove that one pointer direction cannot improve the objective, the two-pointer approach is both correct and optimal.\n\n" +
    "Do **not** use this approach when the objective function does not satisfy the monotone property — for example, when a wider but shallower container might be beaten by a narrower but taller one in a non-obvious way that requires exhaustive search.",
};
