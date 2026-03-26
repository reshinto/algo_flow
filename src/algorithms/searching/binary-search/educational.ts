/**
 * Educational content for Binary Search.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Binary Search. */
export const binarySearchEducational: EducationalContent = {
  overview:
    "Binary Search is an efficient divide-and-conquer algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half, comparing the middle element with the target, and eliminating the half where the target cannot lie. This logarithmic approach makes it dramatically faster than linear search for large datasets.",

  howItWorks:
    "1. Start with the entire sorted array as the search range\n" +
    "2. Calculate the middle index of the current range\n" +
    "3. Compare the middle element with the target value\n" +
    "4. If the middle element equals the target, return its index\n" +
    "5. If the middle element is less than the target, search the right half\n" +
    "6. If the middle element is greater than the target, search the left half\n" +
    "7. Repeat until the target is found or the search range is empty\n\n" +
    "Example searching for 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]:\n" +
    "- Mid=16: 16 < 23, search right half [23, 38, 56, 72, 91]\n" +
    "- Mid=56: 56 > 23, search left half [23, 38]\n" +
    "- Mid=23: found at index 5!",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n" +
    "- Best case: O(1) — when the target is at the exact middle of the array on the first check\n" +
    "- Average case: O(log n) — each comparison eliminates half of the remaining elements\n" +
    "- Worst case: O(log n) — the target is at the boundary or not present, requiring log2(n) comparisons\n\n" +
    "**Space Complexity:** O(1) — the iterative version uses only a constant number of variables (low, high, mid) regardless of input size",

  bestAndWorstCase:
    "**Best case** occurs when the target value is at the exact middle of the array. A single comparison is needed, giving O(1) performance.\n\n" +
    "**Worst case** occurs when the target is not in the array, or is at one of the extreme ends. The algorithm must halve the search space repeatedly until only one element remains, requiring log2(n) comparisons. For example, searching for 91 in a 1000-element array requires at most 10 comparisons (since log2(1000) ~ 10).",

  realWorldUses: [
    "Database indexing — B-trees and B+ trees use binary search principles for efficient record lookups",
    "Dictionary and phone book lookups — finding entries in any sorted collection",
    "Version control bisecting — git bisect uses binary search to find the commit that introduced a bug",
    "IP routing tables — routers use binary search to find the best matching route prefix",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extremely efficient O(log n) time complexity — searching 1 billion elements takes at most ~30 comparisons",
      "Very low O(1) space complexity with the iterative approach",
      "Simple to implement and reason about",
      "Predictable performance — worst case is still O(log n)",
      "Well-suited for read-heavy workloads on static sorted data",
    ],
    limitations: [
      "Requires the input array to be sorted — sorting first costs O(n log n) if not already sorted",
      "Not efficient for small arrays where linear search has less overhead",
      "Difficult to apply to linked lists due to lack of random access",
      "Insertion and deletion in a sorted array are expensive (O(n)) if the data changes frequently",
    ],
  },

  whenToUseIt:
    "Use Binary Search when you have a sorted array and need to find elements quickly, especially for large datasets where linear search would be too slow. It is ideal for read-heavy scenarios with infrequent updates. If the data is unsorted and cannot be pre-sorted, or if the dataset is very small (under ~10 elements), a simple linear scan may be more practical. For dynamic datasets with frequent insertions and deletions, consider balanced search trees or hash tables instead.",
};
