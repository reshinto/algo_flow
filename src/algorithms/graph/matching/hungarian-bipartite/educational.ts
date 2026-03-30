import type { EducationalContent } from "@/types";

export const hungarianBipartiteEducational: EducationalContent = {
  overview:
    "**Hungarian Bipartite Matching (Kuhn's Algorithm)** finds the maximum matching in a bipartite graph — the largest set of edges where no two edges share a vertex.\n\n" +
    "A **bipartite graph** splits vertices into two disjoint groups (left and right) where every edge connects a left node to a right node. Maximum matching solves real-world assignment problems: matching workers to tasks, students to schools, or jobs to machines — pairing as many pairs as possible without conflict.",

  howItWorks:
    "For each unmatched left node, Kuhn's algorithm attempts to find an **augmenting path** — a route that alternates between unmatched and matched edges, ending at an unmatched right node. Following this path and flipping matched/unmatched along it increases the matching size by one.\n\n" +
    "1. Initialize empty matching maps for left→right and right→left assignments.\n" +
    "2. For each left node, run a depth-first search (DFS) to find an augmenting path:\n" +
    "   * Track which right nodes were visited in this DFS to avoid loops.\n" +
    "   * For each unvisited right neighbor:\n" +
    "     - If the right node is unmatched → **match it** (augmenting path found).\n" +
    "     - If the right node is already matched → recursively try to re-route its current partner.\n" +
    "   * If re-routing succeeds → update the matching (flip the path).\n" +
    "3. Repeat for every left node. The final matching is maximum.\n\n" +
    "### Augmenting Path Example\n\n" +
    "```\n" +
    "L1 — R1 (unmatched)  →  Match L1–R1\n" +
    "L2 — R2 (unmatched)  →  Match L2–R2\n" +
    "L3 — R1 (matched to L1)  →  Re-route L1 to R2? R2 matched to L2 → Re-route L2 to R3\n" +
    "     →  L2–R3, L1–R2, L3–R1  (all matched!)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V × E)`**\n\n" +
    "- For each of the `V` left nodes, the DFS explores up to `E` edges in the worst case.\n" +
    "- With `V` vertices and `E` edges, the total work is `O(V × E)`.\n" +
    "- For dense bipartite graphs where `E ≈ V²`, this becomes `O(V³)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The matching maps store at most `V` pairs.\n" +
    "- Each DFS call uses a `visitedRight` set bounded by the number of right nodes.\n" +
    "- Recursion depth is bounded by the number of left nodes.",

  bestAndWorstCase:
    "**Best case** is `O(E)` when every left node finds an unmatched right neighbor immediately on the first DFS pass — no augmenting path re-routing is needed.\n\n" +
    "**Worst case** is `O(V × E)` when every left node triggers a full DFS that must re-route an entire chain of existing matches before finding a free right node. This happens in highly symmetric, dense bipartite graphs where the matching must be restructured repeatedly.",

  realWorldUses: [
    "**Job Scheduling:** Assigning workers to tasks or machines to jobs to maximize throughput with no resource conflicts.",
    "**University Admissions:** Matching applicants to available university seats based on mutual preferences.",
    "**Network Routing:** Pairing data packets with available routing slots to maximize network utilization.",
    "**Computer Vision:** Matching detected objects between video frames for tracking and recognition.",
    "**Online Dating / Recommendation Systems:** Pairing users to maximize compatible matches in two-sided marketplaces.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guaranteed to find the **maximum** matching — it will always use the most possible pairings.",
      "Simple recursive DFS implementation that is easy to understand and adapt.",
      "Works correctly even when the graph has no perfect matching, returning the best achievable result.",
    ],
    limitations: [
      "`O(V × E)` time is slower than the Hopcroft-Karp algorithm (`O(√V × E)`) for large graphs.",
      "Requires the graph to be strictly bipartite — cannot handle general graph matching without modification.",
      "Deep recursion on long augmenting paths can cause stack overflow on very large inputs without iterative conversion.",
    ],
  },

  whenToUseIt:
    "Use **Hungarian Bipartite Matching** when you need to assign items from one group to items in another group without conflicts, and you want to maximize the total number of assignments.\n\n" +
    "Prefer **Hopcroft-Karp** when working with large bipartite graphs (thousands of nodes) and performance is critical. Use **Hungarian Algorithm** (the weighted variant) when each match has a cost and you need the optimal-cost assignment rather than just the maximum count.",
};
