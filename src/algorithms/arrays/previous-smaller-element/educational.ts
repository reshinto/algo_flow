import type { EducationalContent } from "@/types";

export const previousSmallerElementEducational: EducationalContent = {
  overview:
    "**Previous Smaller Element** finds, for each element in an array, the nearest element to its **left** that is strictly smaller — or `-1` if no such element exists.\n\n" +
    "A brute-force approach checks all prior elements for each position, yielding `O(n²)` time. The optimal solution maintains a **monotonic increasing stack** of indices during a single left-to-right pass, resolving each query in amortized `O(1)` time for an overall `O(n)` algorithm.",

  howItWorks:
    "1. Initialize a `resultArray` filled with `-1` and an empty `increasingStack` (stores indices).\n" +
    "2. For each `scanIndex` from left to right:\n" +
    "   a. Retrieve `currentElement = inputArray[scanIndex]`.\n" +
    "   b. **Pop** all indices from the stack whose values are `>= currentElement` — they can never be someone's previous smaller element again.\n" +
    "   c. If the stack is non-empty after popping, its top index points to the nearest element that is strictly smaller than `currentElement` — store that value in `resultArray[scanIndex]`.\n" +
    "   d. Push `scanIndex` onto the stack.\n" +
    "3. Return `resultArray`.\n\n" +
    "### Trace for `[4, 10, 5, 8, 20, 15, 3, 12]`\n\n" +
    "```\n" +
    "Index 0, value=4:  stack=[]       → no smaller left → result[0]=-1  stack=[0]\n" +
    "Index 1, value=10: stack=[0(4)]   → 4 < 10, keep   → result[1]=4   stack=[0,1]\n" +
    "Index 2, value=5:  stack=[0(4),1(10)] → pop 10(>=5) → 4 < 5, keep → result[2]=4  stack=[0,2]\n" +
    "Index 3, value=8:  stack=[0(4),2(5)]  → 5 < 8, keep → result[3]=5  stack=[0,2,3]\n" +
    "Index 4, value=20: stack=[0,2,3(8)]   → 8 < 20, keep → result[4]=8 stack=[0,2,3,4]\n" +
    "Index 5, value=15: stack=[0,2,3,4(20)] → pop 20(>=15) → 8 < 15, keep → result[5]=8  stack=[0,2,3,5]\n" +
    "Index 6, value=3:  stack=[0(4),...] → pop 15,8,5,4(all>=3) → stack=[] → result[6]=-1  stack=[6]\n" +
    "Index 7, value=12: stack=[6(3)]   → 3 < 12, keep → result[7]=3  stack=[6,7]\n" +
    "Result: [-1, 4, 4, 5, 8, 8, -1, 3]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is pushed onto the stack exactly once and popped at most once.\n" +
    "- The total number of push + pop operations across the entire pass is bounded by `2n`.\n" +
    "- Therefore the loop body runs in `O(1)` amortized per element — overall `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "- The stack holds at most `n` indices in the worst case (strictly increasing input).\n" +
    "- The result array adds another `O(n)` — both are unavoidable for any correct solution.\n\n" +
    "**Comparison with brute force:**\n\n" +
    "| Approach | Time | Space |\n" +
    "| --- | --- | --- |\n" +
    "| Brute force (scan left for each element) | `O(n²)` | `O(1)` |\n" +
    "| Monotonic stack | `O(n)` | `O(n)` |",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** A strictly decreasing array causes every element to be immediately popped from the stack at the next step, but the pass still touches each element once — the algorithm is always `O(n)`.\n\n" +
    "**Worst Case — `O(n)`:** A strictly increasing array means no element is ever popped during the scan (the stack grows to size `n`). Every pop happens at the very end or not at all. The total work is still `O(n)` because each index is pushed and popped at most once.\n\n" +
    "### Why the Stack Stays Increasing\n\n" +
    "Whenever a new element is smaller than or equal to the stack top, the top can never serve as a previous smaller element for any future index — it is dominated by the current element which is both smaller and closer. Removing it keeps the stack in strictly increasing order of values.",

  realWorldUses: [
    "**Stock span problems:** Finding the previous day with a lower price to compute maximum span intervals.",
    "**Histogram analysis:** Identifying the previous bar that is strictly shorter — a building block for largest-rectangle-in-histogram.",
    "**Compiler expression parsing:** Finding the nearest enclosing scope or operator with lower precedence.",
    "**Terrain modeling:** For each elevation point, finding the most recent valley to the left.",
    "**Time series analysis:** Locating the most recent local minimum preceding each data point.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear `O(n)` time — a major improvement over the `O(n²)` brute-force scan-left approach.",
      "Conceptually simple once the monotonic stack invariant is understood.",
      "Easily adapted to previous greater element, next smaller, or next greater by changing the comparison operator and scan direction.",
      "Works in a single left-to-right pass with no preprocessing.",
    ],
    limitations: [
      "Requires `O(n)` extra space for the stack — brute-force uses `O(1)` at the cost of quadratic time.",
      "The monotonic stack invariant can be counterintuitive to reason about during debugging.",
      "Handles only the single-pass variant — sliding-window previous-smaller queries require more complex data structures.",
    ],
  },

  whenToUseIt:
    "Use **Previous Smaller Element (Monotonic Stack)** when you need to answer, for every element, the nearest smaller predecessor in `O(n)` time:\n" +
    "- As a subroutine in histogram problems (largest rectangle, trapping rain water)\n" +
    "- For computing stock spans or time-series intervals\n" +
    "- When building left-boundary arrays for range queries\n\n" +
    "Avoid this approach if you only need the previous smaller element for a single query — in that case, a simple linear scan from the element leftward suffices and uses `O(1)` space.",
};
