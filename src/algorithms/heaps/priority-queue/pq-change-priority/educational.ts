import type { EducationalContent } from "@/types";

export const pqChangePriorityEducational: EducationalContent = {
  overview:
    "**PQ Change Priority** updates the priority (value) of an element at a specific index in a min-heap priority queue and then restores heap order.\n\nThis operation is critical in algorithms like Dijkstra's shortest path, where a node's tentative distance can improve and its priority must be updated. The key insight: if the value **decreases** (priority improves), sift **up**; if the value **increases** (priority worsens), sift **down**.",

  howItWorks:
    "Change Priority runs in three steps:\n\n" +
    "1. **Update** — overwrite the value at `targetIndex` with `newValue`.\n" +
    "2. **Determine direction** — compare `newValue` with the old value:\n" +
    "   - `newValue < oldValue`: priority increased → the element may now be smaller than its parent → **sift up**.\n" +
    "   - `newValue > oldValue`: priority decreased → the element may now be larger than its children → **sift down**.\n" +
    "   - `newValue === oldValue`: no heap violation possible → done immediately.\n" +
    "3. **Restore heap** — run the appropriate sift operation from `targetIndex` until the heap property holds.\n\n" +
    "### Example: Change index 4 (value 15) to 1 in [2, 5, 3, 10, 15, 8, 7]\n\n" +
    "```\n" +
    "Before:         2\n" +
    "               / \\\n" +
    "              5   3\n" +
    "             / \\ / \\\n" +
    "           10  15 8  7\n" +
    "                ↑ targetIndex=4, value=15\n\n" +
    "Update:         2\n" +
    "               / \\\n" +
    "              5   3\n" +
    "             / \\ / \\\n" +
    "           10   1 8  7    ← value updated to 1\n\n" +
    "1 < oldValue 15 → sift up: 1 < parent 5 → swap.\n" +
    "                2\n" +
    "               / \\\n" +
    "              1   3\n" +
    "             / \\ / \\\n" +
    "           10   5 8  7\n\n" +
    "1 < parent 2 → swap.\n\n" +
    "Result:         1\n" +
    "               / \\\n" +
    "              2   3\n" +
    "             / \\ / \\\n" +
    "           10   5 8  7\n" +
    "```\n\n" +
    "### Diagram: After changing index 4 from 15 to 1 (sift-up)\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n1((1)) --> n2((2))\n" +
    "    n1 --> n3((3))\n" +
    "    n2 --> n10((10))\n" +
    "    n2 --> n5((5))\n" +
    "    n3 --> n8((8))\n" +
    "    n3 --> n7((7))\n" +
    "    style n1 fill:#f59e0b,stroke:#d97706\n" +
    "    style n2 fill:#14532d,stroke:#22c55e\n" +
    "    style n3 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n10 fill:#14532d,stroke:#22c55e\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "    style n8 fill:#14532d,stroke:#22c55e\n" +
    "    style n7 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Node 1 (amber) was previously 15 at index 4 — it sifted up two levels past 5 and 2 to become the new root. The old root 2 (now at cyan) was displaced downward as part of the upward sift chain.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "The update itself is `O(1)`. The subsequent sift-up or sift-down traverses at most one path from the target node to the root (upward) or a leaf (downward). Both paths have maximum length `⌊log₂ n⌋`, so the total is `O(log n)`.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only index variables and one temporary value are used. No extra data structure is needed.",

  bestAndWorstCase:
    "**Best case — `O(1)`:** The new value satisfies the heap property immediately — it is ≥ its parent (after decrease) or ≤ both children (after increase). No swaps are needed.\n\n" +
    "**Worst case — `O(log n)`:** The new value must travel the full height of the tree. For a decrease to a new global minimum, the element sifts all the way up to the root. For an increase to the maximum, it sifts all the way down to a leaf.",

  realWorldUses: [
    "**Dijkstra's shortest path:** When a shorter route to a node is discovered, its distance estimate is updated (decreased), and the node's position in the priority queue is corrected via sift-up.",
    "**A* pathfinding:** If a better path to an open-list node is found, its f-score decreases and it moves up in priority.",
    "**Event-driven simulations:** Rescheduling an event to an earlier or later time changes its priority in the simulation's event queue.",
    "**Network QoS management:** Adjusting a packet's priority in mid-flight to reflect changed urgency or service-level agreements.",
    "**Operating system schedulers:** Boosting or demoting a process's priority dynamically based on user interaction or starvation prevention.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) — significantly faster than delete + re-insert (which requires finding the element first).",
      "Bidirectional — handles both priority increases (sift-up) and decreases (sift-down) in a single operation.",
      "In-place — no auxiliary allocation; only index variables are needed during the sift.",
    ],
    limitations: [
      "Requires knowing the element's index — the heap does not support efficient search by value. A separate index map (e.g., a hash map from value to heap index) is needed for look-up-by-value workflows.",
      "Index map must be maintained — when elements move during sift operations, the index map must be updated too, adding constant overhead per swap.",
      "Not atomic in distributed systems — change priority across replicated or concurrent queues requires synchronization.",
    ],
  },

  whenToUseIt:
    "Use PQ Change Priority when you have a live priority queue where element priorities can change after insertion — the canonical example is Dijkstra's algorithm with relaxation. Always pair with an index map (value → heap index) to locate elements efficiently. If priorities never change after insertion, prefer the simpler PQ Enqueue / PQ Dequeue pair. If you need to change priority without knowing the index, fall back to delete + re-insert at O(log n) cost using a find operation.",
};
