/**
 * Educational content for Slow Sort.
 */
import type { EducationalContent } from "@/types";

export const slowSortEducational: EducationalContent = {
  overview:
    "**Slow Sort** is a sorting algorithm intentionally designed to be as slow as possible while remaining correct. Created by Andrei Broder and Jorge Stolfi, it is based on the *multiply and surrender* paradigm — the anti-thesis of divide and conquer.\n\nIt has super-polynomial complexity: `O(n^(log n / (1 + log φ)))` where φ is the golden ratio, making it asymptotically slower than any polynomial-time algorithm.",

  howItWorks:
    "### Multiply-and-Surrender Strategy\n\n" +
    "Given a subarray from `startIndex` to `endIndex`:\n" +
    "1. Find the midpoint.\n" +
    "2. Recursively sort the **first half** (to place its maximum at the midpoint).\n" +
    "3. Recursively sort the **second half** (to place its maximum at endIndex).\n" +
    "4. **Compare** the two maximums: if the first-half max is larger, swap it to endIndex.\n" +
    "5. The overall maximum is now at endIndex — it's in its final position.\n" +
    "6. Recursively sort everything **except** the last element.\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["slowSort([5,3,1,4,2])"] --> B["Sort first half: [5,3]"] \n' +
    '    A --> C["Sort second half: [1,4,2]"]\n' +
    '    B --> D["Compare midpoint max vs end max"]\n' +
    "    C --> D\n" +
    '    D --> E["Swap max to end position"]\n' +
    '    E --> F["Recurse on n-1 elements"]\n' +
    "    style F fill:#7f1d1d,stroke:#ef4444\n" +
    "```\n\n" +
    "The recursion on `n-1` elements is the key to its terrible performance — it's done *after* all the sorting work, not before.",

  timeAndSpaceComplexity:
    "**Time Complexity: `Ω(n^(log n))`** — super-polynomial!\n\n" +
    "- This is worse than any fixed polynomial. For `n = 10`, it is roughly `O(10^10)` operations.\n" +
    "- **Best, Average, and Worst Case** are all identical — the recursion tree shape is fixed.\n\n" +
    "**Space Complexity: `O(n)`** — the recursion stack depth is `O(log n)` but with exponential fanout.\n\n" +
    "For reference: Merge Sort is `O(n log n)`, Bubble Sort is `O(n²)`, Stooge Sort is `O(n^2.71)`, and Slow Sort is `O(n^(log n))`.",

  bestAndWorstCase:
    "**Best case:** `Ω(n^(log n))` — even an already-sorted array triggers the full recursion tree because the algorithm has no way to detect pre-sortedness.\n\n" +
    "**Worst case:** Same — Slow Sort's recursion structure is entirely input-independent. It holds the distinction of having one of the worst complexities of any correct sorting algorithm ever published.",

  realWorldUses: [
    "**Pure education:** Used to illustrate the multiply-and-surrender anti-pattern and how recursion can degrade performance catastrophically.",
    "**Algorithm complexity demonstrations:** Provides an extreme contrast when teaching Big-O analysis.",
    "**Academic publications:** Appeared in a humorous-but-serious paper on pessimal algorithms in ACM SIGACT News (1986).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Provably correct:** Despite its terrible performance, it always produces a correctly sorted result.",
      "**Historically notable:** One of the most famous examples of an intentionally inefficient algorithm.",
    ],
    limitations: [
      "**Super-polynomial time:** Slower than every practical sorting algorithm by an enormous margin.",
      "**No adaptive behavior:** Cannot short-circuit even for trivially sorted inputs.",
      "**Extremely limited input sizes:** Even 10 elements generates millions of recursive calls.",
    ],
  },

  whenToUseIt:
    "**Never use Slow Sort.** It was designed to be as slow as possible while remaining correct, and it achieves that goal spectacularly.\n\nIts educational value is in demonstrating how recursion without careful complexity analysis leads to catastrophic performance. The visualization here limits input to 5 elements to keep step counts manageable.",
};
