import type { EducationalContent } from "@/types";

export const deleteLeavesWithValueEducational: EducationalContent = {
  overview:
    "**Delete Leaves With Value** removes all leaf nodes from a binary tree whose value equals a given target. The process is repeated: after leaves are deleted, their former parents may become leaves and also need to be checked.\n\nPost-order traversal naturally handles this by processing children before parents, ensuring that a node is only evaluated after its subtrees have been cleaned up.",

  howItWorks:
    "The recursive post-order algorithm:\n\n" +
    "1. **Base case** — if the node is null, return null.\n" +
    "2. **Recurse left** — recursively process the left subtree, which may prune some leaves.\n" +
    "3. **Recurse right** — recursively process the right subtree.\n" +
    "4. **Check deletion** — if the current node is now a leaf (both children are null) and its value equals `targetValue`, return null to delete it.\n" +
    "5. **Keep** — otherwise return the current node.\n\n" +
    "Post-order ensures that any internal node that becomes a leaf after its children are pruned is also deleted in the same pass.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The recursive call stack depth equals the height of the tree.",

  bestAndWorstCase:
    "**Best case** — no target leaves exist: the algorithm still traverses all nodes but deletes nothing — `O(n)` time.\n\n" +
    "**Worst case** — all nodes have the target value: the entire tree is deleted in a single post-order pass — `O(n)` time.",

  realWorldUses: [
    "**Dead code elimination** — Remove empty leaf nodes from ASTs where value indicates no-ops.",
    "**File system cleanup** — Delete empty directories (leaves) that match a pattern, propagating upward.",
    "**Game tree pruning** — Remove terminal states with a specific outcome from game trees.",
    "**Data pipeline filtering** — Prune leaf-level entries that match a discard condition from decision trees.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-pass post-order traversal handles cascading deletions automatically.",
      "Simple and elegant — closely mirrors the recursive definition of the operation.",
      "Does not require explicit tracking of parent nodes.",
    ],
    limitations: [
      "Recursive — may stack overflow for very deep trees.",
      "Modifies the original tree structure — clone if the original must be preserved.",
      "Only removes leaves with the exact target value; does not handle partial matches.",
    ],
  },

  whenToUseIt:
    "Use delete-leaves-with-value whenever you need to prune leaf nodes that match a condition, including cascading cases where internal nodes become leaves after their children are pruned. The post-order recursion handles all cascades automatically in a single traversal.",
};
