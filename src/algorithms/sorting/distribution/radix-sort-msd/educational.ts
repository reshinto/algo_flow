/**
 * Educational content for Radix Sort MSD (Most Significant Digit).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Radix Sort MSD. */
export const radixSortMsdEducational: EducationalContent = {
  overview:
    "**Radix Sort MSD** (Most Significant Digit) is a non-comparison sorting algorithm that processes digits from the **leftmost (most significant)** digit to the **rightmost (least significant)** digit.\n\nUnlike LSD Radix Sort, MSD recurses into each digit bucket before moving to the next digit position, making it more suitable for lexicographic (string-like) ordering and enabling early termination for already-grouped sub-ranges.",

  howItWorks:
    "Radix Sort MSD partitions recursively by digit, working from the most significant position inward.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Find the highest digit position across all values.\n" +
    "2. Distribute all elements into 10 buckets by their most significant digit.\n" +
    "3. Recursively sort each bucket by the next digit position.\n" +
    "4. Concatenate sorted buckets to produce the final order.\n\n" +
    "### Visualizing Radix Sort MSD on [170, 45, 75, 90, 24, 2, 802]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[All values] -->|hundreds digit| B0[bucket 0: 045 075 090 024 002]\n" +
    "    A -->|hundreds digit| B8[bucket 8: 802]\n" +
    "    A -->|hundreds digit| B1[bucket 1: 170]\n" +
    "    B0 -->|tens digit| C0[002 024 045 075 090]\n" +
    "    C0 --> D[2 24 45 75 90 170 802]\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1 (hundreds):** Bucket 0 = `[045, 075, 090, 024, 002]`, bucket 1 = `[170]`, bucket 8 = `[802]`\n" +
    "- **Pass 2 (tens, bucket 0 only):** Sub-sort produces `[002, 024, 045, 075, 090]`\n" +
    "- **Final:** Concatenate → `[2, 24, 45, 75, 90, 170, 802]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(d · (n + k))`**\n\n" +
    "- **Best Case:** `O(d · (n + k))` — recursive passes proportional to digit count.\n" +
    "- **Average Case:** `O(d · (n + k))` — same regardless of distribution.\n" +
    "- **Worst Case:** `O(d · (n + k))` — consistent; no degradation from adversarial input.\n\n" +
    "Where `d` = max digit count, `k` = base (10), `n` = input size.\n\n" +
    "**Space Complexity: `O(n + k)`** per recursion level, plus `O(d)` call stack depth.",

  bestAndWorstCase:
    "**Best case** for MSD Radix Sort can be faster than LSD in practice: if many elements share the same most significant digit, the first-level buckets are large and sub-passes process only smaller groups — less total work.\n\n" +
    "**Worst case** mirrors LSD: `O(d · (n + k))`. Unlike LSD, MSD can exhibit cache inefficiency because it recurses into many small buckets with scattered memory access patterns, which can make it slower in practice despite identical asymptotic complexity.",

  realWorldUses: [
    "**String sorting:** MSD naturally produces lexicographic order, making it ideal for dictionary-order sorting of strings treated digit-by-digit.",
    "**IP address classification:** Routing tables partition by most significant octet first, matching MSD's recursive partitioning structure.",
    "**File system sorting:** Directory listings sorted alphabetically follow the MSD pattern — first letter narrows the search space before subsequent letters are examined.",
    "**Database external sorting:** When data doesn't fit in memory, MSD's partitioning can be applied level by level with disk reads.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Natural lexicographic order** — superior to LSD for string-like or variable-length key sorting.",
      "**Early termination** — buckets with only one element need no further recursion.",
      "**Adaptable base** — using base 256 (byte-level) reduces `d` for binary data.",
    ],
    limitations: [
      "More complex implementation than LSD due to recursion and dynamic bucket management.",
      "Cache performance can be worse than LSD — recursive descent into small buckets disrupts memory locality.",
      "Overhead of creating bucket arrays at each recursion level adds constant-factor cost.",
    ],
  },

  whenToUseIt:
    "Use **Radix Sort MSD** when sorting strings, variable-length integer keys, or any data where lexicographic ordering is natural. It excels when the data naturally partitions by leading digit, enabling early termination in sub-ranges.\n\nPrefer LSD Radix Sort for fixed-width integer sorting where memory access patterns and stability are the priority.",
};
