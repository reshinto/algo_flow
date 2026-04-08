import type { EducationalContent } from "@/types";

export const findAllDuplicatesEducational: EducationalContent = {
  overview:
    "Find All Duplicates identifies every element that appears exactly twice in an array using a hash set for O(1) membership checks.",
  howItWorks:
    "Iterate through the array. For each element, check if it is already in the set. If yes, add it to the duplicates list. If no, insert it into the set.\n\n" +
    "### Example: `nums = [4, 3, 2, 7, 8, 2, 3, 1]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["nums=[4,3,2,7,8,2,3,1]\\nseen={}"]:::input --> B["4,3,2,7,8\\nnot in set → insert"]\n' +
    '  B --> C["2: already in set!"]:::checking\n' +
    '  C --> D["result=[2]"]:::found\n' +
    '  D --> E["3: already in set!"]:::checking\n' +
    '  E --> F["result=[2,3]"]:::found\n' +
    '  F --> G["1: not in set → insert"]\n' +
    '  G --> H["duplicates: [2, 3]"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2,color:#fff\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706,color:#000\n" +
    "  classDef found fill:#14532d,stroke:#22c55e,color:#fff\n" +
    "```\n\n" +
    'The set acts as a "seen" registry — a second encounter is the duplicate signal.',
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — single pass.\n\n**Space Complexity:** O(n) — hash set stores up to n elements.",
  bestAndWorstCase:
    "**Best Case:** No duplicates — every element is inserted once.\n\n**Worst Case:** Every element appears twice — maximum result size.",
  realWorldUses: [
    "Data deduplication audits",
    "Finding duplicate records in databases",
    "Detecting repeated events in log streams",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) time with simple logic",
      "Collects all duplicates, not just the first",
      "Works with any comparable data type",
    ],
    limitations: [
      "Uses O(n) extra space",
      "Does not distinguish between elements appearing 2 vs 3+ times",
    ],
  },
  whenToUseIt:
    "Use when you need to find all duplicate elements in an unsorted array. The hash set approach is the standard O(n) solution.",
};
