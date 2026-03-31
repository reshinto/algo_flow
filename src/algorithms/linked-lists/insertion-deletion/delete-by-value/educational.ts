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
    "```\n" +
    "Initial:  1 → 2 → 3 → 4 → 5\n" +
    "Step 1:   current at 1, previous = null\n" +
    "Step 2:   current at 2, previous = 1\n" +
    "Step 3:   current at 3, found target\n" +
    "Step 4:   previous.next = 3.next (2 → 4)\n" +
    "Result:   1 → 2 → 4 → 5\n" +
    "```",

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
