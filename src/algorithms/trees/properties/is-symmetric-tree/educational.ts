import type { EducationalContent } from "@/types";

export const isSymmetricTreeEducational: EducationalContent = {
  overview:
    "**Is Symmetric Tree** checks whether a binary tree is a mirror image of itself around its center. " +
    "A symmetric tree has matching node values when read from the outside inward on both sides.",

  howItWorks:
    "A helper `isMirror(left, right)` recursively checks pairs of nodes:\n\n" +
    "1. **Both null** — symmetric by definition, return `true`.\n" +
    "2. **One null** — asymmetric, return `false`.\n" +
    "3. **Values differ** — return `false`.\n" +
    "4. **Recurse:** outer pair `(left.left, right.right)` AND inner pair `(left.right, right.left)` must both be mirrors.\n\n" +
    "Start by calling `isMirror(root.left, root.right)`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::root --> B((2)):::visited\n" +
    "  A --> C((2)):::visited\n" +
    "  B --> D((3)):::current\n" +
    "  B --> E((4)):::current\n" +
    "  C --> F((4)):::current\n" +
    "  C --> G((3)):::current\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "`isMirror(2, 2)` → values match. Recurse outer `isMirror(3, 3)` → match. Recurse inner `isMirror(4, 4)` → match. All pairs mirror correctly — returns `true`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node pair is compared once.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case** is when the root's children have different values — returns `false` after checking just two nodes.\n\n" +
    "**Worst case** is a symmetric tree — all `n` nodes must be compared.",

  realWorldUses: [
    "**Palindrome structures:** Symmetric trees model palindrome-like data arrangements.",
    "**UI layout verification:** Checking that a hierarchical layout is symmetric around a center axis.",
    "**Molecule symmetry:** Chemical graph symmetry checking in computational chemistry.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Elegant pair-based recursion that directly models the definition.",
      "Short-circuits early on the first asymmetric pair.",
    ],
    limitations: [
      "Recursive version risks stack overflow on very deep trees.",
      "Does not tell you where the asymmetry is, only whether it exists.",
    ],
  },

  whenToUseIt:
    "Use when checking if a tree is a mirror of itself. For iterative symmetry checking without recursion risk, " +
    "use the queue-based variant.",
};
