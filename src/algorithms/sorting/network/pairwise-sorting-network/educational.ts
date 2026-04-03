/**
 * Educational content for Pairwise Sorting Network.
 */
import type { EducationalContent } from "@/types";

export const pairwiseSortingNetworkEducational: EducationalContent = {
  overview:
    "**Pairwise Sorting Network** is a comparison network that first sorts all adjacent pairs, then uses a sequence of pairwise comparisons with doubling strides to merge everything into a fully sorted order.\n\nLike all sorting networks, the sequence of comparisons is determined before execution — making it fully parallelizable and data-oblivious. It has particularly elegant structure: sort pairs, then merge by doubling.",

  howItWorks:
    "The algorithm operates in two phases.\n\n" +
    "### Phase 1: Sort Adjacent Pairs\n" +
    "Compare and swap each adjacent pair `(0,1)`, `(2,3)`, `(4,5)`, etc.\n\n" +
    "### Phase 2: Pairwise Merge with Doubling Strides\n" +
    "For each doubling stride size:\n" +
    "1. Compare elements across the stride boundary between sorted blocks.\n" +
    "2. Perform a reconciliation pass within each block.\n\n" +
    "### Visualization for [5, 3, 8, 1, 4, 2]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Phase 1: Sort pairs → [3,5], [1,8], [2,4]"] --> B["Stride 2: Compare across boundaries"]\n' +
    '    B --> C["Reconcile within groups"]\n' +
    '    C --> D["Stride 4: Compare across boundaries"]\n' +
    '    D --> E["Reconcile → [1,2,3,4,5,8]"]\n' +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log²n)`**\n\n" +
    "- **Best Case:** `O(n log²n)` — fixed network; no input-dependent branching.\n" +
    "- **Average Case:** `O(n log²n)` — all comparators always fire.\n" +
    "- **Worst Case:** `O(n log²n)` — identical.\n\n" +
    "**Space Complexity: `O(1)`** — all comparisons happen in-place.\n\n" +
    "The parallel depth of the network is `O(log²n)`, enabling fast hardware execution.",

  bestAndWorstCase:
    "**Best case:** `O(n log²n)` — the network fires all comparators even on a pre-sorted array; no short-circuiting is possible.\n\n" +
    "**Worst case:** `O(n log²n)` — the deterministic, data-independent structure means best and worst case are identical. This is a feature: it prevents timing attacks in security-sensitive contexts.",

  realWorldUses: [
    "**Parallel sorting hardware:** Pairwise networks are used in network chips and FPGAs where comparators execute simultaneously.",
    "**GPU compute shaders:** Data-independent access patterns make it cache-friendly in GPU memory hierarchies.",
    "**Oblivious algorithms:** Used in secure multi-party computation where access patterns must not leak information.",
    "**Sorting networks research:** A standard building block in the study of optimal comparator circuits.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Simple pair-first structure:** Easier to reason about than Bitonic or Odd-Even networks.",
      "**In-place:** No auxiliary memory required for the comparison phase.",
      "**Data-oblivious:** Identical access pattern regardless of input values.",
    ],
    limitations: [
      "**Not optimal sequentially:** `O(n log²n)` is worse than `O(n log n)` for single-threaded use.",
      "**Reconciliation complexity:** The merge reconciliation phase adds code complexity compared to simple O(n²) sorts.",
      "**Not adaptive:** Cannot take advantage of partially sorted inputs.",
    ],
  },

  whenToUseIt:
    "Use **Pairwise Sorting Network** in parallel or hardware contexts where you need a clean, structured network with explicit pair-then-merge phases. It is particularly readable as an educational example of how sorting networks are constructed.\n\nFor CPU-bound single-threaded use, prefer Timsort or Introsort which adapt to data patterns.",
};
