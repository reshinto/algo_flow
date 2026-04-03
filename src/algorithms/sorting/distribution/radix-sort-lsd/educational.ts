/**
 * Educational content for Radix Sort LSD (Least Significant Digit).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Radix Sort LSD. */
export const radixSortLsdEducational: EducationalContent = {
  overview:
    "**Radix Sort LSD** (Least Significant Digit) is a non-comparison integer sorting algorithm that processes digits from the **rightmost (least significant)** digit to the **leftmost (most significant)** digit.\n\nBy repeatedly applying a stable sort on each digit position, the array converges to sorted order without ever directly comparing element values.",

  howItWorks:
    "Radix Sort LSD makes `d` passes — one per digit position — where `d` is the number of digits in the largest number.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Find the maximum value to determine the number of digit passes needed.\n" +
    "2. For each digit position (1s, 10s, 100s, …):\n" +
    "   a. Extract the digit at that position for every element.\n" +
    "   b. Distribute elements into 10 buckets (digits 0–9).\n" +
    "   c. Collect elements from buckets back into the array — stability is preserved.\n" +
    "3. After the final pass, the array is fully sorted.\n\n" +
    "### Visualizing Radix Sort LSD on [170, 45, 75, 90, 802, 24, 2, 66]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[Pass 1 - ones digit] --> B[170 90 802 2 24 45 75 66]\n" +
    "    B --> C[Pass 2 - tens digit] --> D[802 2 24 45 66 170 75 90]\n" +
    "    D --> E[Pass 3 - hundreds digit] --> F[2 24 45 66 75 90 170 802]\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1 (ones):** Group by last digit → `[170, 90, 802, 2, 24, 45, 75, 66]`\n" +
    "- **Pass 2 (tens):** Group by tens digit → `[802, 2, 24, 45, 66, 170, 75, 90]`\n" +
    "- **Pass 3 (hundreds):** Group by hundreds digit → `[2, 24, 45, 66, 75, 90, 170, 802]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(d · (n + k))`**\n\n" +
    "- **Best Case:** `O(d · (n + k))` — all passes execute regardless of initial order.\n" +
    "- **Average Case:** `O(d · (n + k))` — `d` passes, each `O(n + k)` with counting sort.\n" +
    "- **Worst Case:** `O(d · (n + k))` — consistent, no worst-case degradation.\n\n" +
    "Where `d` = number of digits in the max value, `k` = base (10), `n` = array size.\n\n" +
    "For fixed-width integers (e.g., 32-bit), `d` is constant, so this reduces to `O(n)`.\n\n" +
    "**Space Complexity: `O(n + k)`**\n\n" +
    "The 10 buckets collectively hold all `n` elements; counting sort auxiliary arrays add `O(k)`.",

  bestAndWorstCase:
    "**Best case** for Radix Sort LSD is `O(d · (n + k))`. Unlike comparison sorts, there is no early exit — it always performs exactly `d` full passes.\n\n" +
    "**Worst case** is also `O(d · (n + k))`. The algorithm's behavior is entirely determined by the digit count `d` and element count `n`. An adversarial input cannot force more passes or more bucket operations than normal. The only variable that matters is the magnitude of the largest number, which determines `d`.",

  realWorldUses: [
    "**Fixed-length integer keys:** Sorting 32-bit or 64-bit integers where `d` is constant, achieving effectively `O(n)`.",
    "**Card sorting machines:** Physical card sorters in early computing applied exactly this digit-by-digit technique.",
    "**Network packet sorting:** Sorting IP addresses or port numbers by their binary digit components.",
    "**Database index building:** Efficient construction of composite integer indexes using digit-by-digit passes.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Linear time for fixed-width integers** — beats `O(n log n)` comparison sorts asymptotically.",
      "**Stable sort** — equal elements maintain their original relative order across passes.",
      "**Predictable performance** — `d` passes always complete; no randomized or input-dependent behavior.",
    ],
    limitations: [
      "Requires integers (or types with a well-defined digit representation) — not general-purpose.",
      "Space overhead: `O(n + k)` auxiliary storage per pass.",
      "For large `d` (e.g., arbitrary-precision integers), `O(d · n)` can exceed `O(n log n)`.",
    ],
  },

  whenToUseIt:
    "Use **Radix Sort LSD** when sorting large collections of fixed-width integers (e.g., IDs, timestamps, IP addresses) where `d` is small relative to `log n`. It consistently outperforms comparison sorts in these settings.\n\nAvoid it when sorting strings, floats, or objects without a natural digit decomposition, or when memory is limited and `O(n + k)` auxiliary space per pass is unacceptable.",
};
