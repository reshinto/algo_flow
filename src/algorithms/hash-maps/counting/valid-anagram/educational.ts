import type { EducationalContent } from "@/types";

export const validAnagramEducational: EducationalContent = {
  overview:
    "**Valid Anagram** checks whether two strings contain exactly the same characters in the same quantities. The hash map counting approach runs in `O(n)` time: build a frequency map from the first string, then decrement for each character in the second — if any count goes negative, the strings are not anagrams.",

  howItWorks:
    "The algorithm uses a two-phase counting strategy:\n\n" +
    "**Phase 1 — Build counts from textA:**\n" +
    "For each character in `textA`, increment its count in the map.\n\n" +
    "**Phase 2 — Consume counts with textB:**\n" +
    "For each character in `textB`, decrement its count. If the count drops below zero, `textB` has a character `textA` does not — return `false`.\n\n" +
    '### Example: `textA = "anagram"`, `textB = "nagaram"`\n\n' +
    "```\n" +
    "After phase 1: { a:3, n:1, g:1, r:1, m:1 }\n" +
    "Phase 2 consumes each char of nagaram → all counts reach 0 → true\n" +
    "```\n\n" +
    "A length check short-circuits immediately when the strings differ in size.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Two passes of length `n` (one per string). Hash map operations are `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "For lowercase English letters, the map holds at most 26 entries — effectively constant space.",

  bestAndWorstCase:
    "**Best case** — the two strings have different lengths: the length check rejects them immediately in `O(1)`.\n\n" +
    "**Worst case** — strings are the same length and a mismatch only appears at the last character of textB, or they are a valid anagram: both phases complete in full, `O(n)` time.",

  realWorldUses: [
    "**Spell checking:** Detecting transposed letters in user input (e.g., 'recieve' vs 'receive' rearranged).",
    "**Cryptography:** Verifying that a ciphertext permutation contains the same character distribution as plaintext.",
    "**Word games:** Validating scrambled-word puzzles and anagram-based game moves.",
    "**Data deduplication:** Identifying records that are character-level permutations of each other.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal for this problem (every character must be read at least once).",
      "O(1) space for bounded alphabets.",
      "Early exit on length mismatch avoids unnecessary work.",
    ],
    limitations: [
      "Requires both strings to be fully in memory simultaneously.",
      "For Unicode strings the map can grow large if many distinct characters appear.",
      "Returns only a boolean — does not indicate which characters differ.",
    ],
  },

  whenToUseIt:
    "Use the increment-then-decrement counting pattern whenever you need to verify that two multisets of items are identical. It generalises beyond strings to any sequence comparison where order does not matter but quantity does.",
};
