import type { EducationalContent } from "@/types";

export const contiguousArrayEducational: EducationalContent = {
  overview:
    "Contiguous Array finds the longest subarray with an equal number of 0s and 1s by converting the problem into a prefix sum lookup using a hash map.",
  howItWorks:
    "Convert 0s to -1. Maintain a running sum. If the same running sum appears at two different indices, the subarray between them has equal 0s and 1s. Store the first occurrence of each sum in a hash map, and track the maximum length found.\n\n" +
    "### Example: `[0, 1, 0, 1]` → longest balanced subarray = 4\n\n" +
    "```\n" +
    "idx  val  converted  runSum  map               action\n" +
    " —    —       —        0    {0: -1}           seed\n" +
    " 0    0      -1       -1    {0:-1, -1:0}      insert\n" +
    " 1    1       1        0    {0:-1, -1:0}      sum=0 seen at -1 → len=1-(-1)=2\n" +
    " 2    0      -1       -1    {0:-1, -1:0}      sum=-1 seen at 0 → len=2-0=2\n" +
    " 3    1       1        0    {0:-1, -1:0}      sum=0 seen at -1 → len=3-(-1)=4 ✓\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["seed: map={0:-1}, runSum=0"] --> B["idx 0: 0→-1, runSum=-1"]\n' +
    '  B -->|new sum| C["map={0:-1, -1:0}"]\n' +
    '  C --> D["idx 1: 1→+1, runSum=0"]\n' +
    '  D -->|sum=0 seen at idx -1| E["len=1-(-1)=2"]\n' +
    '  E --> F["idx 3: runSum=0 again"]\n' +
    '  F -->|sum=0 seen at idx -1| G["len=3-(-1)=4 ✓"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The map records the earliest index at which each running sum was seen — when a sum repeats, the subarray between those two indices is balanced.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — single pass.\n\n**Space Complexity:** O(n) — prefix sum map.",
  bestAndWorstCase:
    "**Best Case:** The entire array is balanced — found when sum returns to 0.\n\n**Worst Case:** All elements are the same — no balanced subarray exists.",
  realWorldUses: [
    "Balanced signal analysis in digital communications",
    "Finding equal distribution windows in binary data streams",
    "Load balancing period detection",
  ],
  strengthsAndLimitations: {
    strengths: [
      "Elegant reduction to prefix sum problem",
      "O(n) time using hash map",
      "Handles edge cases naturally with the (0, -1) seed",
    ],
    limitations: ["Only works for binary arrays (0s and 1s)", "Requires O(n) extra space"],
  },
  whenToUseIt:
    "Use when finding the longest balanced binary subarray. The prefix sum + hash map technique is the standard O(n) approach.",
};
