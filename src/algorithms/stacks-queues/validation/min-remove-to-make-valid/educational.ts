import type { EducationalContent } from "@/types";

export const minRemoveToMakeValidEducational: EducationalContent = {
  overview:
    "**Min Remove to Make Valid** (LeetCode 1249) finds the minimum number of parentheses to remove from a string so that the remaining parentheses are valid.\n\n" +
    "A string is valid when every `(` has a matching `)` in the correct order. The algorithm uses a stack to track indices of unmatched `(` characters and a set to record unmatched `)` characters, then rebuilds the string excluding all those indices.",

  howItWorks:
    "The algorithm performs two passes:\n\n" +
    "**Pass 1 — Identify unmatched parentheses:**\n" +
    "Scan left to right, maintaining a stack of indices for unmatched `(` characters:\n\n" +
    "1. **`(` character** → push its index onto the stack.\n" +
    "2. **`)` character**:\n" +
    "   - If the stack is non-empty, pop the top index (the `(` is now matched).\n" +
    "   - If the stack is empty, record the `)` index as unmatched.\n" +
    "3. **End of scan** → any indices remaining in the stack are unmatched `(`.\n\n" +
    "**Pass 2 — Build result:**\n" +
    "Reconstruct the string, skipping all indices from the unmatched set.\n\n" +
    "### Example trace on `a(b(c)d`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Pass 1 - identify unmatched\n" +
    '        S0["idx 1 \'(\' push"] -->|"idx 3 \'(\' push"| S1["stack: 1 3"]\n' +
    '        S1 -->|"idx 5 \')\' pop 3 matched"| S2["stack: 1"]\n' +
    '        S2 -->|"end: idx 1 unmatched"| S3["remove idx: {1}"]\n' +
    "    end\n" +
    "    subgraph Pass 2 - rebuild\n" +
    '        R["skip idx 1 → ab(c)d"]\n' +
    "    end\n" +
    "    S3 --> R\n" +
    "    style S0 fill:#06b6d4,stroke:#0891b2\n" +
    "    style S3 fill:#f59e0b,stroke:#d97706\n" +
    "    style R fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The inner `(c)` at indices 3–5 matches cleanly. The outer `(` at index 1 is never closed, " +
    "so it is the single character removed to produce the valid result.\n\n" +
    "```\n" +
    "idx  char  action              stack         unmatched_close\n" +
    "0    a     non-paren, skip     []            {}\n" +
    "1    (     push idx 1          [1]           {}\n" +
    "2    b     non-paren, skip     [1]           {}\n" +
    "3    (     push idx 3          [1, 3]        {}\n" +
    "4    c     non-paren, skip     [1, 3]        {}\n" +
    "5    )     pop idx 3 (matched) [1]           {}\n" +
    "6    d     non-paren, skip     [1]           {}\n" +
    "end  stack has [1] → idx 1 is unmatched\n" +
    'result: skip idx 1 → "ab(c)d"\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "The string is scanned twice — once to identify unmatched indices (`O(n)`) and once to build the result (`O(n)`). Stack push/pop and set insert/lookup are all `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The stack holds at most `O(n)` unmatched `(` indices, and the unmatched-close set holds at most `O(n)` indices. The result string itself also uses `O(n)` space.",

  bestAndWorstCase:
    "**Best case** — a fully balanced string like `(a)`: no indices are unmatched, the stack is empty after the scan, and the input is returned unchanged in `O(n)` time.\n\n" +
    "**Worst case** — a string with no valid pairs like `))))` or `((((`: every character index is unmatched, the result is an empty string, and both passes still run in `O(n)` time.",

  realWorldUses: [
    "**Auto-correct in editors:** IDEs use this pattern to suggest minimal edits that make expression syntax valid after incremental typing.",
    "**Syntax error recovery in parsers:** Compilers can apply a similar minimum-edit strategy to produce a partially valid parse tree for better error messages.",
    "**Data cleaning pipelines:** Removing malformed delimiters from imported datasets (CSV fields with unbalanced quotes, JSON with unclosed brackets).",
    "**Template engines:** Ensuring template strings have balanced placeholder delimiters before rendering.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time with a single left-to-right scan followed by a single reconstruction pass.",
      "Produces a deterministic result — always removes the minimum number of characters.",
      "Handles non-parenthesis characters transparently; they are always kept in the output.",
    ],
    limitations: [
      "O(n) extra space for the stack and the unmatched-index set.",
      "Only handles `()` — extending to multiple bracket types like `[]` or `{}` requires extra logic.",
      "When multiple minimum-removal solutions exist, this algorithm returns only one; it does not enumerate all possibilities.",
    ],
  },

  whenToUseIt:
    "Use this approach when you need to produce a valid parenthesized string with the fewest deletions. If you only need a boolean validity check, use the simpler stack-based valid-parentheses algorithm. For multiple bracket types `()[]{}`, extend the stack to store both the bracket type and the index.",
};
