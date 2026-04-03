/**
 * Educational content for Counting Sort (Distribution).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Counting Sort. */
export const countingSortEducational: EducationalContent = {
  overview:
    "**Counting Sort** is a non-comparison integer sorting algorithm that operates by counting how many times each distinct value appears in the input, then using those counts to reconstruct a sorted output.\n\nBecause it never compares elements against each other, it sidesteps the `O(n log n)` lower bound that applies to comparison-based sorts, achieving linear time when the value range `k` is proportional to `n`.",

  howItWorks:
    "Counting Sort works in three phases:\n\n" +
    "### Phase 1 — Count\n" +
    "Walk the input array and increment a counter for each value's position in a count array sized `max - min + 1`.\n\n" +
    "### Phase 2 — Place\n" +
    "Walk the count array from index 0 upward, writing `count[v]` copies of value `v + min` back into the output.\n\n" +
    "### Visualizing Counting Sort on [4, 2, 2, 8, 3, 3, 1]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Input: 4 2 2 8 3 3 1] --> B[Count array: idx 0-7]\n" +
    "    B --> C[counts: 1=1, 2=2, 3=2, 4=1, 8=1]\n" +
    "    C --> D[Write back: 1, 2, 2, 3, 3, 4, 8]\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Count pass:** `counts[1]=1, counts[2]=2, counts[3]=2, counts[4]=1, counts[8]=1`\n" +
    "- **Place pass:** Emit each value `count` times → `[1, 2, 2, 3, 3, 4, 8]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + k)`**\n\n" +
    "- **Best Case:** `O(n + k)` — single pass to count, single pass to place.\n" +
    "- **Average Case:** `O(n + k)` — always two linear scans regardless of distribution.\n" +
    "- **Worst Case:** `O(n + k)` — consistent; no worst-case degradation.\n\n" +
    "Where `k = max - min + 1` is the range of input values.\n\n" +
    "**Space Complexity: `O(n + k)`**\n\n" +
    "The count array consumes `O(k)` space; output reconstruction requires `O(n)` working space.",

  bestAndWorstCase:
    "**Best case** is `O(n + k)` when the value range is small relative to `n`. For example, sorting a million boolean-like integers (0 or 1) takes roughly `O(n)` time and `O(1)` extra space for the counts.\n\n" +
    "**Worst case** occurs when `k` is much larger than `n` — e.g., sorting 10 integers drawn from a billion-wide range. Here `k >> n` and the algorithm degrades to `O(k)`, wasting memory and time allocating a mostly-empty count array. In this scenario, comparison-based sorts are far superior.",

  realWorldUses: [
    "**Radix Sort subroutine:** Counting Sort is the stable digit-by-digit sort inside Radix Sort LSD/MSD, enabling `O(d·n)` integer sorting.",
    "**Histogram equalization:** Image processing uses the counting pass to build pixel intensity histograms for contrast enhancement.",
    "**Grade distribution:** Sorting thousands of exam scores (0–100) takes `O(n + 100)` — effectively `O(n)`.",
    "**DNS record classification:** Categorizing records by TTL range when the range is bounded and small.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Linear time** when `k = O(n)` — beats all comparison-based sorts asymptotically.",
      "**Stable** (with cumulative prefix-sum variant) — equal elements retain their original order.",
      "**Simple implementation** — two straightforward counting loops, no recursion or complex data structures.",
    ],
    limitations: [
      "Only works on integers (or types mappable to integers) — not suitable for floats or strings without transformation.",
      "Memory usage scales with value range `k`, not just input size `n` — impractical for large ranges.",
      "**Not in-place:** Requires `O(n + k)` auxiliary space even when sorting in memory.",
    ],
  },

  whenToUseIt:
    "Use **Counting Sort** when the input consists of integers (or can be mapped to integers) within a known, bounded range, and that range `k` is not dramatically larger than the input size `n`. It is the ideal inner sort for Radix Sort and excels on dense integer distributions.\n\nAvoid it when the value range is unbounded or much larger than `n`, when sorting floating-point or complex objects, or when memory is tightly constrained.",
};
