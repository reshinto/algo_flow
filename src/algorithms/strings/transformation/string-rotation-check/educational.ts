/** Educational content for the String Rotation Check algorithm. */

import type { EducationalContent } from "@/types";

export const stringRotationCheckEducational: EducationalContent = {
  overview:
    "**String Rotation Check** determines whether one string is a rotation of another — that is, whether the characters of `text` appear in the same cyclic order in `pattern`.\n\n" +
    "The insight is elegant: if `pattern` is a rotation of `text`, then `pattern` must appear as a contiguous substring somewhere inside `text + text`. For example, `'erbottlewat'` is a rotation of `'waterbottle'`, and it can be found inside `'waterbottlewaterbottle'`.",

  howItWorks:
    "The algorithm runs in three phases:\n\n" +
    "**Phase 1 — Validate:** Check that `text` and `pattern` have equal lengths. If they differ, they cannot be rotations of each other — return `false` immediately.\n\n" +
    "**Phase 2 — Concatenate:** Build the string `concatenated = text + text`. This doubled string contains every possible rotation of `text` as a contiguous substring.\n\n" +
    "**Phase 3 — Search:** Check whether `pattern` appears as a substring of `concatenated`.\n\n" +
    "```\n" +
    "text      = 'waterbottle'\n" +
    "pattern   = 'erbottlewat'\n" +
    "concat    = 'waterbottlewaterbottle'\n" +
    "                  ^^^^^^^^^^^          ← pattern found at index 3\n" +
    "result    = true\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["text: waterbottle"] --> B["concat: waterbottle·waterbottle"]\n' +
    '  C["pattern: erbottlewat"] --> D{substring search}\n' +
    "  B --> D\n" +
    '  D -->|"found at idx 3"| E["true ✓"]\n' +
    '  D -->|"not found"| F["false ✗"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Doubling the text string guarantees every rotation appears as a contiguous substring — a single `includes` call replaces the need to check all `n` rotation offsets individually.\n\n" +
    "The substring search can be performed with any efficient string-matching algorithm (KMP, Boyer-Moore, or the built-in `includes`/`contains`) in O(n) time.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Both strings have the same length `n`. Building the concatenated string takes O(n). The substring search (using a linear algorithm like KMP) runs in O(n). Total: O(n).\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The concatenated string `text + text` has length `2n`, requiring O(n) auxiliary space.",

  bestAndWorstCase:
    "**Best case — length mismatch:** `O(1)` — the lengths differ, so we return `false` without allocating any extra memory.\n\n" +
    "**Best case — early match:** The pattern is found near the start of the concatenated string, allowing the search to terminate early.\n\n" +
    "**Worst case — no match or late match:** The search must scan all `2n` characters before confirming absence or a match at the very end.\n\n" +
    "Because the algorithm has no adaptive behavior based on content (only the length check provides early exit), practical performance is consistently O(n).",

  realWorldUses: [
    "**Queue and circular buffer comparisons:** Determining whether two sequences stored in circular buffers are equivalent rotations is a direct application.",
    "**DNA sequence analysis:** Detecting cyclic equivalence in genetic sequences — for example, finding whether a circular DNA strand matches a reference at any rotation.",
    "**Scheduling and round-robin systems:** Checking whether two schedules represent the same rotation of tasks in a round-robin queue.",
    "**String deduplication:** Canonicalizing rotations to a single representative form to avoid storing duplicate cyclic variants.",
    "**Cryptographic protocols:** Some rotational cipher schemes require rotation-equivalence checks during key verification.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extremely simple to implement — reduces rotation checking to a standard substring search.",
      "Leverages highly optimised built-in string search routines available in all languages.",
      "Handles all rotation offsets in a single pass without trying each offset individually.",
    ],
    limitations: [
      "Requires O(n) auxiliary space for the concatenated string — not in-place.",
      "Only works for same-length strings; cannot compare strings of different lengths for cyclic equivalence.",
      "The naive `includes` / `contains` used in most languages may be O(n²) in adversarial cases without a guaranteed linear algorithm (e.g., KMP).",
    ],
  },

  whenToUseIt:
    "Use String Rotation Check whenever you need to determine whether two equal-length strings are cyclic variants of each other. It is the standard O(n) solution and preferred over the O(n²) brute-force approach of testing every rotation offset individually.\n\n" +
    "Avoid it when strings have different lengths (trivially not rotations) or when O(n) space is not acceptable. For in-place rotation detection, consider comparing canonical forms instead.",
};
