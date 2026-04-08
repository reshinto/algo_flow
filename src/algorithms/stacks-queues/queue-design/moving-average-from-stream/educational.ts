import type { EducationalContent } from "@/types";

export const movingAverageFromStreamEducational: EducationalContent = {
  overview:
    "**Moving Average from Data Stream** (LeetCode 346) computes a rolling average over the most recent `k` values in a stream of integers. A fixed-size queue acts as the sliding window: each new value is added to the rear, and once the window exceeds size `k`, the oldest value is evicted from the front.\n\nMaintaining a running sum alongside the queue makes each average computation `O(1)` — there is no need to sum all `k` elements on every update.",

  howItWorks:
    "The algorithm processes each incoming value in three steps:\n\n" +
    "1. **Enqueue** the new value and add it to `runningSum`.\n" +
    "2. **Evict** — if the queue now holds more than `k` elements, shift the front value off and subtract it from `runningSum`.\n" +
    "3. **Compute** the average: `runningSum / queue.length`.\n\n" +
    "### Example trace (`values = [1, 10, 3, 5]`, `k = 3`)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Step3["After value=3 (window full)"]\n' +
    '        W1(["1"]) --> W2(["10"]) --> W3(["3"])\n' +
    '        W3 -->|sum=14, avg=4.67| AVG1(["4.67"])\n' +
    "    end\n" +
    '    subgraph Step4["After value=5 (evict 1)"]\n' +
    '        X1(["10"]) --> X2(["3"]) --> X3(["5"])\n' +
    '        X3 -->|sum=18, avg=6.00| AVG2(["6.00"])\n' +
    "    end\n" +
    "    style W1 fill:#14532d,stroke:#22c55e\n" +
    "    style X3 fill:#f59e0b,stroke:#d97706\n" +
    "    style AVG2 fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "When value `5` arrives, the oldest element `1` is evicted from the front and subtracted from `runningSum`. Only one add and one subtract keep the sum current — no re-summing needed.\n\n" +
    "```\n" +
    "value   queue after enqueue   evict?   sum    avg\n" +
    "  1     [1]                   no       1      1.00\n" +
    " 10     [1, 10]               no      11      5.50\n" +
    "  3     [1, 10, 3]            no      14      4.67\n" +
    "  5     [10, 3, 5]  (evict 1) yes     18      6.00\n" +
    "```\n\n" +
    "The running sum avoids re-summing the window on every step, keeping each operation `O(1)`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` per value**\n\n" +
    "Each value triggers exactly one enqueue and at most one dequeue. Both are constant-time array operations. The running sum is updated with a single addition and subtraction, so no loop over the window is needed.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The queue holds at most `k` elements at any time. The running sum and averages array use `O(n)` total, but the sliding window itself is bounded by `k`.",

  bestAndWorstCase:
    "**Best case** — window size `k = 1`: every value is immediately the entire window, so no eviction occurs and each average equals the current value. Still `O(1)` per step.\n\n" +
    "**Worst case** — `k` equals the full stream length: the queue grows to hold all `n` values and no evictions occur. Time is `O(n)` total, space is `O(n)`.\n\n" +
    "In all cases, the per-element cost is `O(1)` because the running sum eliminates the need to iterate over the window.",

  realWorldUses: [
    "**Financial analysis:** Stock tickers and trading algorithms use moving averages over the last `k` seconds or minutes to smooth price noise and identify trends.",
    "**Sensor smoothing:** IoT devices and embedded sensors apply sliding-window averages to reduce noise from temperature, pressure, or motion readings.",
    "**Network monitoring:** Network tools compute moving averages of packet latency or bandwidth utilisation to detect anomalies without storing the entire history.",
    "**Game development:** Frame-rate smoothers compute a rolling average of frame times to display stable FPS counters and make adaptive quality decisions.",
    "**Machine learning preprocessing:** Streaming feature pipelines use sliding-window statistics to feed real-time models without batch recomputation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) per update — the running sum avoids re-summing the entire window.",
      "Fixed O(k) memory — the queue never grows beyond the window size.",
      "Simple, readable implementation with no complex data structures.",
      "Naturally handles streams of arbitrary length without storing all past values.",
    ],
    limitations: [
      "Requires knowing the window size `k` in advance — not suitable for variable-length windows without modification.",
      "Equally weights all values in the window — exponential moving averages give more weight to recent data but require extra bookkeeping.",
      "Queue shift (front removal) is O(1) with a deque but O(n) with a plain array — use a deque or ring buffer in performance-critical code.",
      "Does not support out-of-order or missing values; every position in the stream is assumed to be valid.",
    ],
  },

  whenToUseIt:
    "Use a fixed-size queue with a running sum whenever you need a constant-time sliding-window average over a stream. If the window size is dynamic or you need weighted averaging, consider an exponential moving average instead. For very large windows where numerical precision matters, prefer compensated summation (Kahan summation) over a plain running sum to avoid floating-point drift.",
};
