import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { matrixDiagonalSum } from "./sources/matrix-diagonal-sum.ts?fn";
import { generateMatrixDiagonalSumSteps } from "./step-generator";
import type { MatrixDiagonalSumInput } from "./step-generator";
import { matrixDiagonalSumEducational } from "./educational";

import typescriptSource from "./sources/matrix-diagonal-sum.ts?raw";
import pythonSource from "./sources/matrix-diagonal-sum.py?raw";
import javaSource from "./sources/MatrixDiagonalSum.java?raw";
import rustSource from "./sources/matrix-diagonal-sum.rs?raw";
import cppSource from "./sources/MatrixDiagonalSum.cpp?raw";
import goSource from "./sources/matrix-diagonal-sum.go?raw";

function executeMatrixDiagonalSum(input: MatrixDiagonalSumInput): number {
  return matrixDiagonalSum(input.matrix) as number;
}

const matrixDiagonalSumDefinition: AlgorithmDefinition<MatrixDiagonalSumInput> = {
  meta: {
    id: ALGORITHM_ID.MATRIX_DIAGONAL_SUM!,
    name: "Matrix Diagonal Sum",
    category: CATEGORY.MATRICES!,
    technique: "layer-operations",
    description:
      "Sum primary and secondary diagonal elements, adjusting for center overlap on odd-sized matrices — O(n) time, O(1) space",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
  },
  execute: executeMatrixDiagonalSum,
  generateSteps: generateMatrixDiagonalSumSteps,
  educational: matrixDiagonalSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(matrixDiagonalSumDefinition);
