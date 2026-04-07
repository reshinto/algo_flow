import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { validSudoku } from "./sources/valid-sudoku.ts?fn";
import { generateValidSudokuSteps } from "./step-generator";
import type { ValidSudokuInput } from "./step-generator";
import { validSudokuEducational } from "./educational";

import typescriptSource from "./sources/valid-sudoku.ts?raw";
import pythonSource from "./sources/valid-sudoku.py?raw";
import javaSource from "./sources/ValidSudoku.java?raw";
import rustSource from "./sources/valid-sudoku.rs?raw";
import cppSource from "./sources/ValidSudoku.cpp?raw";
import goSource from "./sources/valid-sudoku.go?raw";

function executeValidSudoku(input: ValidSudokuInput): boolean {
  return validSudoku(input.board) as boolean;
}

const validSudokuDefinition: AlgorithmDefinition<ValidSudokuInput> = {
  meta: {
    id: ALGORITHM_ID.VALID_SUDOKU!,
    name: "Valid Sudoku",
    category: CATEGORY.MATRICES!,
    technique: "construction",
    description:
      "Validate a Sudoku board by checking rows, columns, and 3×3 sub-boxes for duplicate digits — O(1) time, O(1) space",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      board: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
      ],
    },
  },
  execute: executeValidSudoku,
  generateSteps: generateValidSudokuSteps,
  educational: validSudokuEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(validSudokuDefinition);
