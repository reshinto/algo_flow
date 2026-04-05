import type { EducationalContent } from "@/types";

export const flattenNestedListIteratorEducational: EducationalContent = {
  overview:
    "**Flatten Nested List Iterator** (LeetCode 341) solves the problem of iterating over a deeply nested list structure as if it were a flat sequence of integers. Given a list like `[[1,[2]],3,[4,[5,6]]]`, the algorithm produces `[1,2,3,4,5,6]` in a single left-to-right pass.\n\nA stack drives the flattening: push all top-level items in reverse order so that the first item sits on top, then iteratively pop each item — if it is a number, collect it; if it is a sub-list, push its elements in reverse order. The stack naturally unwinds the nesting depth by depth.",

  howItWorks:
    "The algorithm treats the nested structure as a tree of integers and arrays, traversed in pre-order (left to right):\n\n" +
    "1. **Initialize** — copy the input list into a stack in reverse order, so the first element is on top.\n" +
    "2. **Loop while the stack is not empty:**\n" +
    "   - **Pop** the top item.\n" +
    "   - If it is a **number**, append it to the result.\n" +
    "   - If it is an **array**, push its elements onto the stack in reverse order so its first element becomes the new top.\n" +
    "3. **Return** the result array.\n\n" +
    "### Example trace for `[[1,[2]],3,[4,[5,6]]]`\n\n" +
    "```\n" +
    "Initial stack (top → bottom): [1,[2]]  3  [4,[5,6]]\n" +
    "Pop [1,[2]] → array  → push [2] then 1   stack: 1 [2] 3 [4,[5,6]]\n" +
    "Pop 1       → number → result=[1]         stack: [2] 3 [4,[5,6]]\n" +
    "Pop [2]     → array  → push 2             stack: 2 3 [4,[5,6]]\n" +
    "Pop 2       → number → result=[1,2]        stack: 3 [4,[5,6]]\n" +
    "Pop 3       → number → result=[1,2,3]      stack: [4,[5,6]]\n" +
    "Pop [4,[5,6]]→ array → push [5,6] then 4  stack: 4 [5,6]\n" +
    "Pop 4       → number → result=[1,2,3,4]    stack: [5,6]\n" +
    "Pop [5,6]   → array  → push 6 then 5      stack: 5 6\n" +
    "Pop 5       → number → result=[1,2,3,4,5]  stack: 6\n" +
    "Pop 6       → number → result=[1,2,3,4,5,6] stack: []\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** where n is the total number of integers across all nesting levels.\n\n" +
    "Each integer is pushed onto the stack at most once and popped exactly once. Each array node is also popped once and its direct children pushed once. The total work is proportional to the total number of elements (both integers and arrays), which is bounded by `O(n)` for n integers.\n\n" +
    "**Space Complexity: `O(d)`** where d is the maximum nesting depth.\n\n" +
    "At any point, the stack holds at most the unprocessed siblings at each depth level. In the worst case — a fully left-skewed nesting like `[[[...n...]]]` — the stack depth reaches `O(d)`. The result array itself is `O(n)` but is considered output space.",

  bestAndWorstCase:
    "**Best case** — a flat list with no nesting (depth = 1): every item is a number and is collected immediately with no sub-list expansion. Stack depth stays at 1.\n\n" +
    "**Worst case** — a fully left-skewed nesting like `[[[[5]]]]`: each pop reveals another single-element sub-list, driving the stack depth to `O(d)` where d equals the nesting depth. Time is still `O(n)` since each integer is visited exactly once.",

  realWorldUses: [
    "**JSON document traversal:** Deeply nested JSON objects and arrays are flattened using the same stack-based approach when serializing or indexing document fields.",
    "**File system walkers:** Recursively listing all files in a directory tree maps directly to this pattern — directories are sub-lists and files are integers.",
    "**Abstract syntax tree evaluation:** Compilers traverse nested expression trees (function calls, operator nodes) using a stack to evaluate leaves in order.",
    "**HTML/XML DOM serialization:** Flattening a nested node tree into a text stream uses depth-first traversal driven by an explicit or implicit call stack.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — each element is visited exactly once regardless of nesting structure.",
      "O(d) stack space — only the current path from root to the active node is held at any time.",
      "Iterative — avoids call-stack overflow on deeply nested inputs that would blow the recursion limit.",
      "Naturally produces output in the correct left-to-right order without a post-processing reversal.",
    ],
    limitations: [
      "Requires reversing sub-arrays before pushing, which adds a hidden constant to the inner loop.",
      "Stack allocations grow with nesting depth — pathological inputs with extreme depth still consume memory.",
      "Not lazy: this implementation eagerly produces the full result; a true iterator would yield one element at a time.",
      "Assumes the nested structure contains only integers and arrays — mixed types require additional type checks.",
    ],
  },

  whenToUseIt:
    "Use the stack-based flattening approach when you need to convert a nested list to a flat sequence in a single pass without recursion. If you only need a few values from the front of the list (lazy evaluation), implement a proper iterator that advances the stack on demand rather than pre-computing the full result. For shallow nesting (depth ≤ 2), a simple recursive approach is often more readable.",
};
