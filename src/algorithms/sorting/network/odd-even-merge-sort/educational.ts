/**
 * Educational content for Odd-Even Merge Sort.
 */
import type { EducationalContent } from "@/types";

export const oddEvenMergeSortEducational: EducationalContent = {
  overview:
    "**Odd-Even Merge Sort** is a parallel sorting algorithm invented by Ken Batcher in 1968. It is a *sorting network* — a fixed sequence of compare-and-swap operations whose wiring does not depend on the data.\n\nThe algorithm works by recursively merging odd-indexed and even-indexed sub-sequences, then performing a final reconciliation pass. This structure naturally exposes massive parallelism.",

  howItWorks:
    "Odd-Even Merge Sort builds a network of `O(log²n)` parallel stages.\n\n" +
    "### Core Idea: Odd-Even Merge\n" +
    "To merge two sorted sequences `A` and `B`:\n" +
    "1. Recursively merge the odd-indexed elements of `A` with odd-indexed of `B`.\n" +
    "2. Recursively merge the even-indexed elements of `A` with even-indexed of `B`.\n" +
    "3. Compare and swap adjacent pairs in the combined result.\n\n" +
    "### Visualization for [4, 2, 6, 1, 3, 5]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Split: [4,2,6] and [1,3,5]"] --> B["Merge odd-indexed elements"]\n' +
    '    A --> C["Merge even-indexed elements"]\n' +
    '    B --> D["Reconciliation: compare adjacent pairs"]\n' +
    "    C --> D\n" +
    '    D --> E["Sorted: [1,2,3,4,5,6]"]\n' +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log²n)`**\n\n" +
    "- **Best Case:** `O(n log²n)` — sorting network; comparisons are fixed regardless of input.\n" +
    "- **Average Case:** `O(n log²n)` — same; input has no effect on which comparators fire.\n" +
    "- **Worst Case:** `O(n log²n)` — identical to best and average.\n\n" +
    "**Space Complexity: `O(log²n)`** for the recursion stack (conceptually); `O(1)` in the iterative implementation.\n\n" +
    "The depth of the network is `O(log²n)`, which is the parallel execution time.",

  bestAndWorstCase:
    "**Best case:** `O(n log²n)` — the fixed network structure means all comparisons happen regardless of pre-sortedness.\n\n" +
    "**Worst case:** `O(n log²n)` — identical. Odd-Even Merge Sort is entirely *data-oblivious*: the exact same comparators execute in the exact same order no matter what the input values are. This property is crucial for security applications and hardware implementations.",

  realWorldUses: [
    "**Parallel hardware sorting:** Can be wired as a physical circuit where each comparator is a logic gate.",
    "**GPU texture sorting:** Used in graphics pipelines for sorting transparency layers by depth.",
    "**Oblivious RAM (ORAM):** The data-independence property prevents access-pattern leakage in secure computation.",
    "**Merge-tree query engines:** Database systems use Batcher's networks as a building block for sort-merge joins.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Data-oblivious:** Prevents timing and access-pattern side-channel attacks.",
      "**Highly parallelizable:** `O(log²n)` depth enables very fast parallel execution.",
      "**No padding needed:** Works on any array size, unlike Bitonic Sort's power-of-2 requirement.",
    ],
    limitations: [
      "**Worse than optimal sequentially:** `O(n log²n)` is worse than `O(n log n)` for single-threaded use.",
      "**Complex construction:** The comparator network is harder to implement correctly than simple comparison sorts.",
      "**Not in-place in recursive form:** Recursive decomposition may require auxiliary buffers.",
    ],
  },

  whenToUseIt:
    "Use **Odd-Even Merge Sort** when building sorting circuits for FPGAs or ASICs, or when you need a data-oblivious sort for cryptographic applications. It complements Bitonic Sort by supporting arbitrary input sizes without padding.\n\nAvoid it for general-purpose CPU sorting where Timsort or Introsort are significantly more cache-efficient.",
};
