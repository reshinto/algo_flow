/**
 * Educational content for Fibonacci (dynamic programming).
 * Covers both tabulation (bottom-up) and memoization (top-down) approaches,
 * with complexity analysis and usage guidance for the explanation panel.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Fibonacci. */
export const fibonacciEducational: EducationalContent = {
  overview:
    "The Fibonacci sequence is a classic problem in dynamic programming where each number is the sum of the two preceding ones: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2). While the naive recursive approach has exponential time complexity due to redundant computations, dynamic programming techniques — tabulation (bottom-up) and memoization (top-down) — reduce this to linear time by storing and reusing previously computed results.",

  howItWorks:
    "**Tabulation (Bottom-Up) Approach:**\n" +
    "1. Create a table (array) of size n+1 to store Fibonacci values\n" +
    "2. Set the base cases: table[0] = 0 and table[1] = 1\n" +
    "3. Iterate from index 2 to n\n" +
    "4. For each index, compute table[i] = table[i-1] + table[i-2]\n" +
    "5. Return table[n] as the final answer\n\n" +
    "**Memoization (Top-Down) Approach:**\n" +
    "1. Define a recursive function F(n) with a cache (hash map)\n" +
    "2. If n is 0 or 1, return n (base cases)\n" +
    "3. If F(n) is already in the cache, return the cached value\n" +
    "4. Otherwise, compute F(n) = F(n-1) + F(n-2), store in cache, and return\n\n" +
    "Example: F(5) = 5\n" +
    "- Table fills: [0, 1, 1, 2, 3, 5]\n" +
    "- Each cell depends only on the two previous cells",

  timeAndSpaceComplexity:
    "**Time Complexity (Tabulation):**\n" +
    "- Best case: O(n) — always iterates through all values from 2 to n\n" +
    "- Average case: O(n) — single linear pass through the table\n" +
    "- Worst case: O(n) — same linear pass regardless of input\n\n" +
    "**Time Complexity (Memoization):**\n" +
    "- O(n) — each subproblem is computed exactly once and cached\n\n" +
    "**Space Complexity:** O(n) — the table or cache stores n+1 values. Note: tabulation can be optimized to O(1) space by only keeping the last two values, but the standard implementation uses O(n) for clarity.",

  bestAndWorstCase:
    "**Best case** for tabulation is the same as the worst case: O(n). The algorithm always fills the entire table from 0 to n. There is no early termination or input that changes the number of operations.\n\n" +
    "**Worst case** is also O(n). Unlike the naive recursive approach which has O(2^n) worst case due to overlapping subproblems, both DP approaches ensure each value is computed exactly once. The naive recursive tree for F(5) makes 15 calls, while tabulation makes exactly 4 additions (for indices 2 through 5).",

  realWorldUses: [
    "Algorithm design education — the canonical example for learning dynamic programming and memoization",
    "Financial modeling — Fibonacci retracement levels are used in technical stock market analysis",
    "Nature and biology modeling — Fibonacci numbers appear in phyllotaxis (leaf arrangement), flower petals, and spiral patterns",
    "Computer science theory — analysis of the Euclidean algorithm's worst case uses Fibonacci numbers",
    "Data structures — Fibonacci heaps use the sequence in their amortized complexity analysis",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Reduces exponential O(2^n) naive recursion to linear O(n) time",
      "Tabulation avoids call stack overhead and risk of stack overflow",
      "Clearly demonstrates the power of storing and reusing subproblem solutions",
      "Simple and intuitive — excellent for building DP intuition before tackling harder problems",
      "Tabulation can be further optimized to O(1) space using only two variables",
    ],
    limitations: [
      "For very large n, integer overflow becomes an issue without big integer support",
      "The O(n) space version stores values that are only needed temporarily",
      "Memoization relies on recursion, which can hit stack depth limits for large n",
      "Not directly applicable to most real-world problems without adaptation",
      "Matrix exponentiation can compute F(n) in O(log n) time, making DP not the theoretically fastest approach",
    ],
  },

  whenToUseIt:
    "Use the tabulation approach when you need to compute Fibonacci numbers iteratively without recursion overhead, or when building up a full table of values for further analysis. Use memoization when you prefer the top-down recursive style or when you only need specific values rather than the full table. For extremely large n where O(n) is too slow, consider the matrix exponentiation method which runs in O(log n) time.",
};
