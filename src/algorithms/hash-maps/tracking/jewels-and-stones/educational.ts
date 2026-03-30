import type { EducationalContent } from "@/types";

export const jewelsAndStonesEducational: EducationalContent = {
  overview:
    "**Jewels and Stones** counts how many characters in the `stones` string also appear in the `jewels` string. Each character in `jewels` is a unique jewel type; each character in `stones` is a stone that may or may not be a jewel.\n\nA **hash set** built from `jewels` enables O(1) membership checks so every stone is classified in constant time.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Build the jewel set:** Insert every character from `jewels` into a hash set in O(|jewels|).\n\n" +
    "**Phase 2 — Count matching stones:** Iterate over `stones`. For each stone, check membership in the jewel set. If present, increment the counter.\n\n" +
    '### Example: jewels = `"aA"`, stones = `"aAAbbbb"`\n\n' +
    "```\n" +
    'Jewel set: { "a", "A" }\n' +
    'Stone "a" → in set → count = 1\n' +
    'Stone "A" → in set → count = 2\n' +
    'Stone "A" → in set → count = 3\n' +
    'Stone "b" → not in set\n' +
    'Stone "b" → not in set\n' +
    'Stone "b" → not in set\n' +
    'Stone "b" → not in set\n' +
    "Result: 3\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(|jewels| + |stones|)`**\n\n" +
    "Building the set is O(|jewels|). Scanning stones is O(|stones|). Each lookup is O(1) amortised.\n\n" +
    "**Space Complexity: `O(|jewels|)`**\n\n" +
    "The hash set holds at most one entry per distinct jewel character. In practice this is bounded by the alphabet size (52 for case-sensitive letters).",

  bestAndWorstCase:
    "**Best case** — no stones match any jewel: every lookup returns false immediately. Still O(|jewels| + |stones|) overall.\n\n" +
    "**Worst case** — every stone is a jewel: all lookups return true and the counter increments for every stone. Same asymptotic complexity; no branching overhead.",

  realWorldUses: [
    "**Spam filtering:** Classifying tokens in a message against a known-bad-word set in O(1) per token.",
    "**Inventory systems:** Quickly checking which items in a cart belong to a promotional category stored as a set.",
    "**Text analysis:** Counting occurrences of characters from one alphabet (e.g., vowels) in a body of text.",
    "**Access control:** Verifying whether requested permissions are a subset of a user's granted-permission set.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) per lookup after an O(|jewels|) setup — optimal for large stone arrays.",
      "Handles duplicate jewel characters gracefully — the set deduplicates automatically.",
      "Case-sensitive by design; trivially adapted to case-insensitive by normalising inputs.",
    ],
    limitations: [
      "Requires O(|jewels|) extra space — negligible for typical inputs but worth noting.",
      "If jewels is very long and stones is tiny, a linear scan over jewels per stone would use less memory.",
      "Does not return which stones are jewels, only the count — extend with a results list if needed.",
    ],
  },

  whenToUseIt:
    "Use the hash-set membership pattern whenever you need to classify elements of one collection against a fixed reference set. It is the canonical O(1)-lookup replacement for nested loops. If the reference set fits in a bitfield (e.g., ASCII characters), a bitmask is even faster and uses O(1) space.",
};
