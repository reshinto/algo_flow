/**
 * Educational content for Bitonic Sort Network.
 */
import type { EducationalContent } from "@/types";

export const bitonicSortNetworkEducational: EducationalContent = {
  overview:
    "**Bitonic Sort Network** is a parallel sorting algorithm based on a fixed, predetermined sequence of compare-and-swap operations called a *sorting network*. It works by constructing a **bitonic sequence** (first ascending then descending) and then repeatedly merging bitonic sequences into sorted ones.\n\nUnlike comparison-based sorts that adapt to input, every comparison in a sorting network is decided in advance — making it ideal for hardware implementation and GPU parallelism.",

  howItWorks:
    "Bitonic Sort constructs a sorting network with `O(log²n)` parallel stages.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Pad the array to the nearest power of 2 using sentinel values.\n" +
    "2. In Stage 1 (size 2): compare and sort each adjacent pair into alternating ascending/descending bitonic sequences.\n" +
    "3. In Stage 2 (size 4): merge pairs of bitonic sequences by comparing elements with stride 2, then stride 1.\n" +
    "4. Continue doubling the stage size until the full array is a single sorted sequence.\n" +
    "5. Remove padding sentinels from the result.\n\n" +
    "### Visualizing Bitonic Sort on [3, 7, 4, 8, 6, 2, 1, 5]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Stage 1: Sort pairs into bitonic sequences"] --> B["Stage 2: Merge into bitonic sequences of 4"]\n' +
    '    B --> C["Stage 3: Merge into bitonic sequences of 8"]\n' +
    '    C --> D["Stage 4: Final merge → sorted array"]\n' +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each stage doubles the size of the sorted region using a butterfly network of comparators.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log²n)`**\n\n" +
    "- **Best Case:** `O(n log²n)` — fixed network, no input-dependent branching.\n" +
    "- **Average Case:** `O(n log²n)` — identical to best; comparisons are predetermined.\n" +
    "- **Worst Case:** `O(n log²n)` — the comparison sequence never changes regardless of input.\n\n" +
    "**Space Complexity: `O(1)` auxiliary** (excluding the padding buffer for power-of-2 alignment)\n\n" +
    "The sort is in-place after padding. The number of comparators is exactly `n/2 × log²n`.",

  bestAndWorstCase:
    "**Best case** is `O(n log²n)` — even a pre-sorted array performs every comparison because the network structure is fixed at compile/design time.\n\n" +
    "**Worst case** is also `O(n log²n)` — identical to best. This predictability is precisely what makes sorting networks attractive for hardware: the circuit is identical for every input. The constant factor in parallel hardware is `O(log²n)` time steps when all comparators in a stage fire simultaneously.",

  realWorldUses: [
    "**GPU sorting:** Bitonic sort maps naturally to CUDA/OpenCL thread blocks — each comparator pair is an independent thread.",
    "**FPGA and ASIC hardware:** Fixed compare-swap sequences become fixed logic gates, achieving `O(log²n)` latency.",
    "**Database merge operations:** Used in query processing pipelines where hardware accelerators are available.",
    "**Networking hardware:** Line-rate packet schedulers use bitonic networks for real-time priority sorting.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Fully parallelizable:** All comparisons in a stage are independent and can fire simultaneously.",
      "**Oblivious algorithm:** Data-independent access pattern prevents timing side-channels.",
      "**Hardware friendly:** Fixed wiring makes it ideal for FPGA, ASIC, and GPU implementations.",
    ],
    limitations: [
      "**Power-of-2 requirement:** Arrays must be padded to the next power of 2, wasting space for non-power-of-2 sizes.",
      "**Sequential overhead:** Without parallel hardware, `O(n log²n)` is worse than `O(n log n)` algorithms like Merge Sort.",
      "**Not adaptive:** Cannot exploit nearly-sorted inputs for any performance gain.",
    ],
  },

  whenToUseIt:
    "Use **Bitonic Sort** when you have access to parallel hardware (GPU, FPGA, multi-core with SIMD) and need a predictable, data-oblivious sort. It excels when `n` is a power of 2 and all comparators can execute in parallel.\n\nAvoid it for sequential CPU sorting where `O(n log n)` algorithms like Timsort significantly outperform it, or when input size is unknown and padding overhead is unacceptable.",
};
