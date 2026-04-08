import type { EducationalContent } from "@/types";

export const validParenthesesEducational: EducationalContent = {
  overview:
    "**Valid Parentheses** determines whether a string of brackets is correctly nested and matched. Every opening bracket `(`, `[`, or `{` must be closed by the corresponding bracket `)`, `]`, or `}` in the correct order.\n\nA stack is the ideal data structure: push every opening bracket, and whenever a closing bracket is seen, check that the stack top holds the matching opener. If the stack is empty at the end, all brackets were matched.",

  howItWorks:
    "The algorithm scans left to right and maintains a stack of unmatched opening brackets:\n\n" +
    "1. **Opening bracket** (`(`, `[`, `{`) → push onto the stack.\n" +
    "2. **Closing bracket** (`)`, `]`, `}`):\n" +
    "   - If the stack is empty, there's no matching opener → **invalid**.\n" +
    "   - If the stack top does not match → **invalid**.\n" +
    "   - Otherwise pop the stack top → match found.\n" +
    "3. **End of string** → valid only if the stack is empty (no unclosed openers).\n\n" +
    "### Example trace on `({[]})`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Push Phase\n" +
    '    A["("] -->|push| B["{"]\n' +
    '    B -->|push| C["["]\n' +
    "    end\n" +
    "    subgraph Pop Phase\n" +
    '    D["]" ] -->|matches top \'[\'| E["}"]\n' +
    "    E -->|matches top '{'| F[\")\"]\n" +
    "    F -->|matches top '('| G([\"stack empty → VALID\"])\n" +
    "    end\n" +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each opener pushes onto the stack; each closer must match and pop the top. An empty stack at the end confirms every bracket was paired.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character is visited exactly once. Each push and pop is `O(1)`, so the total work is linear in the length of the input string.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (e.g. `((((((`) the entire string is pushed onto the stack before any pops occur, using `O(n)` extra space.",

  bestAndWorstCase:
    "**Best case** — first character is a closing bracket with an empty stack: the algorithm returns `false` immediately in `O(1)` time.\n\n" +
    "**Worst case** — a fully balanced string like `(((...)))`: every character is processed, resulting in `O(n)` time and `O(n/2)` stack space.\n\n" +
    "A mismatch can short-circuit early, but the algorithm is `O(n)` in general.",

  realWorldUses: [
    "**Compilers and parsers:** Syntax validation of source code relies on bracket matching to detect unclosed blocks.",
    "**HTML/XML validators:** Tag nesting rules (every `<div>` must have `</div>`) are enforced using the same stack pattern.",
    "**Math expression evaluators:** Ensuring expressions like `((a+b)*(c-d))` are correctly parenthesized before evaluation.",
    "**IDE bracket highlighting:** Code editors highlight matching brackets in real-time using a variant of this algorithm.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single left-to-right scan with no backtracking.",
      "Early termination on the first mismatch.",
      "Simple, readable implementation directly mirrors the intuition.",
    ],
    limitations: [
      "O(n) extra space for the stack in the worst case.",
      "Only checks structural validity — does not evaluate or parse the expression.",
      "Handles only bracket characters; real parsers must handle whitespace, operators, and identifiers too.",
    ],
  },

  whenToUseIt:
    "Use the stack-based approach whenever you need to validate nested or paired delimiters. For a single bracket type (only parentheses), a simple counter suffices instead of a stack. For more complex grammars, use a full recursive-descent parser or a pushdown automaton.",
};
