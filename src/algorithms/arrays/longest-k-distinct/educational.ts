import type { EducationalContent } from "@/types";

export const longestKDistinctEducational: EducationalContent = {
  overview:
    "**Longest K-Distinct Subarray** finds the longest contiguous subarray that contains at most K distinct values.\n\n" +
    "This is the canonical **variable-size sliding window** problem. Unlike fixed-window variants, the right pointer expands greedily " +
    "while the left pointer advances only when the distinct count exceeds K — shrinking the window back to a valid state. " +
    "This two-pointer interplay processes every element at most twice, yielding an `O(n)` solution.",

  howItWorks:
    "1. Initialize a `frequencyMap`, left pointer `windowStart = 0`, and `maxLength = 0`.\n" +
    "2. **Expand** — for each `windowEnd` from 0 to n-1:\n" +
    "   - Add `arr[windowEnd]` to `frequencyMap` (increment its count).\n" +
    "3. **Shrink** — while `frequencyMap.size > maxDistinct`:\n" +
    "   - Decrement `frequencyMap[arr[windowStart]]`.\n" +
    "   - If the count reaches zero, delete the key (the element is no longer in the window).\n" +
    "   - Advance `windowStart`.\n" +
    "4. **Record** — the current window length is `windowEnd - windowStart + 1`; update `maxLength` and `bestStart` if it is larger.\n" +
    "5. Return `{ maxLength, startIndex: bestStart }`.\n\n" +
    "The invariant is that after the shrink phase, the window always contains at most K distinct values.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is added to the frequency map exactly once (when `windowEnd` reaches it).\n" +
    "- Each element is removed from the map at most once (when `windowStart` passes it).\n" +
    "- Total map operations: `O(2n) = O(n)`.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The frequency map holds at most `k + 1` distinct keys at any moment (one more than K triggers the shrink phase, which immediately removes one). " +
    "In practice the map size is bounded by `min(k, alphabetSize)`.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** All elements are identical. The window expands to the full array in one pass; the shrink loop never executes. " +
    "The answer is the entire array.\n\n" +
    "**Worst case — `O(n)`:** All elements are distinct and K = 1. Every expansion immediately triggers a shrink, but each element still enters and leaves the map at most once. " +
    "The total work remains `O(2n) = O(n)`.\n\n" +
    "The algorithm has no quadratic edge cases because the shrink loop's total iterations across the entire run is bounded by n — each element can only be evicted once.",

  realWorldUses: [
    "**Database query optimization:** Finding the longest run of rows sharing at most K distinct values in a column for GROUP BY optimization.",
    "**Text processing:** Locating the longest substring of a document containing at most K distinct words (vocabulary-bounded span).",
    "**Bioinformatics:** Finding the longest DNA segment containing at most K distinct nucleotides, useful for repeat-region analysis.",
    "**Streaming analytics:** Identifying the longest uninterrupted period in a time series where at most K distinct event types occurred.",
    "**Inventory management:** Finding the longest sales run where no more than K distinct product categories were sold, to identify focused demand periods.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear `O(n)` time — optimal for reading all input elements.",
      "Handles duplicate values correctly via frequency counting.",
      "Naturally extends to 'exactly K distinct' by subtracting results of 'at most K-1 distinct'.",
      "Works for any hashable element type, not just integers or characters.",
    ],
    limitations: [
      "Requires elements to be hashable — floating-point keys need normalization.",
      "Returns only the first longest window when ties exist; additional logic is needed to enumerate all.",
      "K = 0 is a degenerate case (empty subarray); callers should validate inputs.",
      "The `frequencyMap` requires `O(k)` space; for very large distinct element counts this is non-trivial.",
    ],
  },

  whenToUseIt:
    "Use Longest K-Distinct Subarray whenever a problem asks for the **longest contiguous segment with a bounded number of distinct values**. " +
    "It is the template solution for the entire family of 'longest subarray with constraint on distinct count' problems.\n\n" +
    "For the related problem 'minimum window containing all K distinct elements', use a shrink-first approach instead. " +
    "If K equals the alphabet size (no restriction on distinct count), the problem reduces to a simpler whole-array scan.",
};
