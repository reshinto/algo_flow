/** Educational content for Reverse Words in a String. */

import type { EducationalContent } from "@/types";

export const reverseWordsEducational: EducationalContent = {
  overview:
    "**Reverse Words in a String** rearranges the words of a sentence so that the last word comes first, " +
    "the second-to-last word comes second, and so on.\n\n" +
    "The algorithm also normalises whitespace: it trims leading and trailing spaces and collapses any " +
    "sequence of internal spaces down to a single space, so the output is always clean regardless of how " +
    "messily the input was formatted.",

  howItWorks:
    "The algorithm has two logical phases.\n\n" +
    "**Phase 1 — Split:** The input string is trimmed and split on whitespace. " +
    "Each non-empty token becomes one element of a `words` array.\n\n" +
    "**Phase 2 — Reverse:** A two-pointer swap mirrors the `words` array in place:\n\n" +
    "1. `leftIndex` starts at `0`; `rightIndex` starts at `words.length - 1`.\n" +
    "2. The words at the two pointers are swapped.\n" +
    "3. `leftIndex` advances forward; `rightIndex` moves backward.\n" +
    "4. The loop stops when `leftIndex >= rightIndex`.\n\n" +
    "Finally, the reversed array is joined with single spaces to form the result string.\n\n" +
    "```\n" +
    'Input:   "the sky is blue"\n' +
    "Words:   [the, sky, is, blue]\n" +
    "         ^               ^\n" +
    "Step 1:  [blue, sky, is, the]   (swap the ↔ blue)\n" +
    "               ^     ^\n" +
    "Step 2:  [blue, is, sky, the]   (swap sky ↔ is)\n" +
    'Output:  "blue is sky the"\n' +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["the"] --- B["sky"] --- C["is"] --- D["blue"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    '  E["blue"] --- F["is"] --- G["sky"] --- H["the"]\n' +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style H fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The outer pair (`the` ↔ `blue`) swaps first, then the inner pair (`sky` ↔ `is`) completes the reversal in two pointer moves.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Splitting the string scans every character once — `O(n)`. " +
    "The two-pointer reversal visits each word once — `O(w)` where `w ≤ n`. " +
    "Joining scans every character once — `O(n)`. Total: `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The `words` array and the output string each hold up to `n` characters. " +
    "No extra allocations grow with word count — space is proportional only to input length.",

  bestAndWorstCase:
    "**Best case — single word or empty string:** `O(n)` — the split produces one token (or none) " +
    "so the pointer loop performs zero swaps, but the input still needs one full scan.\n\n" +
    "**Worst case — many short words:** `O(n)` — `w/2` swaps are performed. " +
    "There is no early-exit, so every word pair is always processed.\n\n" +
    "Because the dominant cost is always the linear scan of the string, best and worst cases " +
    "share the same `O(n)` bound.",

  realWorldUses: [
    "**Natural-language processing:** Reversing word order is a preprocessing step in some sentence-embedding pipelines and text augmentation strategies.",
    "**Coding interviews:** A canonical two-pointer string problem that tests split/join fluency and awareness of whitespace edge cases.",
    "**Cipher design:** Simple transposition ciphers reverse word order as one layer of an encoding scheme.",
    "**Command-line tools:** Shell utilities that reverse argument lists apply the same word-reversal logic.",
    "**Undo/redo stacks:** Reversing a sequence of tokens restores an earlier state — the same structural operation as reversing an array of commands.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear time and space — optimal for this problem class.",
      "Normalises extra whitespace for free, making output predictable regardless of input formatting.",
      "Simple two-phase structure (split → reverse) is easy to reason about and test.",
    ],
    limitations: [
      "Allocates a new array and a new string — cannot be done truly in-place without O(n²) character shifts in most languages.",
      "Split-on-whitespace loses original spacing information; if exact whitespace preservation is required, a different approach is needed.",
      "Does not handle word-level unicode edge cases (e.g., words separated by non-breaking spaces U+00A0) without regex adjustments.",
    ],
  },

  whenToUseIt:
    "Use Reverse Words when you need to invert word order and clean up whitespace in linear time. " +
    "It is the standard solution for the LeetCode 151 / similar interview problems.\n\n" +
    "Avoid it when the original whitespace must be preserved exactly, or when memory allocation is " +
    "severely constrained and an in-place O(1)-space solution is required (which would need a double-reverse " +
    "strategy operating at the character level).",
};
