import type { EducationalContent } from "@/types";

export const simplifyPathEducational: EducationalContent = {
  overview:
    "**Simplify Path** (LeetCode 71) converts an absolute Unix file-system path into its canonical form. Components like `.` (current directory) and `..` (parent directory) must be resolved, and consecutive slashes must be collapsed.\n\nA stack is the natural tool: push valid directory names as you scan left to right, and pop the top whenever `..` is encountered. The final stack contents, joined with `/`, form the simplified path.",

  howItWorks:
    "The algorithm splits the input on `/` and processes each component:\n\n" +
    "1. **Empty string or `.`** — produced by consecutive slashes or a current-directory marker. Skip immediately.\n" +
    "2. **`..`** — parent-directory reference. Pop the stack if it is non-empty; ignore it when at root.\n" +
    "3. **Any other string** — a real directory name. Push it onto the stack.\n\n" +
    "After all components are consumed, join the stack elements with `/` and prepend a leading `/`.\n\n" +
    "### Example trace on `/a/./b/../../c/`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["stack: (empty)"] -->|"push a"| B["stack: a"]\n' +
    '    B -->|"skip ."| B\n' +
    '    B -->|"push b"| C["stack: a b"]\n' +
    '    C -->|".. pop b"| D["stack: a"]\n' +
    '    D -->|".. pop a"| E["stack: (empty)"]\n' +
    '    E -->|"push c"| F["/c"]\n' +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style C fill:#f59e0b,stroke:#d97706\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each `..` pops one directory off the stack; `.` and empty segments are skipped. " +
    "The final stack joined with `/` gives the canonical path.\n\n" +
    "```\n" +
    "component  action        stack\n" +
    '""         skip (empty)  []\n' +
    '"a"        push          ["a"]\n' +
    '"."        skip          ["a"]\n' +
    '"b"        push          ["a", "b"]\n' +
    '".."       pop           ["a"]\n' +
    '".."       pop           []\n' +
    '"c"        push          ["c"]\n' +
    '""         skip (empty)  ["c"]\n' +
    'end        → "/c"\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Splitting the string and iterating over components both run in O(n) where n is the total length of the input string. Each component is pushed or popped at most once.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (a deeply nested path with no `..` components) every directory name is pushed onto the stack, consuming O(n) space.",

  bestAndWorstCase:
    "**Best case** — input is already `/` (single slash): the split produces only empty strings, the stack stays empty, and the result `/` is returned immediately.\n\n" +
    "**Worst case** — a long, deeply nested path with no `..` components: every segment is pushed, making the stack as large as the input, and the join step traverses the whole stack. Still O(n) overall.",

  realWorldUses: [
    "**Shell and terminal navigation:** `cd` implementations resolve relative path components before passing the canonical path to the OS kernel.",
    "**Web servers:** URL path normalization removes `../` traversal attempts to prevent directory traversal security vulnerabilities.",
    "**File browsers and IDEs:** Rendering the breadcrumb path and resolving symbolic links both rely on path canonicalization.",
    "**Build tools:** Bundlers and compilers normalize import paths so that `./a/../b` and `./b` resolve to the same module.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single left-to-right pass with constant-time stack operations.",
      "Handles all edge cases (root-level `..`, consecutive slashes, trailing slashes) naturally.",
      "Simple and readable — the stack mirrors the directory hierarchy directly.",
    ],
    limitations: [
      "O(n) extra space for the stack in the worst case.",
      "Works only on absolute paths; relative paths require a separate base-path resolution step.",
      "Does not resolve symbolic links — purely lexical simplification.",
    ],
  },

  whenToUseIt:
    "Use the stack-based path simplification whenever you need to canonicalize a Unix-style path lexically. For resolving symbolic links or checking real filesystem paths, use OS-level APIs (`realpath`). For URL normalization, combine this approach with percent-encoding and scheme/host handling.",
};
