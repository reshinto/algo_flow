/**
 * Educational content for American Flag Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for American Flag Sort. */
export const americanFlagSortEducational: EducationalContent = {
  overview:
    "**American Flag Sort** is an in-place MSD (Most Significant Digit) radix sort that sorts integers by processing digits from most significant to least significant, permuting elements in-place within their digit buckets at each pass.\n\nThe name comes from an analogy to the Dutch National Flag problem — elements are segregated into groups based on their MSD, just as a flag is divided into color bands. Unlike standard radix sort which requires auxiliary arrays, American Flag Sort achieves true in-place sorting with only `O(d)` extra space for digit counts.",

  howItWorks:
    "American Flag Sort processes digits from most significant to least significant, sorting in-place at each level:\n\n" +
    "### Phase 1: Count Digit Frequencies\n" +
    "1. For the current digit position (starting at MSD), count how many elements have each digit value (0–9).\n" +
    "2. This produces a frequency array of length 10 (base 10).\n\n" +
    "### Phase 2: Compute Bucket Offsets\n" +
    "3. Convert the frequency counts to prefix sums — each entry becomes the starting index of that digit's bucket.\n\n" +
    "### Phase 3: In-Place Permutation\n" +
    "4. For each bucket, cycle through its elements. If an element belongs in this bucket, advance the pointer. If not, swap it to its correct bucket's current open slot.\n" +
    "5. This is a cycle-permutation — each element moves at most once per digit pass, like sorting colored beads into sections.\n\n" +
    "### Phase 4: Recurse on Sub-Buckets\n" +
    "6. After all buckets are populated, recursively sort each bucket using the next less-significant digit.\n" +
    "7. Recursion stops when a bucket has one element or all remaining digits are zero.\n\n" +
    "### Visualizing American Flag Sort on [64, 34, 25, 12, 22, 11, 90]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Input: 64 34 25 12 22 11 90] --> B[MSD pass: tens digit]\n" +
    "    B --> C[Digit 1: 12 11]\n" +
    "    B --> D[Digit 2: 25 22]\n" +
    "    B --> E[Digit 3: 34]\n" +
    "    B --> F[Digit 6: 64]\n" +
    "    B --> G[Digit 9: 90]\n" +
    "    C --> H[LSD pass: ones digit → 11 12]\n" +
    "    D --> I[LSD pass: ones digit → 22 25]\n" +
    "    H --> J[Result: 11 12 22 25 34 64 90]\n" +
    "    I --> J\n" +
    "    E --> J\n" +
    "    F --> J\n" +
    "    G --> J\n" +
    "```\n\n" +
    "- **MSD pass (tens digit):** Partition by tens: 1x → [11,12], 2x → [25,22], 3x → [34], 6x → [64], 9x → [90]\n" +
    "- **LSD pass (ones digit) on [11,12]:** 11 < 12, already ordered after permutation\n" +
    "- **LSD pass (ones digit) on [25,22]:** 22 < 25, swap to correct order",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n·d)`** where `d` is the number of digits in the maximum value.\n\n" +
    "- **Best Case:** `O(n·d)` — each digit pass is `O(n)` regardless of initial order.\n" +
    "- **Average Case:** `O(n·d)` — consistent performance independent of distribution.\n" +
    "- **Worst Case:** `O(n·d)` — same as best case; no data-dependent branching.\n\n" +
    "**Space Complexity: `O(d)`** — truly in-place!\n\n" +
    "Only the digit count arrays (size 10) and recursion stack (depth `d`) are needed. No auxiliary copy of the array is ever created, making this the most space-efficient radix sort variant.",

  bestAndWorstCase:
    "**Best case** is any input with a small number of significant digits — single-digit numbers need only one pass, two-digit numbers need two passes, etc. Uniformly distributed numbers of the same magnitude sort in `O(n)` wall-clock time.\n\n" +
    "**Worst case** occurs with numbers having many digits — for example, 32-bit integers require up to 10 decimal digit passes. The time per element is proportional to the number of digits, not the comparison count. There is no 'worst input' within a fixed digit count — American Flag Sort is non-adaptive: it always performs exactly `d` full passes.",

  realWorldUses: [
    "**Memory-Constrained Systems:** The true in-place property (`O(d)` extra space) makes it ideal for embedded systems or GPU kernels with limited memory bandwidth.",
    "**String Sorting:** The MSD approach naturally extends to sorting strings character by character, stopping recursion when sub-arrays reach a sorted state.",
    "**Database Key Sorting:** Sorting integer primary keys or composite keys where digit-by-digit partitioning maps to hierarchical key structures.",
    "**Radix Tries:** The bucket structure at each digit level mirrors trie nodes, making American Flag Sort a natural precursor to trie-based index construction.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**True in-place:** Only `O(d)` extra space — the only radix sort that avoids an auxiliary output array.",
      "**MSD-first:** Can short-circuit sub-sorts when sub-arrays are already ordered, unlike LSD radix sort.",
      "**Predictable performance:** `O(n·d)` regardless of input order — no comparison-count variance.",
    ],
    limitations: [
      "**Digit-count overhead:** Large integers (64-bit) require many passes, making it slower than comparison sorts for small arrays.",
      "**Integer-only:** Requires extracting digit positions — not directly applicable to floating-point, strings, or complex keys without adaptation.",
      "**Not stable:** The in-place permutation can change the relative order of elements with equal digit prefixes.",
      "**Recursion depth:** Deep recursion on many-digit numbers can cause stack pressure in resource-constrained environments.",
    ],
  },

  whenToUseIt:
    "Use **American Flag Sort** when you need to sort integers **in-place with minimal auxiliary memory** and the digit count is small (2–4 digits for typical use cases). It is the preferred choice when memory bandwidth is a constraint and stability is not required.\n\nAvoid it when: sorting non-integers, when stability is required, when integers span many orders of magnitude, or when comparison-based algorithms with cache-friendly patterns (like Timsort) are available.",
};
