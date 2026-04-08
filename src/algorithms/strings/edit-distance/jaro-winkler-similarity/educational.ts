/** Educational content for the Jaro-Winkler Similarity algorithm. */

import type { EducationalContent } from "@/types";

export const jaroWinklerSimilarityEducational: EducationalContent = {
  overview:
    "**Jaro-Winkler Similarity** measures how alike two strings are by counting characters that appear in roughly the same position in both strings. The score ranges from **0.0** (completely different) to **1.0** (identical).\n\n" +
    "It builds on the **Jaro similarity** formula by adding a **prefix bonus**: if the two strings start with the same characters (up to 4), the score is nudged higher. This makes it especially good for matching names where people often spell the beginning correctly.\n\n" +
    "For example, `martha` and `marhta` score **0.9611** — very high, because only two characters are transposed and the prefix `mar` matches.",

  howItWorks:
    "**Step 1 — Compute the match window:**\n\n" +
    "```\nmatch_window = floor(max(len1, len2) / 2) - 1\n```\n\n" +
    "Two characters are *matching* if they are the same character and their positions are within `match_window` of each other.\n\n" +
    "**Step 2 — Find matching characters:**\n\n" +
    "Scan each character in `source`. For each unmatched position in `target` within the window, record the first match. Count total matches `m`.\n\n" +
    "**Step 3 — Count transpositions:**\n\n" +
    "Extract matched characters from each string in order. Count positions where they differ — call that `t`. The number of transpositions is `t / 2`.\n\n" +
    "**Step 4 — Jaro formula:**\n\n" +
    "```\njaro = (m/len1 + m/len2 + (m - t/2)/m) / 3\n```\n\n" +
    "**Step 5 — Winkler prefix bonus:**\n\n" +
    "Count how many leading characters match (up to 4). Call this `p`.\n\n" +
    "```\njaro_winkler = jaro + p × 0.1 × (1 - jaro)\n```\n\n" +
    "The `0.1` scaling factor (the *winkler constant*) prevents the bonus from exceeding 1.0.\n\n" +
    '### Example: Comparing `"martha"` and `"marhta"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph S["source: martha"]\n' +
    '        M1["m"] --> A1["a"] --> R1["r"] --> T1["t"] --> H1["h"] --> A2["a"]\n' +
    "    end\n" +
    '    subgraph T["target: marhta"]\n' +
    '        M2["m"] --> A3["a"] --> R2["r"] --> H2["h"] --> T2["t"] --> A4["a"]\n' +
    "    end\n" +
    "    M1 -.matched.- M2\n" +
    "    A1 -.matched.- A3\n" +
    "    R1 -.matched.- R2\n" +
    "    T1 -.transposed.- H2\n" +
    "    style M1 fill:#14532d,stroke:#22c55e\n" +
    "    style M2 fill:#14532d,stroke:#22c55e\n" +
    "    style A1 fill:#06b6d4,stroke:#0891b2\n" +
    "    style A3 fill:#06b6d4,stroke:#0891b2\n" +
    "    style T1 fill:#f59e0b,stroke:#d97706\n" +
    "    style H2 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The shared prefix `mar` (green/cyan) earns a Winkler bonus. `t` and `h` (amber) are transposed — counted as 1 transposition. Final score: 0.9611.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "The matching step scans every source character against its target window. In the worst case (long window), this approaches `O(n × m)` where `n = source.length` and `m = target.length`. The transposition and prefix scans are `O(n)` and `O(1)` respectively.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Two boolean arrays of size `n` and `m` are allocated to track which characters have been matched. No DP matrix is required — the matrix in the visualization is used for display purposes only.",

  bestAndWorstCase:
    "**Best case — identical strings:** When `source === target`, the function returns `1.0` immediately without entering the matching loop. Conceptually `O(1)` after the equality check.\n\n" +
    "**Best case — no matches:** When no characters fall within each other's windows (completely different short strings), `matchCount = 0` and the function returns `0.0` early after the match loop. Still `O(n × m)` in the worst scenario.\n\n" +
    "**Worst case — dense windows:** Long strings with a large match window cause the inner loop to scan almost every target character for every source character, approaching `O(n × m)`.\n\n" +
    "Unlike edit-distance algorithms, Jaro-Winkler does **not** fill a full matrix — it stops matching each source character as soon as one match is found.",

  realWorldUses: [
    "**Record linkage:** Merging duplicate records in databases (patient names, customer lists) where the same person is spelled differently.",
    "**Name matching:** Comparing personal names in civil registries, passport systems, and voter rolls where transpositions like `martha`/`marhta` are common.",
    "**Typo-tolerant search:** Autocomplete and fuzzy search that prioritises prefix agreement, making it feel more responsive to users who type the start of a word correctly.",
    "**Natural language processing:** Coreference resolution — determining whether two mentions in a document refer to the same entity.",
    "**Data deduplication:** Identifying near-duplicate company or product names in e-commerce and CRM systems.",
    "**Biometrics and forensics:** Matching names transliterated from non-Latin scripts where short prefixes tend to be stable.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Prefix bias makes it well-suited for short strings and names where early characters are more reliable.",
      "More discriminating than simple edit distance for transposed characters — `marhta` scores much higher than a random 6-letter word.",
      "Returns a normalised [0, 1] score, easy to threshold and compare across string pairs.",
      "Space-efficient — only `O(n + m)` boolean arrays, no full DP matrix.",
    ],
    limitations: [
      "The Winkler prefix constant (0.1) is a heuristic — no theoretical justification for that specific value.",
      "Still `O(n × m)` time, making it impractical for very long strings like full documents.",
      "Ignores deletions and insertions as distinct operations — can score similar-length but very different strings unexpectedly high.",
      "The match window formula produces `window = -1` for very short strings (length ≤ 1), which can cause edge-case behaviour.",
    ],
  },

  whenToUseIt:
    "Use Jaro-Winkler when comparing **short strings** (names, identifiers, codes) where a **prefix agreement** is a meaningful signal, and transpositions are more likely than wholesale deletions or insertions.\n\n" +
    "It is the standard choice for **name matching** in record linkage pipelines. The normalized score makes it easy to set thresholds (e.g., ≥ 0.92 = likely match).\n\n" +
    "Avoid it for long strings (use Levenshtein or Myers' diff), for cases where insertions and deletions matter more than transpositions (use Damerau-Levenshtein), or when you need an absolute edit count rather than a similarity ratio.",
};
