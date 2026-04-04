/**
 * Educational content for Stooge Sort.
 */
import type { EducationalContent } from "@/types";

export const stoogeSortEducational: EducationalContent = {
  overview:
    "**Stooge Sort** is a recursive sorting algorithm known for its notoriously poor performance — `O(n^2.71)`, which is worse than the common `O(n²)` sorts. It is named after the Three Stooges because of its seemingly redundant three-phase recursive strategy.\n\nDespite being impractical, it is correct and serves as an educational example of how recursion can be used for sorting — and why recursion alone does not guarantee efficiency.",

  howItWorks:
    "### Three-Phase Recursive Strategy\n\n" +
    "Given a subarray from `startIndex` to `endIndex`:\n" +
    "1. If `array[start] > array[end]`, swap them.\n" +
    "2. If the subarray has more than 2 elements:\n" +
    "   - Recursively sort the **first 2/3**.\n" +
    "   - Recursively sort the **last 2/3**.\n" +
    "   - Recursively sort the **first 2/3 again**.\n\n" +
    "### Why Three Passes?\n" +
    "The first pass moves the maximum out of the first 2/3. The second pass moves it to the final position. The third pass fixes the first 2/3 after the maximum was moved.\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["stoogeSort([5,3,1,4,2])"] --> B["Sort first 2/3: [5,3,1,4]"]\n' +
    '    B --> C["Sort last 2/3: [1,4,2]"]\n' +
    '    C --> D["Sort first 2/3 again: [5,3,1,4]"]\n' +
    '    D --> E["Result: [1,2,3,4,5]"]\n' +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n^(log 3 / log 1.5))` ≈ `O(n^2.71)`**\n\n" +
    "- Each call makes 3 recursive calls on arrays of size 2/3.\n" +
    "- By the master theorem: `T(n) = 3T(2n/3) + O(1)` → `O(n^(log₁.₅3))` ≈ `O(n^2.71)`.\n" +
    "- **Best, Average, and Worst Case** are all `O(n^2.71)` — no input-dependent optimizations.\n\n" +
    "**Space Complexity: `O(n)`** — recursion stack depth is `O(log n)` but each level has `O(n/3)` overhead.",

  bestAndWorstCase:
    "**Best case:** `O(n^2.71)` — even for a pre-sorted array, Stooge Sort makes all three recursive sub-calls. The initial swap check fires in `O(1)` but the recursive structure always runs.\n\n" +
    "**Worst case:** Also `O(n^2.71)` — the recursion tree shape is always the same. This is notably *worse* than Bubble Sort's `O(n)` best case and worse than even `O(n²)` algorithms at large inputs.",

  realWorldUses: [
    "**Academic pedagogy:** Used to illustrate recursion and the importance of algorithmic complexity analysis.",
    "**Algorithm complexity demonstrations:** A perfect contrast to efficient O(n log n) sorts — same output, radically different performance.",
    "**Interview questions:** Sometimes posed as a trick question about 'correct but terrible' algorithms.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Provably correct:** Despite its awkward structure, Stooge Sort always produces a correctly sorted output.",
      "**Simple recursive structure:** Easy to express and reason about correctness via induction.",
      "**Educational value:** Teaches why elegance in recursion does not imply efficiency.",
    ],
    limitations: [
      "**Worse than O(n²):** At `O(n^2.71)`, it is slower than Bubble Sort, Selection Sort, and Insertion Sort.",
      "**No practical use:** No real-world application benefits from this algorithm.",
      "**Input size must be tiny:** Steps explode rapidly — this visualization uses arrays of 5 elements maximum.",
    ],
  },

  whenToUseIt:
    "**Never use Stooge Sort for real work.** Its `O(n^2.71)` complexity makes it slower than simple quadratic sorts for all practical inputs.\n\nUse it only in educational contexts to demonstrate that a recursive algorithm's correctness says nothing about its efficiency. It is the canonical example of a 'correct but terrible' algorithm.",
};
