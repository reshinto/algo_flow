import type { EducationalContent } from "@/types";

export const slidingWindowMaximumEducational: EducationalContent = {
  overview:
    "**Sliding Window Maximum** (LeetCode 239) finds the maximum element in every contiguous subarray of size `k` within a given array. A naïve scan of each window is `O(nk)`, but a **monotonic deque** of indices reduces this to `O(n)` by ensuring the front of the deque always holds the index of the current window's maximum.\n\nThe deque stores indices in **decreasing order of their values**, so expired indices are removed from the front and smaller indices are evicted from the rear before each new element is added.",

  howItWorks:
    "The algorithm maintains a deque whose indices always correspond to elements in **non-increasing** order:\n\n" +
    "1. **Expire old indices** — while the front index is outside the current window (`front ≤ elementIdx − k`), remove it from the front.\n" +
    "2. **Maintain monotonicity** — while the rear element is ≤ the current element, pop it from the rear (it can never be a window maximum).\n" +
    "3. **Enqueue** the current index at the rear.\n" +
    "4. **Record maximum** — once `elementIdx ≥ k − 1`, the front of the deque is the index of the window's maximum.\n\n" +
    "### Example trace on `[1, 3, -1, -3, 5, 3, 6, 7]`, k = 3\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Idx2["idx=2, val=-1: deque=[1,2], max=arr[1]=3"]\n' +
    '        D1(["idx 1\\nval 3"]) --> D2(["idx 2\\nval -1"])\n' +
    '        D1 -->|front = max| MX1(["max = 3"])\n' +
    "    end\n" +
    '    subgraph Idx4["idx=4, val=5: smaller indices evicted, deque=[4]"]\n' +
    '        D3(["idx 4\\nval 5"])\n' +
    '        D3 -->|front = max| MX2(["max = 5"])\n' +
    "    end\n" +
    '    Idx2 -->|"5 > 3 and 5 > -1, evict all"| Idx4\n' +
    "    style D1 fill:#06b6d4,stroke:#0891b2\n" +
    "    style D3 fill:#f59e0b,stroke:#d97706\n" +
    "    style MX2 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The deque maintains a decreasing sequence of values from front to rear. When a new element is larger than rear entries, those entries are evicted — they can never be the maximum for any future window.\n\n" +
    "```\n" +
    "idx  val  deque (indices)  window max\n" +
    " 0    1   [0]              —\n" +
    " 1    3   [1]              —  (3 > 1, so index 0 evicted)\n" +
    " 2   -1   [1, 2]           3  (first full window)\n" +
    " 3   -3   [1, 2, 3]        3\n" +
    " 4    5   [4]              5  (5 > all, deque cleared)\n" +
    " 5    3   [4, 5]           5\n" +
    " 6    6   [6]              6\n" +
    " 7    7   [7]              7\n" +
    "result: [3, 3, 5, 5, 6, 7]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each index is enqueued exactly once and dequeued at most once (either from the front when it expires or from the rear when a larger element arrives). The total number of deque operations is therefore bounded by `2n`, giving linear time.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The deque holds at most `k` indices at any time — one per element in the current window — so extra space is proportional to the window size.",

  bestAndWorstCase:
    "**Best case `O(n)`** — a strictly decreasing array: no rear evictions occur, but every index is still enqueued and dequeued once.\n\n" +
    "**Worst case `O(n)`** — a strictly increasing array: each new element evicts all previous deque entries, but across the full traversal the total evictions still equal `n`.\n\n" +
    "The algorithm is always `O(n)` regardless of input order — the amortised cost of all enqueue and dequeue operations is constant per element.",

  realWorldUses: [
    "**Stock price analysis:** Computing the highest price over a rolling window of recent trading days.",
    "**Signal processing:** Finding peak amplitude in a sliding audio or sensor data frame.",
    "**Network monitoring:** Tracking the maximum bandwidth usage over a rolling time window for anomaly detection.",
    "**Game development:** Efficiently querying the maximum value in a moving region of a grid or timeline.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal for this problem; each element is touched at most twice.",
      "O(k) space — only the current window's candidates are stored.",
      "Straightforward to extend to sliding window minimum by reversing the comparison.",
    ],
    limitations: [
      "Requires a double-ended queue (deque) data structure, which is not always built into every language's standard library.",
      "Returns maxima only; recovering the index of each maximum requires minor bookkeeping.",
      "For very small k (k = 1), a simple linear scan is simpler and equally fast.",
    ],
  },

  whenToUseIt:
    "Use the monotonic deque approach whenever you need the maximum (or minimum) of every fixed-size sliding window in `O(n)` time. If the window size changes dynamically or you need range maximum queries on arbitrary intervals, consider a **sparse table** (static arrays, `O(1)` query) or a **segment tree** (dynamic updates, `O(log n)` query) instead.",
};
