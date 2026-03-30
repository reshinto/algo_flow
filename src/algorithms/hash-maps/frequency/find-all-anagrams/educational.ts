import type { EducationalContent } from "@/types";

export const findAllAnagramsEducational: EducationalContent = {
  overview:
    "**Find All Anagrams** locates every starting index in a text string where a window of `pattern.length` characters is an anagram of the pattern. A naive approach checks every substring in `O(n * k)` time, but maintaining a **sliding window frequency map** reduces it to `O(n)`.\n\nBuild a frequency map for the pattern once, then slide a fixed-size window across the text, incrementally updating the window's frequency map and comparing it to the pattern's.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Build pattern frequency map**\n" +
    "Count each character in the pattern. This is `O(k)` where `k = pattern.length`.\n\n" +
    "**Phase 2 — Slide the window**\n" +
    "Maintain a `windowFreq` map. For each new right pointer:\n" +
    "1. **Expand** — increment count of the incoming character.\n" +
    "2. **Shrink** — once the window exceeds `k`, decrement count of the outgoing character (remove key if count reaches 0).\n" +
    "3. **Compare** — if the two maps are equal, record the window's start index.\n\n" +
    '### Example: `text = "cbaebabacd"`, `pattern = "abc"`\n\n' +
    "```\n" +
    "pattern_freq: { a:1, b:1, c:1 }\n\n" +
    'window [0..2] = "cba" → { c:1, b:1, a:1 } == pattern_freq → record 0\n' +
    'window [1..3] = "bae" → { b:1, a:1, e:1 } ≠ pattern_freq\n' +
    "...\n" +
    'window [6..8] = "bac" → { b:1, a:1, c:1 } == pattern_freq → record 6\n' +
    "result: [0, 6]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Building the pattern map is `O(k)`. The sliding window makes one pass over the text with `O(1)` map updates per step, and the map comparison is `O(k)` — but since `k` is fixed and bounded by the alphabet size, this is effectively `O(1)` for a fixed character set. Total: `O(n + k)`.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "Both frequency maps hold at most `k` entries, where `k` is the number of unique characters in the pattern.",

  bestAndWorstCase:
    "**Best case** — no anagram exists in the text: the window slides all the way without a match, completing in `O(n)` time.\n\n" +
    "**Worst case** — every window is an anagram (e.g. text = 'aaaa', pattern = 'a'): all `n - k + 1` positions are recorded. Still `O(n)` time since recording each result is `O(1)`.",

  realWorldUses: [
    "**Plagiarism detection:** Finding all windows of text that are permutations of a suspicious phrase.",
    "**Bioinformatics:** Locating all occurrences of a gene sequence (where base pair order within a window may vary) within a larger genome.",
    "**Password auditing:** Detecting rearranged versions of known weak passwords in large credential lists.",
    "**Competitive programming:** A canonical sliding-window frequency template used in dozens of substring problems.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal for finding all anagram windows in a single pass.",
      "O(k) space — only the pattern and window frequency maps are needed, not the full text.",
      "Naturally extends to any fixed-size window substring comparison problem.",
    ],
    limitations: [
      "Map comparison is O(alphabet size) per window — for Unicode text this can be non-trivial.",
      "Only finds exact anagrams (same characters, same counts) — near-matches require a different strategy.",
      "If the pattern is longer than the text, no windows exist and the algorithm returns immediately.",
    ],
  },

  whenToUseIt:
    "Use the sliding-window frequency map approach whenever you need all anagram windows in `O(n)` time. For a single existence check (`contains anagram?`) the same pattern applies with early termination. If the alphabet is small and fixed (e.g. lowercase letters), an integer array of size 26 is faster in practice than a hash map.",
};
