/** Educational content for Minimum Window Substring — all 7 required sections. */

import type { EducationalContent } from "@/types";

export const minimumWindowSubstringEducational: EducationalContent = {
  overview:
    "**Minimum Window Substring** finds the smallest contiguous window in a text string that contains every character from a pattern string (including duplicates).\n\n" +
    'For example, given `text = "ADOBECODEBANC"` and `pattern = "ABC"`, the answer is `"BANC"` — the shortest substring that contains at least one `A`, one `B`, and one `C`.\n\n' +
    "The algorithm uses a **sliding window** with two pointers: the right pointer expands the window to include new characters, and the left pointer shrinks it once all characters are satisfied — finding the minimum length window in a single pass.",

  howItWorks:
    "The algorithm maintains a window `[leftIndex, rightIndex]` over the text and tracks how many pattern characters have been satisfied.\n\n" +
    "**Step 1 — Build target frequency map** (O(m)):\n\n" +
    "Count how many times each character appears in the pattern:\n\n" +
    '```\npattern = "ABC"\ntarget = { A:1, B:1, C:1 },  required = 3\n```\n\n' +
    "**Step 2 — Expand right pointer** (O(n)):\n\n" +
    "Slide `rightIndex` across the text one character at a time. Add the character to the window frequency map. If its window count now equals its target count, increment `satisfied`:\n\n" +
    "```\nA → satisfied=1,  D → no change,  O → no change,  B → satisfied=2 ...\n```\n\n" +
    "**Step 3 — Shrink left pointer** (O(n) amortized):\n\n" +
    "Once `satisfied === required`, record the window if it is the smallest seen so far. Then advance `leftIndex` — remove that character from the window, and if its count drops below the target, decrement `satisfied`. Repeat until `satisfied < required`:\n\n" +
    '```\nWindow "ADOBEC" → record length 6\n→ shrink: remove A → satisfied drops → stop shrinking\n...\nWindow "BANC" → record length 4  ← best\n```\n\n' +
    "Return the text slice at the recorded best position.\n\n" +
    '### Example: Finding minimum window in `"ADOBECODEBANC"` for pattern `"ABC"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["A"] --> D["D"] --> O["O"] --> B["B"] --> E["E"] --> C["C"] --> O2["O"] --> D2["D"] --> E2["E"] --> B2["B"] --> A2["A"] --> N["N"] --> C2["C"]\n' +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style B fill:#06b6d4,stroke:#0891b2\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style B2 fill:#14532d,stroke:#22c55e\n" +
    "    style A2 fill:#14532d,stroke:#22c55e\n" +
    "    style N fill:#14532d,stroke:#22c55e\n" +
    "    style C2 fill:#14532d,stroke:#22c55e\n" +
    "    style D fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    'The right pointer expands until all of A, B, C are covered. The window `"BANC"` (green) is the shortest valid window found after shrinking from the left.',

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "Building the target frequency map takes `O(m)`. The right pointer traverses the text once (`O(n)`), and the left pointer also traverses the text at most once in total across all shrink cycles — giving `O(n)` for the sliding window phase.\n\n" +
    "**Space Complexity: `O(σ)`**\n\n" +
    "Two frequency maps are maintained — `targetFrequency` and `windowFrequency`. Each holds at most `σ` entries where `σ` is the alphabet size. For lowercase English letters, that is a constant 26 entries. For arbitrary Unicode, it scales with the number of distinct characters in the input.",

  bestAndWorstCase:
    "**Best case** — `O(n + m)`: the pattern has only one distinct character and it appears early in the text. The window satisfies the requirement quickly and shrinks to the minimum size in a small number of steps, but both strings must still be fully scanned.\n\n" +
    "**Worst case** — `O(n + m)`: every character in the text is relevant to the pattern, and the minimum window is found only near the end (e.g., pattern characters are spread evenly across a long text). Both pointers traverse the entire text once each.\n\n" +
    "There is no super-linear case — the sliding window guarantees each pointer moves at most `n` steps total.",

  realWorldUses: [
    "**Text search:** Finding the shortest excerpt of a document that mentions every required keyword (used in information retrieval and search engine snippet generation).",
    "**Bioinformatics:** Locating the shortest DNA or RNA subsequence that contains all required nucleotides or codon markers from a target sequence.",
    "**Compiler design:** Scanning token streams to find the smallest contiguous region that satisfies a set of required tokens (e.g., variable declarations before first use).",
    "**Log analysis:** Identifying the tightest time window in event logs that covers all required event types for incident reconstruction.",
    "**Competitive programming:** A foundational pattern for window-minimization problems involving character or element coverage constraints.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — both pointers traverse the text only once in total.",
      "O(σ) space — memory usage is bounded by the alphabet size, not the input length.",
      "Handles duplicate characters in the pattern correctly via frequency counting.",
      "Naturally generalizes to any countable element type, not just characters.",
    ],
    limitations: [
      "Returns only one minimum window — if multiple windows share the minimum length, only the first (leftmost) is returned.",
      "Case-sensitive by default — 'A' and 'a' are treated as different characters unless the caller normalizes the input.",
      "Does not support wildcard or regex patterns — only exact character-frequency matching.",
      "For Unicode inputs with large alphabets, the O(σ) space bound can become significant.",
    ],
  },

  whenToUseIt:
    "Use Minimum Window Substring whenever you need the shortest contiguous substring of a text that satisfies a character coverage requirement.\n\n" +
    "It is the optimal solution for this class of problem — `O(n + m)` time and `O(σ)` space. Avoid naïve `O(n²)` or `O(n² * m)` brute-force approaches that check every possible substring.\n\n" +
    "If you need **all** windows of minimum length (not just the first), collect candidates during the `addToResult` phase instead of tracking a single best. If you need to check whether a window exists at all (without finding the shortest), a simpler frequency comparison suffices.",
};
