import type { EducationalContent } from "@/types";

export const reverseLinkedListEducational: EducationalContent = {
  overview:
    "**Reverse Linked List** rewires every node's `next` pointer to point backward, turning `1 → 2 → 3 → 4 → 5` into `5 → 4 → 3 → 2 → 1`.\n\nThe algorithm uses three pointers — `prev`, `current`, and `next` — that march through the list in a single pass, reversing one edge at a time. No extra memory is needed beyond those three variables.",

  howItWorks:
    "The algorithm maintains three moving pointers and processes each node in three steps:\n\n" +
    "1. **Save** `next = current.next` — preserve the forward link before breaking it.\n" +
    "2. **Reverse** `current.next = prev` — point the current node backward.\n" +
    "3. **Advance** `prev = current`, then `current = next` — move both pointers one step forward.\n\n" +
    "### Example: Reversing [1 → 2 → 3]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Original\n" +
    '    A1["1"] --> A2["2"] --> A3["3"] --> AN["null"]\n' +
    "    end\n" +
    "    subgraph Reversed\n" +
    '    B3["3"] --> B2["2"] --> B1["1"] --> BN["null"]\n' +
    "    end\n" +
    "    style B3 fill:#06b6d4,stroke:#0891b2\n" +
    "    style B2 fill:#14532d,stroke:#22c55e\n" +
    "    style B1 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each edge is reversed one at a time. Node 3 (cyan) becomes the new head. When `current` reaches `null`, `prev` points to the new head.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once. Each visit does constant work (save next, redirect pointer, advance pointers).\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only three pointer variables are used regardless of list length. No auxiliary data structure is allocated.",

  bestAndWorstCase:
    "**Best case** is a single-node list — the loop body never executes, just returns that node immediately.\n\n" +
    "**Worst case** is the same asymptotically — `O(n)` time for a list of `n` nodes, since every node must be visited.\n\n" +
    "There is no input shape that makes the iterative algorithm faster or slower; all cases are `O(n)` time and `O(1)` space.",

  realWorldUses: [
    "**Palindrome check:** Reverse the second half of a linked list and compare it to the first half in `O(n)` time.",
    "**Undo / history stacks:** Browser back-button history and undo buffers are often stored as linked lists that get reversed to restore previous state.",
    "**LRU cache eviction:** Doubly-linked list pointer reversal is used when repositioning the most-recently-used node to the front.",
    "**File system path resolution:** Some path-traversal algorithms reverse a linked sequence of directory nodes to reconstruct an absolute path.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space — no copy of the list is made.",
      "Single pass — visits each node exactly once.",
      "Simple, readable implementation that directly mirrors the pointer manipulation.",
    ],
    limitations: [
      "Mutates the original list in-place — callers must be aware the input is destroyed.",
      "Singly linked lists can only be reversed; doubly linked lists require updating both `next` and `prev` pointers.",
      "Not thread-safe — concurrent reads during reversal will observe a partially reversed list.",
    ],
  },

  whenToUseIt:
    "Use iterative reversal whenever you need an in-place, constant-space reversal of a singly linked list. For recursive reversal (cleaner code but O(n) call-stack space), prefer the recursive variant on short lists. If you need to preserve the original list, copy it first.",
};
