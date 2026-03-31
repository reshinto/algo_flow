import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setMatrixZeroes } from "./sources/set-matrix-zeroes.ts?fn";
import { generateSetMatrixZeroesSteps } from "./step-generator";
import type { SetMatrixZeroesInput } from "./step-generator";
import { setMatrixZeroesEducational } from "./educational";

import typescriptSource from "./sources/set-matrix-zeroes.ts?raw";
import pythonSource from "./sources/set-matrix-zeroes.py?raw";
import javaSource from "./sources/SetMatrixZeroes.java?raw";

function executeSetMatrixZeroes(input: SetMatrixZeroesInput): number[][] {
  const matrixCopy = input.matrix.map((row) => [...row]);
  return setMatrixZeroes(matrixCopy) as number[][];
}

const setMatrixZeroesDefinition: AlgorithmDefinition<SetMatrixZeroesInput> = {
  meta: {
    id: ALGORITHM_ID.SET_MATRIX_ZEROES!,
    name: "Set Matrix Zeroes",
    category: CATEGORY.MATRICES!,
    technique: "transformation",
    description:
      "Set entire row and column to zero for each cell containing zero — O(m × n) time, O(1) space using first row/column as markers",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5],
      ],
    },
  },
  execute: executeSetMatrixZeroes,
  generateSteps: generateSetMatrixZeroesSteps,
  educational: setMatrixZeroesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(setMatrixZeroesDefinition);
