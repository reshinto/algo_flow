import type { EducationalContent } from "@/types";

export const backspaceStringCompareEducational: EducationalContent = {
  overview:
    "**Backspace String Compare** solves LeetCode 844: given two strings where `#` represents a backspace key, determine whether the two strings are equal after all backspaces are applied.\n\nA stack naturally models the backspace operation — push regular characters, and on `#` pop the top character (if any). After processing both strings, compare the two resulting stacks for equality.",

  howItWorks:
    "The algorithm processes each string independently using a stack:\n\n" +
    "1. **For each character in the string:**\n" +
    "   - If the character is not `#` → push it onto the stack.\n" +
    "   - If the character is `#` and the stack is non-empty → pop the top character.\n" +
    "   - If the character is `#` and the stack is empty → do nothing (backspace on empty text).\n" +
    "2. **After processing both strings**, compare the two stacks element by element.\n" +
    "3. **Return true** if both stacks are identical in length and content.\n\n" +
    "### Example trace on `ab#c` vs `ad#c`\n\n" +
    "```\n" +
    "Processing 'ab#c':      Processing 'ad#c':\n" +
    "char  action  stack     char  action  stack\n" +
    "a     push    [a]       a     push    [a]\n" +
    "b     push    [a, b]    d     push    [a, d]\n" +
    "#     pop     [a]       #     pop     [a]\n" +
    "c     push    [a, c]    c     push    [a, c]\n" +
    "\n" +
    "Result: [a, c] == [a, c] → true\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "Each character of both strings is visited exactly once. Each push and pop is `O(1)`, so the total work is linear in the combined length of both input strings (`n` for the first, `m` for the second).\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "In the worst case (no backspaces) both stacks hold the full content of their respective strings, using `O(n + m)` extra space. An optimised two-pointer approach achieves `O(1)` space but the stack version is clearer.",

  bestAndWorstCase:
    "**Best case** — one string starts with `#` while empty, allowing early termination if length differences accumulate quickly. Still `O(n + m)` in general.\n\n" +
    "**Worst case** — both strings have no `#` characters at all, so every character is pushed and both stacks must be fully compared: `O(n + m)` time and space.\n\n" +
    "In practice the algorithm always runs in `O(n + m)` regardless of input content.",

  realWorldUses: [
    "**Text editor undo/delete:** Simulating how a text buffer looks after a sequence of character inputs and deletions, the same stack model applies.",
    "**Terminal input processing:** Unix terminals process backspace (`\\b` or `DEL`) the same way — accumulated input characters can be erased before the line is submitted.",
    "**Command-line parsers:** Shells that allow inline editing before execution use an equivalent push/pop model for character buffers.",
    "**Diff and comparison tools:** Understanding how two sequences relate after local edits is a micro-instance of the broader string comparison problem.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — single pass over each string with no backtracking.",
      "Simple and direct: the stack perfectly mirrors the intuition of typing with a backspace key.",
      "Handles edge cases naturally — backspacing an empty string does nothing without extra conditionals.",
    ],
    limitations: [
      "O(n + m) extra space for the two stacks — avoidable with a two-pointer reverse scan at the cost of readability.",
      "Only models a simple delete-last-character backspace; does not handle cursor movement or multi-character delete.",
    ],
  },

  whenToUseIt:
    "Use this stack approach when clarity is more important than minimising space, or when the problem is part of a larger pipeline that already uses stacks. If `O(1)` space is required, use the two-pointer approach that scans both strings from right to left, counting pending backspaces as it goes.",
};
