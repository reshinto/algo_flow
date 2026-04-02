import type { EducationalContent } from "@/types";

export const bidirectionalBfsEducational: EducationalContent = {
  overview:
    "**Bidirectional BFS** runs two simultaneous BFS searches — one from the start and one from the end — expanding both frontiers until they meet in the middle. This halves the search radius compared to single-direction BFS, dramatically reducing the number of cells visited on large open grids.\n\nWhen the two frontiers intersect, a complete path is assembled by joining the forward and backward parent chains at the meeting point.",

  howItWorks:
    "1. Initialize two queues: one seeded from start (forward), one from end (backward).\n" +
    "2. Alternate expansion: dequeue one node from the forward queue, explore its neighbors.\n" +
    "3. If a forward neighbor is already in the backward visited set — the frontiers have met. Reconstruct the path.\n" +
    "4. Otherwise, enqueue unvisited neighbors into the forward queue.\n" +
    "5. Repeat steps 2–4 for the backward queue.\n" +
    "6. Continue until a meeting point is found or both queues are empty (no path).\n\n" +
    "### Meeting in the Middle\n\n" +
    "```\n" +
    "Forward:  S → A → B →     ← D ← E ← End  :Backward\n" +
    "                     ↕\n" +
    "               Meeting at B/D\n" +
    "```\n\n" +
    "> *Each search covers only half the distance, reducing visited nodes from O(b^d) to O(b^(d/2)).*\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    S((Start)) --> WaveS((Wave 1))\n" +
    "    E((End)) --> WaveE((Wave 2))\n" +
    "    WaveS --\"Overlap\"--- WaveE\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^(d/2))`**\n\n" +
    "- Where `b` is the branching factor and `d` is the solution depth. Exponentially better than single-direction BFS `O(b^d)` on large uniform grids.\n\n" +
    "**Space Complexity: `O(b^(d/2))`**\n\n" +
    "- Both queues and visited sets grow to at most `b^(d/2)` entries each.",

  bestAndWorstCase:
    "**Best case** occurs when start and end are adjacent — either frontier finds the other immediately, visiting just 2 cells.\n\n" +
    "**Worst case** is a grid with no path — both searches must exhaust all reachable cells before concluding, visiting `O(V)` total nodes across both frontiers.",

  realWorldUses: [
    "**Social Networks:** Finding mutual friends between two people much faster than one-directional BFS.",
    "**Route Planning:** Navigation apps using bidirectional Dijkstra or A* to halve computation on road networks.",
    "**Puzzle Solving:** Meet-in-the-middle approach for Rubik's Cube and other reversible state-space problems.",
    "**Network Analysis:** Finding the shortest connection between two nodes in large communication networks.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Dramatically reduces visited cells — exponentially fewer nodes than single-direction BFS in practice.",
      "Still guarantees optimal path length for unweighted grids.",
      "Works well when a path exists and the meeting heuristic is reliable.",
    ],
    limitations: [
      "Requires a well-defined reverse graph — not all problems have clear reverse direction.",
      "Implementation complexity is higher: two queues, two visited sets, meeting-point detection.",
      "Meeting-point detection must be careful to ensure path optimality when frontiers are asymmetric.",
    ],
  },

  whenToUseIt:
    "Choose **Bidirectional BFS** when pathfinding on large unweighted grids or graphs where single-direction BFS explores too many nodes. It is especially effective when start and end are both known and the search space is large.\n\nAvoid it when the problem has no natural reverse direction, or when the graph is small enough that single-direction BFS is already fast enough.",
};
