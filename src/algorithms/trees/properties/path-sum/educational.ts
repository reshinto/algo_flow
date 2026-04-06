import type { EducationalContent } from "@/types";

export const pathSumEducational: EducationalContent = {
  overview:
    "**Path Sum** determines whether any root-to-leaf path in the tree sums to a given target value. " +
    "It only considers complete root-to-leaf paths, not any partial path.",

  howItWorks:
    "The algorithm uses DFS with a running subtraction:\n\n" +
    "1. Subtract the current node value from `targetSum` to get `remaining`.\n" +
    "2. At a leaf node, check if `remaining === 0`.\n" +
    "3. Otherwise, recurse on both children.\n" +
    "4. Return `true` as soon as any path satisfies the condition.\n\n" +
    "Early return prevents unnecessary traversal once the target sum is found.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** worst case (target not found), `O(depth)` best case (found early).\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case** is when the leftmost root-to-leaf path satisfies the target — returns after `O(h)` steps.\n\n" +
    "**Worst case** is when no path satisfies the target — all nodes are visited.",

  realWorldUses: [
    "**Budget allocation:** Does any root-to-leaf combination of expenses equal the budget?",
    "**Authentication chains:** Does a root-to-leaf permission path satisfy a cumulative threshold?",
    "**Game state reachability:** Can any sequence of moves reach a target score?",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Early termination on the first matching path.",
      "Clean recursive implementation with a single parameter change per level.",
    ],
    limitations: [
      "Does not return the actual path — only a boolean. Use all-root-to-leaf-paths for path collection.",
      "Recursion depth limited by tree height.",
    ],
  },

  whenToUseIt:
    "Use path sum to quickly check if any valid path exists. " +
    "For collecting all matching paths, use a path-collection variant instead.",
};
