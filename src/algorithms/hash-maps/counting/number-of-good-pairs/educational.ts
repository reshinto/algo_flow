import type { EducationalContent } from "@/types";

export const numberOfGoodPairsEducational: EducationalContent = {
  overview:
    "Number of Good Pairs counts how many index pairs (i, j) exist where i < j and numbers[i] equals numbers[j], using a hash map to track frequencies.",
  howItWorks:
    "For each element, check how many times it has appeared before (its current count). Each previous occurrence forms a new pair with the current element. Add the current count to the total, then increment the frequency.\n\n" +
    "### Example: `nums = [1, 2, 3, 1, 1, 3]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["[1,2,3,1,1,3]"]:::input --> B["1: freq=0 → pairs+0, freq→1"]\n' +
    '  B --> C["2: freq=0 → pairs+0"]:::checking\n' +
    '  C --> D["3: freq=0 → pairs+0"]:::checking\n' +
    '  D --> E["1: freq=1 → pairs+1, freq→2"]:::checking\n' +
    '  E --> F["1: freq=2 → pairs+2"]:::checking\n' +
    '  F --> G["3: freq=1 → pairs+1 → total=4"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706\n" +
    "  classDef found fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Reading the count *before* incrementing gives exactly the number of prior occurrences, each of which forms a valid pair with the current index.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — single pass.\n\n**Space Complexity:** O(n) — frequency map.",
  bestAndWorstCase:
    "**Best Case:** All elements are distinct — zero pairs, still O(n) scan.\n\n**Worst Case:** All elements are the same — n*(n-1)/2 pairs.",
  realWorldUses: [
    "Counting matching event pairs in logs",
    "Finding duplicate record pairs in databases",
    "Social network mutual connection counting",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) single-pass solution",
      "Avoids O(n²) brute force",
      "Simple mathematical insight: count before incrementing",
    ],
    limitations: ["Only counts exact equality pairs", "Uses extra space for the frequency map"],
  },
  whenToUseIt:
    "Use when you need to count all pairs of equal elements efficiently. The key insight is that when an element appears for the kth time, it forms k-1 new pairs.",
};
