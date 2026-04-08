import type { EducationalContent } from "@/types";

export const zAlgorithmEducational: EducationalContent = {
  overview:
    "**Z-Algorithm** finds the first occurrence of a pattern string inside a text string in `O(n + m)` time, where `n` is the text length and `m` is the pattern length.\n\n" +
    "The key idea is to concatenate the pattern, a sentinel character (`$`), and the text into a single combined string, then compute a **Z-array**. " +
    "Each entry `Z[i]` stores the length of the longest substring starting at position `i` that also matches a prefix of the combined string. " +
    "Whenever `Z[i]` equals the pattern length, the pattern starts at position `i - m - 1` in the original text.",

  howItWorks:
    "The Z-Algorithm runs in a single pass over the combined string `pattern + '$' + text`:\n\n" +
    "**Build the Z-array** (`O(n + m)`):\n\n" +
    "Maintain a **Z-box** `[windowLeft, windowRight)` — the rightmost interval that matches a prefix. For each position `pos`:\n\n" +
    "1. If `pos` is inside the Z-box, initialise `Z[pos]` using the already-computed `Z[pos - windowLeft]` (avoid re-comparing).\n" +
    "2. Extend `Z[pos]` by comparing characters forward until a mismatch.\n" +
    "3. If the new interval extends past `windowRight`, update the Z-box.\n\n" +
    "```\n" +
    "Combined: A A B X A A B $ A A B X A A B X A Y\n" +
    "Index:    0 1 2 3 4 5 6 7 8 9 ...\n" +
    "Z:        - 1 0 0 7 1 0 0 3 1 ...\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  CONCAT["combine:\\n\\"AAB$AABXAAB\\""]:::start\n' +
    '  Z4["Z[4]=3\\n\\"AAB\\" matches prefix\\n< pattern length (3)"]:::current\n' +
    '  Z8["Z[8]=3\\n\\"AAB\\" matches prefix\\n== pattern length!"]:::matched\n' +
    '  MATCH["match at pos\\n8 - 3 - 1 = 4\\nin original text"]:::matched\n' +
    "  CONCAT --> Z4 --> Z8 --> MATCH\n" +
    "  classDef start fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef matched fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "When `Z[pos]` equals the pattern length `m`, the combined string reports a match; the text offset is recovered as `pos - m - 1` (subtracting the pattern and sentinel lengths).\n\n" +
    "**Detect matches** (inline, no second pass):\n\n" +
    "If `Z[pos] == m`, the substring at `pos` in the combined string equals the full pattern, so the match starts at `pos - m - 1` in the text.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Each character in the combined string of length `n + m + 1` is visited at most twice — once during Z-box extension and once when the Z-box is advanced.\n" +
    "- No second scan is needed: match detection is done inline during Z-array construction.\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "The combined string and Z-array each have length `n + m + 1`. Unlike KMP, there is no way to reduce this to `O(m)` alone because the combined string must be stored.",

  bestAndWorstCase:
    "**Best case** — pattern found at the very start of the text: the algorithm stops as soon as `Z[m + 1] == m`, after examining just the first `m + 1` positions of the combined string.\n\n" +
    "**Worst case** — highly repetitive text and pattern (e.g., `text = 'AAAA...A'`, `pattern = 'AAAA'`) where the Z-box is constantly extended. Time remains `O(n + m)` — the same tight bound as KMP. Unlike the naïve algorithm, the Z-Algorithm has no quadratic worst case.",

  realWorldUses: [
    "**Compiler preprocessing:** The Z-array construction maps directly to suffix structures used in some compiler optimizations.",
    "**Bioinformatics:** Locating gene sequences inside long DNA strands; the Z-Algorithm is favored when the combined-string model simplifies implementation.",
    "**Text search utilities:** String search in editors and command-line tools where a single guaranteed-linear pass is required.",
    "**Competitive programming:** Standard building block for problems involving multiple pattern queries on the same text.",
    "**Suffix array construction:** The Z-array is a conceptual sibling of the LCP array, and understanding it aids in building more advanced suffix structures.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Conceptually simpler than KMP — one combined string, one array, one loop.",
      "O(n + m) guaranteed time with no quadratic worst case.",
      "Match detection is inline — no second scan of the Z-array needed.",
    ],
    limitations: [
      "O(n + m) space — KMP only requires O(m) by keeping the failure table over the pattern.",
      "Allocating the combined string adds memory pressure for very long texts.",
      "For searching the same pattern across many texts, KMP's O(m) preprocessing amortizes better.",
    ],
  },

  whenToUseIt:
    "Choose the Z-Algorithm when you want a conceptually straightforward linear-time search and `O(n + m)` memory is acceptable. " +
    "It is particularly convenient when a combined-string model fits naturally (e.g., checking if a string is a rotation of another). " +
    "Prefer KMP when memory is constrained to `O(m)`, or when the same pattern will be searched against many texts. " +
    "For very short patterns in performance-critical paths, SIMD-accelerated built-in `String.includes` / `str.find` is typically faster in practice.",
};
