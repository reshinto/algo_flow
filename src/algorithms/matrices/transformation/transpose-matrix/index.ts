import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { transposeMatrix } from "./sources/transpose-matrix.ts?fn";
import { generateTransposeMatrixSteps } from "./step-generator";
import type { TransposeMatrixInput } from "./step-generator";
import { transposeMatrixEducational } from "./educational";

import typescriptSource from "./sources/transpose-matrix.ts?raw";
import pythonSource from "./sources/transpose-matrix.py?raw";
import javaSource from "./sources/TransposeMatrix.java?raw";

function executeTransposeMatrix(input: TransposeMatrixInput): number[][] {
  const matrixCopy = input.matrix.map((row) => [...row]);
  return transposeMatrix(matrixCopy) as number[][];
}

const transposeMatrixDefinition: AlgorithmDefinition<TransposeMatrixInput> = {
  meta: {
    id: ALGORITHM_ID.TRANSPOSE_MATRIX!,
    name: "Transpose Matrix",
    category: CATEGORY.MATRICES!,
    technique: "transformation",
    description:
      "Transpose a matrix by swapping rows and columns — O(m × n) time, O(1) space for square matrices",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1) square / O(m × n) non-square",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
  },
  execute: executeTransposeMatrix,
  generateSteps: generateTransposeMatrixSteps,
  educational: transposeMatrixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(transposeMatrixDefinition);
