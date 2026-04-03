/**
 * Educational content for Bozo Sort.
 */
import type { EducationalContent } from "@/types";

export const bozoSortEducational: EducationalContent = {
  overview:
    "**Bozo Sort** is a variant of Bogo Sort that differs in one key way: instead of shuffling the entire array randomly, it randomly swaps just *two* elements and checks if the array is now sorted.\n\nWhile this sounds marginally more targeted than Bogo Sort, it has the same catastrophic `O(n · n!)` expected complexity — swapping two random elements is not significantly more likely to produce a sorted array than a full shuffle.",

  howItWorks:
    "### The Algorithm\n" +
    "1. Check if the array is sorted.\n" +
    "2. If not, randomly pick two distinct indices and swap those elements.\n" +
    "3. Go to step 1.\n\n" +
    "### Difference from Bogo Sort\n" +
    "- **Bogo Sort:** Completely reshuffles the entire array each iteration.\n" +
    "- **Bozo Sort:** Makes one targeted random swap each iteration.\n\n" +
    "Neither strategy is meaningfully better — both have `O(n!)` expected iterations.\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Start"] --> B["Is array sorted?"]\n' +
    '    B -->|Yes| C["Done!"]\n' +
    '    B -->|No| D["Pick 2 random indices"]\n' +
    '    D --> E["Swap those 2 elements"]\n' +
    "    E --> B\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style D fill:#7f1d1d,stroke:#ef4444\n" +
    "```\n\n" +
    "This visualization uses a seeded PRNG (seed=42) for reproducibility. Capped at 200 iterations.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n · n!)` expected**\n\n" +
    "- Each iteration costs `O(n)` for the sorted check plus `O(1)` for the random swap.\n" +
    "- Expected iterations: `O(n!)` — same as Bogo Sort.\n" +
    "- **Best Case:** `O(n)` — already sorted.\n" +
    "- **Average Case:** `O(n · n!)`.\n" +
    "- **Worst Case:** `O(∞)` — no termination guarantee.\n\n" +
    "**Space Complexity: `O(1)`** — in-place sorting.",

  bestAndWorstCase:
    "**Best case:** `O(n)` — array is already sorted; first check returns true immediately.\n\n" +
    "**Worst case:** Unbounded — each random swap has only a tiny chance of improving the sort order. Unlike algorithms that make monotonic progress, Bozo Sort can undo previous progress with each swap, potentially running forever without the iteration cap.",

  realWorldUses: [
    "**Education:** Demonstrates the futility of random local search for sorting.",
    "**Contrast with local search algorithms:** Shows why problem structure matters — random 2-opt moves are powerful for TSP but useless for sorting.",
    "**Algorithmic humor:** A staple of worst-algorithm discussions alongside Bogo Sort and Stooge Sort.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**O(1) per-iteration cost:** Each swap is cheaper than Bogo Sort's O(n) full shuffle.",
      "**Correct (with cap removed):** Given infinite time, random swaps will eventually hit the sorted permutation.",
    ],
    limitations: [
      "**O(n · n!) expected:** Same asymptotic performance as Bogo Sort despite cheaper iterations.",
      "**Can undo progress:** Each random swap may move elements away from sorted order.",
      "**Non-terminating:** Without an iteration cap, it may never finish.",
    ],
  },

  whenToUseIt:
    "**Never use Bozo Sort.** It has the same catastrophic expected complexity as Bogo Sort. The only meaningful difference is a smaller constant per iteration — which provides no asymptotic benefit.\n\nAs an educational tool, it is useful for demonstrating that 'smaller operations' does not mean 'better algorithm' when the iteration count is still `O(n!)`.",
};
