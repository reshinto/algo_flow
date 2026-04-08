import type { EducationalContent } from "@/types";

export const kmpSearchEducational: EducationalContent = {
  overview:
    "**KMP (Knuth-Morris-Pratt) Pattern Matching** finds the first occurrence of a pattern string inside a text string in `O(n + m)` time, where `n` is the text length and `m` is the pattern length.\n\n" +
    "The key insight is that after a mismatch, naïve search discards all the matched characters and restarts from scratch. KMP pre-processes the pattern into a **failure table** (also called the prefix table) that encodes the longest proper prefix of each prefix that is also a suffix. On mismatch, the pattern is shifted by exactly the right amount — never re-comparing text characters already known to match.",

  howItWorks:
    "KMP runs in two phases:\n\n" +
    "**Phase 1 — Build the failure table** (O(m)):\n\n" +
    "For each position `i` in the pattern, `failure[i]` stores the length of the longest proper prefix of `pattern[0..i]` that is also a suffix.\n\n" +
    "```\n" +
    "Pattern:  A  B  A  B  C  A  B  A  B\n" +
    "Index:    0  1  2  3  4  5  6  7  8\n" +
    "Failure:  0  0  1  2  0  1  2  3  4\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  BUILD["build failure table\\nABAB → [0,0,1,2]"]:::start\n' +
    '  M1["text[0..3] = ABAB\\npatternIdx advances to 4"]:::matched\n' +
    "  MISS[\"text[4] = 'D'\\npat[4] = 'C' ✗\\nshift: patternIdx = failure[3] = 2\"]:::current\n" +
    '  M2["resume at patternIdx=2\\nno re-scan of text"]:::matched\n' +
    "  BUILD --> M1 --> MISS --> M2\n" +
    "  classDef start fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef matched fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "On a mismatch at `patternIdx = 4`, KMP uses `failure[3] = 2` to skip back inside the pattern without moving `textIdx` — the text is never re-scanned.\n\n" +
    "**Phase 2 — Search** (O(n)):\n\n" +
    "Two pointers, `textIdx` and `patternIdx`, advance through their respective strings:\n\n" +
    "1. **Match** — `text[textIdx] == pattern[patternIdx]`: advance both. If `patternIdx` reaches `m`, pattern found.\n" +
    "2. **Mismatch with `patternIdx > 0`** — set `patternIdx = failure[patternIdx - 1]` (shift pattern without moving `textIdx`).\n" +
    "3. **Mismatch at pattern start** — advance `textIdx` only.\n\n" +
    "Because `textIdx` never goes backward, each character is compared at most twice total.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Failure table construction: `O(m)` — each index is visited at most twice.\n" +
    "- Search phase: `O(n)` — `textIdx` only moves forward; pattern shifts never cause re-comparisons.\n" +
    "- Total: `O(n + m)`, a strict improvement over naïve `O(n × m)`.\n\n" +
    "**Space Complexity: `O(m)`**\n\n" +
    "Only the failure table of length `m` is allocated.",

  bestAndWorstCase:
    "**Best case** — pattern found at the very start of the text: `O(m)` for the failure table build plus a single scan of `m` characters.\n\n" +
    "**Worst case** — highly repetitive text and pattern (e.g., `text = 'AAAA...A'`, `pattern = 'AAAB'`) where many failure-table lookups occur, but time is still bounded by `O(n + m)` — the key guarantee.\n\n" +
    "Unlike the naïve algorithm, KMP has no quadratic worst case.",

  realWorldUses: [
    "**Text editors (Find & Replace):** Fast substring search over megabytes of text without a search index.",
    "**Intrusion detection systems:** Scanning network packet payloads for malicious byte sequences in real time.",
    "**Bioinformatics:** Finding gene subsequences inside long DNA strands where `n` can exceed billions of base pairs.",
    "**Compiler lexers:** Matching keyword and token patterns inside source files during scanning.",
    "**grep / ripgrep internals:** KMP (or its generalization, Aho-Corasick) underpins multi-pattern search tools.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) guaranteed — no quadratic worst case unlike naïve search.",
      "Single-pass over the text — `textIdx` never backtracks.",
      "Naturally generalises to Aho-Corasick for searching multiple patterns simultaneously.",
    ],
    limitations: [
      "O(m) preprocessing — not worthwhile for a single search of a short pattern in a short text.",
      "More complex to implement correctly than naïve search or even Boyer-Moore for most practical inputs.",
      "For very short patterns (< 8 chars), SIMD-accelerated naïve search in modern CPUs is often faster in practice.",
    ],
  },

  whenToUseIt:
    "Choose KMP when you need a guaranteed `O(n + m)` substring search and the pattern may be searched against multiple texts (amortizing the `O(m)` preprocessing). For a single search in a modern runtime, built-in `String.includes` / `str.find` typically uses Boyer-Moore-Horspool which is faster in the average case. Use KMP — or its multi-pattern generalization Aho-Corasick — when worst-case guarantees matter (security scanning, adversarial inputs).",
};
