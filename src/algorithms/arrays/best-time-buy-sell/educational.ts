import type { EducationalContent } from "@/types";

export const bestTimeBuySellEducational: EducationalContent = {
  overview:
    "**Best Time to Buy and Sell Stock** finds the maximum profit achievable from a single buy-sell transaction " +
    "in `O(n)` time using one pass through the price array. " +
    "The algorithm tracks the lowest price seen so far and, at each subsequent day, computes the profit " +
    "if selling on that day. This eliminates the need to check every pair of days, reducing an `O(n^2)` " +
    "brute-force into a linear scan by maintaining just two running values — the current minimum price and the best profit seen globally.",

  howItWorks:
    "1. Initialize `minPrice` to the first day's price and `maxProfit` to `0`.\n" +
    "2. For each subsequent day:\n" +
    "   * If the current price is **lower** than `minPrice`, update `minPrice` (potential new buy point).\n" +
    "   * Compute `potentialProfit = currentPrice - minPrice`.\n" +
    "   * If `potentialProfit > maxProfit`, update `maxProfit` and record the buy/sell day indices.\n" +
    "3. After scanning all prices, `maxProfit` holds the best single-transaction profit.\n\n" +
    "### The Key Insight\n\n" +
    "You must buy before you sell. By scanning left-to-right and always selling against the cheapest " +
    "price seen *so far*, you guarantee you never look backward. The minimum price acts as a sliding " +
    "lower bound — any new minimum resets the buy candidate.\n\n" +
    "### Walkthrough with `[7, 1, 5, 3, 6, 4]`\n\n" +
    "| Day | Price | minPrice | potentialProfit | maxProfit | Action         |\n" +
    "|-----|-------|----------|-----------------|-----------|----------------|\n" +
    "| 0   | 7     | 7        | 0               | 0         | init           |\n" +
    "| 1   | 1     | 1        | 0               | 0         | new min        |\n" +
    "| 2   | 5     | 1        | 4               | 4         | new max profit |\n" +
    "| 3   | 3     | 1        | 2               | 4         | no update      |\n" +
    "| 4   | 6     | 1        | 5               | 5         | new max profit |\n" +
    "| 5   | 4     | 1        | 3               | 5         | no update      |\n\n" +
    "**Result**: Buy on day 1 (price 1), sell on day 4 (price 6), maximum profit = `5`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "The algorithm performs exactly one pass through the price array, doing a constant number of " +
    "comparisons and assignments per day. This is optimal — any algorithm must inspect every price " +
    "at least once to guarantee it hasn't missed a better transaction.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a fixed set of variables is maintained (`minPrice`, `maxProfit`, buy/sell day indices). " +
    "No additional data structures are allocated regardless of how many days of prices are provided.",

  bestAndWorstCase:
    "**Best and worst case are both `O(n)`** — the algorithm always completes a single full scan.\n\n" +
    "- **Strictly increasing prices** (e.g. `[1, 2, 3, 4, 5]`): Buy on day 0, sell on the last day. " +
    "The profit tracker updates every day.\n" +
    "- **Strictly decreasing prices** (e.g. `[5, 4, 3, 2, 1]`): No profitable transaction exists. " +
    "`maxProfit` stays `0` and the minimum price updates every day.\n" +
    "- **Single price spike** (e.g. `[1, 10, 2, 3]`): The maximum profit is found early and never beaten.\n\n" +
    "### Compared to Brute Force\n\n" +
    "The brute-force approach checks every `O(n^2)` pair of buy/sell days. For 1,000,000 days of prices, " +
    "brute force requires ~500 billion comparisons while this algorithm needs just ~1 million — " +
    "a **500,000x speedup**.",

  realWorldUses: [
    "**Algorithmic Trading:** Identifying the optimal single entry and exit point in historical price data before committing capital.",
    "**Portfolio Backtesting:** Evaluating the theoretical best return of a buy-and-hold strategy over a historical period.",
    "**Options Pricing:** Computing the maximum intrinsic value of a call option given a price series to inform strike selection.",
    "**Supply Chain Optimization:** Finding the best single buy-low/sell-high opportunity for commodity inventory management.",
    "**Performance Benchmarking:** Measuring the maximum achievable gain in a time series to compare against actual trading strategy returns.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — a single pass is the theoretical minimum for this problem.",
      "Constant `O(1)` space — no auxiliary arrays or data structures are needed.",
      "Simple logic: two running values and one pass produce a complete, provably correct answer.",
      "Naturally tracks exact buy and sell day indices alongside the profit.",
      "Handles edge cases (all decreasing, single element, empty array) without special branching.",
    ],
    limitations: [
      "Restricted to exactly one transaction — multi-transaction variants require different approaches.",
      "Does not account for transaction fees, taxes, or partial shares.",
      "The two-transaction variant (LeetCode 123) requires dynamic programming, not this technique.",
      "Cannot efficiently answer range queries over arbitrary sub-periods without reprocessing.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need the **maximum gain from a single buy-before-sell operation** " +
    "in a sequence. Look for problems mentioning *one transaction*, *buy once sell once*, or " +
    "*maximum difference where the larger element appears after the smaller*.\n\n" +
    "**Do not use** when multiple transactions are allowed — that requires a greedy sum-of-ascending-slopes " +
    "approach. Also avoid when the problem requires exactly K transactions — that requires `O(nK)` " +
    "dynamic programming instead.",
};
