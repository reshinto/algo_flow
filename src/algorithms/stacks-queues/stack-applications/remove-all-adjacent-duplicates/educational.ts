import type { EducationalContent } from "@/types";

export const removeAllAdjacentDuplicatesEducational: EducationalContent = {
  overview:
    '**Remove All Adjacent Duplicates** eliminates every pair of adjacent identical characters from a string, repeating until no adjacent duplicates remain. For example, `"abbaca"` → `"aaca"` → `"ca"`.\n\nA stack provides an elegant single-pass solution: push each character, but if it matches the current stack top, pop instead — cancelling the duplicate pair on the spot.',

  howItWorks:
    "The algorithm scans the string left to right, maintaining a stack of unmatched characters:\n\n" +
    "1. **For each character**, peek at the stack top.\n" +
    "2. **Match** — if the stack is non-empty and the top equals the current character, pop the top (the duplicate pair is cancelled).\n" +
    "3. **No match** — otherwise push the character onto the stack.\n" +
    "4. **End of string** → join the stack contents into the result string.\n\n" +
    "### Example trace on `abbaca`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Step 1-2["Push a, b"]\n' +
    '        S1["stack: a b"]\n' +
    "    end\n" +
    '    subgraph Step 3-4["Pop b b, Pop a a"]\n' +
    '        S2["stack: (empty)"]\n' +
    "    end\n" +
    '    subgraph Step 5-6["Push c, a"]\n' +
    '        S3["stack: c a"]\n' +
    "    end\n" +
    '    S1 -->|"b=b pop ✓"| S2\n' +
    '    S2 -->|"a=a pop ✓"| S2\n' +
    '    S2 -->|"push c, a"| S3\n' +
    "    style S3 fill:#14532d,stroke:#22c55e\n" +
    "    style S2 fill:#f59e0b,stroke:#d97706\n" +
    "    style S1 fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Each character is either cancelled against the stack top (pop) or added to it (push). " +
    "Once `bb` and `aa` cancel, only `ca` remains on the stack — the final result.\n\n" +
    "```\n" +
    "char  action   stack\n" +
    "a     push     [a]\n" +
    "b     push     [a, b]\n" +
    "b     pop  ✓   [a]      ← bb removed\n" +
    "a     pop  ✓   []       ← aa removed\n" +
    "c     push     [c]\n" +
    "a     push     [c, a]\n" +
    'end   join  →  "ca"\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character is visited exactly once. Every push and pop is `O(1)`, so the total work is linear in the length of the input string.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    'In the worst case (a string with no adjacent duplicates, e.g. `"abcde"`) all characters are pushed onto the stack, using `O(n)` extra space.',

  bestAndWorstCase:
    '**Best case** — every character pairs with the previous one, so pops dominate and the stack stays small. The string `"aabbcc"` fully collapses to `""` and the stack never grows beyond one element at a time.\n\n' +
    '**Worst case** — no adjacent duplicates exist (e.g. `"abcde"`): every character is pushed and the stack reaches size `n`, using `O(n)` time and `O(n)` space.\n\n' +
    "Both cases are `O(n)` — the algorithm cannot skip any character.",

  realWorldUses: [
    "**Text editors:** Implementing undo/redo sequences where paired inverse operations cancel out.",
    "**Compiler optimisations:** Simplifying sequences of push/pop or load/store pairs in intermediate code.",
    "**Chemistry and biology:** Collapsing repeated base-pair sequences in DNA string processing pipelines.",
    "**Game mechanics:** Bubble-shooter and match-3 games that remove groups of identical adjacent tiles.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single left-to-right scan with no backtracking or re-scanning.",
      "Handles cascading removals naturally: once a pair is removed, the newly adjacent characters are compared automatically.",
      "Simple, readable implementation that directly mirrors the intuition of 'cancel matching neighbours'.",
    ],
    limitations: [
      "O(n) extra space for the stack in the worst case.",
      "Only removes pairs of two — does not generalise to groups of k duplicates without modification.",
      "The result order depends on stack behaviour; characters that survive appear in their original relative order.",
    ],
  },

  whenToUseIt:
    "Use the stack-based approach whenever adjacent duplicate pairs must be removed in a single pass, especially when removals can cascade. If you need to remove groups of k identical adjacent characters (LeetCode 1209), extend this pattern by storing `(char, count)` pairs on the stack instead of plain characters.",
};
