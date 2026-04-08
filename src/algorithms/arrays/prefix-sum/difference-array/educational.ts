import type { EducationalContent } from "@/types";

export const differenceArrayEducational: EducationalContent = {
  overview:
    "The **Difference Array** technique enables multiple range updates on an array to be applied in O(1) each, with the final state reconstructed in O(n) via a single prefix sum pass.\n\n" +
    "Without this technique, each range update `[left, right, delta]` requires O(n) time to increment every element between `left` and `right`. With a difference array, you encode only the *change boundaries*, then recover the actual values in a single linear pass — reducing total cost from O(n * q) to O(n + q) for `q` updates.",

  howItWorks:
    "1. Create a difference array `diff` of size `n + 1`, initialized to all zeros.\n" +
    "2. For each range update `[left, right, delta]`:\n" +
    "   - Add `delta` at `diff[left]` (mark where the change begins).\n" +
    "   - Subtract `delta` at `diff[right + 1]` (mark where the change ends).\n" +
    "3. After all updates, reconstruct the result by computing the prefix sum of `diff`:\n" +
    "   - `result[i] = result[i-1] + diff[i]`\n\n" +
    "### Walkthrough: `arrayLength=5`, updates=`[[1,3,3]]`\n\n" +
    "```\n" +
    "diff:   [0, +3,  0,  0, -3,  0]   after update [1,3,3]\n" +
    "prefix: [0,  3,  3,  3,  0,  0]   prefix sum\n" +
    "result: [0,  3,  3,  3,  0]       final values (length n)\n" +
    "```\n\n" +
    "Multiple overlapping updates accumulate in `diff` and are resolved correctly by the prefix sum.\n\n" +
    "### Difference Array Update Diagram (update `[1, 3, +3]` on length-5 array)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["diff\\n[0,0,0,0,0,0]"] -->|"diff[1]+=3"| B["diff\\n[0,3,0,0,0,0]"]\n' +
    '  B -->|"diff[4]-=3"| C["diff\\n[0,3,0,0,-3,0]"]\n' +
    '  C -->|"prefix sum"| D["result\\n[0,3,3,3,0]"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Only two positions in `diff` are written per update. The prefix sum pass propagates the `+3` delta across indices 1–3 and cancels it at index 4.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + q)`**\n\n" +
    "- Each of the `q` range updates takes `O(1)` — only two array positions are touched.\n" +
    "- The final prefix sum reconstruction takes `O(n)`.\n" +
    "- Without this technique, `q` updates each taking `O(n)` yields `O(n * q)` — potentially enormous for large `q`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "- The difference array has size `n + 1`. The result array has size `n`. Both are linear in the input size.",

  bestAndWorstCase:
    "**Best Case: `O(n + q)`** — Always linear, regardless of update overlap or range size. Even a single update covering the whole array is O(1).\n\n" +
    "**Worst Case: `O(n + q)`** — There is no scenario that degrades performance beyond this bound.\n\n" +
    "### Comparison with Naive Approach\n\n" +
    "| Approach        | Per Update | Total for q Updates |\n" +
    "| --------------- | ---------- | ------------------- |\n" +
    "| Naive loop      | O(n)       | O(n * q)            |\n" +
    "| Difference Array| O(1)       | O(n + q)            |\n\n" +
    "For 10,000 elements and 10,000 updates, the naive approach performs 100 million operations; the difference array performs only 20,000.",

  realWorldUses: [
    "**Event Scheduling**: Track meeting room occupancy across a time range without updating every minute individually.",
    "**Competitive Programming**: The go-to tool for bulk range increment/decrement problems under time constraints.",
    "**Game Development**: Apply area-of-effect bonuses or damage across a range of grid cells in O(1) per effect.",
    "**Network Traffic Simulation**: Model bandwidth consumption over time intervals with many overlapping sessions.",
    "**Financial Modeling**: Apply interest adjustments or promotions over date ranges efficiently.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Reduces q range updates from O(n * q) to O(n + q) — an enormous speedup for large q.",
      "Each individual update is O(1), making it ideal for high-frequency bulk operations.",
      "Simple to implement: two array writes per update, one linear pass to reconstruct.",
      "Handles overlapping ranges correctly via natural accumulation in the difference array.",
    ],
    limitations: [
      "Cannot answer point queries before all updates are applied — requires the full reconstruction pass first.",
      "Only suitable for additive range updates; multiplicative or more complex operations need segment trees.",
      "The extra `n + 1` element in the difference array requires careful bounds handling.",
    ],
  },

  whenToUseIt:
    "Reach for the **Difference Array** whenever you have a batch of range updates to apply before reading any values. Key signals:\n\n" +
    "- Multiple `[left, right, delta]` range increment/decrement operations.\n" +
    "- You process all updates before querying the final array.\n" +
    "- You need O(1) per update and O(n) reconstruction.\n\n" +
    "**Avoid it when** you need to query values in between updates — use a Fenwick Tree or Segment Tree instead, which support both O(log n) updates and queries.",
};
