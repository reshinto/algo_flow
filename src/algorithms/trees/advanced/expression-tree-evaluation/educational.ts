import type { EducationalContent } from "@/types";

export const expressionTreeEvaluationEducational: EducationalContent = {
  overview:
    "An **Expression Tree** is a binary tree where **leaf nodes** are operands (numbers) and **internal nodes** are operators (`+`, `-`, `*`, `/`). Given a **postfix (Reverse Polish Notation) expression**, the tree is built in one pass using a stack, then evaluated bottom-up using post-order traversal.\n\nExpression trees are the core data structure underlying compilers, interpreters, and formula evaluators.",

  howItWorks:
    "**Build phase** (stack-based, one pass over postfix tokens):\n" +
    "- If the token is a **number**: push a leaf node.\n" +
    "- If the token is an **operator**: pop two nodes (`right`, `left`), create an operator node with them as children, push it.\n\n" +
    "**Evaluation phase** (post-order traversal):\n" +
    "- If the node is a **leaf**: return its numeric value.\n" +
    "- Otherwise: recursively evaluate left and right, apply the operator.\n\n" +
    "**Example:** Postfix `3 4 + 2 * 7 /` builds the tree:\n" +
    "```\n" +
    "       /\n" +
    "      / \\\n" +
    "     *   7\n" +
    "    / \\\n" +
    "   +   2\n" +
    "  / \\\n" +
    " 3   4\n" +
    "```\n" +
    "Evaluation: `(3+4)=7`, `7*2=14`, `14/7=2`.",

  timeAndSpaceComplexity:
    "**Build: `O(n)`** — one pass over n tokens, each push/pop is O(1).\n\n" +
    "**Evaluation: `O(n)`** — post-order visits every node once.\n\n" +
    "**Space: `O(n)`** — tree has n nodes; stack during build has at most n/2 entries.",

  bestAndWorstCase:
    "**Best case:** Simple expression like a single number — O(1).\n\n" +
    "**Worst case:** Deeply nested expression like `a b + c + d + ...` — produces a right-skewed tree with O(n) recursion depth.",

  realWorldUses: [
    "**Compilers:** AST (Abstract Syntax Tree) generation and constant folding.",
    "**Spreadsheets:** Excel and Google Sheets parse formulas into expression trees.",
    "**Database query planners:** Expression trees represent filter predicates.",
    "**Calculator apps:** RPN calculators use the postfix-to-tree-to-evaluate pipeline.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Clean separation between parsing and evaluation.",
      "Easy to extend with new operators or functions.",
      "Naturally handles operator precedence via tree structure.",
    ],
    limitations: [
      "Requires postfix input — infix expressions need a separate precedence parser (shunting-yard).",
      "Recursive evaluation can overflow the stack for very deep expressions.",
      "Not suitable for symbolic simplification without additional traversal logic.",
    ],
  },

  whenToUseIt:
    "Use an expression tree when you need to parse, transform, or evaluate a mathematical expression with operator precedence. For simple single-pass evaluation of postfix expressions, a stack-based direct evaluator is simpler and requires no tree construction.",
};
