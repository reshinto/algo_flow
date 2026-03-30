import type { EducationalContent } from "@/types";

export const bridgesEducational: EducationalContent = {
  overview:
    "A **Bridge** (also called a cut edge) is an edge in an undirected graph whose removal disconnects the graph — or increases the number of connected components.\n\nThe bridge-finding algorithm uses a single DFS pass with **discovery timestamps** and **low-link values** to identify every such critical edge in `O(V + E)` time.",

  howItWorks:
    "1. Assign each node a **discovery time** (the order it was first visited) and initialize its **low-link** to the same value.\n" +
    "2. For each unvisited neighbor, recurse and then update: `low[u] = min(low[u], low[v])`.\n" +
    "3. For already-visited neighbors that are **not the parent** (back edges), update: `low[u] = min(low[u], disc[v])`.\n" +
    "4. After recursing into a child `v`, if `low[v] > disc[u]`, then the edge `u — v` is a **bridge** — removing it would disconnect the graph because `v`'s subtree has no back edge to `u`'s ancestor.\n\n" +
    "### Bridge Condition\n\n" +
    "```\n" +
    "Edge (u, v) is a bridge if:  low[v] > disc[u]\n" +
    "```\n\n" +
    "This means there is no back edge from `v`'s subtree to `u` or any ancestor of `u` — so `u — v` is the only path connecting the two parts.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each node is visited exactly once and each edge is examined exactly once during the DFS.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The discovery time map, low-link map, and recursion stack each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case** is a graph with no bridges (e.g., a complete graph or any 2-edge-connected graph) — the DFS runs in `O(V + E)` and returns an empty result.\n\n" +
    "**Worst case** is a linear chain (path graph) where every edge is a bridge — still `O(V + E)` but all `V - 1` edges are reported.",

  realWorldUses: [
    "**Network reliability:** Identifying single-point-of-failure connections in computer networks or power grids.",
    "**Road infrastructure:** Finding critical roads or bridges whose closure would disconnect regions.",
    "**Social network analysis:** Detecting weak ties that are the only link between communities.",
    "**Biology:** Identifying critical reactions in metabolic pathways.",
    "**Circuit design:** Finding critical wires whose failure would break a circuit.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single DFS pass — finds all bridges in optimal `O(V + E)` time.",
      "No extra data structures needed beyond discovery time and low-link arrays.",
      "Works correctly on disconnected graphs by iterating over all unvisited nodes.",
    ],
    limitations: [
      "Only works on **undirected** graphs — bridge detection on directed graphs requires a different approach.",
      "Recursive DFS can overflow the call stack on very deep graphs; an iterative version is needed for production use.",
      "Does not handle multigraphs (multiple edges between the same pair of nodes) correctly without modification.",
    ],
  },

  whenToUseIt:
    "Use **Bridge Finding** when you need to identify all critical edges in an **undirected** graph whose removal would disconnect part of the network.\n\nIf you also need to find **critical nodes** (articulation points), run the Articulation Points algorithm in the same DFS pass. For directed graphs, bridges are replaced by the concept of strongly connected components — use **Tarjan's SCC** instead.",
};
