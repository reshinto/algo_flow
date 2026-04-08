import type { EducationalContent } from "@/types";

export const longestSubstringWithoutRepeatingEducational: EducationalContent = {
  overview:
    "Longest Substring Without Repeating Characters finds the length of the longest contiguous substring with all unique characters using a sliding window and hash map.",
  howItWorks:
    "Maintain a window [start, end] and a hash map of character → last seen index. Expand end rightward. When a duplicate is found within the window, move start past the previous occurrence. Track the maximum window size.\n\n" +
    '### Example: `s = "abcab"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    "  A[\"s = 'abcab'\\nmap={} start=0\"]:::input --> B[\"end=0 'a'\\nmap={a:0} len=1\"]\n" +
    "  B --> C[\"end=1 'b'\\nmap={a:0,b:1} len=2\"]\n" +
    "  C --> D[\"end=2 'c'\\nmap={a:0,b:1,c:2} len=3\"]\n" +
    "  D --> E[\"end=3 'a' dup!\\nstart→1 map={a:3,...}\"]:::checking\n" +
    "  E --> F[\"end=4 'b' dup!\\nstart→2 map={b:4,...}\"]:::checking\n" +
    "  F --> G[\"maxLen = 3 'abc'\"]:::found\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2,color:#fff\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706,color:#000\n" +
    "  classDef found fill:#14532d,stroke:#22c55e,color:#fff\n" +
    "```\n\n" +
    "When a duplicate is detected, `start` jumps past the earlier occurrence so the window always contains unique characters.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) — each character is visited at most twice.\n\n**Space Complexity:** O(min(n, k)) where k is the alphabet size.",
  bestAndWorstCase:
    "**Best Case:** All characters are unique — window spans the entire string.\n\n**Worst Case:** All characters are the same — window never grows beyond 1.",
  realWorldUses: [
    "Password strength analysis",
    "DNA sequence unique segment detection",
    "Text editor autocomplete substring matching",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) single-pass with O(1) jumps for window start",
      "Works with any character set",
      "Elegant combination of sliding window and hash map",
    ],
    limitations: [
      "Only finds the length, not the actual substring (though easily extended)",
      "Requires extra space for the hash map",
    ],
  },
  whenToUseIt:
    "Use when finding the longest unique-character substring. The sliding window + hash map approach is the standard O(n) solution for this classic problem.",
};
