import type { EducationalContent } from "@/types";

export const linkedListLengthEducational: EducationalContent = {
  overview:
    "**Linked List Length** counts the total number of nodes in a linked list by walking from the head to the tail. It returns the count of nodes.\n\nThe algorithm uses a single pointer that marches through each node, incrementing a counter, until it reaches the null terminator at the end of the list.",

  howItWorks:
    "The algorithm maintains a single `current` pointer and a `count` variable:\n\n" +
    "1. **Initialize** `current = head` and `count = 0`.\n" +
    "2. **Loop** while `current` is not null:\n" +
    "   - Increment `count`.\n" +
    "   - Move `current` to the next node.\n" +
    "3. **Return** `count` when `current` becomes null.\n\n" +
    "### Example: Counting [1 → 2 → 3]\n\n" +
    "```\n" +
    "Start:       current=1, count=0\n" +
    "Step 1:      current=2, count=1\n" +
    "Step 2:      current=3, count=2\n" +
    "Step 3:      current=null, count=3\n" +
    "Result:      length = 3\n" +
    "```\n\n" +
    "When `current` reaches `null`, the loop exits and `count` holds the final answer.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node in the list must be visited exactly once to determine the count. With `n` nodes, this requires `n` iterations.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single pointer variable (`current`) and a counter (`count`) are used. No additional data structures are allocated regardless of list size.",

  bestAndWorstCase:
    "**Best case** is an empty list — `current` is null immediately, the loop never executes, and the count is `0`.\n\n" +
    "**Worst case** is a list of `n` nodes — every node must be visited, requiring `n` iterations and `O(n)` time.\n\n" +
    "Unlike searching, there is no early exit; all cases require visiting every node to guarantee an accurate count.",

  realWorldUses: [
    "**Array-like indexing:** Convert a linked list to an array by first counting nodes, then allocating array memory.",
    "**Validation and debugging:** Verify the integrity of a linked list structure by confirming node count matches expected value.",
    "**Pagination and batching:** Divide a linked list into chunks of fixed size for batch processing or display.",
    "**Memory allocation:** Estimate memory usage before copying or serializing a linked list.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — uses only a pointer and counter, no extra memory.",
      "Simple and straightforward — easy to understand and implement.",
      "Deterministic — always visits every node exactly once.",
    ],
    limitations: [
      "O(n) time cost — for very long lists, counting can be slow.",
      "Not cached — counting the same list twice requires two full traversals.",
      "Single traversal only — cannot stop early; must visit the entire list.",
    ],
  },

  whenToUseIt:
    "Use Linked List Length when you need the total count of nodes in a linked list and have access to the head node. For large lists where counts are needed frequently, consider caching the length or storing it as a property of the list structure. If you need both the length and to perform other operations (search, filter, map), consider traversing once and collecting both results.",
};
