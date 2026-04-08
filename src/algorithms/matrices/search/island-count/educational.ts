import type { EducationalContent } from "@/types";

export const islandCountEducational: EducationalContent = {
  overview:
    "**Island Count** (also called *Number of Islands*) counts how many distinct connected components of `1`s exist in a binary grid. " +
    "Two `1`-cells belong to the same island if they are adjacent horizontally or vertically (diagonal adjacency does not count).\n\n" +
    "The standard approach is a **DFS flood fill**: whenever an unvisited `1` is encountered, increment the island counter and recursively set all reachable connected `1`s to `0` (visited), preventing double-counting.",

  howItWorks:
    "1. **Initialize** counters and iterate over every cell `(row, col)` in the grid.\n" +
    "2. **Scan** — if `grid[row][col] === 1`, a new island has been found: increment the island counter.\n" +
    "3. **Flood fill (DFS)** — from the discovered cell, recursively explore all four neighbours (up, down, left, right):\n" +
    "   - Out-of-bounds or already-`0` cells are base cases — return immediately.\n" +
    "   - Valid `1` cells are set to `0` (marked visited) and their neighbours explored.\n" +
    "4. When the DFS returns, the entire island has been consumed and the scan continues from the next unvisited cell.\n\n" +
    "### Example\n\n" +
    "```\n" +
    "1  1  0  0\n" +
    "1  0  0  1\n" +
    "0  0  1  1\n" +
    "0  0  0  0\n" +
    "```\n\n" +
    "Islands: top-left cluster (3 cells), isolated `1` at (1,3) + (2,2)+(2,3) cluster → **3 islands**.\n\n" +
    "### Diagram: DFS flood fill consuming island A\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  Start["Scan finds (0,0)=1 → island++"]\n' +
    '  Start --> N00["DFS (0,0): mark→0"]\n' +
    '  N00 --> N01["DFS (0,1): mark→0"]\n' +
    '  N00 --> N10["DFS (1,0): mark→0"]\n' +
    '  N01 --> OOB1["(0,2)=0 stop"]\n' +
    '  N10 --> OOB2["(2,0)=0 stop"]\n' +
    '  N10 --> OOB3["(1,1)=0 stop"]\n' +
    '  Done["Island A consumed — continue scan"]\n' +
    "  N01 --> Done\n" +
    "  N10 --> Done\n" +
    "  style Start fill:#06b6d4,stroke:#0891b2\n" +
    "  style N00 fill:#f59e0b,stroke:#d97706\n" +
    "  style N01 fill:#14532d,stroke:#22c55e\n" +
    "  style N10 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Cyan marks the scan entry point that triggers a new island; amber is the DFS root; green cells are recursively marked to 0, preventing any future re-count.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every cell is visited at most twice — once during the scan and once during flood fill. Total work is linear in the grid size.\n\n" +
    "**Space Complexity: `O(m × n)`**\n\n" +
    "In the worst case (entire grid is one island), the recursive DFS call stack reaches depth m × n. " +
    "An iterative BFS or explicit stack approach would use O(min(m, n)) space in practice.",

  bestAndWorstCase:
    "**Best case** — no `1`s (all water): the scan completes in O(m × n) with zero DFS calls.\n\n" +
    "**Worst case** — entire grid is `1` (one giant island) or a checkerboard (maximum DFS calls): both are still `O(m × n)` time, " +
    "but the checkerboard triggers the most flood-fill initiations (m × n / 2 islands of size 1).",

  realWorldUses: [
    "**Geographic analysis:** Counting land masses, lakes, or forest patches in rasterised satellite imagery.",
    "**Network connectivity:** Identifying isolated clusters of nodes in a grid-based network topology.",
    "**Game development:** Flood-fill for paint-bucket tools, detecting connected regions in tile-based maps.",
    "**Medical imaging:** Segmenting connected regions of interest in binary medical scans (e.g., tumour detection).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal since every cell must be examined at least once.",
      "Simple to implement and reason about — the recursive DFS is short and readable.",
      "Easily extended to count island sizes, find the largest island, or label each island with a unique ID.",
    ],
    limitations: [
      "Recursive DFS can cause a stack overflow for very large grids — an iterative BFS or explicit stack is safer for production.",
      "Mutates the input grid (sets `1`s to `0`) — a copy is needed if the original must be preserved.",
      "Does not handle diagonal connectivity without code changes.",
    ],
  },

  whenToUseIt:
    "Use DFS flood fill for island counting whenever the grid fits in memory and stack depth is manageable (typically < 10 000 × 10 000). " +
    "For read-only grids, maintain a separate `visited` boolean matrix instead of mutating values. " +
    "Consider Union-Find if you need to dynamically add cells and query connectivity incrementally.",
};
