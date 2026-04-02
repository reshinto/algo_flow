import type { EducationalContent } from "@/types";

export const idaStarEducational: EducationalContent = {
  overview:
    "**IDA\\*** (Iterative Deepening A*) combines the memory efficiency of depth-first search with the optimality guarantees of A*. Instead of maintaining an open list, it runs a DFS that is cut off at an f-cost threshold — and repeats with a higher threshold each iteration until the goal is found.\n\nWhere A* needs `O(V)` memory, IDA* needs only `O(d)` — the depth of the solution — making it ideal for memory-constrained environments.",

  howItWorks:
    "1. Set the initial threshold to `h(start)` — the heuristic estimate from start to goal.\n" +
    "2. Run a DFS, pruning any node whose `f = g + h` exceeds the current threshold.\n" +
    "3. Track the minimum f-cost that was pruned — this becomes the next threshold.\n" +
    "4. If the goal is reached within the threshold, reconstruct and return the path.\n" +
    "5. If no path exists below any finite threshold, return 'no path found'.\n\n" +
    "### Threshold Progression\n\n" +
    "```\n" +
    "Iteration 1: threshold = h(start) = 8\n" +
    "Iteration 2: threshold = min pruned f = 10\n" +
    "Iteration 3: threshold = min pruned f = 12  ← goal found!\n" +
    "```\n\n" +
    "> *Each iteration is a complete DFS — nodes are revisited across iterations but never stored.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    T1((Threshold: 5)) --> A((f=4: Search))\n" +
    "    A --> B((f=6: Prune, Save for next threshold))\n" +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^d)`** — same asymptotic as A*, but with a higher constant factor due to node revisiting across iterations.\n\n" +
    "**Space Complexity: `O(d)`**\n\n" +
    "- Only the current DFS path is stored — dramatically lower than A*'s `O(V)` open list. This is IDA*'s key advantage for deep searches.",

  bestAndWorstCase:
    "**Best case** occurs when the heuristic is perfect — the threshold jumps directly to the optimal f-cost and the goal is found in the first iteration.\n\n" +
    "**Worst case** occurs when many distinct f-cost values exist — IDA* must run a full DFS for each threshold level, revisiting nodes many times. On grids, the number of threshold levels is proportional to the path length.",

  realWorldUses: [
    "**Puzzle Solving:** 15-puzzle and Rubik's Cube solvers where the state space depth is large but memory is limited.",
    "**Embedded Systems:** Pathfinding on microcontrollers or devices with severely restricted RAM.",
    "**Game Tree Search:** Two-player game solvers (chess endgames) that cannot afford A*'s memory footprint.",
    "**Robot Navigation:** Real-time path planning when dynamic memory allocation is expensive or forbidden.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Memory-optimal — uses O(d) space vs A*'s O(V), enabling search in very deep or large spaces.",
      "Optimal and complete — guarantees the shortest path with an admissible heuristic.",
      "No priority queue overhead — simpler data structures than A*.",
    ],
    limitations: [
      "Nodes at shallow depths are revisited on every iteration — higher constant-factor overhead than A*.",
      "Performs poorly when many f-cost thresholds exist close together (many small iteration steps).",
      "Not suited for weighted graphs without modification — the threshold increment can become very small.",
    ],
  },

  whenToUseIt:
    "Choose **IDA\\*** when memory is the primary constraint and you need an optimal path — particularly for deep search spaces like combinatorial puzzles.\n\nAvoid it when time is critical and node revisiting is expensive (use A*), or when the solution depth is shallow enough that A*'s memory footprint is acceptable.",
};
