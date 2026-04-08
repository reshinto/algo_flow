/** Educational content for Character Frequency Sort — all 7 required sections. */

import type { EducationalContent } from "@/types";

export const characterFrequencySortEducational: EducationalContent = {
  overview:
    "**Character Frequency Sort** rearranges a string so that characters appearing most often come first, with ties resolved in any consistent order.\n\n" +
    "For example, `\"tree\"` becomes `\"eert\"` or `\"eetr\"` because `'e'` appears twice while `'t'` and `'r'` each appear once.\n\n" +
    "The algorithm uses a **frequency map** to count occurrences, then a **bucket sort** indexed by frequency to reconstruct the output in O(n) time — avoiding the O(n log n) cost of comparison-based sorting.",

  howItWorks:
    "The algorithm runs in three phases:\n\n" +
    "**Phase 1 — Count character frequencies** (O(n)):\n\n" +
    "Iterate over every character in the input string and record how many times each character appears:\n\n" +
    '```\ntext = "tree"\nfrequencyMap = { t:1, r:1, e:2 }\n```\n\n' +
    "**Phase 2 — Bucket sort by frequency** (O(n)):\n\n" +
    "Create an array of buckets where `buckets[freq]` holds all characters that appear `freq` times. The maximum possible frequency is `n` (all characters the same):\n\n" +
    "```\nbuckets[1] = ['t', 'r']\nbuckets[2] = ['e']\n```\n\n" +
    "**Phase 3 — Rebuild output from high to low frequency** (O(n)):\n\n" +
    "Walk the buckets array from index `n` down to `1`. For each character in each bucket, append it to the result `freq` times:\n\n" +
    '```\nresult = "ee" + "t" + "r" = "eetr"\n```\n\n' +
    '### Example: Sorting `"tree"`\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Input["Input: tree"]\n' +
    '        T["t"] --> R["r"] --> E1["e"] --> E2["e"]\n' +
    "    end\n" +
    '    subgraph Buckets["Buckets by freq"]\n' +
    '        B1["freq=1: t, r"]\n' +
    '        B2["freq=2: e"]\n' +
    "    end\n" +
    '    subgraph Output["Output (high→low)"]\n' +
    '        O1["ee"] --> O2["t"] --> O3["r"]\n' +
    "    end\n" +
    "    Input --> Buckets --> Output\n" +
    "    style B2 fill:#14532d,stroke:#22c55e\n" +
    "    style B1 fill:#f59e0b,stroke:#d97706\n" +
    "    style O1 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    'Bucket `freq=2` (green) is emitted first, producing `"ee"`, then `freq=1` characters (amber) are appended one at a time.\n\n' +
    "Because bucket sort never compares characters against each other, the whole algorithm runs in linear time.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "All three phases iterate over the input or the frequency table exactly once. The bucket sort sweep is bounded by the input length `n`, not the alphabet size — even with a large Unicode alphabet, only buckets with content are visited.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The frequency map holds at most as many entries as there are distinct characters (at most `n`). The bucket array has `n + 1` slots. The output string is length `n`. All three scale linearly with input size.",

  bestAndWorstCase:
    "**Best case** — `O(n)`: the input is empty or contains only one distinct character. The frequency map has a single entry and the bucket sweep terminates immediately at the highest bucket.\n\n" +
    "**Worst case** — `O(n)`: all characters are distinct. The frequency map has `n` entries, all in bucket `[1]`, and the rebuild phase appends each character once — still linear.\n\n" +
    "Unlike comparison-based sorts, there is no logarithmic factor: the algorithm is strictly `O(n)` in all cases.",

  realWorldUses: [
    "**Data compression:** Huffman encoding requires characters sorted by frequency; this algorithm provides the sorted order as a preprocessing step.",
    "**Text analysis:** Ranking characters by prevalence surfaces the most-used letters in a document or codebase.",
    "**Lossless run-length encoding:** Grouping repeated characters together maximises run lengths before RLE compression.",
    "**Game word builders:** Sorting available tiles by frequency helps heuristics that prioritize placing the most abundant letters first.",
    "**Cache-friendly encoding:** Assigning shorter bit patterns to higher-frequency characters (Huffman, Shannon-Fano) requires this sort as a prerequisite.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "True O(n) time — bucket sort eliminates the O(n log n) lower bound of comparison-based sorting.",
      "Simple implementation: two passes and one linear sweep over the bucket array.",
      "Works for any character set (ASCII, Unicode) by using a hash map rather than a fixed-size array.",
    ],
    limitations: [
      "Uses O(n) extra space for the frequency map, bucket array, and output string — not an in-place algorithm.",
      "Output is not lexicographically stable for characters with equal frequency; tie-breaking order depends on map iteration order.",
      "For very short strings, the constant factors of hashing may outweigh the theoretical advantage over O(n log n) comparison sorts.",
    ],
  },

  whenToUseIt:
    "Use Character Frequency Sort whenever you need to reorder a string by character frequency and O(n) time is required or preferred.\n\n" +
    "It is the canonical solution for LeetCode 451 ('Sort Characters By Frequency') and similar interview problems. Prefer it over `Array.sort` on character pairs when the input can be large.\n\n" +
    "Avoid it when you also need lexicographic tie-breaking within the same frequency tier, since the bucket sweep does not guarantee any specific order among equal-frequency characters without an additional sort pass.",
};
