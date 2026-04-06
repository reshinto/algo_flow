import type { EducationalContent } from "@/types";

export const serializeDeserializeTreeEducational: EducationalContent = {
  overview:
    "**Serialize and Deserialize a Binary Tree** converts a binary tree into a compact string representation (serialization) " +
    "and reconstructs the exact same tree from that string (deserialization). " +
    "This BFS-based approach uses level-order traversal, encoding `null` pointers explicitly so the structure is fully recoverable.",

  howItWorks:
    "**Serialization** (BFS):\n\n" +
    "1. Push the root onto a queue.\n" +
    "2. Dequeue each node: if non-null, record its value and enqueue its left and right children (even if null).\n" +
    '3. If null, record the string `"null"`.\n' +
    "4. Join all recorded values with commas to form the serialized string.\n\n" +
    "**Deserialization**:\n\n" +
    "1. Split the string on commas.\n" +
    "2. Create the root from the first value, push it on a queue.\n" +
    "3. For each dequeued node, consume the next two values from the list as left and right children, " +
    "creating nodes for non-null values and pushing them on the queue.\n\n" +
    "### Example\n\n" +
    "```\n" +
    'Serialize: [4, 2, 6, 1, 3, 5, 7] → "4,2,6,1,3,5,7"\n' +
    "(null children omitted at leaf level for brevity)\n" +
    'Deserialize: "4,2,6,1,3,5,7" → balanced 7-node BST\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)` for both serialization and deserialization**\n\n" +
    "Every node is visited exactly once during BFS. Splitting and joining the string is also `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The BFS queue holds at most `O(n)` entries for a complete tree (one full level). " +
    "The serialized string itself is `O(n)` characters.",

  bestAndWorstCase:
    "**Best case** is a compact, complete binary tree — no trailing null tokens needed at the leaf level, minimizing string length.\n\n" +
    "**Worst case** is a sparse tree or a skewed tree where every level has only one real node — " +
    "the serialized string can contain up to `O(2^h)` null tokens for a tree of height `h`.",

  realWorldUses: [
    "**Network transmission:** Send an entire tree structure across a network as a flat string with lossless reconstruction.",
    "**Persistent storage:** Store trees in databases or files that do not support hierarchical data natively.",
    "**Deep copying:** Serialize then deserialize as a simple way to deep-clone a tree.",
    "**Distributed systems:** Pass tree configurations between microservices as portable serialized strings.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Lossless round-trip — serialize → deserialize always reconstructs the original tree exactly.",
      "Handles arbitrary binary trees including unbalanced and sparse trees.",
      "BFS order makes the serialized string human-readable and easy to debug.",
    ],
    limitations: [
      "Sparse trees produce long strings with many null tokens, increasing storage cost.",
      "Not space-optimal compared to preorder-based serialization that omits null tokens.",
      "Integer overflow possible for very large node values without size guards.",
    ],
  },

  whenToUseIt:
    "Use BFS serialization when you need a self-contained, portable representation of any binary tree. " +
    "For space-constrained scenarios with complete or nearly complete trees, consider preorder serialization with explicit null markers. " +
    "For trees with duplicate values, include node IDs in the serialized format.",
};
