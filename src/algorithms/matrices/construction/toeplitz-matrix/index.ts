import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { toeplitzMatrix } from "./sources/toeplitz-matrix.ts?fn";
import { generateToeplitzMatrixSteps } from "./step-generator";
import type { ToeplitzMatrixInput } from "./step-generator";
import { toeplitzMatrixEducational } from "./educational";

import typescriptSource from "./sources/toeplitz-matrix.ts?raw";
import pythonSource from "./sources/toeplitz-matrix.py?raw";
import javaSource from "./sources/ToeplitzMatrix.java?raw";

function executeToeplitzMatrix(input: ToeplitzMatrixInput): boolean {
  return toeplitzMatrix(input.matrix) as boolean;
}

const toeplitzMatrixDefinition: AlgorithmDefinition<ToeplitzMatrixInput> = {
  meta: {
    id: ALGORITHM_ID.TOEPLITZ_MATRIX!,
    name: "Toeplitz Matrix",
    category: CATEGORY.MATRICES!,
    technique: "construction",
    description:
      "Verify if a matrix is Toeplitz — every descending diagonal from left to right has all equal elements — O(m × n) time, O(1) space",
    timeComplexity: {
      best: "O(1)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 2, 3, 4],
        [5, 1, 2, 3],
        [9, 5, 1, 2],
      ],
    },
  },
  execute: executeToeplitzMatrix,
  generateSteps: generateToeplitzMatrixSteps,
  educational: toeplitzMatrixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(toeplitzMatrixDefinition);
