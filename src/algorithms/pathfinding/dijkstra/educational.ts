/**
 * Educational content for Dijkstra's Algorithm.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Dijkstra's Algorithm. */
export const dijkstraEducational: EducationalContent = {
  overview:
    "Dijkstra's Algorithm is a graph search algorithm that finds the shortest path between a source node and all other nodes in a weighted graph with non-negative edge weights. Invented by Edsger W. Dijkstra in 1956, it is one of the most fundamental algorithms in computer science and forms the basis of many routing and navigation systems.",

  howItWorks:
    "1. Assign a tentative distance of 0 to the start node and Infinity to all others\n" +
    "2. Set the start node as the current node and add it to the open set\n" +
    "3. For the current node, examine all unvisited neighbors\n" +
    "4. Calculate the tentative distance through the current node to each neighbor\n" +
    "5. If this distance is less than the previously recorded distance, update it\n" +
    "6. Mark the current node as visited (closed) so it won't be checked again\n" +
    "7. Select the unvisited node with the smallest tentative distance as the new current node\n" +
    "8. Repeat steps 3-7 until the destination is reached or the open set is empty\n\n" +
    "Example on a 5x5 grid with a wall:\n" +
    "- Start at (0,0), target is (4,4)\n" +
    "- Algorithm explores outward in all directions from the start\n" +
    "- Nodes closer to the start are explored first\n" +
    "- When the target is reached, trace back through parent pointers to reconstruct the path",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n" +
    "- With a binary heap/priority queue: O((V + E) log V), where V is the number of vertices and E is the number of edges\n" +
    "- With a simple array (as used here): O(V^2) due to linear scan for the minimum distance node\n" +
    "- On a grid of R rows and C columns: V = R*C and E = ~4*V\n\n" +
    "**Space Complexity:** O(V) — stores the distance array, parent pointers, visited set, and priority queue, all proportional to the number of vertices",

  bestAndWorstCase:
    "**Best case** occurs when the start and end nodes are adjacent or very close, and the algorithm finds the path after exploring only a few nodes. The time is still O((V + E) log V) in big-O terms, but practically very few iterations are needed.\n\n" +
    "**Worst case** occurs when the end node is unreachable or is the last node discovered. The algorithm must explore every reachable vertex and edge before concluding. On a grid with no walls, this means visiting all R*C cells.",

  realWorldUses: [
    "GPS navigation systems — finding the shortest driving route between two locations",
    "Network routing protocols (OSPF, IS-IS) — determining optimal packet forwarding paths",
    "Robotics path planning — navigating a robot through an environment with obstacles",
    "Social network analysis — finding the shortest connection chain between two people",
    "Game AI — computing optimal movement paths for characters across a map",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the shortest path when all edge weights are non-negative",
      "Works on both directed and undirected graphs",
      "Can compute shortest paths from a source to all reachable nodes in one run",
      "Well-suited for sparse graphs when implemented with a priority queue",
      "Simple to implement and understand compared to other shortest path algorithms",
    ],
    limitations: [
      "Cannot handle negative edge weights — use Bellman-Ford for that case",
      "Explores in all directions equally, unlike A* which uses a heuristic to focus the search",
      "With a simple array-based priority queue, performance degrades to O(V^2)",
      "Not ideal for very large graphs where only a single target is needed — A* is often faster",
      "Requires the entire graph to be known in advance (not suitable for online/streaming scenarios)",
    ],
  },

  whenToUseIt:
    "Use Dijkstra's Algorithm when you need to find the shortest path in a graph with non-negative edge weights. It is the go-to choice for general shortest path problems in road networks, game maps, and network routing. If you need better performance toward a specific target, consider A* with an admissible heuristic. For graphs with negative weights, use Bellman-Ford instead.",
};
