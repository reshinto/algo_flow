import type { EducationalContent } from "@/types";

export const unionFindEducational: EducationalContent = {
  overview:
    "**Union-Find** (also called Disjoint Set Union, or DSU) is a data structure that maintains a partition of " +
    "a set of elements into non-overlapping groups called **disjoint sets**. It efficiently supports two operations:\n\n" +
    "- **`find(x)`** — determine which set element `x` belongs to by returning its root representative.\n" +
    "- **`union(x, y)`** — merge the sets containing `x` and `y` into one.\n\n" +
    "Union-Find is the backbone of algorithms that need to track connected components as edges are added — " +
    "from detecting cycles in graphs to clustering nodes in networks. Its near-constant-time performance comes " +
    "from two optimizations applied together: **path compression** and **union by rank**.",

  howItWorks:
    "**Initialization — O(n)**:\n\n" +
    "Each element starts as its own set. A `parent[]` array stores the parent of each node " +
    "(initially `parent[i] = i`), and a `rank[]` array tracks tree depth (initially all zeros).\n\n" +
    "**Find with Path Compression — O(α(n)) amortized**:\n\n" +
    "1. Walk from `x` up through parents until reaching the root (where `parent[root] == root`).\n" +
    "2. On the way back, point every node on the path **directly to the root** (flattening the tree).\n" +
    "3. Subsequent `find` calls on the same elements are O(1).\n\n" +
    "**Union by Rank — O(α(n)) amortized**:\n\n" +
    "1. Find the roots of both elements: `rootA = find(x)`, `rootB = find(y)`.\n" +
    "2. If `rootA == rootB`, they are already in the same set — nothing to do.\n" +
    "3. Attach the lower-rank root under the higher-rank root to keep the tree shallow.\n" +
    "4. If ranks are equal, attach `rootB` under `rootA` and increment `rank[rootA]`.\n\n" +
    "### Example: elementCount = 8, operations = [[0,1],[2,3],[0,2]]\n\n" +
    "```\n" +
    "After init:    {0} {1} {2} {3} {4} {5} {6} {7}\n" +
    "union(0,1):    {0,1} {2} {3} {4} {5} {6} {7}  — parent[1] = 0\n" +
    "union(2,3):    {0,1} {2,3} {4} {5} {6} {7}    — parent[3] = 2\n" +
    "union(0,2):    {0,1,2,3} {4} {5} {6} {7}      — parent[2] = 0\n" +
    "```\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '  A["0 (root)"]:::root\n' +
    '  B["1"]:::child\n' +
    '  C["2"]:::child\n' +
    '  D["3"]:::child\n' +
    '  E["4"]:::start\n' +
    "  B --> A\n" +
    "  C --> A\n" +
    "  D --> A\n" +
    "  classDef root fill:#14532d,stroke:#22c55e\n" +
    "  classDef child fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef start fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "After `union(0,2)`, path compression flattens the tree so nodes 1, 2, and 3 all point directly to root 0. Node 4 remains its own independent component.",

  timeAndSpaceComplexity:
    "**Time Complexity: O(α(n)) amortized per operation**\n\n" +
    "- `α(n)` is the inverse Ackermann function — grows so slowly it is effectively constant for all practical inputs.\n" +
    "- For `n ≤ 10^600`, `α(n) ≤ 4`. In practice this means `find` and `union` are constant time.\n" +
    "- The guarantee requires **both** path compression and union by rank applied together.\n\n" +
    "**Space Complexity: O(n)**\n\n" +
    "- Two arrays of length `n`: `parent[]` and `rank[]`.\n" +
    "- No additional heap allocations during find or union.",

  bestAndWorstCase:
    "**Best case — O(1) per operation**:\n\n" +
    "After many finds have flattened all paths, every element's parent points directly to the root. " +
    "Subsequent `find` calls resolve in a single array lookup.\n\n" +
    "**Worst case without optimizations — O(n) per find**:\n\n" +
    "Union by rank alone (no path compression) still guarantees O(log n) tree height. " +
    "Path compression alone (no union by rank) gives O(log n) amortized. " +
    "Using **both** together achieves the O(α(n)) amortized bound.\n\n" +
    "**Practical note**: Even a naive Union-Find (no rank, no compression) is fast for small inputs. " +
    "The optimization becomes critical only for large `n` or many sequential find/union calls.",

  realWorldUses: [
    "**Kruskal's Minimum Spanning Tree:** Union-Find detects whether adding an edge creates a cycle by checking if both endpoints share a root before merging their sets.",
    "**Network connectivity:** Determine whether two computers in a network are in the same connected component as connections are added dynamically.",
    "**Image segmentation:** Pixels are grouped into regions (components) using union operations on neighboring pixels with similar color values.",
    "**Least Common Ancestor (offline):** Tarjan's offline LCA algorithm uses Union-Find to batch-answer LCA queries on trees efficiently.",
    "**Percolation simulation:** Scientific models of fluid flow through porous materials use Union-Find to detect when top and bottom grids become connected.",
    "**Online social graphs:** Social networks detect when two users are in the same community as friendships are added in real time.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Near-constant O(α(n)) amortized time per operation — effectively O(1) for all practical inputs.",
      "Simple implementation: just two arrays (parent and rank) and two short functions.",
      "Handles dynamic connectivity — edges can be added incrementally without rebuilding.",
      "Space-efficient: O(n) with no extra heap allocations during operations.",
      "Parallelizable path compression: independent sub-trees can be compressed concurrently.",
    ],
    limitations: [
      "Only supports union (merge) — sets cannot be split once merged.",
      "Does not natively support edge deletion; requires offline or link-cut tree extensions.",
      "Cannot enumerate the members of a set without iterating all elements.",
      "Does not store set relationships — only root identity is tracked, not structure within a component.",
      "Concurrent modifications require synchronization; not inherently thread-safe.",
    ],
  },

  whenToUseIt:
    "Use Union-Find when you need to **efficiently track and merge connected groups** as relationships are added incrementally.\n\n" +
    "**Prefer Union-Find when:**\n" +
    "- You need to answer 'are these two elements in the same group?' repeatedly.\n" +
    "- Connections are added dynamically (online connectivity).\n" +
    "- You want a simple, cache-friendly data structure with no pointer chasing.\n" +
    "- You're implementing Kruskal's MST or cycle detection in an undirected graph.\n\n" +
    "**Avoid Union-Find when:**\n" +
    "- You need to remove connections — use a link-cut tree instead.\n" +
    "- You need to enumerate set members efficiently.\n" +
    "- The graph is directed — Union-Find assumes symmetric, undirected relationships.\n" +
    "- You need to answer connectivity queries offline before building the structure — BFS/DFS may be simpler.",
};
