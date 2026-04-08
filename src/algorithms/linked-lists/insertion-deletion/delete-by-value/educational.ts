import type { EducationalContent } from "@/types";

export const deleteByValueEducational: EducationalContent = {
  overview:
    "**Delete by Value** searches a linked list for the first node whose value matches a target, then removes it by rewiring pointers. If the target is not found, the list remains unchanged.\n\nThis algorithm handles a special case: if the target is at the head, the new head becomes the second node.",

  howItWorks:
    "The algorithm operates in three phases:\n\n" +
    "**Phase 1: Special case check**\n" +
    "- If the list is empty, return null (nothing to delete).\n" +
    "- If the head matches the target, return `head.next` (remove head).\n\n" +
    "**Phase 2: Linear search**\n" +
    "- Maintain two pointers: `previous` and `current`.\n" +
    "- Walk forward comparing each `current.value` to the target.\n\n" +
    "**Phase 3: Deletion**\n" +
    "- When the target is found, rewire `previous.next = current.next`.\n" +
    "- This splices the node out of the chain.\n\n" +
    "### Example: Delete 3 from [1 → 2 → 3 → 4 → 5]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Before\n" +
    '    A1["1"] --> A2["2"] --> A3["3"] --> A4["4"] --> A5["5"]\n' +
    "    end\n" +
    "    subgraph After\n" +
    '    B1["1"] --> B2["2"] --> B4["4"] --> B5["5"]\n' +
    "    end\n" +
    "    style A3 fill:#f59e0b,stroke:#d97706\n" +
    "    style B2 fill:#14532d,stroke:#22c55e\n" +
    "    style B4 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Node 3 (amber) is found, then `previous.next` (node 2) is rewired to skip it, linking directly to node 4.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** where n is the list length\n\n" +
    "In the worst case, the target is at the end or missing, requiring a full traversal. Best case is `O(1)` if the target is the head.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two pointer variables (`previous` and `current`) are used, regardless of list size.",

  bestAndWorstCase:
    "**Best case: `O(1)` time** — the target value is at the head of the list. No traversal needed, just return `head.next`.\n\n" +
    "**Worst case: `O(n)` time** — the target is at the end of the list or not present at all. The entire list must be scanned.\n\n" +
    "Average case is `O(n/2)` assuming targets are uniformly distributed.",

  realWorldUses: [
    "**Cached item eviction:** Remove a specific cached item by its key in a linked-list cache.",
    "**Playlist removal:** Remove a specific song by its title from a queue.",
    "**Task cancellation:** Cancel a specific job from a task queue before it executes.",
    "**Member removal:** Remove a member from a linked list of group participants.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple and straightforward implementation.",
      "O(1) extra space — only two pointer variables.",
      "Works well when targets are near the head (fast in practice).",
    ],
    limitations: [
      "O(n) worst-case time if the target is missing or at the tail.",
      "Only deletes the first match — finding and deleting all matches requires a full loop.",
      "No way to validate that deletion succeeded without additional return logic.",
    ],
  },

  whenToUseIt:
    "Use deletion by value when you need to remove occasional items from a linked list. If you frequently delete multiple items matching a condition, consider filtering into a new list. For random access deletions, arrays or hash-backed structures may be faster.",
};
