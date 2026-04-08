import type { EducationalContent } from "@/types";

export const removeDuplicatesSortedEducational: EducationalContent = {
  overview:
    "**Remove Duplicates from Sorted List** walks through a sorted linked list and removes consecutive nodes that have duplicate values. Since the input is sorted, duplicates appear adjacent to each other, allowing single-pass removal by skipping over groups of identical values.\n\nThis algorithm is more efficient than a general deduplication because it assumes the input is already sorted.",

  howItWorks:
    "The algorithm uses a single pointer `current` to walk the list:\n\n" +
    "1. **Initialize** `current = head`.\n" +
    "2. **Loop** while `current` and `current.next` are not null:\n" +
    "   - **Compare** `current.value` with `current.next.value`.\n" +
    "   - If equal, skip the next node: `current.next = current.next.next`.\n" +
    "   - If not equal, advance: `current = current.next`.\n" +
    "3. **Return** the head of the deduplicated list.\n\n" +
    "### Example: Deduplicate [1 → 1 → 2 → 3 → 3 → 3 → 4]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Before\n" +
    '    A1["1"] --> A1b["1"] --> A2["2"] --> A3["3"] --> A3b["3"] --> A3c["3"] --> A4["4"]\n' +
    "    end\n" +
    "    subgraph After\n" +
    '    B1["1"] --> B2["2"] --> B3["3"] --> B4["4"]\n' +
    "    end\n" +
    "    style A1b fill:#f59e0b,stroke:#d97706\n" +
    "    style A3b fill:#f59e0b,stroke:#d97706\n" +
    "    style A3c fill:#f59e0b,stroke:#d97706\n" +
    "    style B1 fill:#14532d,stroke:#22c55e\n" +
    "    style B2 fill:#14532d,stroke:#22c55e\n" +
    "    style B3 fill:#14532d,stroke:#22c55e\n" +
    "    style B4 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Duplicate nodes (amber) are skipped by rewiring `current.next` to the next distinct value. The result (green) contains only unique values.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** where n is the number of nodes\n\n" +
    "The algorithm traverses the list exactly once, examining each node and its successor once. Multiple consecutive duplicates are handled in constant time per group via pointer rewiring.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single pointer variable (`current`) is used. No additional data structures are allocated.",

  bestAndWorstCase:
    "**Best case: `O(n)` time** — even if there are no duplicates, the entire list must be traversed to confirm uniqueness. The algorithm makes a single pass regardless of duplicate distribution.\n\n" +
    "**Worst case: `O(n)` time** — if the entire list contains the same repeated value, the algorithm still makes one pass, skipping all duplicates in constant time per group.\n\n" +
    "Unlike searching or deletion, there is no early-exit scenario; all nodes must be visited.",

  realWorldUses: [
    "**Data deduplication:** Remove redundant log entries from a sorted event stream.",
    "**Sensor data filtering:** Remove consecutive duplicate readings from a time-series sensor data linked list.",
    "**Sorted dataset cleanup:** Deduplicate a sorted database query result before displaying to users.",
    "**Frequency counting:** Walk a deduplicated sorted list to count occurrences of unique values.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — uses only a pointer, no extra memory.",
      "O(n) time with single pass — efficient for already-sorted data.",
      "In-place modification — does not allocate a new list.",
      "Simple and straightforward implementation.",
    ],
    limitations: [
      "Assumes sorted input — fails to remove all duplicates in unsorted lists.",
      "Only removes consecutive duplicates — non-adjacent duplicates are ignored.",
      "Cannot remove the head if it is a duplicate — special handling may be needed.",
      "Does not report which values were removed or how many.",
    ],
  },

  whenToUseIt:
    "Use Remove Duplicates when you have a sorted linked list and need to deduplicate it in-place. If the list is unsorted, sort it first or use a hash-based approach. For streams of data arriving in order, this algorithm is ideal. If you need to preserve all original nodes and produce a separate deduplicated copy, consider collecting into a new list instead.",
};
