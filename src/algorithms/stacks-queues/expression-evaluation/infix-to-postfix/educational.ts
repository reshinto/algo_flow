import type { EducationalContent } from "@/types";

export const infixToPostfixEducational: EducationalContent = {
  overview:
    "**Infix to Postfix** (also called the **Shunting-Yard algorithm**, invented by Edsger Dijkstra) converts a human-readable infix expression like `a + b * c` into postfix (Reverse Polish Notation) form `a b c * +`.\n\n" +
    "In postfix notation, operators follow their operands, eliminating the need for parentheses or precedence rules during evaluation. This makes postfix expressions ideal for stack-based evaluators used in calculators, compilers, and virtual machines.",

  howItWorks:
    "The algorithm scans tokens left to right, routing operands directly to output and managing operators on a stack according to precedence:\n\n" +
    "1. **Operand** → append directly to the output queue.\n" +
    "2. **Operator** → pop and output any stack operators with higher or equal precedence, then push the current operator.\n" +
    "3. **`(`** → push onto the operator stack (acts as a barrier).\n" +
    "4. **`)`** → pop and output all operators until the matching `(` is found, then discard the `(`.\n" +
    "5. **End of input** → pop and output all remaining operators from the stack.\n\n" +
    "### Example trace on `a+b*(c-d)`\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    subgraph Op Stack\n" +
    '    OS1["+"] --> OS2["+ *"] --> OS3["+ * ("] --> OS4["+ * ( -"]\n' +
    "    OS4 -->|\"')' pops until '('\"| OS5[\"+ *\"]\n" +
    '    OS5 -->|"end: drain"| OS6["empty"]\n' +
    "    end\n" +
    "    subgraph Output\n" +
    '    O1["a"] --> O2["a b"] --> O3["a b c"] --> O4["a b c d"]\n' +
    '    O4 -->|"pop -"| O5["a b c d -"]\n' +
    '    O5 -->|"pop * then +"| O6["a b c d - * +"]\n' +
    "    end\n" +
    "    style O6 fill:#14532d,stroke:#22c55e\n" +
    "    style OS3 fill:#f59e0b,stroke:#d97706\n" +
    "    style O1 fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Operands flow straight to output; the stack holds pending operators and releases them when a lower-precedence operator or `)` is seen.\n\n" +
    "Result: `a b c d - * +`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each token is read once. Each operator is pushed onto the stack at most once and popped at most once, so all stack operations are amortized `O(1)`. Total work is linear in the number of tokens.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The operator stack holds at most `O(n)` elements in the worst case (e.g., a deeply nested expression). The output queue also grows to `O(n)`.",

  bestAndWorstCase:
    "**Best case** — a single operand with no operators: the expression is output immediately in `O(1)` with no stack activity.\n\n" +
    "**Worst case** — a heavily parenthesized expression or one with many low-precedence operators that accumulate on the stack before being popped: still `O(n)` because every token is handled at most twice (push and pop).\n\n" +
    "The algorithm has no early-exit path — it always processes every token.",

  realWorldUses: [
    "**Compilers and interpreters:** Most expression compilers first apply the shunting-yard algorithm to convert infix source code into postfix bytecode, then evaluate it with a simple operand stack.",
    "**Scientific calculators:** HP RPN calculators and many scientific calculators accept postfix input internally, which is produced from infix keystrokes using this algorithm.",
    "**Spreadsheet formula engines:** Applications like Excel parse infix formulas into an internal postfix representation before evaluating them.",
    "**Database query optimizers:** SQL expression trees are often built from infix arithmetic and boolean sub-expressions using shunting-yard-style parsing.",
    "**Expression templating and rule engines:** Business rule engines that accept infix conditions convert them to postfix for fast, stack-based evaluation at runtime.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time and space — single left-to-right scan with simple stack operations.",
      "Handles operator precedence and associativity without recursive parsing.",
      "Output is directly consumable by a stack-based evaluator — the two algorithms compose naturally.",
      "Easily extended to support additional operators, functions, or custom precedence levels.",
    ],
    limitations: [
      "Handles only binary operators by default; unary operators (e.g., negation) require extra logic.",
      "Assumes well-formed input — mismatched parentheses produce incorrect output without added error handling.",
      "Does not evaluate the expression itself; a second pass (RPN evaluation) is required.",
      "Right-associative operators (e.g., exponentiation `^`) need a precedence adjustment to pop only strictly higher (not equal) precedence operators.",
    ],
  },

  whenToUseIt:
    "Use the shunting-yard algorithm whenever you need to parse or evaluate infix arithmetic expressions — in compilers, calculators, rule engines, or any system where users enter standard math notation. " +
    "If your expressions are already in postfix form, skip directly to an RPN evaluator. " +
    "For very complex grammars (function calls, multiple argument lists, right-associative operators, prefix/postfix unary operators), consider a full recursive-descent parser instead, which handles these cases more naturally.",
};
