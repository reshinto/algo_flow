import type { EducationalContent } from "@/types";

export const slidingWindowMinSumEducational: EducationalContent = {
  overview:
    "The **Sliding Window (Min Sum)** technique finds the contiguous subarray of a fixed size whose elements sum to the smallest value. It mirrors the max-sum variant but tracks a minimum rather than a maximum.\n\nBy reusing the previous window's sum and adjusting it incrementally — subtracting the outgoing element and adding the incoming element — the algorithm avoids recomputing from scratch and runs in `O(n)` instead of the brute-force `O(n*k)`.",

  howItWorks:
    "1. Compute the sum of the **first window** of size `k`.\n" +
    "2. Record this as the initial minimum sum.\n" +
    "3. Slide the window one position to the right:\n" +
    "   * **Subtract** the element that just left (leftmost element of the previous window).\n" +
    "   * **Add** the element that just entered (rightmost element of the new window).\n" +
    "4. If the new window sum is **less than** the current minimum, update the minimum and record the start index.\n" +
    "5. Repeat until the window reaches the end of the array.\n\n" +
    "### Example with `[4, 2, 1, 7, 8, 1, 2, 8, 1, 0]`, `k=3`\n\n" +
    "- **Window 1:** `[4, 2, 1]` → sum = `7` (initial min)\n" +
    "- **Window 2:** `[2, 1, 7]` → sum = `10` (no update)\n" +
    "- **Window 3:** `[1, 7, 8]` → sum = `16` (no update)\n" +
    "- **...slide...**\n" +
    "- **Window 8:** `[1, 0]` is not full; last window `[1, 1, 0]` → sum = `2` — new minimum at index 7\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["4"] --> B["2"] --> C["1"] --> D["7"] --> E["8"] --> F["1"] --> G["2"] --> H["8"] --> I["1"] --> J["0"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style H fill:#14532d,stroke:#22c55e\n" +
    "  style I fill:#f59e0b,stroke:#d97706\n" +
    "  style J fill:#f59e0b,stroke:#d97706\n" +
    '  W["k=3 window\\nsum=2 ✓"] -. min sum .-> H\n' +
    "```\n\n" +
    "The amber window `[1, 1, 0]` (indices 7–9) has the minimum sum of **2** across all k=3 windows.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- **Best / Average / Worst Case:** `O(n)` — the window traverses the array exactly once regardless of values.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a fixed set of scalar variables (`currentSum`, `minSum`, `windowStartIndex`) are maintained. No auxiliary data structures are allocated.",

  bestAndWorstCase:
    "**Best and worst cases are identical at `O(n)`.** There is no early-exit condition — the window must scan the entire array to confirm no smaller-sum window exists.\n\n" +
    "The brute-force alternative computes every subarray sum independently in `O(n*k)` time. For an array of 100,000 elements and `k=100`, the brute-force approach requires ~10 million operations while the sliding window requires only ~100,000 — a **100x speedup**.",

  realWorldUses: [
    "**Quality Control:** Detecting the time window with the lowest defect rate in manufacturing sensor data.",
    "**Energy Optimization:** Finding the interval of minimal power consumption across a sliding measurement window.",
    "**Finance:** Identifying the trading period with the lowest volatility (minimum sum of absolute changes) over a fixed lookback window.",
    "**Network Monitoring:** Locating the quietest time window (fewest packets or errors) in traffic logs.",
    "**Signal Processing:** Finding the segment with the smallest noise magnitude in a sampled waveform.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Reduces `O(n*k)` brute-force to `O(n)` with a single pass.",
      "`O(1)` space — no auxiliary structures needed.",
      "Trivially invertible from the max-sum variant by changing one comparison operator.",
      "Works seamlessly on streaming data where elements arrive sequentially.",
    ],
    limitations: [
      "Applies only to contiguous subarray problems.",
      "Fixed window size must be known in advance — variable-size problems require a different approach.",
      "Does not provide all windows tied at the minimum sum, only the first encountered.",
    ],
  },

  whenToUseIt:
    "Choose the **Sliding Window (Min Sum)** pattern when you need the contiguous subarray of a **known fixed length** with the smallest aggregate value.\n\nCommon phrasings: 'minimum sum subarray of size k', 'lowest average over k elements', 'coolest k-day temperature window'. If the window size is variable or depends on a threshold, use the variable-size sliding window pattern instead.",
};
