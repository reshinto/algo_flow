import type { EducationalContent } from "@/types";

export const maxConsecutiveOnesEducational: EducationalContent = {
  overview:
    "**Max Consecutive Ones III** finds the longest contiguous subarray of `1`s you can obtain by flipping at most `k` zeros to ones. This is a classic variable sliding window problem where the window constraint is the count of zeros inside it.\n\nThe window expands greedily and only shrinks when the number of zeros inside exceeds the allowed flip budget `k`.",

  howItWorks:
    "1. Initialize `leftPointer = 0`, `zeroCount = 0`, `maxLength = 0`.\n" +
    "2. For each `rightPointer` from `0` to `n-1`:\n" +
    "   * **Expand:** If `array[rightPointer] == 0`, increment `zeroCount`.\n" +
    "   * **Shrink:** While `zeroCount > maxFlips`, if `array[leftPointer] == 0` decrement `zeroCount`, then advance `leftPointer`.\n" +
    "   * **Record:** Update `maxLength` if `rightPointer - leftPointer + 1` is larger.\n" +
    "3. Return `maxLength` and the start index of the best window.\n\n" +
    "### Example with `[1,1,0,0,1,1,1,0,1,1]`, `maxFlips = 2`\n\n" +
    "- The optimal window is `[1,1,0,0,1,1,1]` (indices 0–6), length **7**.\n" +
    "- It contains exactly 2 zeros — both can be flipped — giving 7 consecutive ones.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["1"] --> B["1"] --> C["0"] --> D["0"] --> E["1"] --> F["1"] --> G["1"] --> H["0"] --> I["1"] --> J["1"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style H fill:#06b6d4,stroke:#0891b2\n" +
    "  style I fill:#06b6d4,stroke:#0891b2\n" +
    "  style J fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Green = ones in the optimal window, amber = the 2 flipped zeros, cyan = elements outside the best window. " +
    "The window spans indices 0–6 for a length of **7**.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is processed at most twice: once when `rightPointer` includes it and once when `leftPointer` removes it. Total pointer movements are bounded by `2n`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only scalar counters and pointers are maintained. The binary input array is not copied.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — When `maxFlips >= totalZeros`, the window never needs to shrink, and the answer is the full array in one pass.\n\n" +
    "**Worst Case: `O(n)`** — When `maxFlips = 0` and the array alternates `0` and `1`, the window shrinks at every step. But each pointer still traverses the array at most once, keeping the total at `O(n)`.",

  realWorldUses: [
    "**Telecommunications:** Finding the longest transmission burst window that can tolerate up to `k` corrupted bits.",
    "**Manufacturing QC:** Identifying the longest run of passing items when up to `k` defective items are permitted (e.g., within tolerance).",
    "**Genomics:** Locating the longest DNA segment matching a profile when up to `k` mismatches are allowed.",
    "**Network Uptime:** Finding the longest uptime window when at most `k` brief outages are acceptable.",
    "**Scheduling:** Maximizing the length of a continuous work block when up to `k` short breaks are allowed.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "`O(n)` time — the two-pointer technique avoids all re-scanning.",
      "`O(1)` space — no prefix arrays or hash maps needed.",
      "Works on binary arrays without modification.",
      "Easily generalized to 'at most k elements satisfying condition X' by changing the counter.",
    ],
    limitations: [
      "Designed for binary arrays (0s and 1s) — generalizing to non-binary values requires different tracking.",
      "Returns only the first longest window encountered when ties exist.",
      "Does not output the actual flipped array — only the window bounds.",
    ],
  },

  whenToUseIt:
    "Choose **Max Consecutive Ones III** when you need the longest subarray satisfying a constraint that can be stated as 'at most `k` violations'. Common forms: 'flip at most `k` zeros', 'tolerate at most `k` mismatches', 'allow at most `k` of element type X'.\n\nWhen `k = 0`, the problem reduces to finding the longest run of `1`s. When `k >= totalZeros`, the answer is the full array.",
};
