import type { EducationalContent } from "@/types";

export const decodeWaysTabulationEducational: EducationalContent = {
  overview:
    "**Decode Ways (Tabulation)** counts the number of ways to decode a string of digits into letters, where 'A'=1, 'B'=2, …, 'Z'=26.\n\nTabulation builds the answer bottom-up: `dp[i]` stores the number of valid decodings for the first `i` digits. Each cell is filled by checking whether the digit at position `i` can stand alone (1–9) and whether the two-digit window ending at `i` forms a valid code (10–26).",

  howItWorks:
    "1. **Initialize:** allocate a table of size `n+1`. Set `D(0) = 1` (the empty prefix has exactly one decoding — the empty string). Set `D(1) = 1` if `digits[0] ≠ '0'`, else `0`.\n" +
    "2. **Fill left to right** from position `2` to `n`:\n" +
    "   - **Single-digit check:** if `digits[i-1]` is `'1'`–`'9'`, add `D(i-1)` to `D(i)` — the last digit decodes alone.\n" +
    "   - **Two-digit check:** if `digits[i-2..i-1]` forms a number between 10 and 26, add `D(i-2)` to `D(i)` — the last two digits decode as one letter.\n" +
    "3. Return `D(n)` — total valid decodings of the full string.\n\n" +
    "### Table Build-Up for `'12321'`\n\n" +
    "```\n" +
    "Position i:  0   1   2   3   4   5\n" +
    "Digit:       —   1   2   3   2   1\n" +
    "D(i):        1   1   2   3   3   6\n" +
    "```\n\n" +
    "- `D(0) = 1` — empty prefix\n" +
    "- `D(1) = 1` — '1' → A\n" +
    "- `D(2) = D(1) + D(0) = 2` — '2' alone (B) or '12' together (L)\n" +
    "- `D(3) = D(2) + 0 = 3` — '3' alone (C); '23' > 26 so no two-digit path\n" +
    "- `D(4) = D(3) + D(2) = 5` — wait, '32' > 26 so only single: `D(3)=3`; rechecking: '32'>26, so `D(4)=D(3)=3`\n" +
    "- `D(5) = D(4) + D(3) = 6` — '1' alone or '21' = U\n\n" +
    "Each cell is computed in `O(1)` with at most two lookbacks.\n\n" +
    "### DP Table for '1232'\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  D0["D(0)=1 empty"] --> D1["D(1)=1 \'1\'→A"]\n' +
    "  D0 --> D2[\"D(2)=2 '2' or '12'\"]\n" +
    "  D1 --> D2\n" +
    "  D1 --> D3[\"D(3)=3 '3' or '23'\"]\n" +
    "  D2 --> D3\n" +
    "  D2 --> D4[\"D(4)=3 '2' only\"]\n" +
    "  D3 --> D4\n" +
    "  style D0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style D1 fill:#06b6d4,stroke:#0891b2\n" +
    "  style D2 fill:#14532d,stroke:#22c55e\n" +
    "  style D3 fill:#14532d,stroke:#22c55e\n" +
    "  style D4 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each node shows the count of valid decodings up to that position. Solid arrows from `D(i-1)` represent the single-digit path; arrows from `D(i-2)` represent the two-digit path when the window is 10–26.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single left-to-right pass over `n` digits fills `n+1` table cells. Each cell requires two constant-time checks and at most two table lookups.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table holds `n+1` integers. Space can be reduced to `O(1)` by keeping only the two most recent values (`prevOne` and `prevTwo`), but the full table is retained here for visualization.",

  bestAndWorstCase:
    "**All cases are `O(n)`** — every digit position must be evaluated regardless of content.\n\n" +
    "Input structure does affect the *count* of paths but not the runtime. A string of all `'1'`s (maximum branching) and a string of all `'3'`s (no two-digit paths) both complete in the same number of steps.\n\n" +
    "The only early exit is the empty-string check at the start, which returns `0` immediately.",

  realWorldUses: [
    "**Message Decoding:** Recover all possible plain-text interpretations of an encoded numeric message.",
    "**Barcode Validation:** Count valid symbol sequences that match a numeric encoding scheme.",
    "**Natural Language Processing:** Segment a digit-encoded token stream into all candidate word sequences.",
    "**Combinatorics in Compression:** Enumerate valid decodings of run-length or variable-width encoded data.",
    "**Interview Standard:** A canonical string DP problem that tests understanding of conditional recurrence and boundary handling.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates exponential brute-force enumeration of all digit splits.",
      "Iterative — no recursion, no call-stack overhead, no risk of overflow for long inputs.",
      "The filled table reveals exactly where decodings branch or dead-end, making it ideal for visualization and debugging.",
      "Structurally similar to Fibonacci: once the Fibonacci recurrence is understood, this pattern follows naturally.",
    ],
    limitations: [
      "The `O(n)` table is reducible to `O(1)` space (two rolling variables) when only the count is needed.",
      "Handles only the standard A=1…Z=26 mapping; extended or variable-length encodings require a modified recurrence.",
      "Leading zeros cause cascading zero cells — the algorithm correctly counts zero decodings but care is needed to distinguish 'no valid path' from an empty input.",
    ],
  },

  whenToUseIt:
    "Use this pattern when you need to **count paths through a string** where each step can consume one or two characters and validity depends on numeric value. The recurrence `D(i) = D(i-1) [if single valid] + D(i-2) [if two-digit valid]` is a conditional Fibonacci — recognize it whenever a problem involves a sliding window of 1–2 elements with value-based branching. Choose tabulation when you want all intermediate counts (e.g., for visualization or to detect where decoding becomes impossible). Reduce to rolling variables when only the final count matters and memory is constrained.",
};
