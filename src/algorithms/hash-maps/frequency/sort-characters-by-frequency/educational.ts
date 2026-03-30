import type { EducationalContent } from "@/types";

export const sortCharactersByFrequencyEducational: EducationalContent = {
  overview:
    "**Sort Characters by Frequency** rearranges a string so that more-frequent characters appear first. A straightforward sort on characters costs `O(n log n)`, but using a **frequency map** followed by **bucket sort** can achieve `O(n)` time.\n\nFirst count every character's occurrences, then distribute characters into buckets indexed by frequency. Iterating the buckets from highest to lowest reconstructs the sorted string.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Build frequency map**\n" +
    "Scan every character and increment its count in a hash map. Each operation is `O(1)`, making the phase `O(n)` total.\n\n" +
    "**Phase 2 — Bucket sort reconstruction**\n" +
    "Create a `buckets` array of size `n + 1`. Place each character into `buckets[freq]`. Iterate from `buckets[n]` down to `buckets[1]`, appending each character repeated `freq` times to the result.\n\n" +
    '### Example: `text = "tree"`\n\n' +
    "```\n" +
    "freq_map: { t: 1, r: 1, e: 2 }\n" +
    "buckets:  [[], [t, r], [e], [], []]\n" +
    "          idx:  0    1    2   3   4\n" +
    "scan from bucket[4] → bucket[2]: append 'ee'\n" +
    "scan bucket[1]: append 't' then 'r' (or 'r' then 't')\n" +
    'result: "eetr" (or "eert")\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Building the frequency map is one linear pass. Filling and scanning the bucket array (size `n + 1`) is also `O(n)`. Reconstructing the string appends each character a total of `n` times across all buckets.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The frequency map holds at most the number of unique characters (bounded by `n`), and the bucket array has `n + 1` slots.",

  bestAndWorstCase:
    "**Best case** — all characters are identical: the frequency map has one entry and the reconstruction is a single `char.repeat(n)` operation in `O(n)` time.\n\n" +
    "**Worst case** — all characters are distinct: the frequency map has `n` entries, each with count 1, all in `buckets[1]`. The full scan and reconstruction still runs in `O(n)` time.",

  realWorldUses: [
    "**Text compression preprocessing:** Huffman coding assigns shorter codes to more-frequent characters; sorting by frequency is the first step in many implementations.",
    "**Search ranking:** Ordering autocomplete suggestions or search tokens by how often they appear in a corpus.",
    "**Log summarization:** Grouping and surfacing the most-repeated messages or event types in log analysis pipelines.",
    "**Natural language processing:** Frequency-based character sorting underlies tokenizer preprocessing and n-gram analysis.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time with bucket sort — faster than comparison-based sorting for large strings.",
      "Two-phase structure is easy to understand, test, and extend.",
      "Produces a deterministic result for characters with the same frequency (order within a bucket is insertion order).",
    ],
    limitations: [
      "O(n) extra space for the frequency map and bucket array.",
      "Multiple valid outputs exist when characters share frequency — not a stable canonical sort.",
      "For very short strings or small alphabets, a simple sort may be faster in practice due to lower constant factors.",
    ],
  },

  whenToUseIt:
    "Use frequency map + bucket sort when you need `O(n)` time and the character set is bounded. If only a canonical sorted output matters (not performance), Python's `sorted` with a frequency key or Java's `PriorityQueue` are simpler alternatives. When the alphabet is small and fixed (e.g. lowercase letters only), a fixed-size count array avoids hash map overhead.",
};
