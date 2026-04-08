import type { EducationalContent } from "@/types";

export const findTheDifferenceEducational: EducationalContent = {
  overview:
    "Find the Difference identifies the single extra character that was added to a modified version of the original string, using a hash map frequency count.",
  howItWorks:
    "1. Build a frequency map from the original string, counting each character.\n2. Iterate through the modified string, decrementing counts.\n3. When a character's count drops below zero, that character is the extra one.\n\n" +
    '### Example: `s = "abcd"`, `t = "abcde"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["s = \'abcd\'"]:::input --> B["freq: {a:1, b:1, c:1, d:1}"]\n' +
    '  B --> C["consume t: a→0, b→0, c→0, d→0"]\n' +
    "  C --> D[\"consume 'e': count = -1\"]:::checking\n" +
    "  D --> E[\"return 'e'\"]:::found\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706\n" +
    "  classDef found fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each character in `t` decrements its count from the original map. The first character that drives any count below zero is the added character.",
  timeAndSpaceComplexity:
    "**Time Complexity:** O(n) where n is the length of the strings.\n\n**Space Complexity:** O(1) — at most 26 lowercase letters in the map.",
  bestAndWorstCase:
    "**Best Case:** The extra character is at the start of the modified string — found immediately in the second pass.\n\n**Worst Case:** The extra character is at the end — requires scanning both strings fully.",
  realWorldUses: [
    "Detecting inserted characters in text editing",
    "File diff utilities for single-character changes",
    "Data integrity checks comparing original and modified payloads",
  ],
  strengthsAndLimitations: {
    strengths: [
      "O(n) time with minimal space usage",
      "Works with any character set, not just lowercase letters",
      "Simple two-pass approach that is easy to understand",
    ],
    limitations: [
      "Only finds one extra character — does not handle multiple additions",
      "Assumes the modified string is exactly one character longer",
    ],
  },
  whenToUseIt:
    "Use when you need to find a single added character between two strings. For multiple differences, consider a full diff algorithm instead.",
};
