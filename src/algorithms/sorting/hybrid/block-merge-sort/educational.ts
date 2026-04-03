/**
 * Educational content for Block Merge Sort (GrailSort).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Block Merge Sort. */
export const blockMergeSortEducational: EducationalContent = {
  overview:
    "**Block Merge Sort** (also known as **GrailSort** or **WikiSort**) is an **in-place stable merge sort** that achieves `O(n log n)` time with `O(1)` auxiliary space — breaking the traditional trade-off between stability, in-place operation, and optimal time complexity.\n\nClassic Merge Sort requires `O(n)` extra memory for its merge buffer. Block Merge Sort sidesteps this by using **rotation-based merging**: instead of allocating a buffer, it rotates elements in-place, achieving stable sorting without extra memory.",

  howItWorks:
    "Block Merge Sort operates in two phases: **run detection** and **pairwise merging**.\n\n" +
    "### Phase 1: Find Natural Runs\n" +
    "1. Scan the array once to identify naturally ascending **runs** (already-sorted sub-sequences).\n" +
    "2. Record the start index of each new run — nearly-sorted input produces fewer, longer runs.\n\n" +
    "### Phase 2: Pairwise Merge with Rotation\n" +
    "3. Repeatedly merge adjacent run pairs until the full array is one sorted run.\n" +
    "4. Each merge uses a **rotation** instead of a buffer: when the left element is greater than the right, shift the right element left by rotating the in-between elements one step right.\n\n" +
    "### Visualizing Block Merge Sort\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Natural Runs\n" +
    "    A[11, 25, 64] --- B[12, 22, 34] --- C[90]\n" +
    "    end\n" +
    "    subgraph After Merging Runs 1 and 2\n" +
    "    D[11, 12, 22, 25, 34, 64] --- E[90]\n" +
    "    end\n" +
    "    subgraph Final\n" +
    "    F[11, 12, 22, 25, 34, 64, 90]\n" +
    "    end\n" +
    "    style A fill:#1d4ed8,stroke:#3b82f6\n" +
    "    style B fill:#1d4ed8,stroke:#3b82f6\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n)` — fully sorted input is one run; no merges needed.\n" +
    "- **Average Case:** `O(n log n)` — logarithmic number of merge passes, each `O(n)`.\n" +
    "- **Worst Case:** `O(n log n)` — reverse-sorted input produces `n` runs of length 1; standard merge behavior applies.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Rotation-based merging uses only a constant number of index variables — no merge buffer needed.",

  bestAndWorstCase:
    "**Best case** is a fully sorted or nearly-sorted array: run detection finds one long run spanning the whole array, and no merges are needed. This is `O(n)` — better than Merge Sort's `O(n log n)` in this scenario.\n\n" +
    "**Worst case** is a reverse-sorted array: `n` runs of length 1 are found, and the rotation-based merge requires `O(n)` work per element per pass — totaling `O(n log n)`. While asymptotically optimal, the rotation overhead makes it slower in practice than Merge Sort with a buffer.",

  realWorldUses: [
    "**Memory-constrained systems:** When `O(n)` merge buffer is unavailable but stability is required.",
    "**Embedded firmware:** Devices with limited RAM need stable in-place sorting for structured data.",
    "**Game engines:** Sorting render objects by Z-order without heap allocation.",
    "**Research in sorting theory:** Demonstrates the theoretical lower bound is achievable with `O(1)` space and stability simultaneously.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**`O(1)` auxiliary space** — true in-place operation, unlike standard Merge Sort.",
      "**Stable sort** — preserves relative order of equal elements.",
      "**`O(n log n)` worst case** — no degenerate inputs that cause quadratic behavior.",
      "**Adaptive** — exploits natural runs for faster performance on nearly-sorted data.",
    ],
    limitations: [
      "More complex to implement correctly than Merge Sort or Insertion Sort.",
      "Rotation-based merging has higher constant factors than buffer-based merging.",
      "Cache performance during rotations can be poor on large arrays.",
      "The simplified rotation-based variant here runs slower in practice than full GrailSort's buffer-block optimization.",
    ],
  },

  whenToUseIt:
    "Use **Block Merge Sort** when you need a **stable, in-place** sort with `O(n log n)` worst-case guarantees and cannot afford `O(n)` extra memory. It is the optimal choice for memory-constrained environments that require stability.\n\nFor general-purpose use where memory is available, Tim Sort or standard Merge Sort will be faster due to lower constant factors.",
};
