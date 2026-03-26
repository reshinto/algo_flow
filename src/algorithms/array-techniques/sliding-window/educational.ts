/**
 * Educational content for the Sliding Window technique.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Sliding Window. */
export const slidingWindowEducational: EducationalContent = {
  overview:
    "The Sliding Window technique is an algorithmic pattern used to efficiently process contiguous subarrays or substrings of a fixed or variable size. Instead of recalculating the result for each possible subarray from scratch, the window slides across the data, incrementally updating the result by removing the element leaving the window and adding the element entering it. This reduces many O(n*k) brute-force problems to O(n).",

  howItWorks:
    "1. Compute the result (e.g., sum) for the first window of size k\n" +
    "2. Record this as the initial best result\n" +
    "3. Slide the window one position to the right:\n" +
    "   a. Subtract the element that just left the window (leftmost element of the previous window)\n" +
    "   b. Add the element that just entered the window (rightmost element of the new window)\n" +
    "4. Compare the new window's result with the current best and update if better\n" +
    "5. Repeat steps 3-4 until the window reaches the end of the array\n\n" +
    "Example with [2, 1, 5, 1, 3, 2], k=3:\n" +
    "- Window 1: [2, 1, 5] → sum = 8\n" +
    "- Window 2: [1, 5, 1] → sum = 8 - 2 + 1 = 7\n" +
    "- Window 3: [5, 1, 3] → sum = 7 - 1 + 3 = 9 (new max!)\n" +
    "- Window 4: [1, 3, 2] → sum = 9 - 5 + 2 = 6\n" +
    "- Result: max sum = 9, starting at index 2",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n" +
    "- Best case: O(n) — always scans through the entire array once\n" +
    "- Average case: O(n) — each element is added and removed from the window exactly once\n" +
    "- Worst case: O(n) — same linear scan regardless of input values\n\n" +
    "**Space Complexity:** O(1) — only a constant number of variables are used (current sum, max sum, window start index). No additional data structures are needed beyond the input array.",

  bestAndWorstCase:
    "**Best case** and worst case are both O(n) for the fixed-size sliding window. The algorithm always processes every element exactly once regardless of the input values. Even if the maximum is found at the very first window, the algorithm continues scanning to confirm no better window exists.\n\n" +
    "**Comparison with brute force:** The naive approach of computing the sum of every possible subarray of size k requires O(n*k) time. For an array of 1,000,000 elements with k=1000, brute force needs ~1 billion operations while sliding window needs only ~1 million — a 1000x improvement.",

  realWorldUses: [
    "Network throughput monitoring — computing moving averages of packet rates over fixed time windows",
    "Financial analysis — calculating rolling averages, moving sums, and sliding min/max for stock prices",
    "Genomics — finding patterns in DNA sequences by sliding a window of fixed length across the genome",
    "Streaming data processing — maintaining statistics over the most recent k events in real-time systems",
    "Text processing — finding the densest substring of a given length in document analysis",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Reduces O(n*k) brute force to O(n) time — dramatic improvement for large window sizes",
      "Extremely memory efficient — only O(1) extra space needed",
      "Simple to implement and understand once the pattern is recognized",
      "Easily adaptable to different aggregate functions (sum, max, min, average)",
      "Works well with streaming data where elements arrive one at a time",
    ],
    limitations: [
      "Only applicable to problems involving contiguous subarrays or substrings",
      "Fixed-size window variant cannot handle problems where the optimal window size is unknown",
      "Not suitable for problems requiring non-contiguous element selection",
      "For more complex window conditions, the variable-size variant adds implementation complexity",
      "Cannot efficiently handle operations that are not incrementally computable (e.g., median without additional data structures)",
    ],
  },

  whenToUseIt:
    "Use the sliding window technique whenever you need to find or compute something among all contiguous subarrays of a given size (fixed window) or satisfying some condition (variable window). Common signals include phrases like 'maximum sum subarray of size k', 'smallest subarray with sum >= target', or 'longest substring with at most k distinct characters'. If the problem involves non-contiguous elements or requires global optimization, consider other techniques like dynamic programming or two pointers.",
};
