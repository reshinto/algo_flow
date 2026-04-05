import type { EducationalContent } from "@/types";

export const boyerMooreSearchEducational: EducationalContent = {
  overview:
    "**Boyer-Moore Pattern Matching** finds the first occurrence of a pattern string inside a text string. " +
    "It is often the fastest practical string-search algorithm in real-world settings because it can skip large chunks of text without examining every character.\n\n" +
    "This implementation uses the **bad character heuristic**: when a mismatch occurs, the algorithm looks up the mismatched text character in a pre-built table and shifts the pattern far enough right so the nearest occurrence of that character in the pattern aligns with it. " +
    "On typical English text with long patterns, this allows the pattern to advance by multiple positions per comparison, giving **sub-linear** average performance.",

  howItWorks:
    "Boyer-Moore runs in two phases:\n\n" +
    "**Phase 1 — Build the bad character table** (O(m)):\n\n" +
    "Scan the pattern left-to-right and record the **rightmost position** of each character. " +
    "If a character never appears in the pattern, its table entry is `-1`.\n\n" +
    "```\n" +
    "Pattern:  A  B  C\n" +
    "Index:    0  1  2\n" +
    "badChar:  A→0, B→1, C→2  (all others → -1)\n" +
    "```\n\n" +
    "**Phase 2 — Search** (right-to-left character comparisons):\n\n" +
    "1. Align the pattern at the current offset in the text.\n" +
    "2. Compare pattern characters **right-to-left** against the text.\n" +
    "3. **Match** — the character matches; move one position left in the pattern.\n" +
    "4. **Full match** — all pattern characters matched; pattern found.\n" +
    "5. **Mismatch** — look up the mismatched text character in the bad character table. " +
    "Shift the pattern right by `max(1, patternIdx - badChar[mismatchChar])`.\n\n" +
    "The shift formula aligns the rightmost occurrence of the mismatched character in the pattern with the mismatched text character, or advances past it entirely if the character is not in the pattern.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- Best case: `O(n/m)` — on large alphabets with long patterns, the algorithm frequently skips `m` characters at a time, reading only `n/m` text characters in total.\n" +
    "- Average case: `O(n)` — typical inputs see significant skipping; each text character is examined once on average.\n" +
    "- Worst case: `O(nm)` — on highly repetitive text and pattern (e.g., `text = 'AAAA...A'`, `pattern = 'AA'`) the bad character heuristic provides no skip and every position is checked character by character. (The full Boyer-Moore with good suffix rule reduces this to `O(n)`.)\n\n" +
    "**Space Complexity: `O(σ)`**\n\n" +
    "Only the bad character table of size σ (distinct pattern characters) is allocated — O(m) in the worst case.",

  bestAndWorstCase:
    "**Best case** — large alphabet, long pattern, no repeated characters: `O(n/m)`. " +
    "On each alignment attempt, the very first (rightmost) comparison mismatches, and the bad character table shifts the pattern by nearly its full length. " +
    "Only `n/m` alignments are needed, each costing `O(1)` comparisons.\n\n" +
    "**Worst case** — small alphabet with highly repetitive input (e.g., `text = 'AAAA...A'`, `pattern = 'AAAB'`): `O(nm)`. " +
    "The bad character shift is always 1 because the mismatched character appears everywhere in the pattern, so every text position is compared against every pattern character — identical to the naïve algorithm. " +
    "Adding the good suffix rule (omitted here for clarity) restores an `O(n)` worst case.",

  realWorldUses: [
    "**grep / ripgrep:** Boyer-Moore (often Boyer-Moore-Horspool, a simplified variant) is the default engine for single-pattern searches in text files.",
    "**Text editors (Find & Replace):** Fast jump-ahead behaviour makes Boyer-Moore feel instant on megabyte documents.",
    "**Antivirus signature scanning:** Skipping large portions of binary blobs dramatically reduces scan time for long virus signatures.",
    "**Network intrusion detection:** Deep packet inspection engines use Boyer-Moore variants to find malicious payloads in high-throughput streams.",
    "**Database engines:** Full-text search within BLOB columns uses Boyer-Moore to avoid full sequential scans.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Sub-linear average case — often the fastest practical algorithm for single-pattern search on natural language or binary data.",
      "No extra memory proportional to text length — only O(σ) for the bad character table.",
      "Right-to-left comparison catches mismatches early with long patterns, maximising skip distance.",
    ],
    limitations: [
      "Worst-case O(nm) with bad character rule alone — the full algorithm (good suffix + bad character) is more complex to implement.",
      "Less effective on small alphabets (e.g., DNA: A/C/G/T) where every character appears frequently in the pattern.",
      "O(m) preprocessing may not be worthwhile for a single search of a very short pattern.",
    ],
  },

  whenToUseIt:
    "Choose Boyer-Moore (or Boyer-Moore-Horspool) when you need fast single-pattern search on long text with a large alphabet — this is the algorithm behind most production `grep`-style tools. " +
    "Prefer KMP or Aho-Corasick when the alphabet is tiny (DNA), when multiple patterns must be found simultaneously, or when a strict `O(n)` worst-case guarantee is required (e.g., adversarial inputs in security contexts). " +
    "For most interactive search-in-file tasks, Boyer-Moore's sub-linear average performance makes it the default choice.",
};
