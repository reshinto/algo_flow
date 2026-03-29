import type { EducationalContent } from "@/types";

export const uniquePathsEducational: EducationalContent = {
  overview:
    "**Unique Paths (Tabulation)** asks: given a grid of `rows × columns`, how many distinct paths lead from the top-left corner to the bottom-right corner if you can only move **right** or **down**?\n\n" +
    "This is a **bottom-up dynamic programming** solution with a **space-optimized 1-D rolling array**. Instead of maintaining a full 2-D table, it keeps a single row `dp` where `dp[j]` holds the number of paths that reach column `j` in the row currently being processed. Each row pass updates `dp` in place, discarding the previous row entirely.",

  howItWorks:
    "1. **Initialize** a 1-D table `dp` of size `columns`, all set to `1`. This models the first row — from the top-left cell you can only travel rightward, so every cell in row 0 has exactly one path leading to it.\n" +
    "2. **Iterate over rows** from `1` to `rows - 1`. For each row, iterate over columns from `1` to `columns - 1`.\n" +
    "3. **Update in place:** `dp[j] = dp[j] + dp[j - 1]`. Here `dp[j]` (before the update) holds the paths arriving from **above** (inherited from the previous row pass), and `dp[j - 1]` holds the paths arriving from the **left** (already updated this row pass). The sum is the total paths to reach `(row, j)`.\n" +
    "4. Column `0` is never updated — it stays `1` throughout, because there is only one way to reach any cell in column 0 (move straight down).\n" +
    "5. Return `dp[columns - 1]` — the number of paths to the bottom-right corner.\n\n" +
    "### Table Evolution for rows=3, columns=3\n\n" +
    "```\n" +
    "Init:     P(0)=1  P(1)=1  P(2)=1\n" +
    "Row 1:    P(0)=1  P(1)=2  P(2)=3\n" +
    "Row 2:    P(0)=1  P(1)=3  P(2)=6\n" +
    "```\n\n" +
    "Result: **6 unique paths** from (0,0) to (2,2).\n\n" +
    "### Why a 1-D Array Suffices\n\n" +
    "At any point during the inner loop, `dp[j]` already holds the correct value for the cell directly above the current cell (from the previous outer-loop iteration). After applying `dp[j] += dp[j-1]`, it becomes the correct value for the current cell. No prior rows are ever needed again, so the 2-D table collapses to a single rolling row.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(rows × columns)`**\n\n" +
    "Every cell in the `rows × columns` grid is visited exactly once — once per row in the outer loop and once per column in the inner loop. Each visit performs a constant-time addition.\n\n" +
    "**Space Complexity: `O(columns)`**\n\n" +
    "Only one 1-D array of length `columns` is maintained at any time. The full 2-D grid of `rows × columns` cells is never allocated, making this a textbook example of the **rolling-array space optimization** technique in DP.",

  bestAndWorstCase:
    "**Best case:** `O(rows × columns)` — every cell is always visited; there is no early-exit condition.\n\n" +
    "**Worst case:** `O(rows × columns)` — large grids require proportionally more iterations, but the algorithm remains linear in the total number of cells.\n\n" +
    "There is no branching or pruning in this algorithm. The recurrence is unconditional: every non-first-row, non-first-column cell is always recomputed.",

  realWorldUses: [
    "**Robotics:** Planning the number of distinct routes a robot arm or delivery robot can take across a grid layout when restricted to forward/downward motion.",
    "**Combinatorics:** Equivalent to computing the binomial coefficient `C(rows + columns - 2, rows - 1)` — counting ways to arrange a sequence of moves.",
    "**Dynamic Programming Education:** A canonical entry point for teaching the rolling-array optimization that reduces 2-D DP tables to 1-D.",
    "**Game Design:** Counting valid traversal sequences in tile-based maps where only right and down moves are legal.",
    "**Network Routing:** Counting monotone paths through a layered network or DAG where each layer corresponds to a row and each node to a column.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Space-optimal: O(columns) versus O(rows × columns) for the naive 2-D approach.",
      "Simple recurrence — one addition per cell, no branching, no auxiliary data structures.",
      "The 1-D rolling-array technique generalizes to many other 2-D DP problems (knapsack, edit distance, longest common subsequence).",
    ],
    limitations: [
      "Counts paths only — does not enumerate or reconstruct any specific path. Back-tracking the actual routes requires the full 2-D table or a separate path-reconstruction pass.",
      "Assumes unrestricted movement (no walls or obstacles). Adding obstacles requires modifying the recurrence and cannot avoid visiting every cell.",
      "For very large grids the answer grows exponentially (it equals a binomial coefficient), so integer overflow becomes a concern — use big-integer arithmetic when rows and columns are large.",
    ],
  },

  whenToUseIt:
    "Use this pattern when counting monotone paths through a 2-D grid where each step moves in only one of two directions (right/down, or any fixed pair). It is the go-to approach whenever the 2-D DP recurrence depends only on the **current row's left neighbor** and the **previous row's same column** — conditions that allow the rolling-array reduction to O(columns) space. If you need to reconstruct a path (not just count), maintain the full 2-D table instead. If the grid contains obstacles, adapt the recurrence to set `dp[j] = 0` for blocked cells.",
};
