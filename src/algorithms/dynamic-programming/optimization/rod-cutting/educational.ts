import type { EducationalContent } from "@/types";

export const rodCuttingEducational: EducationalContent = {
  overview:
    "**Rod Cutting (Tabulation)** finds the maximum revenue obtainable by cutting a rod of length `n` into pieces, given a price list where `prices[i]` is the value of a piece of length `i+1`.\n\n" +
    "This is a classic **unbounded knapsack** problem: each length can be cut any number of times. Unlike 0/1 knapsack — where each item is used at most once — rod cutting allows the same length to appear in multiple cuts.\n\n" +
    "Tabulation builds the solution bottom-up, computing `dp[i]` (max revenue for a rod of length `i`) for every length from 0 up to `n` before the final answer is ever needed.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` filled with `0`.\n" +
    "2. **Base case:** `dp[0] = 0` — a zero-length rod yields zero revenue.\n" +
    "3. **Iterate** from length `1` to `n`.\n" +
    "4. For each length `i`, try every cut `j` from `1` to `i`:\n" +
    "   - Revenue candidate = `prices[j-1] + dp[i-j]`\n" +
    "   - Update `dp[i] = max(dp[i], candidate)`\n" +
    "5. `dp[n]` holds the answer after all cells are filled.\n\n" +
    "### Table Build-Up for prices=[1, 5, 8, 9, 10, 17, 17, 20]\n\n" +
    "```\n" +
    "Length: 0  1  2  3  4  5  6  7  8\n" +
    "dp:     0  1  5  8  10 13 17 18 22\n" +
    "```\n\n" +
    "Length 4 yields 10 (two pieces of length 2 at $5 each), and length 8 yields 22 (four pieces of length 2).\n\n" +
    "Each cell reuses previously computed optimal sub-rod values — no redundant recomputation.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "The outer loop runs `n` times (once per rod length). The inner loop runs up to `i` times for each length `i`. Total work is `1 + 2 + … + n = n(n+1)/2`, which is `O(n²)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Only a single DP table of size `n + 1` is required. No recursion stack or auxiliary structures are needed.",

  bestAndWorstCase:
    "**Best case: `O(n²)`** — the algorithm always fills every cell regardless of price values. There is no early termination.\n\n" +
    "**Worst case: `O(n²)`** — same as best case. Every cell `dp[i]` requires examining all `i` possible first cuts.\n\n" +
    "In practice, the constant factor is small because each inner iteration performs only addition and a comparison. The quadratic bound is tight — every cell genuinely depends on all smaller cells.",

  realWorldUses: [
    "**Lumber and steel manufacturing:** Maximizing revenue by deciding how to cut raw stock into pieces of varying market prices.",
    "**Network bandwidth allocation:** Splitting a channel into sub-channels with different throughput-to-cost ratios to maximize total throughput.",
    "**Memory page partitioning:** Dividing a contiguous memory block into segments with different allocation values.",
    "**Financial portfolio segmentation:** Allocating a fixed capital budget across investment tranches of varying returns.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally optimal revenue — greedy approaches fail when a single large piece is worth less than multiple smaller ones.",
      "Iterative bottom-up approach avoids recursion overhead and stack overflow for large rod lengths.",
      "Unbounded reuse of cut lengths is handled naturally — no extra bookkeeping needed compared to 0/1 knapsack.",
    ],
    limitations: [
      "Does not reconstruct which cuts were made — backtracking logic must be added separately if the cut sequence is needed.",
      "Requires `O(n)` extra space that scales with rod length — impractical for extremely long rods without space optimization.",
      "Assumes integer lengths and a fixed price table; fractional lengths or continuous price functions require a different model.",
    ],
  },

  whenToUseIt:
    "Use **rod cutting tabulation** when you need the maximum value obtainable by partitioning a resource of fixed total size into sub-units with known per-unit values, and the same sub-unit size may be used multiple times (unbounded).\n\n" +
    "Prefer tabulation over memoization when all sub-problems from length 0 to `n` must be solved anyway — tabulation avoids call-stack overhead and is more cache-friendly in practice.\n\n" +
    "If the price list has a special structure (e.g., strictly increasing per unit), a greedy or closed-form solution may exist, but tabulation remains correct and safe in the general case.",
};
