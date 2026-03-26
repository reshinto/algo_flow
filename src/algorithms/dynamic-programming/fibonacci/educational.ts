import type { EducationalContent } from "@/types";

export const fibonacciEducational: EducationalContent = {
  overview:
    "The **Fibonacci sequence** is a classic problem in dynamic programming where each number is the sum of the two preceding ones: `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)`.\n\nWhile the naive recursive approach has **exponential time complexity** `O(2^n)` due to computing the exact same subproblems repeatedly, dynamic programming techniques—such as tabulation (bottom-up) and memoization (top-down)—reduce this to **linear time** `O(n)` by storing and reusing previously computed results.",

  howItWorks:
    "Dynamic Programming speeds up the naive recursive solution drastically by ensuring each sub-problem `F(i)` is computed **only once**.\n\n" +
    "### The Subproblem Overlap (Naive Approach)\n\n" +
    "Notice how calculating just `F(5)` forces us to compute `F(3)` twice, and `F(2)` three times. This is why the naive approach is so slow! \n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    F5[\"F(5)\"] --> F4[\"F(4)\"]\n" +
    "    F5 --> F3A[\"F(3)\"]\n" +
    "    F4 --> F3B[\"F(3)\"]\n" +
    "    F4 --> F2A[\"F(2)\"]\n" +
    "    F3A --> F2B[\"F(2)\"]\n" +
    "    F3A --> F1A[\"F(1)\"]\n" +
    "    \n" +
    "    style F5 fill:#0a192f,stroke:#26d0ce\n" +
    "    style F4 fill:#1a365d,stroke:#3b82f6\n" +
    "    style F3A fill:#7f1d1d,stroke:#ef4444,stroke-width:2px\n" +
    "    style F3B fill:#7f1d1d,stroke:#ef4444,stroke-width:2px\n" +
    "```\n\n" +
    "### 1. Tabulation (Bottom-Up) Approach\n" +
    "We build the solution iteratively from the ground up.\n" +
    "1. Create an array `table` of size `n + 1` to store Fibonacci values.\n" +
    "2. Set the base cases: `table[0] = 0` and `table[1] = 1`.\n" +
    "3. Iterate from index `2` up to `n`.\n" +
    "4. For each step, add the two previous array cells: `table[i] = table[i-1] + table[i-2]`.\n" +
    "5. Return `table[n]`.\n\n" +
    "### 2. Memoization (Top-Down) Approach\n" +
    "We use recursion, but we save the answers to a cache object as we go.\n" +
    "1. Define the recursive function `F(n)` with a globally accessible `cache`.\n" +
    "2. If `n` is `0` or `1`, return `n` *(Base Case)*.\n" +
    "3. **Check Cache:** If `F(n)` lies inside `cache`, return it immediately! *(Hit!)*\n" +
    "4. Let `val = F(n-1) + F(n-2)`. Store `val` into `cache`, then return it.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- **Tabulation:** We run a single linear, non-nested `for` loop starting from `2` up to `n`, performing exactly `O(1)` operations per step.\n" +
    "- **Memoization:** Although recursive, each unique subproblem `F(i)` is evaluated fully only once. Further requests for `F(i)` hit the `O(1)` cache.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Our Tabulation approach stores `n + 1` values inside the dynamic array. \n\n" +
    "> Note: Tabulation for Fibonacci can be trivially optimized to `O(1)` spatial complexity by storing only the previous `two` values dynamically instead of calculating the entire array history, but our explicit `O(n)` array visualization serves as a stronger teaching instrument for DP grid concepts.",

  bestAndWorstCase:
    "The **Best case**, **Average case**, and **Worst case** for our DP implementation are functionally identical: `O(n)`.\n\n" +
    "Because calculation relies directly upon computing all preceding numbers sequentially, the DP grid completely flattens execution pathways. Whether you request `F(4)` or `F(50)`, algorithm execution is rigorously predictable and scales strictly linearly. There is no such thing as a 'lucky' shortcut.",

  realWorldUses: [
    "**Algorithm Education:** The gold standard introductory mechanism for demystifying recursive overlap and DP Tabulation.",
    "**Financial Modeling:** Traders utilize Fibonacci mathematical intervals (*Retracement levels*) to predict chart support/resistance lines on stock and crypto tickers.",
    "**Biology & Nature:** The exact spiral ratio mathematically maps directly onto sunflower seed alignments, pinecones, and Nautilus shells.",
    "**Data Structures:** Heavily leveraged in internal complex architectures, like the widely known *Fibonacci Heap*."
  ],

  strengthsAndLimitations: {
    strengths: [
      "Flattens the dangerous `O(2^n)` exponential recursive explosion directly into an ultra-fast `O(n)` operation.",
      "Tabulation structurally eradicates recursive overhead, fully avoiding `Maximum call stack size exceeded` errors native to JavaScript.",
      "Trivially verifiable edge cases and mathematical logic."
    ],
    limitations: [
      "For monumental numbers (`F(100+)`), native primitive integers overflow their memory limits requiring `BigInt` wrappers to maintain accuracy.",
      "Without `O(1)` Space pruning, huge tables reserve unneeded allocated JS heap blocks holding deeply stale calculation histories."
    ],
  },

  whenToUseIt:
    "Opt for **Tabulation** (Bottom-Up) when processing extremely large sequential requirements where recursive depth limits pose structural threats. \n\nSelect **Memoization** (Top-Down) for multidimensional logic puzzles where calculating the *entire* state array isn't guaranteed to be necessary, minimizing needless mathematical processing."
};
