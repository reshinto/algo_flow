import type { EducationalContent } from "@/types";

export const iterativeDeepeningDfsEducational: EducationalContent = {
  overview:
    "**Iterative Deepening DFS (IDDFS)** combines the space efficiency of Depth-First Search with the path-length optimality of Breadth-First Search. It runs DFS repeatedly with an increasing depth limit — first allowing only depth 0, then depth 1, then depth 2, and so on — until the goal is found.\n\nThe result is a shortest path (fewest hops) found using only `O(d)` stack space, where `d` is the solution depth.",

  howItWorks:
    "1. Set the depth limit to 0.\n" +
    "2. Run DFS from start, but stop exploring any branch that exceeds the current depth limit.\n" +
    "3. If the goal is found within the depth limit, return the path.\n" +
    "4. If DFS exhausts all depth-limited branches without finding the goal, increment the depth limit and repeat from step 2.\n" +
    "5. Continue until the goal is found or no reachable cells remain.\n\n" +
    "### Depth Limit Progression\n\n" +
    "```\n" +
    "Depth 0: [S]          ← only checks start\n" +
    "Depth 1: [S, A, B]    ← checks neighbors\n" +
    "Depth 2: [S, A, C, B, D]  ← and their neighbors\n" +
    "```\n\n" +
    "> *Although nodes near the start are revisited in each iteration, the total work is dominated by the last (deepest) iteration.*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^d)`**\n\n" +
    "- Where `b` is the branching factor and `d` is the solution depth. Although shallow nodes are revisited multiple times, the majority of work occurs at depth `d`, making the total overhead about `b/(b-1)` times a single BFS pass.\n\n" +
    "**Space Complexity: `O(d)`**\n\n" +
    "- The recursion stack holds at most `d` frames at any time — dramatically less than BFS's `O(b^d)` queue.",

  bestAndWorstCase:
    "**Best case** occurs when the goal is immediately adjacent to start at depth 1 — the first full iteration finds it instantly.\n\n" +
    "**Worst case** is when no path exists — every depth limit up to `V` is tried, resulting in `O(V * V)` total node visits across all iterations.",

  realWorldUses: [
    "**Game Tree Search:** Chess and game engines use iterative deepening to produce a move quickly and improve with more time.",
    "**IDA*:** A* heuristic search combined with iterative deepening for memory-bounded optimal pathfinding.",
    "**Embedded Systems:** When stack memory is severely limited but optimal path length is required.",
    "**Puzzle Solving:** 15-puzzle and similar combinatorial problems where BFS would exhaust memory.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the shortest path (fewest hops) like BFS, while using only `O(d)` stack space like DFS.",
      "No priority queue or large frontier storage required.",
      "Anytime algorithm: produces progressively better solutions if interrupted early.",
    ],
    limitations: [
      "Revisits shallow nodes many times — has a constant-factor overhead compared to BFS.",
      "Recursive implementation can hit system stack limits for very deep solutions.",
      "Not suitable when edge weights vary — use IDA* with a cost function instead.",
    ],
  },

  whenToUseIt:
    "Choose **IDDFS** when you need shortest paths on a large or unbounded search space and memory is constrained. It is the algorithm of choice for game-tree search and memory-bounded puzzles.\n\nAvoid it when the search depth is small (BFS is simpler) or when edge weights vary (use Dijkstra or IDA*).",
};
