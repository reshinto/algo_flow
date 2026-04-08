import type { EducationalContent } from "@/types";

export const firstUniqueCharacterEducational: EducationalContent = {
  overview:
    "**First Unique Character** finds the index of the first character in a string that appears exactly once. A two-pass approach using a **hash map** achieves `O(n)` time: the first pass builds a frequency count, the second pass scans left to right and returns the first character with count 1.",

  howItWorks:
    "The algorithm uses two sequential passes over the string:\n\n" +
    "**Pass 1 — Build frequency map:**\n" +
    "Iterate every character and increment its count in a hash map.\n\n" +
    "**Pass 2 — Find first unique:**\n" +
    "Iterate left to right. The moment a character has count 1, return its index.\n\n" +
    '### Example: `text = "leetcode"`\n\n' +
    "```\n" +
    "Pass 1 — counts: { l:1, e:3, t:1, c:1, o:1, d:1 }\n" +
    "Pass 2 — index 0 'l' → count 1 → return 0\n" +
    "```\n\n" +
    "The second pass preserves order, guaranteeing the *first* unique is returned rather than any unique.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["\'leetcode\'"]:::input --> B["Pass 1: {l:1, e:3, t:1, c:1, o:1, d:1}"]\n' +
    "  B --> C[\"index 0 'l' → count 1\"]:::checking\n" +
    '  C --> D["return index 0"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706\n" +
    "  classDef found fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Pass 1 builds the full frequency map; Pass 2 scans left to right and stops at the first character whose count is exactly 1.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Two linear passes over the string, each `O(n)`. Hash map operations are `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The alphabet is bounded (at most 26 lowercase letters for typical inputs), so the map holds a constant number of entries regardless of string length.",

  bestAndWorstCase:
    "**Best case** — the first character is unique: the second pass terminates immediately after one lookup in `O(1)` scanning work.\n\n" +
    "**Worst case** — no unique character exists, or the unique character is at the end: both passes complete fully, `O(n)` total. Return value is `-1` when no unique character exists.",

  realWorldUses: [
    "**Input validation:** Detecting the first ambiguous token in a parsed command string.",
    "**Text processing:** Finding distinguishing characters in compressed or encoded data.",
    "**Stream deduplication:** Identifying the first symbol that has appeared only once in a sliding buffer.",
    "**Game logic:** Finding the first non-repeated tile or piece identifier in a board-game state string.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time with two clean, readable passes.",
      "O(1) space for bounded alphabets — effectively constant for ASCII or lowercase letters.",
      "Easy to extend to Unicode by using a general-purpose hash map.",
    ],
    limitations: [
      "Requires two passes — cannot return the answer mid-first-pass.",
      "If the string is extremely large and the unique char is near the start, the full first pass is still required.",
      "For unbounded alphabets the space grows with the number of distinct characters.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need the first element satisfying a frequency condition in a sequence. The two-pass structure — build counts, then scan for the condition — generalizes to any 'first element with property X based on global counts' problem.",
};
