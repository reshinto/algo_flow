import type { EducationalContent } from "@/types";

export const longestValidParenthesesEducational: EducationalContent = {
  overview:
    "**Longest Valid Parentheses** (LeetCode 32) finds the length of the longest contiguous substring that forms a well-matched sequence of parentheses.\n\nA stack that stores **indices** — rather than characters — is the key insight. By tracking where each unmatched `(` sits and anchoring the base of each valid run, the algorithm measures substring lengths in a single left-to-right pass.",

  howItWorks:
    "The stack always holds a sentinel base index. Initially `-1` is pushed so the first valid run's length can be computed immediately:\n\n" +
    "1. **`(`** → push its index onto the stack.\n" +
    "2. **`)`** → pop the stack top.\n" +
    "   - If the stack is now **empty**, the current index becomes the new base (push it).\n" +
    "   - Otherwise, compute `length = currentIdx − newStackTop` and update `maxLength`.\n" +
    "3. Return `maxLength` after the full scan.\n\n" +
    "### Example trace on `(()())`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["stack: -1"] -->|"push idx 0,1"| B["stack: -1 0 1"]\n' +
    '    B -->|"idx 2 \')\' pop 1\\nlen = 2-0 = 2"| C["stack: -1 0\\nmaxLen=2"]\n' +
    '    C -->|"push idx 3"| D["stack: -1 0 3"]\n' +
    '    D -->|"idx 4 \')\' pop 3\\nlen = 4-0 = 4"| E["stack: -1 0\\nmaxLen=4"]\n' +
    '    E -->|"idx 5 \')\' pop 0\\nlen = 5-(-1) = 6"| F["stack: -1\\nmaxLen=6"]\n' +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style D fill:#f59e0b,stroke:#d97706\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The sentinel `-1` anchors the base so the first valid run's length is always computable. " +
    "Each `)` pops the stack and measures `currentIdx − newTop` to extend `maxLength`.\n\n" +
    "```\n" +
    "idx  char  action              stack        maxLength\n" +
    " —    —    init push -1        [-1]         0\n" +
    " 0    (     push 0             [-1, 0]      0\n" +
    " 1    (     push 1             [-1, 0, 1]   0\n" +
    " 2    )     pop → top=-1,0     [-1, 0]      2-0=2\n" +
    " 3    (     push 3             [-1, 0, 3]   2\n" +
    " 4    )     pop → top=-1,0     [-1, 0]      4-0=4\n" +
    " 5    )     pop → top=-1       [-1]         5-(-1)=6\n" +
    "end                            result: 6\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character is visited exactly once. Every index is pushed and popped at most once, so all stack operations together take `O(n)` total.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case — a string of all `(` characters — every index ends up on the stack, using `O(n)` extra space.",

  bestAndWorstCase:
    "**Best case** — the entire string is one long valid sequence (e.g. `()()()`): every character is processed and a new maximum is updated on each `)`, but no stack rebuilding is needed. Still `O(n)` time.\n\n" +
    "**Worst case** — alternating mismatches (e.g. `)()(`) force frequent base resets, but each character is still touched only once, so the worst case is also `O(n)` time.\n\n" +
    "There is no early-termination shortcut: the algorithm must scan the entire string.",

  realWorldUses: [
    "**Code formatters:** Identifying the longest balanced region helps editors suggest minimal bracket insertions.",
    "**Expression parsers:** Compilers locate the largest syntactically valid sub-expression before reporting surrounding errors.",
    "**Log analysis:** Detecting the longest contiguous well-formed section in a stream of structured delimiters (e.g. JSON fragments).",
    "**Text editors:** Bracket-matching UIs highlight the outermost well-formed region around the cursor.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single scan, no nested loops or backtracking.",
      "O(n) space with a simple stack; no auxiliary DP table needed.",
      "Handles arbitrary nesting depth and discontinuous valid segments correctly.",
    ],
    limitations: [
      "Only handles `(` and `)` — does not generalize to multi-type brackets without modification.",
      "O(n) stack space is unavoidable with the index-stack approach; a two-pass counter approach achieves O(1) space but is harder to visualize.",
      "Returns only the length, not the substring itself; recovering the actual substring requires extra bookkeeping.",
    ],
  },

  whenToUseIt:
    "Use the index-stack approach when you need clarity and O(n) time. If memory is extremely constrained, consider the two-pass left-right counter method for O(1) space at the cost of two passes. For related problems involving multiple bracket types, extend the stack to store `(character, index)` pairs.",
};
