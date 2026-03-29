import type { EducationalContent } from "@/types";

export const bestTimeBuySellUnlimitedEducational: EducationalContent = {
  overview:
    "**Best Time to Buy and Sell Stock (Unlimited Transactions)** allows you to buy and sell a stock as many times as you want, but you must sell before buying again. The goal is to maximize total profit.\n\nThe greedy insight is that the optimal strategy is equivalent to **capturing every upward price slope** — whenever tomorrow's price is higher than today's, hold the stock. The total profit equals the sum of all positive day-to-day price differences.",

  howItWorks:
    "The greedy approach works by tracking whether we currently hold a stock (`buyDay`):\n\n" +
    "1. Iterate from day 1 onwards, comparing each day's price to the previous day.\n" +
    "2. **If price rises and we don't hold stock:** Open a new buy position at the previous day.\n" +
    "3. **If price falls or stays flat and we hold stock:** Close the position — sell at the previous day's price and record the profit.\n" +
    "4. After the loop, close any remaining open position at the last price.\n\n" +
    "### Why does this work?\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Prices["prices = [7, 1, 5, 3, 6, 4]"]\n' +
    "    A[7] --- B[1] --- C[5] --- D[3] --- E[6] --- F[4]\n" +
    "    end\n" +
    "```\n\n" +
    "- Day 1→2: price rises from 1→5, buy at 1, sell at 5 → **profit = 4**\n" +
    "- Day 2→3: price falls (5→3), no action\n" +
    "- Day 3→4: price rises from 3→6, buy at 3, sell at 6 → **profit = 3**\n" +
    "- Total profit = **7**\n\n" +
    "This equals the sum of positive differences: max(5-1,0) + max(6-3,0) = 4+3 = 7.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- A single left-to-right pass through the prices array.\n" +
    "- Each day is examined exactly once with a constant-time comparison.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- Only a constant number of tracking variables are needed (`totalProfit`, `buyDay`).\n" +
    "- The `transactions` output array is `O(n/2)` in the worst case but is output, not auxiliary space.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — Even for a flat or always-decreasing price array (zero profit), the single pass still visits all `n` days.\n\n" +
    "**Worst Case: `O(n)`** — For a strictly increasing array, one long position is held for all `n` days, still requiring a single pass.\n\n" +
    "### The Greedy Proof\n" +
    "Any strategy that holds across a valley (buy before a dip, sell after) can be improved or matched by the greedy strategy that avoids the valley entirely. Therefore, no strategy can outperform sum-of-positive-slopes.",

  realWorldUses: [
    "**Algorithmic trading backtesting:** Simulating the maximum possible profit from historical price data to benchmark real strategies.",
    "**Resource scheduling:** Acquiring and releasing resources greedily during periods of value increase.",
    "**Cryptocurrency arbitrage:** Modeling the theoretical maximum return from frequent buy/sell cycles.",
    "**Inventory management:** Deciding when to stock up or sell off inventory based on cost/price fluctuations.",
    "**Energy trading:** Capturing profit from buying low-cost energy in off-peak periods and selling during peak demand.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — the simplest and most efficient solution.",
      "Greedy correctness is provable: capturing every upward slope cannot be improved upon.",
      "Requires no look-ahead — each decision is made based only on adjacent day prices.",
      "Trivially adaptable to report which specific buy/sell transactions were made.",
    ],
    limitations: [
      "Assumes no transaction costs — each real-world trade incurs fees that would change the optimal strategy.",
      "Assumes unlimited capital — in practice, you need enough cash to buy at each low point.",
      "Does not generalize to the k-transactions variant without dynamic programming.",
      "No cooldown period modeled — the single-transaction and cooldown variants require different approaches.",
    ],
  },

  whenToUseIt:
    "Apply the **greedy unlimited transactions** approach when:\n\n" +
    "- You need the **theoretical maximum profit** with no constraint on the number of trades.\n" +
    "- The problem explicitly states unlimited transactions are allowed.\n" +
    "- You need a fast baseline for comparing against constrained trading strategies.\n\n" +
    "Switch to dynamic programming when the problem adds constraints: at most `k` transactions, transaction fees, or a cooldown period between trades.",
};
