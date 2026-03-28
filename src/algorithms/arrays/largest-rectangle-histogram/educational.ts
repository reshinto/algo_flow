import type { EducationalContent } from "@/types";

export const largestRectangleHistogramEducational: EducationalContent = {
  overview:
    "**Largest Rectangle in Histogram** asks: given an array of bar heights representing a histogram, find the area of the largest rectangle that can be formed using contiguous bars.\n\nThe **monotonic stack** approach solves this in `O(n)` time by maintaining a stack of bar indices in increasing height order. When a shorter bar is encountered, it acts as the right boundary for all taller bars currently in the stack.",

  howItWorks:
    "1. Maintain a **monotonic increasing stack** of bar indices.\n" +
    "2. Iterate from left to right, appending a sentinel bar of height `0` at the end.\n" +
    "3. For each bar:\n" +
    "   - While the stack is non-empty and the **current bar is shorter** than the bar at the top of the stack:\n" +
    "     * **Pop** the top index as the height bar.\n" +
    "     * The **right boundary** is the current index.\n" +
    "     * The **left boundary** is one past the new top of the stack (or index 0 if the stack is empty).\n" +
    "     * Compute `area = height × width` and update the maximum.\n" +
    "   - Push the current index onto the stack.\n" +
    "4. The sentinel `0` at the end forces all remaining bars to be popped and evaluated.\n\n" +
    "### Example: `[2, 1, 5, 6, 2, 3]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Histogram["heights = [2, 1, 5, 6, 2, 3]"]\n' +
    "    A[2] --- B[1] --- C[5] --- D[6] --- E[2] --- F[3]\n" +
    "    end\n" +
    "```\n\n" +
    "When index 4 (height=2) is processed, bars at indices 3 (h=6) and 2 (h=5) are popped:\n" +
    "- Pop index 3 (h=6): width = 4-3 = 1, area = 6\n" +
    "- Pop index 2 (h=5): width = 4-2 = 2, area = 10 ← **maximum**",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each bar index is pushed onto the stack exactly once and popped at most once.\n" +
    "- Despite the nested `while` loop, the total number of push+pop operations across all iterations is bounded by `2n`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "- The stack can hold at most `n` indices (when all bars are in increasing height order).\n" +
    "- This is the space cost of tracking bar boundaries without precomputing left/right arrays.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — Even for a flat histogram (all bars equal height), every index is pushed and popped exactly once.\n\n" +
    "**Worst Case: `O(n)`** — For a strictly increasing histogram, all bars are pushed to the stack and then all popped during the sentinel processing at the end. This is `O(2n) = O(n)` total operations.\n\n" +
    "### Why not the naive approach?\n" +
    "The brute-force `O(n²)` approach checks every pair `(left, right)` as boundaries and finds the minimum height in between. The stack approach avoids this by tracking exactly which bars are valid left boundaries at each step.",

  realWorldUses: [
    "**Skyline problems:** Determining the largest solid rectangular area in a city skyline view.",
    "**Image analysis:** Finding the largest uniform rectangular region in a binary image (used in OCR and document parsing).",
    "**Database query optimization:** Computing optimal block sizes for columnar data storage layouts.",
    "**Trading systems:** Identifying the widest price range within a consecutive streak of above-threshold prices.",
    "**2D maximal rectangle:** This algorithm is a subroutine in the `O(n*m)` solution for finding the largest rectangle in a binary matrix.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — processes each bar exactly twice (one push, one pop).",
      "The sentinel value trick elegantly handles all remaining bars without special-casing the end.",
      "Generalizes directly to the Maximal Rectangle in Binary Matrix problem by applying per-row.",
      "Stack never grows larger than `n` indices, keeping memory usage predictable.",
    ],
    limitations: [
      "Requires non-trivial understanding of the monotonic stack invariant — harder to derive from scratch in an interview.",
      "The sentinel `0` appended at the end is a subtle but essential implementation detail that is easy to forget.",
      "Does not directly support online (streaming) updates — a new bar added requires re-running from scratch.",
    ],
  },

  whenToUseIt:
    "Reach for the **monotonic stack** pattern for histogram rectangle problems whenever:\n\n" +
    "- You need the largest rectangle using **contiguous bars** with the minimum height as the limiting factor.\n" +
    "- The problem reduces to 'for each bar as the height, find the widest span it can extend to'.\n" +
    "- You encounter the 2D maximal rectangle variant — apply this row by row on a running height map.\n\n" +
    "Do not use a stack if the problem asks for non-contiguous selections or allows arbitrary bar scaling.",
};
