import type { EducationalContent } from "@/types";

export const pascalsTriangleRowEducational: EducationalContent = {
  overview:
    "**Pascal's Triangle Row (Tabulation)** computes the n-th row of Pascal's Triangle using a single in-place DP array.\n\n" +
    "Each value in the row is a **binomial coefficient** `C(n, k)` — the number of ways to choose `k` items from a set of `n`. " +
    "Pascal's identity `C(n,k) = C(n-1,k) + C(n-1,k-1)` drives the update rule, and iterating **right-to-left** ensures each update uses values from the previous virtual row without overwriting dependencies.",

  howItWorks:
    "1. **Initialize** a DP array of size `rowIndex + 1`, filled entirely with `1`s — every boundary of Pascal's Triangle is 1.\n" +
    "2. **Outer loop** runs from `rowNumber = 2` to `rowIndex`, representing successive rows of the triangle.\n" +
    "3. **Inner loop** iterates `columnIndex` from `rowNumber - 1` down to `1` — **right-to-left** is critical.\n" +
    "4. At each cell: `dp[columnIndex] = dp[columnIndex] + dp[columnIndex - 1]`.\n" +
    "   - `dp[columnIndex]` holds `C(rowNumber-1, columnIndex)` — from the previous virtual row.\n" +
    "   - `dp[columnIndex - 1]` holds `C(rowNumber-1, columnIndex - 1)` — not yet overwritten because we go right-to-left.\n" +
    "5. After both loops, `dp[k]` = `C(rowIndex, k)` for every `k`.\n\n" +
    "### Example: Row 4 = [1, 4, 6, 4, 1]\n\n" +
    "```\n" +
    "Start:     [1, 1, 1, 1, 1]\n" +
    "After r=2: [1, 2, 1, 1, 1]   ← dp[1] = 1+1\n" +
    "After r=3: [1, 3, 3, 1, 1]   ← dp[2]=2+1, dp[1]=2+1\n" +
    "After r=4: [1, 4, 6, 4, 1]   ← dp[3]=3+1, dp[2]=3+3, dp[1]=3+1\n" +
    "```\n\n" +
    "### In-Place Array Update for Row 4\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  R0["Start: 1 1 1 1 1"]\n' +
    '  R2["After r=2: 1 2 1 1 1"]\n' +
    '  R3["After r=3: 1 3 3 1 1"]\n' +
    '  R4["After r=4: 1 4 6 4 1"]\n' +
    "  R0 --> R2\n" +
    "  R2 --> R3\n" +
    "  R3 --> R4\n" +
    "  style R0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style R2 fill:#14532d,stroke:#22c55e\n" +
    "  style R3 fill:#14532d,stroke:#22c55e\n" +
    "  style R4 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The single array transforms in-place across outer-loop iterations. The right-to-left inner sweep ensures each `dp[k]` reads the not-yet-overwritten `dp[k-1]` from the previous virtual row.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "The outer loop runs `n - 1` times and the inner loop runs at most `n - 1` times, giving a total of roughly `n²/2` operations. " +
    "This is unavoidable — there are `(n+1)(n+2)/2` entries in the first `n+1` rows of Pascal's Triangle and we effectively compute them all.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Only one array of length `n + 1` is needed. The right-to-left traversal eliminates the need for a second row buffer, keeping memory linear in the row index.",

  bestAndWorstCase:
    "**Best case and worst case are both `O(n²)`** — every cell in the final row depends on all cells in earlier rows, so no shortcut can bypass the full double-loop.\n\n" +
    "For `rowIndex = 0` or `rowIndex = 1` the answer is trivially `[1]` or `[1, 1]` and the inner loop never executes, making those edge cases `O(1)` in practice.\n\n" +
    "The binomial coefficients grow quickly: `C(n, n/2)` is the largest entry and grows as `2^n / √(πn/2)` by Stirling's approximation. For `n > 30`, values exceed 32-bit integers.",

  realWorldUses: [
    "**Combinatorics:** `C(n, k)` answers countless counting problems — lottery odds, committee selections, poker hand probabilities.",
    "**Probability:** Binomial distribution coefficients `C(n, k) * p^k * (1-p)^(n-k)` are read directly from Pascal's Triangle.",
    "**Algebra:** Expanding `(a + b)^n` via the Binomial Theorem uses exactly the n-th row as coefficients.",
    "**Computer Graphics:** Bernstein polynomials (used in Bézier curves) are weighted by binomial coefficients from Pascal's Triangle.",
    "**Error Correction Codes:** Reed-Solomon and BCH codes rely on polynomial arithmetic over finite fields where Pascal's Triangle mod 2 defines Sierpiński's pattern.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-array in-place approach: `O(n)` space versus `O(n²)` for storing the full triangle.",
      "Right-to-left traversal is a reusable DP pattern — it appears in 0/1 Knapsack, Subset Sum, and other bounded-item problems.",
      "No recursion or memoization overhead — purely iterative and cache-friendly.",
    ],
    limitations: [
      "Integer overflow: for `n > 30`, values exceed 2³¹; `n > 66` exceeds JavaScript's safe integer range — `BigInt` is needed for exact results.",
      "Not the fastest way to compute a single `C(n, k)` — a direct multiplicative formula runs in `O(k)` time without any table.",
      "The O(n²) time cost is inherent if all entries of the row are required; there is no known faster algorithm for producing the full row.",
    ],
  },

  whenToUseIt:
    "Use **Pascal's Triangle row tabulation** when you need **all** binomial coefficients `C(n, 0)` through `C(n, n)` at once — for example, computing Binomial distribution tables or expanding polynomials.\n\n" +
    "If you need only a single `C(n, k)`, prefer the multiplicative formula `C(n,k) = n! / (k! * (n-k)!)` computed iteratively in `O(k)` time.\n\n" +
    "The right-to-left single-array trick is also the canonical solution for **0/1 Knapsack** and **Subset Sum** problems — mastering it here pays dividends across many DP problems.",
};
