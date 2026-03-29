import type { EducationalContent } from "@/types";

export const coinChangeWaysEducational: EducationalContent = {
  overview:
    "**Coin Change — Count Ways (Tabulation)** asks: given a set of coin denominations and a target amount, how many distinct ways can you combine coins to reach that amount? Coins can be reused any number of times, and order does not matter — `[1,2]` and `[2,1]` count as one way.\n\nThis is a **bottom-up dynamic programming** solution. It fills a table where `dp[i]` holds the number of combinations that sum to `i`, building from zero up to the target amount.",

  howItWorks:
    "1. **Initialize** a table `dp` of size `amount + 1`, all zeros. Each entry `dp[i]` will hold the count of ways to make amount `i`.\n" +
    "2. **Set base case:** `dp[0] = 1` — there is exactly one way to make zero: use no coins.\n" +
    "3. **Outer loop over coins:** For each coin denomination, update every amount it can contribute to.\n" +
    "4. **Inner loop over amounts:** For `i` from `coin` to `amount`, add `dp[i - coin]` to `dp[i]`. This says: 'all ways that worked for `i - coin` can be extended by one more of this coin.'\n" +
    "5. Return `dp[amount]`.\n\n" +
    "### Table Build-Up for amount=5, coins=[1,2,5]\n\n" +
    "```\n" +
    "Start:     W(0)=1  W(1)=0  W(2)=0  W(3)=0  W(4)=0  W(5)=0\n" +
    "After 1:   W(0)=1  W(1)=1  W(2)=1  W(3)=1  W(4)=1  W(5)=1\n" +
    "After 2:   W(0)=1  W(1)=1  W(2)=2  W(3)=2  W(4)=3  W(5)=3\n" +
    "After 5:   W(0)=1  W(1)=1  W(2)=2  W(3)=2  W(4)=3  W(5)=4\n" +
    "```\n\n" +
    "Result: **4 ways** — `{1,1,1,1,1}`, `{1,1,1,2}`, `{1,2,2}`, `{5}`.\n\n" +
    "### Why the Outer Loop Must Be Over Coins\n\n" +
    "Iterating coins in the outer loop and amounts in the inner loop ensures each combination is counted exactly once. If you swapped the loop order (amounts outer, coins inner), you would count permutations instead — `{1,2}` and `{2,1}` would be counted separately, inflating the result.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(amount × |coins|)`**\n\n" +
    "The outer loop runs once per coin denomination and the inner loop runs up to `amount` iterations, producing `|coins| × amount` total operations.\n\n" +
    "**Space Complexity: `O(amount)`**\n\n" +
    "A single 1-D table of size `amount + 1` is all that is needed. No 2-D matrix is required — each coin's contribution is folded into the existing table in place.",

  bestAndWorstCase:
    "**Best case:** `O(amount × |coins|)` — the same as the worst case. The algorithm always fills the full table for every coin.\n\n" +
    "**Worst case:** `O(amount × |coins|)` — large target amounts or many coin denominations increase the number of inner-loop iterations proportionally.\n\n" +
    "There is no early exit: the table must be fully populated to ensure all coin combinations are accounted for.",

  realWorldUses: [
    "**Finance:** Counting the number of ways to give exact change at a register using available denominations.",
    "**Combinatorics:** Partitioning an integer into a restricted set of summands (integer partition problems).",
    "**Knapsack Variants:** Any problem where items are unlimited and order is irrelevant maps to this recurrence.",
    "**Compiler Design:** Counting ways to parse a string according to a grammar with repeated token patterns.",
    "**Game Design:** Counting distinct resource-combination paths to reach a goal state in strategy games.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single 1-D table — minimal memory footprint compared to 2-D DP variants.",
      "Iterative bottom-up — no recursive call overhead or stack depth concerns.",
      "Coin-outer loop naturally avoids double-counting permutations without extra logic.",
    ],
    limitations: [
      "Counts combinations only — if you need permutations (order matters), the loop order must be reversed.",
      "Result can overflow for large amounts with many small coins — use arbitrary-precision integers when needed.",
      "Does not tell you *which* combinations exist — only the count. Reconstructing the actual sets requires extra bookkeeping.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need to count **unordered combinations** that sum to a target with **unlimited reuse** of each element. It differs critically from **Coin Change Min** (which finds the fewest coins to reach the target) — here the goal is counting, not optimizing. It also differs from the **0/1 Knapsack** (where each item can be used at most once). Choose the outer-coins / inner-amounts loop order whenever order must not matter; reverse the loops when you need to count ordered arrangements (permutations) instead.",
};
