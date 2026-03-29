import type { EducationalContent } from "@/types";

export const slidingWindowEducational: EducationalContent = {
  overview:
    "The **Sliding Window** technique is an algorithmic pattern used to efficiently process contiguous subarrays or substrings of a fixed or variable size. \n\nInstead of recalculating the result for each possible subarray from scratch, the window *slides* across the data, incrementally updating the result by specifically removing the element leaving the window and adding the element entering it. This reduces many `O(n*k)` brute-force problems to a highly optimal `O(n)`.",

  howItWorks:
    "1. Compute the structural result (e.g., sum) for the **first window** of size `k`.\n" +
    "2. Record this as the initial best result.\n" +
    "3. Slide the window one position to the right:\n" +
    "   * **Subtract** the element that just left the window (leftmost element of the previous window).\n" +
    "   * **Add** the element that just entered the window (rightmost element of the new window).\n" +
    "4. Compare the new window's result with the current best and update if it is superior.\n" +
    "5. Repeat until the window reaches the terminal end of the array.\n\n" +
    "### Visualizing a Window Slide (`k=3`)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph W1["Window 1: Sum = 8"]\n' +
    "    A[2] --- B[1] --- C[5]\n" +
    "    end\n" +
    '    subgraph W2["Window 2: Sum = 7"]\n' +
    "    D[1] --- E[5] --- F[1]\n" +
    "    end\n" +
    "    \n" +
    "    A -.->|Leaves Window| D\n" +
    "    style A fill:#7f1d1d,stroke:#ef4444\n" +
    "    style F fill:#10b981,stroke:#3b82f6\n" +
    "```\n\n" +
    "Example with `[2, 1, 5, 1, 3, 2]`:\n" +
    "- **Window 1:** `[2, 1, 5]` → sum = `8`\n" +
    "- **Window 2:** `[1, 5, 1]` → sum = `8 - 2 + 1 = 7`\n" +
    "- **Window 3:** `[5, 1, 3]` → sum = `7 - 1 + 3 = 9` *(new max!)*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- **Best / Average / Worst Case:** `O(n)` — The iterator always scans sequentially through the entire linear array exactly once regardless of actual integer payloads.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of variable pointers are utilized (`currentSum`, `maxSum`, `windowStart`). No additional data structures are ever needed beyond the initial core input array.",

  bestAndWorstCase:
    "**Best case** and **Worst case** are rigorously identical `O(n)` for the fixed-size sliding window. The algorithmic pointer universally parses every single node precisely once. Even if the mathematically maximum sequence resides at the very first window, the algorithm continues scanning completely to historically verify no superior window exists.\n\n" +
    "### The Brute Force Difference\n" +
    "The naive looping approach of computing the manual sum of every possible subarray inside size `k` requires `O(n*k)` time. For a massive array of 1,000,000 elements with `k=1000`, brute force dictates ~1 billion operations while the sliding window requires just ~1 million — an instantaneous **1000x optimization**.",

  realWorldUses: [
    "**Network Analytics:** Throughput monitoring via seamlessly computing moving averages of TCP packet rates over fixed timescale windows.",
    "**Financial FinTech:** Calculating rolling averages, aggregate moving sums, and sliding `min`/`max` momentum metrics for high-frequency stock parsing.",
    "**Genomic Sequencing:** Rapidly locating anomaly structures in DNA sequences by sliding a rigid nucleotide window across massive genome strands.",
    "**Streaming Telemetry:** Maintaining running statistics over the most recent `k` events in low-latency real-time diagnostic systems.",
    "**NLP Processing:** Resolving the densest abstract substring of a given fixed algorithmic length in document heuristic analysis.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Instantly converts catastrophic `O(n*k)` brute-force logic into an ultra-sleek `O(n)` time profile.",
      "Phenomenally memory efficient requiring pure `O(1)` architectural space.",
      "Trivially simple to structure code around once the two-pointer paradigm is recognized.",
      "Dynamically adaptable to swap aggregate targets seamlessly (e.g., `sum`, `max`, `min`, `average`).",
      "Functions immaculately against live streaming buffer data where node blocks arrive one by one.",
    ],
    limitations: [
      "Strictly handcuffed to problem-sets resolving contiguous adjacent elements or unbroken structural substrings.",
      "The Fixed-Size variant severely fails on problems where optimal window span lengths are entirely unknown initially.",
      "For dynamic conditionals, upgrading to the Variable-Size sliding variant drastically injects complex `while` loop implementation traps.",
    ],
  },

  whenToUseIt:
    "Routinely default to the **Sliding Window** paradigm whenever architectural requests trigger phrasing searching for optimizations among *all contiguous sub-arrays* of a fixed length. \n\nSignals include phrases like 'maximum sum subarray of size k', or 'longest distinct substring length'. However, if the target explicitly permits non-contiguous element leaps, completely abandon Sliding Window in favor of Dynamic Programming!",
};
