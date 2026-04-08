import type { EducationalContent } from "@/types";

export const uglyNumberIiEducational: EducationalContent = {
  overview:
    "**Ugly Number II** finds the `n`th number whose only prime factors are 2, 3, and 5. The sequence starts: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12…\n\nA **min-heap** drives the generation: extract the current minimum ugly number, multiply it by 2, 3, and 5 to generate candidates, insert unseen candidates back into the heap, and repeat `n` times. A deduplication set prevents duplicate insertions.",

  howItWorks:
    "The algorithm grows the ugly number sequence lazily using a min-heap:\n\n" +
    "1. **Initialize** — insert `1` into the heap and a seen-set.\n" +
    "2. **Repeat n times:**\n" +
    "   a. **Extract-min** — pop the smallest candidate from the heap (current ugly number).\n" +
    "   b. **Generate candidates** — multiply extracted value by 2, 3, and 5.\n" +
    "   c. **Deduplicate** — only insert candidates not already in the seen-set.\n" +
    "   d. **Sift-up** each inserted candidate to restore min-heap property.\n" +
    "3. **Return** the last extracted value — that is the nth ugly number.\n\n" +
    "### Trace for n=6 (expected: 6)\n\n" +
    "```\n" +
    "Heap: [1]  seen: {1}\n" +
    "Extract 1  → insert 2,3,5      Heap: [2,3,5]\n" +
    "Extract 2  → insert 4,6,10     Heap: [3,4,5,6,10]\n" +
    "Extract 3  → insert 6,9,15     Heap: [4,5,6,6,9,10,15]  (6 already in seen, skip)\n" +
    "Extract 4  → insert 8,12,20    Heap: [5,6,6,8,9,10,12,15,20]\n" +
    "Extract 5  → insert 10,15,25   Heap: [6,6,8,9,10,10,12,15,20,25]\n" +
    "Extract 6  → nth=6 → return 6\n" +
    "```\n\n" +
    "### Min-Heap After Extracting 1, 2, 3 (candidates pending)\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    r((4)) --> n5((5))\n" +
    "    r --> n6((6))\n" +
    "    n5 --> n9((9))\n" +
    "    n5 --> n10((10))\n" +
    "    n6 --> n15((15))\n" +
    "    style r fill:#f59e0b,stroke:#d97706\n" +
    "    style n5 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n6 fill:#14532d,stroke:#22c55e\n" +
    "    style n9 fill:#14532d,stroke:#22c55e\n" +
    "    style n10 fill:#14532d,stroke:#22c55e\n" +
    "    style n15 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The amber root (4) is next to be extracted. Cyan node (5) is the next candidate after that. Green nodes are settled candidates waiting their turn.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "Each of the `n` iterations performs one extract-min (O(log n) sift-down) and up to 3 inserts (O(log n) sift-up each). Total: O(n log n).\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The heap and seen-set together grow proportionally with `n` — in the worst case they can hold O(n) entries before the nth extraction completes.",

  bestAndWorstCase:
    "**Best case — `O(n log n)`:** There is no shortcutting; every iteration requires an extract and up to 3 inserts. The constant factor is small because at most 3 candidates are inserted per round.\n\n" +
    "**Worst case — `O(n log n)`:** Same as best case — the heap size grows by up to 2 per iteration (3 inserts − 1 extract, minus duplicates), so heap height stays `O(log n)` throughout.\n\n" +
    "**Alternative DP approach:** A three-pointer dynamic programming solution achieves O(n) time and O(n) space with no heap — preferred when memory is constrained.",

  realWorldUses: [
    "**Regular number generation:** Generating Hamming numbers (5-smooth numbers) used in digital signal processing and music theory (pure tuning ratios).",
    "**Regular expressions in automata:** Compiler theory uses smooth-number sequences to bound state-machine complexity.",
    "**Cryptographic key sizing:** Some cryptographic protocols select key sizes from sets of numbers with few prime factors for efficiency.",
    "**Database query optimization:** Query planners sometimes use sequences with controlled factorization to size buffer pools or hash tables.",
    "**Interview preparation:** A classic heap problem testing priority-queue reasoning and deduplication strategies.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Generates ugly numbers lazily in order — no need to check all integers up to the nth.",
      "Naturally extends to k-smooth numbers (arbitrary prime bases) by changing the factor list.",
      "Min-heap approach is simple to implement and easy to reason about correctness.",
    ],
    limitations: [
      "O(n log n) time and O(n) space — the DP three-pointer approach achieves O(n) time with the same space.",
      "Large candidates (currentUgly × 5) can overflow 32-bit integers for large n — use 64-bit integers.",
      "The deduplication set adds constant overhead per insertion; the DP approach avoids this entirely.",
    ],
  },

  whenToUseIt:
    "Use the heap approach for Ugly Number II when clarity and generalizability matter — it extends trivially to any set of prime factors. Switch to the three-pointer DP approach when n is large and performance is critical (O(n) vs O(n log n)). For very large n where the result itself is needed rather than the full sequence, consider a mathematical approximation.",
};
