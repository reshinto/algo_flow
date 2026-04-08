import type { EducationalContent } from "@/types";

export const intersectionOfTwoArraysEducational: EducationalContent = {
  overview:
    "Intersection of Two Arrays finds the common elements between two arrays using a hash set, returning each common element exactly once.",
  howItWorks:
    "Build a set from the first array. Iterate the second array, checking membership. When found, add to result and remove from set to avoid duplicates.\n\n" +
    "### Example: `nums1 = [1, 2, 2, 1]`, `nums2 = [2, 2]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["nums1=[1,2,2,1]"]:::input --> B["set={1,2}"]\n' +
    '  B --> C["nums2=[2,2]\\ncheck 2: in set ✓"]:::checking\n' +
    '  C --> D["result=[2]\\nremove 2 from set"]:::found\n' +
    '  D --> E["check 2: not in set ✗"]\n' +
    '  E --> F["intersection: [2]"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2,color:#fff\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706,color:#000\n" +
    "  classDef found fill:#14532d,stroke:#22c55e,color:#fff\n" +
    "```\n\n" +
    "Removing the element from the set after the first match ensures each common value appears only once in the result.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n + m) where n and m are array sizes.\n\n**Space Complexity:** O(n) for the hash set.",
  bestAndWorstCase:
    "**Best Case:** No intersection — quick membership checks return false.\n\n**Worst Case:** Complete overlap — all elements match.",
  realWorldUses: [
    "Finding common friends in social networks",
    "Database join operations",
    "Set intersection in data analysis",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time vs O(n*m) brute force",
      "Handles duplicates correctly",
      "Simple two-phase approach",
    ],
    limitations: ["Uses O(n) extra space", "Result order depends on second array order"],
  },
  whenToUseIt:
    "Use when finding unique common elements between two collections. The hash set approach is the standard O(n+m) solution.",
};
