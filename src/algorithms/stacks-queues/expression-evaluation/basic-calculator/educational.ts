import type { EducationalContent } from "@/types";

export const basicCalculatorEducational: EducationalContent = {
  overview:
    "**Basic Calculator** evaluates a string expression containing integers, `+`, `-`, `(`, and `)`. The challenge is correctly handling nested parentheses, where the sign outside a pair of parentheses must be applied to every value inside.\n\nA stack solves this elegantly: when a `(` is encountered, push the current running total and sign onto the stack and start fresh. When `)` is encountered, pop those saved values and merge the sub-expression result back in.",

  howItWorks:
    "The algorithm tokenizes the expression and processes each token with a running total and a current sign:\n\n" +
    "1. **Number token** → add `currentSign × number` to `runningTotal`.\n" +
    "2. **`+`** → set `currentSign = 1`.\n" +
    "3. **`-`** → set `currentSign = -1`.\n" +
    "4. **`(`** → push `runningTotal` and `currentSign` onto the stack, then reset both (`runningTotal = 0`, `currentSign = 1`).\n" +
    "5. **`)`** → pop `poppedSign` and `prevTotal` from the stack. Combine: `runningTotal = prevTotal + poppedSign × runningTotal`.\n\n" +
    "### Example trace on `1 + (2 - 3)`\n\n" +
    "```\n" +
    "token  action                   runningTotal  currentSign  stack\n" +
    "1      add  1×1=1               1             1            []\n" +
    "+      sign = +1                1             1            []\n" +
    "(      push 1, push +1; reset   0             1            [1, 1]\n" +
    "2      add  1×2=2               2             1            [1, 1]\n" +
    "-      sign = -1                2             -1           [1, 1]\n" +
    "3      add -1×3=-3; total=-1    -1            -1           [1, 1]\n" +
    ")      pop +1 and 1; 1+(+1×-1)  0             -1           []\n" +
    "end    return 0\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each token is processed exactly once. Tokenizing the expression is also `O(n)`, so the overall time is linear in the length of the input string.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The stack can hold at most one pair of values per nesting level. In the worst case (maximally nested parentheses), the stack grows to `O(n)` entries.",

  bestAndWorstCase:
    "**Best case** — a flat expression with no parentheses (e.g. `1 + 2 - 3`): the stack is never used, so `O(n)` time and `O(1)` space.\n\n" +
    "**Worst case** — deeply nested parentheses (e.g. `(((1 + 2)))`) or a very long expression: `O(n)` time and `O(n)` stack space for the saved totals and signs.",

  realWorldUses: [
    "**Spreadsheet formula engines:** Cell formulas with nested parentheses like `=((A1+B1)*C1)` are evaluated using this exact approach.",
    "**Programming language interpreters:** Simple scripting engines parse and evaluate arithmetic expressions using sign-propagation stacks before building a full AST.",
    "**Scientific calculators:** Real-time expression evaluation as users type nested sub-expressions relies on stack-based sign tracking.",
    "**Query parsers:** Search engines that support parenthesized boolean queries (`AND`, `OR`, `NOT`) use a similar sign-on-stack pattern for precedence resolution.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) single-pass evaluation — no AST construction or recursive descent required.",
      "Naturally handles arbitrarily deep nesting through the stack.",
      "Simple, readable implementation that closely mirrors the problem description.",
    ],
    limitations: [
      "Does not support multiplication or division — extending it requires operator-precedence handling (e.g. shunting-yard algorithm).",
      "O(n) extra stack space in the worst case for deeply nested expressions.",
      "Requires valid, pre-validated input — malformed expressions (unmatched parentheses) can cause stack underflow.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need to evaluate expressions that contain only addition, subtraction, and parentheses. If the expression also involves `*` or `/`, use the shunting-yard algorithm or recursive descent parsing instead. The sign-propagation stack is the most efficient solution for the LeetCode 224 constraint set.",
};
