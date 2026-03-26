/**
 * Educational content for Breadth-First Search (BFS).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for BFS. */
export const bfsEducational: EducationalContent = {
  overview:
    "Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the present depth level before moving on to vertices at the next depth level. It uses a queue data structure to keep track of which node to visit next, ensuring that nodes are visited in order of their distance from the starting node.",

  howItWorks:
    "1. Start at the chosen source node and mark it as visited\n" +
    "2. Add the source node to a queue\n" +
    "3. While the queue is not empty:\n" +
    "   a. Remove the front node from the queue (dequeue)\n" +
    "   b. Process/visit the dequeued node\n" +
    "   c. For each unvisited neighbor of the dequeued node:\n" +
    "      - Mark the neighbor as visited\n" +
    "      - Add the neighbor to the queue (enqueue)\n" +
    "4. Repeat until the queue is empty\n\n" +
    "Example with graph A-B, A-C, B-D, C-E, D-F:\n" +
    "- Start at A: queue=[A], visited=[A]\n" +
    "- Visit A, enqueue B,C: queue=[B,C], visited=[A,B,C]\n" +
    "- Visit B, enqueue D: queue=[C,D], visited=[A,B,C,D]\n" +
    "- Visit C, enqueue E: queue=[D,E], visited=[A,B,C,D,E]\n" +
    "- Visit D, enqueue F: queue=[E,F], visited=[A,B,C,D,E,F]\n" +
    "- Visit E, visit F: done!",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n" +
    "- Best case: O(V + E) — must examine every vertex and edge reachable from the start\n" +
    "- Average case: O(V + E) — performance is consistent regardless of graph structure\n" +
    "- Worst case: O(V + E) — where V is the number of vertices and E is the number of edges\n\n" +
    "**Space Complexity:** O(V) — the queue and visited set can each hold up to V vertices in the worst case",

  bestAndWorstCase:
    "**Best case** still requires O(V + E) time because BFS must explore all reachable vertices and edges systematically. Even if the target is found early, the overall complexity class remains the same.\n\n" +
    "**Worst case** occurs when the graph is densely connected or when the target node (if searching for one) is the last node discovered. In a complete graph, E = V(V-1)/2, making the time complexity O(V²).",

  realWorldUses: [
    "Finding the shortest path in unweighted graphs — GPS navigation for minimum hops",
    "Social network analysis — finding degrees of separation between users",
    "Web crawling — systematically visiting all pages reachable from a starting URL",
    "Network broadcasting — propagating messages to all reachable nodes level by level",
    "Puzzle solving — finding minimum moves in games like sliding puzzles or Rubik's cube",
    "Garbage collection — mark phase of mark-and-sweep algorithms in programming languages",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees finding the shortest path in unweighted graphs",
      "Complete algorithm — will find a solution if one exists",
      "Explores nodes level by level, giving a natural 'distance' ordering",
      "Simple to implement with a queue data structure",
      "Works well for finding all nodes within a certain distance",
    ],
    limitations: [
      "O(V) space complexity can be prohibitive for very large graphs",
      "Not optimal for weighted graphs — use Dijkstra's algorithm instead",
      "Explores all nodes at each depth before going deeper, which can be wasteful if the target is deep",
      "Does not work directly on infinite or very large implicit graphs without modification",
      "Less memory-efficient than DFS for deep, narrow graphs",
    ],
  },

  whenToUseIt:
    "Use BFS when you need the shortest path in an unweighted graph, when you want to explore nodes in order of their distance from a source, or when you need to find all nodes within a certain number of hops. Prefer DFS when memory is a concern and shortest path is not required. Use Dijkstra's algorithm when edges have varying weights.",
};
