/**
 * Educational content for Bubble Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Bubble Sort. */
export const bubbleSortEducational: EducationalContent = {
  overview:
    "Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It gets its name because smaller elements 'bubble' to the top of the list.",

  howItWorks:
    "1. Start at the beginning of the array\n" +
    "2. Compare the first two adjacent elements\n" +
    "3. If the first element is greater than the second, swap them\n" +
    "4. Move to the next pair of adjacent elements and repeat\n" +
    "5. After one complete pass, the largest element is at the end\n" +
    "6. Repeat the process for the remaining unsorted portion\n" +
    "7. If no swaps occurred during a pass, the array is sorted (early exit)\n\n" +
    "Example with [5, 3, 8, 1]:\n" +
    "- Pass 1: [3, 5, 1, 8] → 8 bubbles to the end\n" +
    "- Pass 2: [3, 1, 5, 8] → 5 reaches its position\n" +
    "- Pass 3: [1, 3, 5, 8] → sorted!",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n" +
    "- Best case: O(n) — when the array is already sorted, only one pass with no swaps is needed\n" +
    "- Average case: O(n²) — on average, each element needs to be compared with many others\n" +
    "- Worst case: O(n²) — when the array is sorted in reverse order, every pair must be swapped\n\n" +
    "**Space Complexity:** O(1) — sorts in-place, only uses a single temporary variable for swapping",

  bestAndWorstCase:
    "**Best case** occurs when the input array is already sorted. The algorithm makes one pass through the array, detects no swaps were needed, and terminates early. This gives O(n) performance.\n\n" +
    "**Worst case** occurs when the input array is sorted in reverse order (e.g., [5, 4, 3, 2, 1]). Every adjacent pair needs to be swapped on every pass, resulting in the maximum number of comparisons and swaps: n(n-1)/2.",

  realWorldUses: [
    "Teaching sorting fundamentals — its simplicity makes it ideal for introducing sorting concepts",
    "Nearly sorted data detection — can quickly verify and fix almost-sorted datasets with O(n) performance",
    "Small dataset sorting in embedded systems where code simplicity matters more than performance",
    "Graphics rendering pipelines where objects need to be re-sorted after small position changes each frame",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extremely simple to understand and implement",
      "Stable sort — preserves the relative order of equal elements",
      "In-place — requires only O(1) additional memory",
      "Adaptive — performs well on nearly sorted data with early termination",
      "Easy to detect if the input is already sorted",
    ],
    limitations: [
      "O(n²) average and worst-case time complexity makes it impractical for large datasets",
      "Significantly slower than Merge Sort, Quick Sort, and other O(n log n) algorithms",
      "Performs poorly on reverse-sorted input",
      "Not suitable for datasets larger than a few hundred elements in practice",
    ],
  },

  whenToUseIt:
    "Use Bubble Sort when you need a simple, easy-to-implement sorting algorithm for small datasets (under ~50 elements), when the data is already nearly sorted, or in educational contexts to understand sorting fundamentals. Prefer Merge Sort or Quick Sort for larger datasets, and Insertion Sort for small datasets where a simple but slightly faster algorithm is acceptable.",
};
