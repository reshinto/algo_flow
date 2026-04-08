import type { EducationalContent } from "@/types";

export const removeKDigitsEducational: EducationalContent = {
  overview:
    "**Remove K Digits** (LeetCode 402) finds the smallest possible number by removing exactly `k` digits from a numeric string. The key insight is that a number is minimized when its digits are in non-decreasing order from left to right — which is exactly what a monotonic increasing stack enforces.\n\nA greedy approach processes each digit left to right: whenever the current digit is smaller than the top of the stack and removals remain, popping the stack top produces a smaller number. This is optimal because earlier (higher-position) digits contribute more to the number's magnitude.",

  howItWorks:
    "The algorithm uses a monotonic increasing stack to build the smallest result:\n\n" +
    "1. **Scan each digit** left to right.\n" +
    "2. **Maintain monotonic order** — while the stack top is greater than the current digit and removals remain:\n" +
    "   - Pop the stack top (this removes a larger digit in a higher position).\n" +
    "   - Decrement the removal counter.\n" +
    "3. **Push** the current digit onto the stack.\n" +
    "4. **Trim the tail** — if removals still remain after scanning all digits, pop from the end of the stack (removing the largest remaining digits).\n" +
    '5. **Strip leading zeros** — join the stack and remove any leading `0` characters; return `"0"` if the result is empty.\n\n' +
    '### Example trace on `num = "1432219"`, `k = 3`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Remove phase k=3\n" +
    '    A["[1,4] k=3"] -->|"3<4 → pop 4, k=2"| B["[1,3] k=2"]\n' +
    '    B -->|"2<3 → pop 3, k=1"| C["[1,2] k=1"]\n' +
    '    C -->|"push 2"| D["[1,2,2] k=1"]\n' +
    '    D -->|"1<2 → pop 2, k=0"| E["[1,2,1] k=0"]\n' +
    "    end\n" +
    "    subgraph No removals left\n" +
    '    E -->|"push 9 (k=0)"| F["[1,2,1,9] → \\"1219\\""]\n' +
    "    end\n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style D fill:#f59e0b,stroke:#d97706\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each pop removes a digit that is larger than its successor, shrinking the number's magnitude greedily from left to right.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each digit is pushed onto the stack exactly once and popped at most once, so the total number of push and pop operations is bounded by `2n`. The final strip and join are also `O(n)`, giving an overall linear time complexity.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The stack holds at most `n` digits in the worst case (e.g. when the input is already sorted in non-decreasing order and no digits need to be popped during the scan).",

  bestAndWorstCase:
    '**Best case** — `k = 0`: no removals, the algorithm simply pushes every digit and returns the original number in `O(n)`. Or `k >= n`: all digits are removed, returning `"0"` immediately.\n\n' +
    '**Worst case** — a strictly decreasing sequence like `"9876543210"` with `k = 5`: every new digit triggers a pop of the previous one, resulting in `O(n)` pops and pushes, but still linear overall.\n\n' +
    "The greedy choice is always globally optimal: removing a larger digit at a higher position strictly reduces the number, and no rearrangement can do better.",

  realWorldUses: [
    "**Number formatting systems:** Producing the shortest or smallest canonical form of a numeric identifier after optional character removal.",
    "**Lexicographic minimization:** Any scenario where you need to delete characters from a sequence to produce the lexicographically smallest result — the same greedy stack pattern applies to strings.",
    "**Competitive programming:** A foundational monotonic stack pattern that underpins problems like largest rectangle in histogram, stock span, and next greater element.",
    "**Data compression preprocessing:** Reducing numeric tokens to their minimal representations before encoding.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — each digit is processed at most twice (one push, one pop).",
      "Greedy correctness guarantee — the monotonic stack always produces the globally optimal result.",
      "Handles edge cases cleanly: leading zeros, k ≥ n, and already-sorted inputs.",
    ],
    limitations: [
      "Only works for digit strings — the ordering assumption breaks for arbitrary character alphabets without modification.",
      "O(n) extra space for the stack; an in-place variant would be more complex.",
      "Produces a string result, not a numeric type, so the caller must handle conversion if an integer is needed.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you must delete exactly `k` elements from a sequence to minimize (or maximize) its value. The greedy monotonic stack is optimal for single-pass digit/character removal. If the number of removals is unlimited, simply sort. If you need to remove characters to form a subsequence matching a target, consider dynamic programming instead.",
};
