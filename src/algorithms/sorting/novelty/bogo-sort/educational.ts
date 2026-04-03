/**
 * Educational content for Bogo Sort.
 */
import type { EducationalContent } from "@/types";

export const bogoSortEducational: EducationalContent = {
  overview:
    "**Bogo Sort** (also known as Stupid Sort, Shotgun Sort, or Permutation Sort) is a joke sorting algorithm that works by randomly shuffling an array until it happens to be sorted.\n\nIt has an expected `O(n · n!)` time complexity — astronomically worse than any practical sorting algorithm. For reference, sorting just 13 elements would take an expected 80 billion operations.",

  howItWorks:
    "### The Algorithm\n" +
    "1. Check if the array is sorted.\n" +
    "2. If not, randomly shuffle the entire array.\n" +
    "3. Go to step 1.\n\n" +
    "It's that simple — and that terrible.\n\n" +
    "### Why It (Eventually) Works\n" +
    "There are `n!` permutations of an `n`-element array. Exactly one of them is sorted. Each random shuffle has a `1/n!` chance of producing the sorted permutation. Given infinite time, it will eventually succeed.\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Start"] --> B["Is array sorted?"]\n' +
    '    B -->|Yes| C["Done!"]\n' +
    '    B -->|No| D["Randomly shuffle"]\n' +
    "    D --> B\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style D fill:#7f1d1d,stroke:#ef4444\n" +
    "```\n\n" +
    "This visualization uses a seeded PRNG (seed=42) so the shuffle sequence is deterministic and reproducible. Capped at 100 iterations.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n · n!)` expected**\n\n" +
    "- Each shuffle costs `O(n)` and each check costs `O(n)`.\n" +
    "- Expected number of shuffles to find a sorted permutation: `n!`\n" +
    "- **Best Case:** `O(n)` — the array is already sorted on the first check.\n" +
    "- **Average Case:** `O(n · n!)` — expected value over all possible shuffle sequences.\n" +
    "- **Worst Case:** `O(∞)` — theoretically unbounded; in practice capped.\n\n" +
    "**Space Complexity: `O(1)`** — sorting is in-place (only a temp variable for swaps).",

  bestAndWorstCase:
    "**Best case:** `O(n)` — the input is already sorted, so the first check returns true immediately.\n\n" +
    "**Worst case:** Unbounded — there is no guarantee that any finite sequence of shuffles will hit the sorted permutation. This makes Bogo Sort non-terminating in the strict sense. Practical implementations add an iteration cap (this visualization uses 100 iterations).",

  realWorldUses: [
    "**Education:** The canonical example of a 'correct but impractical' algorithm — teaches that correctness and efficiency are separate concerns.",
    "**Complexity demonstrations:** Used to illustrate `O(n!)` space of permutations and why exhaustive random search is catastrophically inefficient.",
    "**Humor:** Appears in programming humor lists as the 'worst sorting algorithm ever'.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Correct:** Given enough time, it always produces a correctly sorted output.",
      "**Simple:** The logic is trivially easy to understand and implement.",
      "**O(1) space:** No auxiliary data structures needed.",
    ],
    limitations: [
      "**O(n · n!) expected time:** For 10 elements, expected time is ~36 million shuffles.",
      "**Non-terminating:** Without a cap, it may never finish.",
      "**Not reproducible without seeding:** Results vary between runs without a fixed PRNG seed.",
    ],
  },

  whenToUseIt:
    "**Never use Bogo Sort for real work.** It is an algorithmic joke, and its `O(n · n!)` expected complexity makes it unusable for any practical input size.\n\nIts educational value is as an extreme contrast to efficient algorithms: showing that 'try random things until it works' is the worst possible strategy for sorting.",
};
