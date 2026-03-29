import type { EducationalContent } from "@/types";

export const nextGreaterElementEducational: EducationalContent = {
  overview:
    "**Next Greater Element** finds, for each position in an array, the first element to its right that is strictly greater — returning `-1` when no such element exists.\n\n" +
    "The algorithm uses a **monotonic stack** — a stack that maintains indices in decreasing order of their values. As each new element arrives, it resolves all pending indices whose values it exceeds, turning an apparent `O(n²)` problem into a clean `O(n)` single-pass solution.",

  howItWorks:
    "1. Initialize `resultArray` with `-1` for every position (default: no greater element).\n" +
    "2. Maintain `pendingStack`, a stack of array indices awaiting their next greater element.\n" +
    "3. Iterate `scanIndex` from left to right across the array:\n" +
    "   - Let `currentElement = inputArray[scanIndex]`.\n" +
    "   - While `pendingStack` is non-empty and `inputArray[stackTop] < currentElement`:\n" +
    "     - Pop `poppedIndex` from the stack.\n" +
    "     - Set `resultArray[poppedIndex] = currentElement` — answer resolved!\n" +
    "   - Push `scanIndex` onto `pendingStack`.\n" +
    "4. Any index still on the stack after the loop has no greater element — its result stays `-1`.\n\n" +
    "### Trace (`[4, 5, 2, 10, 8]`)\n\n" +
    "```\n" +
    "Scan 4  (idx 0): stack=[0]             result=[-1,-1,-1,-1,-1]\n" +
    "Scan 5  (idx 1): 4<5 → pop 0, result[0]=5; stack=[1]\n" +
    "Scan 2  (idx 2): 5≥2 → push; stack=[1,2]\n" +
    "Scan 10 (idx 3): 2<10 → pop 2, result[2]=10\n" +
    "                 5<10 → pop 1, result[1]=10; stack=[3]\n" +
    "Scan 8  (idx 4): 10≥8 → push; stack=[3,4]\n" +
    "End: indices 3,4 remain → result[3]=result[4]=-1\n" +
    "Final: [5, 10, 10, -1, -1]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each index is pushed onto the stack exactly once and popped at most once.\n" +
    "- Total stack operations across the entire pass: at most `2n` — strictly `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "- `pendingStack` holds at most `n` indices in the worst case (strictly decreasing input).\n" +
    "- `resultArray` of size `n` is required to return the answer.",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** Strictly increasing array (e.g., `[1, 2, 3, 4]`). Every new element immediately resolves the entire stack — each element is pushed once and popped once in the same iteration.\n\n" +
    "**Worst Case — `O(n)`:** Strictly decreasing array (e.g., `[4, 3, 2, 1]`). No element ever resolves another — the stack grows to size `n`, and all are marked `-1` at the end. Total operations remain `O(n)`.\n\n" +
    "Unlike nested-loop approaches, the monotonic stack guarantees `O(n)` in all cases because each element participates in at most two stack operations.",

  realWorldUses: [
    "**Stock Span Problems:** Find the number of consecutive days before today where the stock price was less than or equal to today's price — a direct application of the monotonic stack pattern.",
    "**Temperature Forecasting:** Given a list of daily temperatures, determine how many days until a warmer day — LeetCode #739.",
    "**Histogram Area:** The largest rectangle in a histogram (LeetCode #84) builds on the same stack-based pattern.",
    "**Expression Parsing:** Operator precedence evaluation in compilers uses monotonic stacks to resolve pending lower-precedence operators.",
    "**Sliding Window Maximum:** Monotonic deque (a generalization) powers `O(n)` sliding window max — the underlying pattern is identical.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — the best achievable for this problem without preprocessing.",
      "Single-pass — the result is built incrementally as the array is scanned left to right.",
      "Handles all edge cases uniformly: empty arrays, all-equal arrays, and strictly monotone sequences.",
      "Generalizes easily to variants: previous greater element (scan right-to-left), next greater or equal (change `<` to `<=`).",
    ],
    limitations: [
      "Requires `O(n)` auxiliary space for the stack — not an in-place algorithm.",
      "The stack pattern is non-obvious; requires understanding deferred resolution to reason about correctness.",
      "Only handles 'next' in one direction per pass — finding both previous and next requires two passes or a different approach.",
      "Not applicable when the comparison is not a simple inequality (e.g., custom multi-key comparators add complexity).",
    ],
  },

  whenToUseIt:
    "Use **Next Greater Element** (monotonic stack) whenever you need to answer range queries of the form 'find the nearest element satisfying a condition in one direction' in `O(n)` time.\n\n" +
    "Prefer this approach over brute-force `O(n²)` nested loops whenever the array has more than a few hundred elements.\n\n" +
    "Do **not** use this pattern when the query involves both directions simultaneously (previous and next) in a single pass, or when you need the *k-th* greater element — those require different data structures such as segment trees or sorted sets.",
};
