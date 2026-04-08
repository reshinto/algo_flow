import type { EducationalContent } from "@/types";

export const findNodeByValueEducational: EducationalContent = {
  overview:
    "**Find Node by Value** searches through a linked list for a node with a specific value and returns it, or null if not found.\n\nThe algorithm uses a single pointer that walks through each node, comparing its value to the target. When a match is found, the node is returned immediately. If the list ends without finding the target, null is returned.",

  howItWorks:
    "The algorithm maintains a single `current` pointer and compares each node's value to the target:\n\n" +
    "1. **Initialize** `current = head`.\n" +
    "2. **Loop** while `current` is not null:\n" +
    "   - **Compare** `current.value` to the target.\n" +
    "   - If match found, **return** the current node immediately.\n" +
    "   - Otherwise, move `current` to the next node.\n" +
    "3. **Return** null if the loop ends without finding a match.\n\n" +
    "### Example: Finding 7 in [4 → 2 → 7 → 1 → 9]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["4"] --> B["2"] --> C["7"] --> D["1"] --> E["9"]\n' +
    "    style A fill:#14532d,stroke:#22c55e\n" +
    "    style B fill:#14532d,stroke:#22c55e\n" +
    "    style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The pointer walks through nodes 4 and 2 (green, visited) before finding node 7 (amber, match). The search terminates immediately — nodes 1 and 9 are never visited.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "In the worst case, the target is at the end of the list or not present, requiring `n` comparisons. In the best case, the target is at the head, requiring only 1 comparison. On average, we expect `n/2` comparisons.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single pointer variable (`current`) is used for traversal. No additional data structures are allocated.",

  bestAndWorstCase:
    "**Best case** is the target at the head — the first comparison matches and the node is returned immediately in `O(1)` time.\n\n" +
    "**Worst case** is the target at the end or not present — all `n` nodes must be checked, requiring `O(n)` time.\n\n" +
    "**Average case** is approximately `O(n/2)` — the target is found somewhere in the middle on average.",

  realWorldUses: [
    "**Hash table collision resolution:** Linear probing in hash tables uses value search to find the next free slot or a specific entry.",
    "**Graph adjacency lists:** Finding a specific edge or neighbor node in graph representations.",
    "**Cache lookups:** Finding a cached item by key in LRU cache implementations using linked lists.",
    "**List filtering and transformation:** Finding nodes matching a predicate before modification or removal.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — uses only a pointer, no extra memory.",
      "Early exit — returns as soon as a match is found.",
      "Simple implementation — straightforward comparison logic.",
    ],
    limitations: [
      "O(n) worst-case time — must visit all nodes if target is missing.",
      "No ordering advantage — even sorted linked lists require linear search.",
      "No caching — repeated searches require full traversals each time.",
    ],
  },

  whenToUseIt:
    "Use Find Node by Value when you need to locate a specific node in an unordered linked list with direct value comparison. For repeated searches on the same list, consider building an index or hash map. If the list is sorted, linear search is still the simplest option (binary search is inefficient on linked lists due to lack of random access).",
};
