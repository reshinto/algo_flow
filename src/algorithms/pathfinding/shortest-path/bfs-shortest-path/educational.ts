import type { EducationalContent } from "@/types";

export const bfsShortestPathEducational: EducationalContent = {
  overview:
    "**BFS Shortest Path** uses Breadth-First Search to find the shortest path in an unweighted grid. Because BFS explores all nodes at distance `d` before any node at distance `d+1`, the first time it reaches the goal is guaranteed to be via the shortest route.\n\nUnlike Dijkstra, BFS requires no priority queue — a simple FIFO queue suffices because every move costs exactly 1.",

  howItWorks:
    "1. Enqueue the start cell and mark it visited.\n" +
    "2. Dequeue the front cell.\n" +
    "3. If it is the goal, trace back through parent pointers to recover the path.\n" +
    "4. Otherwise, enqueue every unvisited, passable 4-directional neighbor and record its parent.\n" +
    "5. Repeat until the queue empties (no path exists) or the goal is dequeued.\n\n" +
    "### Level-by-Level Expansion\n\n" +
    "```\n" +
    "Step 1: Enqueue S        Step 2: Dequeue S, enqueue A B\n" +
    "  [S]                      [A, B]\n" +
    "Step 3: Dequeue A, enqueue C\n" +
    "  [B, C]\n" +
    "```\n\n" +
    "> *Every cell at distance 1 is fully explored before any cell at distance 2 — guaranteeing optimality.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    L0((Start/Level 0)) --- L1A((Level 1))\n" +
    "    L0 --- L1B((Level 1))\n" +
    "    L1B --- L2A((Level 2))\n" +
    "    L1B --- L2B((Level 2))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- `V` = number of cells, `E` = number of passable adjacencies. Each cell is enqueued and dequeued at most once.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The queue, visited array, and parent map each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case** occurs when the goal is immediately adjacent to the start — the algorithm terminates after examining a single cell, giving effectively `O(1)` practical cost.\n\n" +
    "**Worst case** occurs on an open grid where the goal is in the far corner — the algorithm must visit every reachable cell before finding the target, yielding `O(V)` visited nodes.",

  realWorldUses: [
    "**Social Networks:** Finding the shortest chain of connections between two people (six degrees of separation).",
    "**Puzzle Solvers:** Optimal move-sequence in sliding-tile and word-ladder puzzles where each move has equal cost.",
    "**Network Routing:** Hop-count-minimizing routing in unweighted network topologies.",
    "**Game AI:** Shortest-path movement for NPCs on tile-based maps with uniform step cost.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the shortest path in any unweighted graph — no heuristic needed.",
      "Conceptually simple: a single FIFO queue and a visited set are all that is required.",
      "Finds shortest paths to ALL reachable nodes simultaneously, not just the single target.",
    ],
    limitations: [
      "Cannot handle weighted edges — each step must cost the same for the path to be optimal.",
      "Memory intensive on large grids: the queue can hold O(V) entries in the worst case.",
      "Explores in all directions equally, making it slower than A* when a heuristic can focus the search.",
    ],
  },

  whenToUseIt:
    "Choose **BFS Shortest Path** when every edge weight is equal (unit cost) and you need the guaranteed-optimal route. It is the simplest correct algorithm for unweighted grids and small-to-medium maps.\n\nAvoid it when edges have varying costs (use Dijkstra or A*) or when the search space is enormous and a heuristic would dramatically reduce explored nodes (use A*).",
};
