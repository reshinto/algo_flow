import type { EducationalContent } from "@/types";

export const validSudokuEducational: EducationalContent = {
  overview:
    "**Valid Sudoku** (LeetCode 36) checks whether a partially or fully filled 9×9 Sudoku board satisfies the game's rules: no digit `1-9` may appear more than once in any row, any column, or any of the nine 3×3 sub-boxes.\n\n" +
    "Empty cells (represented by `0`) are skipped — only filled cells need validation. The algorithm does **not** solve the puzzle; it only verifies the current state is legal.",

  howItWorks:
    "Maintain three arrays of sets — one per row, one per column, one per 3×3 box — tracking which digits have been seen in each unit.\n\n" +
    "For each filled cell `board[row][col]`:\n\n" +
    "1. Skip if the cell is `0` (empty).\n" +
    "2. Compute `boxIdx = floor(row/3) × 3 + floor(col/3)` to identify which of the 9 boxes the cell belongs to.\n" +
    "3. Check whether the digit already exists in `rowsSeen[row]`, `colsSeen[col]`, or `boxesSeen[boxIdx]`.\n" +
    "4. If it does, the board is **invalid** — return `false` immediately.\n" +
    "5. Otherwise, record the digit in all three sets and continue.\n\n" +
    "### Box index mapping\n\n" +
    "```\n" +
    "box 0 | box 1 | box 2\n" +
    "------+-------+------\n" +
    "box 3 | box 4 | box 5\n" +
    "------+-------+------\n" +
    "box 6 | box 7 | box 8\n" +
    "```\n\n" +
    "Row `r`, column `c` → box `floor(r/3) × 3 + floor(c/3)`.\n\n" +
    "### Diagram: placing digit 5 at row 1, col 1\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  Cell["Cell (1,1) = 5"]\n' +
    '  Cell -->|"rowsSeen[1]"| RowSet["Row 1 set: {5}"]\n' +
    '  Cell -->|"colsSeen[1]"| ColSet["Col 1 set: {5}"]\n' +
    '  Cell -->|"boxIdx = 0"| BoxSet["Box 0 set: {5}"]\n' +
    '  RowSet --> Check{"Duplicate?"}\n' +
    "  ColSet --> Check\n" +
    "  BoxSet --> Check\n" +
    '  Check -->|"No"| Valid["Record & continue"]\n' +
    '  Check -->|"Yes"| Invalid["Return false"]\n' +
    "  style Cell fill:#06b6d4,stroke:#0891b2\n" +
    "  style Check fill:#f59e0b,stroke:#d97706\n" +
    "  style Valid fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each filled cell fans out to three set lookups — row, column, and box — then records the digit in all three sets if no duplicate is found.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)`**\n\n" +
    "The board is always exactly 9×9 = 81 cells. Every cell is visited at most once. Because the input size is fixed, all operations are constant time regardless of the digit values.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Three arrays of 9 sets, each holding at most 9 digits = 243 entries maximum — a fixed upper bound independent of any variable input.",

  bestAndWorstCase:
    "**Best case** — an invalid board with a duplicate in the very first filled cell pair: `O(1)`, returns `false` immediately after two checks.\n\n" +
    "**Worst case** — a fully valid board where all 81 cells must be scanned before returning `true`. Since the board is always 9×9, this is still `O(1)` by definition.\n\n" +
    "Early termination on the first detected duplicate makes invalid boards fast in practice.",

  realWorldUses: [
    "**Puzzle validators:** Any Sudoku game engine uses this exact check to validate user input as each digit is placed.",
    "**Constraint propagation:** Sudoku solvers (backtracking, constraint satisfaction) call validity checks repeatedly to prune the search space.",
    "**Board generation:** Valid Sudoku boards are constructed by generating a complete solution and then removing cells — validation is used at every step.",
    "**Input sanitization:** When loading Sudoku puzzles from files or APIs, a validity check ensures corrupted data is rejected before it reaches the solver.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) time and space — the fixed 9×9 grid makes all bounds constant.",
      "Early exit — returns false the moment the first duplicate is found, without scanning remaining cells.",
      "Single-pass — each cell is examined exactly once, with three O(1) set lookups and three O(1) set insertions.",
    ],
    limitations: [
      "Only validates the current state — does not verify that the board is solvable or has a unique solution.",
      "Hardcoded for 9×9 boards — generalizing to `n×n` Sudoku (e.g., 16×16) requires parameterizing the box size.",
      "Does not locate all conflicts — stops at the first duplicate, which is fine for validation but not for error-highlighting UIs.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need to validate that a grid has no duplicate values within defined groups (rows, columns, subgrids). The three-set approach generalizes cleanly to other constraint-checking problems. For solving rather than validating, pair this with a backtracking or constraint-propagation solver that calls this check at each placement step.",
};
