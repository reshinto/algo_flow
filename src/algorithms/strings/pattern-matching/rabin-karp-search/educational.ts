import type { EducationalContent } from "@/types";

export const rabinKarpSearchEducational: EducationalContent = {
  overview:
    "**Rabin-Karp Pattern Matching** finds the first occurrence of a pattern string inside a text string using a **rolling hash** technique to reduce the number of character comparisons.\n\n" +
    "Instead of comparing every possible window character-by-character like the naïve approach, Rabin-Karp computes a hash of the pattern and slides a same-length hash window across the text. " +
    "When the hashes match, it verifies character by character to rule out **false positives** caused by hash collisions. " +
    "In the average case this achieves `O(n + m)` time, though a degenerate input with many collisions can degrade to `O(n × m)`.",

  howItWorks:
    "Rabin-Karp runs in two phases:\n\n" +
    "**Phase 1 — Compute initial hashes** `O(m)`:\n\n" +
    "Compute a polynomial rolling hash of the pattern and the first text window of length `m`:\n\n" +
    "```\n" +
    "hash = sum(char[i] * base^(m-1-i)) % prime   for i in 0..m-1\n" +
    "```\n\n" +
    "**Phase 2 — Slide the window** `O(n)`:\n\n" +
    "For each window position `s` from `0` to `n - m`:\n\n" +
    "1. **Hash mismatch** — hashes differ → skip window, roll hash in `O(1)` using:\n" +
    "   `newHash = (oldHash - outgoing * base^(m-1)) * base + incoming) % prime`\n" +
    "2. **Hash match** — hashes equal → verify characters one-by-one.\n" +
    "   - All characters match → pattern found at position `s`.\n" +
    "   - Any mismatch → **hash collision** (false positive), roll hash and continue.\n\n" +
    "The rolling hash lets each window update happen in constant time, avoiding recomputing from scratch.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  PAT["pattern \\"ABC\\"\\nhash=42"]:::start\n' +
    '  W0["window \\"XYZ\\"\\nhash=17 ≠ 42\\nskip"]:::current\n' +
    '  W1["roll hash\\n→ \\"YZA\\"\\nhash=29 ≠ 42\\nskip"]:::current\n' +
    '  W2["roll hash\\n→ \\"ABC\\"\\nhash=42 match!\\nverify chars"]:::current\n' +
    '  FOUND["A=A B=B C=C ✓\\n→ found at offset 2"]:::matched\n' +
    "  PAT --> W0 --> W1 --> W2 --> FOUND\n" +
    "  classDef start fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef matched fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Hash mismatches let the window skip character-by-character comparison entirely; only when the rolling hash equals the pattern hash does a full character verification occur.",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| ---- | ---------- | ------ |\n" +
    "| Best | `O(n + m)` | Pattern found early, no collisions |\n" +
    "| Average | `O(n + m)` | Few hash collisions with a good hash |\n" +
    "| Worst | `O(n × m)` | Every window is a false positive (e.g., all same characters) |\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of hash values and counters are stored — no auxiliary arrays.",

  bestAndWorstCase:
    "**Best case** — pattern found at the very first window and no collisions occur: `O(m)` for hashing both strings once plus a single `O(m)` verification.\n\n" +
    "**Average case** — with a good hash function and random-ish text, the probability of a false positive at any given window is `1 / prime` (very small). The total work is `O(n + m)`.\n\n" +
    "**Worst case** — a pathological input where every window produces a hash collision (e.g., `text = 'AAAA…A'`, `pattern = 'AA…A'`) forces a full character comparison at every position: `O(n × m)`. " +
    "Choosing a large prime and a good base makes this astronomically unlikely in practice.",

  realWorldUses: [
    "**Plagiarism detection:** Rabin-Karp (or its multi-pattern extension) hashes overlapping text windows across documents to quickly identify shared passages.",
    "**Network intrusion detection:** Hash-based scanning of packet payloads against a database of malicious signatures in near-linear time.",
    "**Document fingerprinting (Winnowing):** Sliding-window Rabin hashing underlies the Winnowing algorithm used by tools like MOSS to detect code similarity.",
    "**Bioinformatics:** Rolling hashes accelerate k-mer counting and approximate substring matching in genomic sequences.",
    "**Version control diffing:** Content-defined chunking in systems like rsync and Bup uses rolling hashes to locate matching regions between file versions.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) window update via rolling hash — slides efficiently across long texts.",
      "Naturally extends to multi-pattern search (Rabin-Karp multistring) by storing a hash set of patterns.",
      "Simple to implement compared to KMP or Boyer-Moore.",
      "Space-efficient: O(1) extra space regardless of text length.",
    ],
    limitations: [
      "Worst-case O(n × m) on adversarial inputs with many hash collisions.",
      "Hash collisions require character-level verification, adding overhead when collisions are frequent.",
      "Poor hash function choice can degrade performance significantly.",
      "For single-pattern search, KMP or Boyer-Moore provide stronger worst-case guarantees.",
    ],
  },

  whenToUseIt:
    "Choose Rabin-Karp when you need to search for **multiple patterns simultaneously** — computing hashes for all patterns and storing them in a hash set makes multi-pattern detection nearly as fast as single-pattern. " +
    "It is also a good choice when simplicity of implementation matters and inputs are not adversarial. " +
    "For guaranteed linear worst-case on a single pattern, prefer KMP (`O(n + m)` always) or Boyer-Moore (excellent average case). " +
    "Avoid Rabin-Karp on highly repetitive inputs where hash collisions are predictably frequent.",
};
