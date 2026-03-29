import type { EducationalContent } from "@/types";

export const firstNegativeInWindowEducational: EducationalContent = {
  overview:
    "**First Negative in Window** finds, for every contiguous window of a fixed size K, the first negative number in that window — or zero if no negative exists.\n\n" +
    "A naïve scan of each window independently costs `O(n·k)`. By maintaining a deque (double-ended queue) of indices of negative numbers seen so far, " +
    "the algorithm processes each element at most twice (once added, once removed), achieving a clean `O(n)` time complexity.",

  howItWorks:
    "1. **Initialize** an empty deque to store indices of negative elements.\n" +
    "2. Process the first window of size K:\n" +
    "   - For each element in positions `[0, k-1]`, if it is negative, append its index to the deque.\n" +
    "3. Record the first negative for this window: `arr[deque.front]` if the deque is non-empty, otherwise `0`.\n" +
    "4. **Slide the window** one position to the right:\n" +
    "   - If the deque's front index falls outside the new window (i.e., `<= leftIndex`), pop it from the front.\n" +
    "   - If the new incoming element is negative, push its index to the back of the deque.\n" +
    "   - Record `arr[deque.front]` (or `0`) as the result for this window.\n" +
    "5. Return the result array containing one entry per window.\n\n" +
    "The deque always holds candidate negative indices in the order they appear, so the front is always the leftmost (first) negative in the current window.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is pushed into the deque at most once and popped at most once.\n" +
    "- There are exactly `n - k + 1` windows, each processed in `O(1)` amortized time.\n" +
    "- Total operations: `O(n)`.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The deque holds at most k indices (those of negative elements within the current window). " +
    "The result array of size `n - k + 1` is output space, which is conventionally excluded from auxiliary space analysis.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** All elements are positive. The deque stays empty throughout; every window records `0` immediately. " +
    "All n elements are still touched once.\n\n" +
    "**Worst case — `O(n)`:** All elements are negative. Every element enters and leaves the deque exactly once, " +
    "and each window immediately reports the leftmost element. The total work remains linear.\n\n" +
    "Unlike brute-force approaches whose worst case is `O(n·k)`, the deque ensures each element is processed at most twice, capping the total cost at `O(2n) = O(n)` regardless of the data distribution.",

  realWorldUses: [
    "**Financial analysis:** Finding the first loss-making day within each rolling month window for real-time portfolio monitoring.",
    "**Signal processing:** Detecting the first negative amplitude sample in each audio frame to identify clipping or dropout events.",
    "**Network monitoring:** Locating the first packet with a negative delta (retransmission or reordering) within each time window.",
    "**Sensor telemetry:** Identifying the first below-threshold reading in each observation window for anomaly alerting.",
    "**Game physics:** Finding the first decelerating frame in each animation window to detect collision or braking events.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear `O(n)` time regardless of window size — far superior to the `O(n·k)` naïve approach.",
      "Output size (`n - k + 1`) is minimal — exactly one answer per window.",
      "Deque approach is cache-friendly and branch-predictable for large inputs.",
      "Easily extended to find the first positive, first zero, or first element satisfying any predicate.",
    ],
    limitations: [
      "Only reports the first (leftmost) negative — does not count or enumerate all negatives in the window.",
      "Fixed window size only — the variable-window variant requires a different structure.",
      "Outputs `0` as a sentinel when no negative is found; callers must distinguish between a genuine `0` element and 'no negative'.",
      "The deque requires `O(k)` auxiliary space; for extremely large k this can be significant.",
    ],
  },

  whenToUseIt:
    "Use First Negative in Window whenever you need one representative element (the first negative) from every fixed-size window in a single linear pass. " +
    "It is the canonical pattern for 'sliding window with a deque' interview problems.\n\n" +
    "If you need the **minimum** or **maximum** in each window instead of the first negative, the same deque structure applies — just change the eviction condition. " +
    "If you need to **count** negatives per window, a simple prefix-sum approach is simpler and equally efficient.",
};
