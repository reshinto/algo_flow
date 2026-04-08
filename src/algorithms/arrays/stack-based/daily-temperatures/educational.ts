import type { EducationalContent } from "@/types";

export const dailyTemperaturesEducational: EducationalContent = {
  overview:
    "**Daily Temperatures** answers a classic question: given a list of daily temperatures, for each day, how many days must you wait until a warmer day arrives? If no warmer day exists, the answer is `0`.\n\n" +
    "This is a variation of the **Next Greater Element** problem, but instead of returning the greater value itself, we return the **distance** (index difference) to it. The monotonic stack approach solves it in `O(n)` time — far better than the `O(n²)` brute-force comparison of every pair.",

  howItWorks:
    "1. Initialize a `waitDays` array filled with `0` and an empty `pendingStack` (stores day indices).\n" +
    "2. For each `dayIndex` from left to right:\n" +
    "   a. Read `todayTemp = temperatures[dayIndex]`.\n" +
    "   b. While the stack is non-empty and the temperature at the stack's top index is **less than** `todayTemp`:\n" +
    "      - Pop the top index (`poppedIndex`).\n" +
    "      - Compute the wait: `waitDays[poppedIndex] = dayIndex - poppedIndex`.\n" +
    "   c. Push `dayIndex` onto the stack.\n" +
    "3. Any remaining indices in the stack have no warmer day — their `waitDays` entries stay `0`.\n" +
    "4. Return `waitDays`.\n\n" +
    "### Trace for `[73, 74, 75, 71, 69, 72, 76, 73]`\n\n" +
    "```\n" +
    "Day 0 (73): stack=[]     → push 0           → stack=[0]\n" +
    "Day 1 (74): 73<74 → pop 0, wait[0]=1-0=1   → stack=[1]\n" +
    "Day 2 (75): 74<75 → pop 1, wait[1]=2-1=1   → stack=[2]\n" +
    "Day 3 (71): 75>71 → push 3                  → stack=[2,3]\n" +
    "Day 4 (69): 71>69 → push 4                  → stack=[2,3,4]\n" +
    "Day 5 (72): 69<72 → pop 4, wait[4]=5-4=1\n" +
    "            71<72 → pop 3, wait[3]=5-3=2\n" +
    "            75>72 → push 5                  → stack=[2,5]\n" +
    "Day 6 (76): 72<76 → pop 5, wait[5]=6-5=1\n" +
    "            75<76 → pop 2, wait[2]=6-2=4\n" +
    "            stack empty → push 6            → stack=[6]\n" +
    "Day 7 (73): 76>73 → push 7                  → stack=[6,7]\n" +
    "Remaining: indices 6,7 → wait stays 0\n" +
    "Result: [1, 1, 4, 2, 1, 1, 0, 0]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["73"] --> B["74"]\n' +
    '  B --> C["75"]\n' +
    '  C --> D["71"]\n' +
    '  D --> E["72"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "When day 4 (72°) is processed, it resolves the pending stack: 71° waited 1 day, 75° waited 4 days. Green = already resolved, amber = pending in stack, cyan = current day being processed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each day index is pushed onto the stack exactly once and popped at most once.\n" +
    "- Total push + pop operations across the entire pass: at most `2n`.\n" +
    "- The inner `while` loop runs in `O(1)` amortized — overall `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "- The stack holds at most `n` indices in the worst case (monotonically non-increasing temperatures).\n" +
    "- The output `waitDays` array is `O(n)` as well.\n\n" +
    "**Comparison with brute force:**\n\n" +
    "| Approach | Time | Space |\n" +
    "| --- | --- | --- |\n" +
    "| Brute force (nested loops) | `O(n²)` | `O(1)` |\n" +
    "| Monotonic stack | `O(n)` | `O(n)` |",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** When temperatures are strictly increasing, every new day immediately resolves all pending stack entries. Each element is still pushed and popped once, so the time remains `O(n)`.\n\n" +
    "**Worst Case — `O(n)`:** A strictly decreasing sequence causes no pops during the forward scan — the entire stack is emptied only at the end (with waits staying `0`). Still `O(n)` because each index is pushed once.\n\n" +
    "### Distance vs. Value\n\n" +
    "This algorithm is identical in structure to Next Greater Element. The only difference is in what is stored when a pending index is resolved: instead of `temperatures[dayIndex]` (the warmer temperature), we store `dayIndex - poppedIndex` (the number of days to wait). The stack invariant, complexity, and correctness proof are identical.",

  realWorldUses: [
    "**Weather forecasting dashboards:** Showing users how many days until the next temperature increase.",
    "**Financial waiting periods:** Finding how many trading sessions until a stock price exceeds a given day's close.",
    "**Event scheduling:** Determining the gap until the next occurrence exceeds a threshold (CPU load, network throughput).",
    "**Game development:** Simulating time-until-next-event mechanics for cooldowns or triggers based on rising values.",
    "**Sensor alert systems:** Detecting how many readings until a sensor value rises above a reference reading.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear `O(n)` time — optimal for this class of next-greater-distance problems.",
      "Single left-to-right pass with no preprocessing or auxiliary arrays beyond the stack.",
      "Directly generalizable: swap `<` for `>` to get previous-warmer-day, or change the stored value to get next-greater-value instead of distance.",
      "Memory-efficient for large temperature datasets compared to `O(n²)` pairwise comparison.",
    ],
    limitations: [
      "Requires `O(n)` extra space for the pending stack.",
      "Only handles the offline version (all temperatures known upfront) — online streaming queries require different structures.",
      "The stack invariant and pop-on-exceed logic can be tricky to implement correctly for equal temperatures (use strict `<`, not `<=`).",
    ],
  },

  whenToUseIt:
    "Use **Daily Temperatures (Monotonic Stack)** when you need the number of steps to the next greater element for every position in `O(n)` time:\n" +
    "- Temperature forecast wait times\n" +
    "- Stock price day-until-higher queries\n" +
    "- Any 'how far until the next increase' problem\n\n" +
    "Avoid this approach for online/streaming scenarios where values arrive one at a time and past answers may be invalidated — in that case, a segment tree or priority queue is more appropriate.",
};
