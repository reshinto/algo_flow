import type { EducationalContent } from "@/types";

export const happyNumberEducational: EducationalContent = {
  overview:
    "**Happy Number** determines whether repeatedly replacing a number with the sum of the squares of its digits eventually reaches 1. If so, the number is *happy*. If the process falls into an infinite cycle, the number is *unhappy*.\n\nA **hash set** tracks every sum seen so far — the moment a repeated sum appears, a cycle is confirmed and the algorithm terminates early.",

  howItWorks:
    "The algorithm iterates a single loop:\n\n" +
    "1. Add the current number to the **seen** set.\n" +
    "2. Compute `digitSquareSum` — the sum of the squares of each decimal digit.\n" +
    "3. If the new sum is `1`, the number is **happy** — return `true`.\n" +
    "4. If the new sum is already in the **seen** set, a cycle is detected — return `false`.\n\n" +
    "### Example: `19`\n\n" +
    "```\n" +
    "19  → 1² + 9²  = 82\n" +
    "82  → 8² + 2²  = 68\n" +
    "68  → 6² + 8²  = 100\n" +
    "100 → 1² + 0² + 0² = 1  ← happy!\n" +
    "```\n\n" +
    "### Example: `4` (unhappy)\n\n" +
    "```\n" +
    "4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4  ← cycle detected\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["n = 19"]:::input --> B["1²+9²=82\\nseen={19}"]\n' +
    '  B --> C["8²+2²=68\\nseen={19,82}"]:::checking\n' +
    '  C --> D["6²+8²=100\\nseen={19,82,68}"]:::checking\n' +
    '  D --> E["1²+0²+0²=1\\nseen={...100}"]:::checking\n' +
    '  E --> F["result = 1 → happy!"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2,color:#fff\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706,color:#000\n" +
    "  classDef found fill:#14532d,stroke:#22c55e,color:#fff\n" +
    "```\n\n" +
    "Each node is added to the `seen` set before computing the next sum — reaching `1` confirms happiness before any cycle can form.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`** per iteration (digit extraction), with a bounded number of iterations before reaching 1 or cycling.\n\n" +
    "The cycle for unhappy numbers always passes through one of a known finite set of values, so the total number of steps is bounded by a constant for any input.\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "The seen set stores at most a logarithmically bounded number of intermediate sums before a cycle or termination.",

  bestAndWorstCase:
    "**Best case** — the number is `1` itself or reaches `1` in very few steps (e.g., `10 → 1`). Minimal iterations, minimal set size.\n\n" +
    "**Worst case** — unhappy numbers cycle through up to ~20 unique values before revisiting one. The set never grows large regardless of the magnitude of the input.",

  realWorldUses: [
    "**Cryptography:** Detecting cycles in pseudorandom number generators or hash chains to prevent infinite loops.",
    "**Number theory toolkits:** Libraries for recreational mathematics or competitive programming that classify numbers by digital root properties.",
    "**Educational tools:** Teaching cycle detection via hash sets as a simpler alternative to Floyd's tortoise-and-hare algorithm.",
    "**Validation rules:** Verifying numeric patterns in checksums or custom numeric encoding schemes.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Terminates quickly for both happy and unhappy numbers — cycles are short.",
      "Simple implementation with a single loop and a set.",
      "Generalises easily to other digit-transformation problems with cycle detection.",
    ],
    limitations: [
      "Uses extra space for the seen set — Floyd's cycle detection eliminates this at the cost of two pointers.",
      "Only meaningful for positive integers; behaviour is undefined for zero or negative inputs.",
      "Digit-square-sum is decimal-specific; the approach does not generalise to other bases without modification.",
    ],
  },

  whenToUseIt:
    "Use the hash-set approach when you need a clear, readable cycle-detection solution and memory is not a bottleneck. For strict `O(1)` space, use Floyd's tortoise-and-hare algorithm instead. This pattern applies to any problem where a deterministic function on a finite domain may produce cycles.",
};
