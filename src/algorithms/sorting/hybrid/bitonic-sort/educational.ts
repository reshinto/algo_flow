/**
 * Educational content for Bitonic Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Bitonic Sort. */
export const bitonicSortEducational: EducationalContent = {
  overview:
    "**Bitonic Sort** is a comparison-based sorting algorithm built on a **sorting network** — a fixed sequence of compare-and-swap operations that always produces a sorted result, regardless of the input values.\n\nUnlike general-purpose sorts, the structure of Bitonic Sort's comparisons is **predetermined at compile time**. This makes it exceptionally well-suited for **parallel hardware** (GPUs, FPGAs, and sorting circuits) where all independent comparisons in a step can be executed simultaneously.",

  howItWorks:
    "Bitonic Sort works by building a **bitonic sequence** (one that first increases then decreases, or vice versa) and then merging it into a fully sorted sequence.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Process the array in stages: stage `s` handles sub-sequences of length `s`.\n" +
    "2. Within each stage, process in steps: step `t` compares elements `t` positions apart.\n" +
    "3. For each pair `(i, j = i XOR step)` where `j > i`:\n" +
    "   - If the pair is in an **ascending** sub-sequence and `arr[i] > arr[j]`: swap.\n" +
    "   - If the pair is in a **descending** sub-sequence and `arr[i] < arr[j]`: swap.\n" +
    "4. After all stages complete, the entire array is sorted.\n\n" +
    "### Visualizing Bitonic Stages for 8 elements\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Stage 2 - Sort pairs\n" +
    "    A[↑↓↑↓↑↓↑↓]\n" +
    "    end\n" +
    "    subgraph Stage 4 - Sort quads\n" +
    "    B[↑↑↓↓↑↑↓↓]\n" +
    "    end\n" +
    "    subgraph Stage 8 - Sort all ascending\n" +
    "    C[↑↑↑↑↑↑↑↑]\n" +
    "    end\n" +
    "    A --> B --> C\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The XOR-based partner pairing `j = i XOR step` ensures each element participates in exactly the right comparisons to form a sorted bitonic merge network.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log²n)`**\n\n" +
    "- **Best Case:** `O(n log²n)` — identical to worst case; the comparison sequence is fully fixed.\n" +
    "- **Average Case:** `O(n log²n)` — `log₂(n)` stages each with `log₂(n)` steps.\n" +
    "- **Worst Case:** `O(n log²n)` — no adaptive behavior; the network always executes all comparisons.\n\n" +
    "**Parallel Time Complexity: `O(log²n)`**\n\n" +
    "When all comparisons within a step run in parallel, the total parallel time is `O(log²n)`.\n\n" +
    "**Space Complexity: `O(1)` (sequential) or `O(n)` (padded)**\n\n" +
    "In-place for power-of-2 sizes. Padding to a power of 2 requires `O(n)` temporary space.",

  bestAndWorstCase:
    "**Best case and worst case are identical** — `O(n log²n)` comparisons always. Bitonic Sort is a **non-adaptive** algorithm: it performs the exact same comparison sequence regardless of the input values. Whether the array is sorted, reverse-sorted, or random, every compare-and-swap in the network executes.\n\n" +
    "This predictability is a feature in hardware contexts: fixed timing makes Bitonic Sort easy to pipeline and schedule in parallel processors. In software, the inability to short-circuit makes it slower than adaptive sorts like Tim Sort on nearly-sorted data.",

  realWorldUses: [
    "**GPU sort kernels:** CUDA and OpenCL implementations use Bitonic Sort because all operations in a step are data-independent and can be fully parallelized.",
    "**FPGA implementations:** The fixed comparison network maps directly onto hardware gates.",
    "**Database systems:** Used in GPU-accelerated sort-merge joins.",
    "**Embedded hardware sorters:** Predictable timing and power consumption make it attractive for real-time systems.",
    "**Research in parallel algorithms:** Bitonic Sort is the canonical example of an `O(log²n)` parallel sorting algorithm.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**`O(log²n)` parallel time** — optimal for fully parallel hardware.",
      "**Fixed comparison network:** Predictable, branch-free execution.",
      "**In-place** for power-of-2 input sizes.",
      "**Highly cache-friendly** on GPU shared memory due to stride access patterns.",
    ],
    limitations: [
      "**`O(n log²n)` sequential time** — slower than `O(n log n)` algorithms like Merge Sort.",
      "**Non-adaptive:** Cannot exploit existing order — always executes all comparisons.",
      "**Power-of-2 constraint:** Input must be padded for non-power-of-2 sizes, wasting comparisons.",
      "**Not stable:** The XOR-based partner selection can reorder equal elements.",
    ],
  },

  whenToUseIt:
    "Use **Bitonic Sort** when your execution environment supports **massive parallelism** — particularly GPU sort kernels, FPGAs, or custom hardware sorting circuits. Its `O(log²n)` parallel depth makes it the go-to algorithm when hardware threads outnumber input elements.\n\nAvoid it in sequential software — `O(n log²n)` comparisons are 33% more expensive than Merge Sort's `O(n log n)` on large inputs.",
};
