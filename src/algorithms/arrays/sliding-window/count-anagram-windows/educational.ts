import type { EducationalContent } from "@/types";

export const countAnagramWindowsEducational: EducationalContent = {
  overview:
    "**Count Anagram Windows** finds every position in a text where a window of the same length as a pattern is an anagram of that pattern.\n\n" +
    "Two sequences are anagrams of each other when they contain exactly the same elements with the same frequencies, regardless of order. " +
    "By encoding element frequencies in hash maps and sliding a fixed window across the text, the algorithm checks every candidate position in a single linear pass.",

  howItWorks:
    "1. Build a **frequency map** for the pattern, recording how many times each element appears.\n" +
    "2. Build a frequency map for the **first window** of the same length.\n" +
    "3. Compare the two maps — if equal, record position 0 as a match.\n" +
    "4. **Slide the window** one position at a time:\n" +
    "   - Decrement the count for the outgoing (left) element; remove it if count reaches zero.\n" +
    "   - Increment the count for the incoming (right) element.\n" +
    "5. After each slide, compare the window map with the pattern map.\n" +
    "6. Collect all matching start positions and return them with the total count.\n\n" +
    "### Why frequency maps?\n\n" +
    "Sorting both windows on every slide would cost `O(k log k)` per position, giving `O(n·k log k)` overall. " +
    "Maintaining an incremental frequency map reduces each slide to `O(1)`, yielding the optimal `O(n)` total.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Building the pattern frequency map: `O(k)` where k = pattern length.\n" +
    "- Building and sliding the window: `O(n)` — each element enters and leaves the map exactly once.\n" +
    "- Map comparison at each position: `O(k)` in the worst case, but since the map size is bounded by the number of distinct elements (at most k), this is effectively `O(1)` for fixed alphabets.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "Two frequency maps of size at most k (distinct elements in the pattern) are maintained simultaneously. " +
    "No additional data structures grow with the text length.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** Even if the very first window is a match and no further matches exist, the algorithm still slides through all remaining positions once to confirm — every element is touched exactly once.\n\n" +
    "**Worst case — `O(n)`:** All positions match (e.g., text = `[1, 1, 1, ...]`, pattern = `[1, 1]`). " +
    "The work per position remains constant regardless of match density, so the time cost stays linear.\n\n" +
    "The absence of an early-exit means the worst case never degrades below `O(n)`, which is also the lower bound for reading an input of size n — making this algorithm asymptotically optimal.",

  realWorldUses: [
    "**String matching:** Finding all positions of permutations of a keyword in a document or DNA sequence.",
    "**Plagiarism detection:** Identifying reordered passages with the same word-frequency fingerprint.",
    "**Network intrusion detection:** Detecting packet payload permutations matching known attack signatures.",
    "**Genomics:** Locating all positions in a genome where a subsequence has the same nucleotide composition as a known gene fragment.",
    "**Game development:** Detecting whether a shuffled set of tiles on a board matches a target configuration.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear `O(n)` time — optimal for this problem class.",
      "Constant extra space relative to text length (`O(k)` for pattern-bounded maps).",
      "Handles duplicate elements correctly via frequency counting rather than set membership.",
      "Easily generalizable to any comparable element type, not just characters.",
    ],
    limitations: [
      "Requires elements to be hashable — does not work directly with floating-point keys without normalization.",
      "Map equality comparison is `O(k)` per step; for very large alphabets this constant can be significant.",
      "Only finds contiguous windows — cannot detect scattered anagram subsequences.",
      "When pattern length equals text length, it degenerates to a single full-array frequency comparison.",
    ],
  },

  whenToUseIt:
    "Use Count Anagram Windows when you need to find **all positions** where a contiguous subarray (or substring) is a rearrangement of a given pattern. " +
    "It is the canonical solution for the 'find all anagram substrings' interview problem.\n\n" +
    "Prefer a **sorted-window approach** only when the element type is not hashable. " +
    "Prefer **Rabin-Karp rolling hash** when you need a single-pass solution over multiple patterns simultaneously.",
};
