import type { EducationalContent } from "@/types";

export const flipImageEducational: EducationalContent = {
  overview:
    "**Flip and Invert Binary Image** (LeetCode 832) transforms a binary matrix in two logical steps: first flip each row horizontally (reverse its elements), then invert every bit (0 becomes 1, 1 becomes 0).\n\n" +
    "The clever insight is that these two operations can be combined into a single O(m × n) pass using a **two-pointer technique** on each row — swapping and XOR-inverting simultaneously from both ends toward the center.",

  howItWorks:
    "For each row, place a `leftCol` pointer at index 0 and a `rightCol` pointer at the last index:\n\n" +
    "1. **Swap + invert:** Set `row[leftCol] = row[rightCol] ^ 1` and `row[rightCol] = row[leftCol] ^ 1` (XOR with 1 flips 0↔1), then move both pointers inward.\n" +
    "2. **Odd-width middle:** When `leftCol === rightCol` after the loop, only invert the middle element — no swap needed.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\nInput:  [[1,1,0],[1,0,1],[0,0,0]]\nFlip:   [[0,1,1],[1,0,1],[0,0,0]]\nInvert: [[1,0,0],[0,1,0],[1,1,1]]\n```\n\n" +
    "The two-pointer approach processes each row in a single pass, avoiding a separate reversal step.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Each element is touched exactly once — the two-pointer loop visits every column pair in one sweep per row.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The transformation is performed in-place. Only a handful of integer variables (two pointers and two temp values) are needed regardless of matrix size.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: the single element is inverted in one step, `O(1)`.\n\n" +
    "**Worst case** — any `m × n` matrix: every element must be visited, so all cases are `O(m × n)`. There is no shortcutting because every bit must be flipped.\n\n" +
    "Even rows with all zeros or all ones take the same number of steps — the two-pointer traversal is unconditional.",

  realWorldUses: [
    "**Image processing:** Horizontal mirroring (reflecting images left-right) is a fundamental operation in graphics pipelines and photo editors.",
    "**Binary mask manipulation:** Inverting binary masks is common in computer vision — e.g., converting foreground/background masks for compositing.",
    "**Game boards:** Flipping and inverting game state grids (e.g., Othello, Reversi) where a move flips a row or column of pieces.",
    "**Compression preprocessing:** Bit-inversion and rearrangement are used in run-length encoding schemes to improve compression ratios on binary data.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal since every element must be visited at least once.",
      "O(1) extra space — entirely in-place using only two loop variables per row.",
      "Single-pass per row — combines flip and invert into one loop, avoiding two separate traversals.",
    ],
    limitations: [
      "Binary only — the XOR trick (`^ 1`) only works for 0/1 values; general inversion of arbitrary integers requires a different approach.",
      "Horizontal flip only — vertical flip (reversing rows) or diagonal flip require restructuring the algorithm.",
      "In-place mutation — modifies the original matrix; if the caller needs the original preserved, a deep copy is required before calling.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need to horizontally mirror and invert a binary matrix in a single pass. The XOR-swap trick (`a ^ 1`) is directly applicable to any problem requiring simultaneous reversal and bit-flipping of binary rows. For multi-valued matrices, separate the flip and invert phases. For vertical or anti-diagonal flips, adapt the pointer directions accordingly.",
};
