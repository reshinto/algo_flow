import type { EducationalContent } from "@/types";

export const recursiveBinarySearchEducational: EducationalContent = {
  overview:
    "**Recursive Binary Search** applies the same divide-and-conquer principle as iterative binary search, but expresses the logic through function calls rather than a loop. Each recursive call narrows the search range by half until the target is found or the range is empty.\n\nWhile functionally equivalent to the iterative version, the recursive form is often considered more readable and naturally maps to the mathematical definition of binary search.",

  howItWorks:
    "1. Start with the full sorted array: `low = 0`, `high = array.length - 1`.\n" +
    "2. Compute the midpoint: `mid = Math.floor((low + high) / 2)`.\n" +
    "3. Compare `array[mid]` against the target:\n" +
    "   - If equal: return `mid` — target found.\n" +
    "   - If `array[mid] < target`: recurse on the right half (`low = mid + 1`).\n" +
    "   - If `array[mid] > target`: recurse on the left half (`high = mid - 1`).\n" +
    "4. **Base case:** if `low > high`, the range is empty — return `-1`.\n\n" +
    "### Recursion Tree for Target 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    A["searchRange(0, 9) → mid=4, val=16"] -->|"16 < 23, go right"| B["searchRange(5, 9) → mid=7, val=56"]\n' +
    '    B -->|"56 > 23, go left"| C["searchRange(5, 6) → mid=5, val=23"]\n' +
    '    C -->|"23 == 23"| D["Found at index 5"]\n' +
    "    style D fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Best Case:** `O(1)` — target is at the first midpoint checked.\n" +
    "- **Average & Worst Case:** `O(log n)` — the search range halves with each recursive call, so at most `log₂(n)` calls are made.\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "Unlike the iterative version, recursive binary search uses `O(log n)` stack space due to call frames being pushed onto the call stack. Each level of recursion holds a stack frame with `lowIndex`, `highIndex`, and `midIndex`.",

  bestAndWorstCase:
    "**Best case** occurs when the target is at the exact midpoint of the initial array, requiring only one comparison — `O(1)` time.\n\n" +
    "**Worst case** occurs when the target is absent or located at a boundary, requiring `⌊log₂(n)⌋ + 1` recursive calls. For an array of 1,000,000 elements, this is at most 20 recursive calls.\n\n" +
    "The stack depth grows with each recursive call, so very large arrays could theoretically risk stack overflow in environments with tight stack limits — though this requires billions of elements in practice.",

  realWorldUses: [
    "**Teaching and academics:** The recursive form is frequently used to introduce recursion because binary search's logic maps cleanly onto a recursive definition.",
    "**Functional programming languages:** Languages like Haskell and OCaml favor recursion over iteration — recursive binary search fits naturally in these paradigms.",
    "**Compilers and interpreters:** Symbol table lookups and lexeme resolution in sorted structures often use recursive search implementations.",
    "**Standard library internals:** Many language runtimes implement binary search with tail-call optimization, making the recursive form as efficient as the iterative one.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Highly readable — the code directly mirrors the logical definition of the algorithm.",
      "Naturally expresses the recursive structure of divide-and-conquer, making it easier to reason about correctness.",
      "Can be optimized to iterative by compilers via tail-call optimization in supporting environments.",
    ],
    limitations: [
      "Uses O(log n) stack space instead of O(1), which matters in memory-constrained environments.",
      "Deeper recursion stacks can cause stack overflow for extremely large inputs on platforms without tail-call optimization.",
      "Requires the input array to be sorted — unsorted arrays will produce incorrect results.",
    ],
  },

  whenToUseIt:
    "Use **Recursive Binary Search** when readability and educational clarity are priorities, or when working in a functional programming context that favors recursion.\n\nPrefer the **iterative** version in production systems where memory efficiency matters or when the runtime does not support tail-call optimization. Both variants produce identical results — the choice is about style and constraints.",
};
