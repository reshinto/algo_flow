import type { EducationalContent } from "@/types";

export const mergeSortedArraysEducational: EducationalContent = {
  overview:
    "**Merge Two Sorted Arrays** is a fundamental algorithm that combines two pre-sorted arrays into a single sorted array in linear time.\n\n" +
    "The key insight is to exploit the fact that both input arrays are already sorted. Rather than re-sorting from scratch, two pointers scan each array simultaneously, always picking the smaller front element. This is the same merge step used inside Merge Sort, and understanding it is foundational for comprehending divide-and-conquer sorting.",

  howItWorks:
    "1. Initialize a pointer at the start of each input array (`firstPointer = 0`, `secondPointer = 0`) and an empty result array.\n" +
    "2. **Compare** the elements at both pointers:\n" +
    "   - If `firstArray[firstPointer] <= secondArray[secondPointer]`, append the first array element to the result and advance `firstPointer`.\n" +
    "   - Otherwise, append the second array element and advance `secondPointer`.\n" +
    "3. Repeat until one pointer reaches the end of its array.\n" +
    "4. **Drain** any remaining elements from the non-exhausted array directly into the result (they are already sorted).\n\n" +
    "### Two-Pointer Walkthrough\n\n" +
    "```\n" +
    "firstArray:  [1, 3, 5]      secondArray: [2, 4, 6]\n" +
    "Step 1: Compare 1 vs 2 → take 1   merged: [1]\n" +
    "Step 2: Compare 3 vs 2 → take 2   merged: [1, 2]\n" +
    "Step 3: Compare 3 vs 4 → take 3   merged: [1, 2, 3]\n" +
    "Step 4: Compare 5 vs 4 → take 4   merged: [1, 2, 3, 4]\n" +
    "Step 5: Compare 5 vs 6 → take 5   merged: [1, 2, 3, 4, 5]\n" +
    "Step 6: Drain secondArray          merged: [1, 2, 3, 4, 5, 6]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Every element from both arrays is visited exactly once. `n` is the length of `firstArray`, `m` is the length of `secondArray`.\n" +
    "- The drain phase is bounded by the remaining elements and cannot exceed `n + m` total across all phases.\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "- The result array holds every element from both inputs. No in-place variant is possible without sacrificing the O(n+m) time bound when one array has insufficient extra capacity.",

  bestAndWorstCase:
    "**Best Case: `O(n + m)`** — Even if one array is entirely smaller than the other (all elements drain without a single cross-comparison), both arrays must still be traversed in full.\n\n" +
    "**Worst Case: `O(n + m)`** — When elements alternate perfectly between both arrays (e.g., `[1,3,5]` and `[2,4,6]`), every single element requires a comparison before placement.\n\n" +
    "Unlike sorting algorithms, merge has no best-case shortcut — the output size always equals `n + m`, and each position must be filled. The algorithm is optimal because no algorithm can produce a sorted merge of two arrays in less than `O(n + m)` time.",

  realWorldUses: [
    "**Merge Sort**: The core subroutine of the classic O(n log n) divide-and-conquer sorting algorithm.",
    "**External Sort**: Merging sorted chunks from disk when data is too large to fit in memory.",
    "**Database Query Engines**: Merging sorted result sets from two indexed table scans.",
    "**Version Control Systems**: Combining sorted lists of changed file paths from two branches.",
    "**Streaming Data Pipelines**: Merging two time-ordered event streams into a single chronological stream.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves optimal O(n + m) time — the theoretical lower bound for merging two sorted arrays.",
      "Stable merge: equal elements from `firstArray` always appear before equal elements from `secondArray`.",
      "Simple, cache-friendly linear scan with predictable memory access patterns.",
      "Forms the building block for more advanced algorithms like Merge Sort and external sort.",
    ],
    limitations: [
      "Requires O(n + m) extra space — no truly in-place linear-time merge exists for general inputs.",
      "Only useful when both input arrays are already sorted; random arrays require sorting first.",
      "Merging more than two arrays requires k-way merge (a heap-based generalization) for efficiency.",
    ],
  },

  whenToUseIt:
    "Use **Merge Two Sorted Arrays** whenever you need to combine pre-sorted data sources efficiently. Common signals:\n\n" +
    "- Two sorted lists from separate data sources need to be unified.\n" +
    "- You are implementing Merge Sort and need the merge step.\n" +
    "- Processing sorted database result sets or log streams in chronological order.\n\n" +
    "**Avoid it when** the inputs are not already sorted — sorting them first just to merge adds unnecessary overhead compared to sorting the concatenated array directly.",
};
