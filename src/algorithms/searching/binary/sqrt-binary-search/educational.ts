import type { EducationalContent } from "@/types";

export const sqrtBinarySearchEducational: EducationalContent = {
  overview:
    "**Square Root via Binary Search** computes the integer (floor) square root of a non-negative number by performing binary search over the **answer space** rather than over an array.\n\n" +
    "Instead of searching for a value in a data structure, the algorithm searches for the largest integer `midIndex` such that `midIndex² ≤ target`. This demonstrates that binary search is a general technique applicable to any monotone search space, not just sorted arrays.",

  howItWorks:
    "1. Handle edge cases: if `target < 2`, return `target` directly (0 or 1).\n" +
    "2. Set the search bounds: `low = 1`, `high = floor(target / 2)` (since `√n ≤ n/2` for `n ≥ 4`).\n" +
    "3. While `low <= high`, compute `mid = floor((low + high) / 2)` and `midSquared = mid * mid`.\n" +
    "4. Compare `midSquared` to the target:\n" +
    "   - If `midSquared === target`, the exact square root is found — return `mid`.\n" +
    "   - If `midSquared < target`, `mid` is a valid floor candidate — record it and move `low = mid + 1`.\n" +
    "   - If `midSquared > target`, `mid` is too large — move `high = mid - 1`.\n" +
    "5. When the loop ends, return the last recorded floor candidate.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    subgraph Computing √49\n" +
    '    A["low=1, high=24, mid=12 (12²=144 > 49)"] -->|"too large"| B["high=11"]\n' +
    '    B -->|"mid=6 (6²=36 < 49) → record 6"| C["low=7"]\n' +
    '    C -->|"mid=9 (9²=81 > 49)"| D["high=8"]\n' +
    '    D -->|"mid=7 (7²=49 === 49)"| E["Exact root: 7"]\n' +
    "    end\n" +
    "    style E fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Best Case:** `O(1)` — the exact root is found at the first midpoint.\n" +
    "- **Average & Worst Case:** `O(log n)` — the search range `[1, n/2]` halves each iteration, giving `log₂(n/2) ≈ log₂(n)` steps.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of integer variables are maintained regardless of the size of the input number.",

  bestAndWorstCase:
    "**Best case** is `O(1)` — when the first midpoint squared equals the target exactly.\n\n" +
    "**Worst case** is `O(log n)` — typically when the target is a non-perfect square and the algorithm must exhaust the entire search range. For computing the square root of one billion, the algorithm requires at most about 30 comparisons.",

  realWorldUses: [
    "**Calculator Firmware:** Embedded systems computing square roots without floating-point hardware use integer binary search for efficiency.",
    "**Database Query Planning:** Estimating cardinality of range queries sometimes requires integer square root computations.",
    "**Cryptography:** RSA factorization attempts and primality tests involve integer square root computations on very large numbers.",
    "**Teaching Tool:** Demonstrates that binary search applies to any monotone function over integers, not just sorted arrays — a key generalization in algorithm design.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Avoids floating-point arithmetic entirely — the result is always an exact integer floor.",
      "Generalizes binary search beyond arrays to any monotone function over an integer domain.",
      "Handles very large numbers without overflow when using 64-bit integer arithmetic for `midSquared`.",
    ],
    limitations: [
      "Only computes the integer (floor) square root — use `Math.sqrt` or Newton's method for floating-point precision.",
      "The upper bound optimization (`high = target / 2`) only holds for `target >= 4`; edge cases for 0 and 1 must be handled separately.",
      "Not suitable for computing cube roots or higher powers without adjusting the comparison function.",
    ],
  },

  whenToUseIt:
    "Use **Square Root via Binary Search** when you need the integer floor square root of a number and want to avoid floating-point imprecision, or when working in a constrained environment without a math library.\n\n" +
    "More broadly, apply this binary-search-on-answer-space pattern whenever you need to find the largest integer satisfying a monotone condition — it generalizes naturally to problems like minimum speed, minimum days, and capacity thresholds.\n\n" +
    "Avoid it when a floating-point result is required, or when the built-in `Math.sqrt` plus rounding is accurate and fast enough for the use case.",
};
