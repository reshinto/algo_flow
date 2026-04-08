import type { EducationalContent } from "@/types";

export const ransomNoteEducational: EducationalContent = {
  overview:
    "**Ransom Note** checks whether a ransom note string can be constructed entirely from the characters available in a magazine string. A hash map counts available magazine characters; each ransom note character decrements that count — if any count goes negative, the magazine lacks a required character.",

  howItWorks:
    "The algorithm runs two sequential passes:\n\n" +
    "**Pass 1 — Build availability map from magazine:**\n" +
    "Iterate every character in the magazine and increment its count in a hash map.\n\n" +
    "**Pass 2 — Consume counts with ransom note:**\n" +
    "For each character in the ransom note, decrement its count. If the count drops below zero, the magazine cannot supply that character — return `false`.\n\n" +
    '### Example: `ransomNote = "aa"`, `magazine = "aab"`\n\n' +
    "```\n" +
    "Pass 1 — magazine counts: { a:2, b:1 }\n" +
    "Pass 2 — consume 'a': count → 1\n" +
    "         consume 'a': count → 0\n" +
    "All counts ≥ 0 → return true\n" +
    "```\n\n" +
    "The magazine is processed first so its supply is known before any demand is checked.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["magazine = \'aab\'"]:::input --> B["Pass 1: {a:2, b:1}"]\n' +
    "  B --> C[\"consume 'a': a→1\"]:::checking\n" +
    "  C --> D[\"consume 'a': a→0\"]:::checking\n" +
    '  D --> E["all counts ≥ 0"]:::found\n' +
    '  E --> F["return true"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706\n" +
    "  classDef found fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "If any decrement drives a count below zero, the magazine lacks that character and `false` is returned immediately — no further scanning needed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m + n)`**\n\n" +
    "One pass over the magazine (`m` characters) and one pass over the ransom note (`n` characters). Hash map operations are `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "For lowercase English letters, the map holds at most 26 entries — effectively constant space.",

  bestAndWorstCase:
    "**Best case** — the first ransom note character is not in the magazine: the second pass terminates after one decrement in `O(1)` scanning work (after the full first pass).\n\n" +
    "**Worst case** — the ransom note is constructible, or only the last character fails: both passes complete fully, `O(m + n)` total.",

  realWorldUses: [
    "**Inventory checking:** Verifying that a parts list can be fulfilled from available stock.",
    "**Text anonymization:** Determining if a redacted message can be reassembled from source material.",
    "**Resource allocation:** Checking if a task's requirements can be satisfied by available resources.",
    "**Puzzle validation:** Confirming a word can be spelled from a given set of letter tiles.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m + n) time — processes each string exactly once.",
      "O(1) space for bounded alphabets.",
      "Early exit as soon as a missing character is detected.",
    ],
    limitations: [
      "Requires the full magazine pass before any ransom note characters can be checked.",
      "Returns only a boolean — does not identify which characters are missing.",
      "For Unicode inputs, map size grows with the number of distinct characters.",
    ],
  },

  whenToUseIt:
    "Use this supply-versus-demand counting pattern whenever you need to verify that one multiset of items is a subset of another. It generalises to any 'can set A be covered by set B?' question where individual item counts matter.",
};
