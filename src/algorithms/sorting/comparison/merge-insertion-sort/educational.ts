/**
 * Educational content for Merge Insertion Sort (Ford-Johnson Algorithm).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Merge Insertion Sort. */
export const mergeInsertionSortEducational: EducationalContent = {
  overview:
    "**Merge Insertion Sort** (also called the **Ford-Johnson Algorithm**, published 1959) was designed with one specific goal: minimize the total number of comparisons needed to sort n elements.\n\nFor small values of n, it achieves a comparison count that matches or beats the information-theoretic lower bound of `⌈log₂(n!)⌉`. It combines **pairwise comparisons** (to efficiently organize elements), **recursive sorting** of the larger half, and **binary insertion** of the smaller elements in a carefully chosen order (using Jacobsthal numbers) to minimize insertions.",

  howItWorks:
    "The Ford-Johnson Algorithm proceeds in three phases:\n\n" +
    "### Phase 1: Pair and Orient\n" +
    "1. Compare each adjacent pair of elements.\n" +
    "2. Within each pair, ensure the larger element is 'promoted' and the smaller is 'deferred'.\n" +
    "3. This costs exactly `⌊n/2⌋` comparisons.\n\n" +
    "### Phase 2: Sort the Larger Elements\n" +
    "1. Take the larger element from each pair — these form the 'main chain'.\n" +
    "2. Recursively sort the main chain (here done with insertion sort for clarity).\n" +
    "3. Each deferred smaller element is now paired with its known larger companion already in the chain.\n\n" +
    "### Phase 3: Binary Insertion of Smaller Elements\n" +
    "1. Insert each deferred element into the sorted main chain using binary search.\n" +
    "2. Crucially, the order of insertion follows the **Jacobsthal sequence** (1, 3, 5, 11, 21, …) to maximize the search range reduction per comparison.\n\n" +
    "### Visualizing Ford-Johnson on [5, 2, 8, 1, 4]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["Pairs: (5,2), (8,1), unpaired: 4"] --> B["Larger: [5, 8], Smaller: [2, 1, 4]"]\n' +
    '    B --> C["Sort larger: [5, 8]"]\n' +
    '    C --> D["Insert 2 into [5,8] → [2,5,8]"]\n' +
    '    D --> E["Insert 1 → [1,2,5,8]"]\n' +
    '    E --> F["Insert 4 → [1,2,4,5,8]"]\n' +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "- **Best Case:** `O(n log n)` — sorting is never cheaper than the information-theoretic bound.\n" +
    "- **Average Case:** `O(n log n)` — but with a **smaller constant** than standard merge sort for small n.\n" +
    "- **Worst Case:** `O(n log n)` — the Jacobsthal insertion order guarantees that each smaller element is inserted using at most `⌈log₂(3k/4)⌉` comparisons for the k-th insertion.\n\n" +
    "**Comparison Count for small n:**\n" +
    "- n=2: 1 comparison (optimal)\n" +
    "- n=3: 3 comparisons (optimal)\n" +
    "- n=5: 7 comparisons (optimal)\n" +
    "- n=12: 30 comparisons (matches theoretical minimum)\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Requires O(n) auxiliary arrays for larger and smaller element sequences. Not in-place.",

  bestAndWorstCase:
    "**Best case** for Ford-Johnson is still `O(n log n)` — no comparison-based sort can do better than `⌈log₂(n!)⌉` comparisons in the worst case, which is `Θ(n log n)`. However, the constant factor is theoretically minimized by this algorithm.\n\n" +
    "**Worst case** occurs when the Jacobsthal insertion order forces many binary search steps per insertion. Despite this, the algorithm is still `O(n log n)` and for `n ≤ 11`, it achieves the exact comparison-theoretic minimum — something no other known algorithm achieves for all these sizes.\n\n" +
    "In practice, cache effects and implementation overhead mean faster algorithms like Tim Sort dominate real-world performance.",

  realWorldUses: [
    "**Theoretical computer science:** Ford-Johnson is the canonical example of comparison-optimal sorting, studied in algorithm theory courses.",
    "**Small fixed-size sorting networks:** For sorting exactly 5 or 11 items with the minimum number of comparisons — relevant in competitive programming and hardware design.",
    "**Comparison-constrained systems:** Domains where comparisons are physically expensive (e.g., expert-system evaluations, human judgment comparisons) benefit from minimizing their total count.",
    "**Academic foundations:** The Jacobsthal insertion sequence used in Ford-Johnson reappears in other algorithms and combinatorial contexts.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Theoretically optimal comparisons:** For small n, achieves or approaches the information-theoretic minimum comparison count.",
      "**Demonstrates algorithm design principles:** The combination of pairing, recursive sorting, and strategic insertion order is a masterclass in comparison minimization.",
      "**Educational value:** Introduces Jacobsthal numbers, binary insertion, and the relationship between comparison count and information theory.",
    ],
    limitations: [
      "**Poor cache performance:** Non-sequential memory access during binary insertion causes cache misses.",
      "**Complex Jacobsthal ordering:** The optimal insertion order requires precomputing the Jacobsthal sequence, adding implementation complexity.",
      "**Rarely optimal in practice:** Modern hardware favors algorithms with good cache behavior (Tim Sort) over those minimizing comparison count.",
      "**Extra space:** Requires O(n) auxiliary storage for the two element sequences.",
    ],
  },

  whenToUseIt:
    "Use **Merge Insertion Sort** when the cost of each comparison is extremely high — for example, sorting items by human judgment, running expensive simulations to compare outcomes, or sorting in systems where each comparison incurs network round-trips.\n\nAvoid it for general-purpose sorting where cache efficiency and simplicity matter more than comparison count minimization. Tim Sort and Merge Sort are better practical choices.",
};
