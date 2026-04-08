/** Educational content for Naive Pattern Search. */

import type { EducationalContent } from "@/types";

export const naivePatternSearchEducational: EducationalContent = {
  overview:
    "**Naive Pattern Search** (also called brute-force string matching) finds the first occurrence of a pattern string inside a text string by checking every possible alignment position.\n\n" +
    "For each starting index in the text, it compares characters one by one against the pattern. If all characters match, the position is returned. If any mismatch occurs, the pattern slides one position to the right and the comparison starts over from the beginning of the pattern.\n\n" +
    "Its simplicity makes it easy to understand and implement correctly, and it performs surprisingly well on real-world inputs where mismatches tend to occur at the first or second character.",

  howItWorks:
    "The algorithm uses two nested loops:\n\n" +
    "**Outer loop** — slides the pattern window from index `0` to `n - m` (inclusive), where `n` is the text length and `m` is the pattern length:\n\n" +
    "```\n" +
    "Text:    A  A  B  A  A  C  A  A  D\n" +
    "Pattern: A  A  B  A          (offset = 0)\n" +
    "         A  A  B  A          (offset = 1, after mismatch at index 1)\n" +
    "            A  A  B  A       (offset = 2, ...) \n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  OFF0["offset=0\\nAABA vs AABA\\n→ match!"]:::matched\n' +
    '  OFF1["offset=1\\nABAA vs AABA\\nA=A ✓ B≠A ✗\\nslide right"]:::current\n' +
    '  OFF2["offset=2\\nBAAC vs AABA\\nB≠A ✗\\nslide right"]:::current\n' +
    '  OFF3["offset=3\\n...continue"]:::start\n' +
    "  OFF0 ~~~ OFF1 --> OFF2 --> OFF3\n" +
    "  classDef start fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef matched fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each window is compared from scratch: a mismatch at any position causes the pattern to slide one step right with no reuse of prior comparisons.\n\n" +
    "**Inner loop** — compares `text[textIdx + patternIdx]` against `pattern[patternIdx]` for each `patternIdx` from `0` to `m - 1`:\n\n" +
    "1. **Match** — `text[textIdx + patternIdx] == pattern[patternIdx]`: increment `patternIdx`.\n" +
    "2. **All matched** — `patternIdx == m`: pattern found at `textIdx`, return immediately.\n" +
    "3. **Mismatch** — break the inner loop and advance `textIdx` by one.\n\n" +
    "Because the outer loop restarts the inner comparison from scratch on every mismatch, no preprocessing of the pattern is needed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "- **Best case: `O(n)`** — mismatches occur at the first character of each alignment (e.g., `text = 'AAAB'`, `pattern = 'B'`). Each text position does only one comparison.\n" +
    "- **Average case: `O(n × m)`** — for random text and patterns, inner loops terminate early due to frequent first-character mismatches. In practice, this is often close to `O(n)`.\n" +
    "- **Worst case: `O(n × m)`** — highly repetitive text and pattern (e.g., `text = 'AAAA...A'`, `pattern = 'AAA...AB'`) force the inner loop to run to near completion before every mismatch.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "No auxiliary arrays or data structures are allocated. Only two index variables are used.",

  bestAndWorstCase:
    "**Best case** — `O(n)`: pattern is found at the very first position, or mismatches consistently occur at the first character so each text position costs exactly one comparison.\n\n" +
    "**Worst case** — `O(n × m)`: the text consists of repeated characters and the pattern nearly matches at every position before failing on the last character (e.g., text `'AAAAAAB'`, pattern `'AAAAB'`). The inner loop runs `m` times for each of the `n - m + 1` starting positions.\n\n" +
    "For most English text and typical patterns, mismatches happen within the first 1–2 comparisons, making the practical average-case much closer to `O(n)` than the theoretical worst.",

  realWorldUses: [
    "**Short pattern searches:** When both the text and pattern are small (e.g., searching a line of log output for a short keyword), the `O(nm)` constant factors are negligible.",
    "**Teaching tool:** Universally used as the first string-matching algorithm taught because its logic maps directly to the problem definition.",
    "**Hardware pattern matching:** Simple enough to implement in hardware or firmware for embedded pattern detection without preprocessing overhead.",
    "**Baseline benchmarking:** Used as the reference implementation to measure the speedup provided by KMP, Boyer-Moore, or Rabin-Karp.",
    "**One-shot searches:** When a pattern is only ever searched against a single text (preprocessing cost of KMP or BM would not be amortized).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — no auxiliary arrays needed unlike KMP (O(m)) or Boyer-Moore.",
      "Zero preprocessing — works immediately on any text/pattern pair without setup cost.",
      "Simple to implement and verify correctness — no subtle invariants or edge cases in the shift logic.",
      "Competitive in practice — for short patterns or random text, first-character mismatches keep the constant low.",
    ],
    limitations: [
      "O(nm) worst case — degrades quadratically on adversarial (highly repetitive) inputs.",
      "No learning from mismatches — discards all matched prefix information on every shift, repeating redundant comparisons.",
      "Outperformed by KMP, Boyer-Moore, or Rabin-Karp for large texts or long patterns.",
      "Not suitable for streaming or real-time security scanning where worst-case guarantees matter.",
    ],
  },

  whenToUseIt:
    "Choose Naive Pattern Search when **simplicity and correctness** matter more than asymptotic efficiency — for small inputs, one-shot searches, or when the pattern is short (< 8 characters) and mismatches occur early. Avoid it for large-scale text processing, security-sensitive scanning (where adversarial inputs can force quadratic behavior), or bioinformatics workloads with gigabyte-scale texts. In those cases, prefer **KMP** for a guaranteed `O(n + m)` bound, **Boyer-Moore-Horspool** for fast average-case performance on natural language, or **Rabin-Karp** when searching for multiple patterns simultaneously.",
};
