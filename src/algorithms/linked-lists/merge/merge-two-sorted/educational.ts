import type { EducationalContent } from "@/types";

export const mergeTwoSortedEducational: EducationalContent = {
  overview:
    "**Merge Two Sorted Lists** combines two sorted linked lists into a single sorted list by comparing the heads of both lists and linking the smaller value. It returns a pointer to the merged list's head.\n\nThe algorithm uses two pointers (one for each list) and a tail pointer that builds the merged result by selecting nodes in sorted order.",

  howItWorks:
    "The algorithm maintains three pointers: `currentA`, `currentB`, and `tail`:\n\n" +
    "1. **Initialize** a dummy node (value = -1) and set `tail` to the dummy.\n" +
    "2. **Loop** while both `currentA` and `currentB` are not null:\n" +
    "   - Compare `currentA.value` with `currentB.value`.\n" +
    "   - Link `tail.next` to the smaller node and advance that pointer.\n" +
    "   - Advance `tail` to the newly linked node.\n" +
    "3. **Attach remainder** — link `tail.next` to whichever list has remaining nodes (if any).\n" +
    "4. **Return** `dummy.next` (the head of the merged list).\n\n" +
    "### Example: Merging [1 → 3 → 5] and [2 → 4 → 6]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph List A\n" +
    '    LA1["1"] --> LA3["3"] --> LA5["5"]\n' +
    "    end\n" +
    "    subgraph List B\n" +
    '    LB2["2"] --> LB4["4"] --> LB6["6"]\n' +
    "    end\n" +
    "    subgraph Merged\n" +
    '    M1["1"] --> M2["2"] --> M3["3"] --> M4["4"] --> M5["5"] --> M6["6"]\n' +
    "    end\n" +
    "    style M1 fill:#06b6d4,stroke:#0891b2\n" +
    "    style M3 fill:#06b6d4,stroke:#0891b2\n" +
    "    style M5 fill:#06b6d4,stroke:#0891b2\n" +
    "    style M2 fill:#14532d,stroke:#22c55e\n" +
    "    style M4 fill:#14532d,stroke:#22c55e\n" +
    "    style M6 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Nodes from List A (cyan) and List B (green) are interleaved by comparing heads. The smaller value is linked to `tail` each step, producing a fully sorted merged list.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`** where `n` and `m` are the lengths of the two input lists.\n\n" +
    "Every node from both lists is visited exactly once during the merge process. No revisiting occurs.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only three pointer variables (`currentA`, `currentB`, `tail`) and the dummy node are used. The merge is performed in-place by relinking nodes; no additional data structures are allocated. The output list reuses the input nodes.",

  bestAndWorstCase:
    "**Best case** is when one list is much shorter than the other (e.g., length 1 vs. length 1000) — the algorithm completes in `O(n + 1)` time because the shorter list is exhausted quickly and the remainder is attached in constant time.\n\n" +
    "**Worst case** is when both lists have similar length (e.g., both length 1000) — all `O(n + m)` nodes must be compared and linked, requiring the full merge process.\n\n" +
    "In all cases, the time complexity is strictly `O(n + m)` with no early exits; however, the constant factor varies based on list length differences.",

  realWorldUses: [
    "**Merge Sort on linked lists:** Merge Two Sorted Lists is the core operation in merge-sort implementations for linked lists.",
    "**Database query merging:** Combine two sorted result sets (e.g., from different indexes or shards) into a single sorted output.",
    "**Log file merging:** Merge sorted log streams from multiple sources into a unified sorted timeline.",
    "**Incremental sorting:** Maintain sorted results by incrementally merging new sorted batches with existing sorted data.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — performs merge in-place using only pointers, no extra memory.",
      "Linear time — visits each node exactly once, highly efficient.",
      "Reuses input nodes — output list directly uses input nodes, no copying required.",
      "Simple and elegant — straightforward two-pointer comparison logic.",
    ],
    limitations: [
      "Requires both lists to be sorted — fails if either input is unsorted.",
      "No early exit — must process all nodes; cannot stop before exhausting inputs.",
      "Modifies input structure — output list's structure differs from inputs; relinking is destructive.",
      "Not parallelizable — sequential comparison and linking prevent parallelization.",
    ],
  },

  whenToUseIt:
    "Use Merge Two Sorted Lists when you need to combine two sorted linked lists into a single sorted result. This is essential for merge sort on linked lists and for scenarios where sorted data from multiple sources must be unified. Ensure both input lists are already sorted; if not, sort them first. For lists where the sorted property is guaranteed by invariant (e.g., inserted-in-order), this operation is highly efficient.",
};
