import type { EducationalContent } from "@/types";

export const distributeCoinsEducational: EducationalContent = {
  overview:
    "**Distribute Coins** counts the minimum number of moves needed to give every node in a binary tree exactly one coin, given that the total number of coins equals the number of nodes. Each move transfers one coin along one edge.\n\nThe key insight is that each edge must carry exactly `|excess|` coins, where excess is the net coins that need to pass through that edge.",

  howItWorks:
    "The DFS algorithm computes the excess coins flowing through each edge:\n\n" +
    "1. **Initialize** — `totalMoves = 0`.\n" +
    "2. **DFS function** — for each node, return `node.value + leftExcess + rightExcess - 1`.\n" +
    "   - This is the net excess coins that must flow out of (or into) this node.\n" +
    "3. **Accumulate moves** — `totalMoves += |leftExcess| + |rightExcess|`.\n" +
    "   - Each coin that crosses an edge from/to a child adds one move.\n" +
    "4. **Return** — the final `totalMoves` count.\n\n" +
    "For a tree where root=4 (4 coins), left=0, right=0, leftleft=3, the minimum moves is 4.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once during the DFS.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The recursive call stack depth equals the tree height.",

  bestAndWorstCase:
    "**Best case** — coins perfectly distributed already: every node has exactly 1 coin — `O(n)` time, 0 moves.\n\n" +
    "**Worst case** — all coins at one node (e.g., root): `O(n)` time and up to `O(n)` moves.",

  realWorldUses: [
    "**Resource balancing** — Distribute computing resources across a hierarchical cluster topology.",
    "**Load balancing** — Calculate minimum data transfers needed to balance load across a tree of servers.",
    "**Supply chain** — Find minimum shipments to equalize inventory across a distribution tree.",
    "**Game mechanics** — Count minimum moves to equalize resources in a tree-structured game map.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Elegant single-DFS solution — computes the answer while traversing the tree once.",
      "The excess-based formulation naturally captures the flow through each edge.",
      "Works for any tree shape without special cases.",
    ],
    limitations: [
      "Requires exactly `totalCoins === nodeCount` — does not handle excess or deficit totals.",
      "Recursive — may stack overflow for very deep trees.",
      "Does not track the actual movement path, only the total count of moves.",
    ],
  },

  whenToUseIt:
    "Use distribute-coins when the total coins equal the total nodes and you need only the minimum move count. For problems where you need to track the actual redistribution path, maintain a parent pointer during DFS.",
};
