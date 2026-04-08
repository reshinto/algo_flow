import type { EducationalContent } from "@/types";

export const insertAtPositionEducational: EducationalContent = {
  overview:
    "**Insert at Position** adds a new node with a specified value at a given index in a linked list. The algorithm walks to the predecessor node (or inserts at the head if position is 0) and rewires pointers to splice the new node into the chain.\n\nIf the requested position exceeds the list length, the node is inserted as far forward as the list allows.",

  howItWorks:
    "The algorithm handles two cases:\n\n" +
    "**Case 1: Insert at head (position = 0)**\n" +
    "- Create a new node pointing to the current head.\n" +
    "- Return the new node as the new head.\n\n" +
    "**Case 2: Insert after an existing node**\n" +
    "1. **Traverse** — Walk `current` forward while `currentPosition < position - 1`.\n" +
    "2. **Link** — Set `newNode.next = current.next` (preserve the forward chain).\n" +
    "3. **Splice** — Set `current.next = newNode` (insert the new node).\n\n" +
    "### Example: Insert 4 at position 2 in [1 → 3 → 5 → 7]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Before\n" +
    '    A1["1"] --> A3["3"] --> A5["5"] --> A7["7"]\n' +
    "    end\n" +
    "    subgraph After\n" +
    '    B1["1"] --> B3["3"] --> B4["4"] --> B5["5"] --> B7["7"]\n' +
    "    end\n" +
    "    style B4 fill:#06b6d4,stroke:#0891b2\n" +
    "    style B3 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The new node 4 (cyan) is spliced in at position 2. Node 3 (green) is the predecessor — its `next` pointer is rewired to link to the new node.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** where n is the position index\n\n" +
    "In the worst case, inserting at the end requires walking the entire list. On average, the walk stops early at the insertion point.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single pointer variable and the new node are allocated. No auxiliary data structures.",

  bestAndWorstCase:
    "**Best case: `O(1)` time** — inserting at position 0 (the head) requires no traversal, just pointer rewiring.\n\n" +
    "**Worst case: `O(n)` time** — inserting at or beyond the end of a list requires walking all n nodes to find the insertion point.\n\n" +
    "Average case is `O(position)`, so insertions near the head are fast while insertions near the tail are slow.",

  realWorldUses: [
    "**Playlist management:** Insert a song at a specific index in a music queue linked list.",
    "**Task scheduling:** Insert a job at a given priority level in a task scheduler's linked queue.",
    "**Undo/redo history:** Insert a new action at the current position in a command history.",
    "**Doubly-linked list editors:** Document editors use linked structures to insert text at cursor positions.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple pointer manipulation — easy to implement and understand.",
      "O(1) space overhead — only allocates the new node itself.",
      "Works with any position up to list length — graceful handling of out-of-bounds requests.",
    ],
    limitations: [
      "O(n) time for worst-case insertion near the tail — no direct access like arrays.",
      "Requires traversal to the predecessor — cannot jump directly to a position.",
      "Fails silently if position exceeds list length — may insert at the tail instead of raising an error.",
    ],
  },

  whenToUseIt:
    "Use insertion when building or updating a linked list dynamically. If insertions are predominantly at the head or tail, consider a deque (doubly-linked list with head/tail pointers). For frequent insertions at arbitrary positions, an array or balanced tree may be faster.",
};
