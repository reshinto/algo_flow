import type { EducationalContent } from "@/types";

export const missingNumberEducational: EducationalContent = {
  overview:
    "Missing Number finds the one number missing from the range [0, n] in an array of n distinct numbers, using a hash set for O(1) lookups.",
  howItWorks:
    "Insert all array elements into a hash set. Then check each number from 0 to n — the first number not in the set is the missing one.\n\n" +
    "### Example: `nums = [3, 0, 1]` (n = 3, missing = 2)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["nums=[3,0,1]"]:::input --> B["set={3,0,1}"]\n' +
    '  B --> C["check 0: in set ✓"]:::checking\n' +
    '  C --> D["check 1: in set ✓"]:::checking\n' +
    '  D --> E["check 2: NOT in set ✗"]:::checking\n' +
    '  E --> F["missing: 2"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2,color:#fff\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706,color:#000\n" +
    "  classDef found fill:#14532d,stroke:#22c55e,color:#fff\n" +
    "```\n\n" +
    "The set lookup at each position in `[0..n]` pinpoints the gap in O(1) per check.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — two passes.\n\n**Space Complexity:** O(n) — hash set.",
  bestAndWorstCase:
    "**Best Case:** Missing number is 0 — found immediately in the checking phase.\n\n**Worst Case:** Missing number is n — requires checking all values.",
  realWorldUses: [
    "Detecting missing sequence IDs in databases",
    "Verifying complete data transmission",
    "Finding gaps in numbered collections",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Clear two-phase approach",
      "O(n) time with hash set",
      "Easy to understand and implement",
    ],
    limitations: [
      "O(n) space — XOR or math approaches use O(1) space",
      "Only works for contiguous ranges starting at 0",
    ],
  },
  whenToUseIt:
    "Use when you need to find a missing number in a contiguous range. While XOR or sum approaches use O(1) space, the hash set approach clearly demonstrates hash-based lookup.",
};
