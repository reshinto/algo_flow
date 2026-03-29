import type { EducationalContent } from "@/types";

export const slidingWindowMaxDequeEducational: EducationalContent = {
  overview:
    "**Sliding Window Maximum (Deque)** finds the maximum element in every contiguous window of size `k` as it slides across an array. A naive approach would be `O(n*k)` — re-scanning each window. The **monotonic deque** approach achieves `O(n)` by maintaining a decreasing deque of candidate indices.\n\nThe deque's front always holds the index of the **current window's maximum**, and smaller elements that can never become a future maximum are discarded eagerly from the back.",

  howItWorks:
    "1. Maintain a **monotonic decreasing deque** of indices (front = index of max element).\n" +
    "2. For each element at index `currentIndex`:\n" +
    "   - **Expire old indices:** Remove from the front any index that is outside the window `[currentIndex - k + 1, currentIndex]`.\n" +
    "   - **Maintain the monotonic property:** Remove from the back any index whose element is smaller than the current element — these can never be the max while the current element is in the window.\n" +
    "   - **Push:** Add `currentIndex` to the back.\n" +
    "   - **Record result:** Once the window is fully formed (`currentIndex >= k - 1`), the front of the deque is the index of the window maximum.\n\n" +
    "### Example: `[1,3,-1,-3,5,3,6,7]`, k=3\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Window1["Window [1,3,-1] → max=3"]\n' +
    "    A[1] --- B[3] --- C[-1]\n" +
    "    end\n" +
    '    subgraph Window2["Window [3,-1,-3] → max=3"]\n' +
    "    D[3] --- E[-1] --- F[-3]\n" +
    "    end\n" +
    "```\n\n" +
    "Result: `[3, 3, 5, 5, 6, 7]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is added to the deque exactly once and removed at most once.\n" +
    "- Despite the two `while` loops inside the main loop, the total deque operations across all iterations is bounded by `2n`.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "- The deque holds at most `k` indices at any time (one full window worth of candidates).\n" +
    "- The output array of size `n - k + 1` is part of the result and not counted as auxiliary space.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — For a sorted increasing array, every element invalidates all previous deque entries, but the total number of pops across all iterations is still bounded by `n`.\n\n" +
    "**Worst Case: `O(n)`** — For a sorted decreasing array, no elements are ever removed from the back. The deque grows to size `k` and then expires one element per step from the front, still `O(n)` total.\n\n" +
    "### Comparison with alternatives\n" +
    "- **Brute force:** `O(n*k)` — re-scans every window.\n" +
    "- **Segment tree / Sparse table:** `O(n log n)` preprocessing for `O(1)` or `O(log n)` per query — better for repeated queries on a static array.\n" +
    "- **Deque:** `O(n)` single pass — optimal for the single-query sliding window case.",

  realWorldUses: [
    "**Financial analytics:** Computing the rolling maximum price over a trading window in real-time market feeds.",
    "**Network monitoring:** Tracking peak bandwidth usage in sliding time windows for anomaly detection.",
    "**Signal processing:** Finding local maxima in streaming sensor data for peak detection algorithms.",
    "**Game development:** Efficient visibility range queries in tile-based games as the camera window moves.",
    "**Video processing:** Computing maximum brightness in a sliding spatial window for image enhancement filters.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — each element is enqueued and dequeued at most once.",
      "Space usage is bounded by the window size `k`, not the full array length.",
      "The same deque structure supports sliding window minimum with a trivial change (swap comparison direction).",
      "Works seamlessly with streaming data — no need to buffer the entire array.",
    ],
    limitations: [
      "The monotonic deque invariant can be unintuitive — easy to confuse front/back removal conditions.",
      "Does not support efficient updates (element changes) without reprocessing from that position.",
      "For static arrays with many range-max queries, a sparse table gives `O(1)` per query after `O(n log n)` preprocessing.",
    ],
  },

  whenToUseIt:
    "Use the **monotonic deque** pattern for sliding window maximum (or minimum) whenever:\n\n" +
    "- You need the maximum or minimum of every fixed-size window in a single pass.\n" +
    "- The data arrives as a stream and you need `O(1)` amortized per element.\n" +
    "- The window size is large relative to the array — brute force `O(n*k)` would be too slow.\n\n" +
    "Switch to a segment tree or sparse table when the window size is variable or you need many random-access range queries.",
};
