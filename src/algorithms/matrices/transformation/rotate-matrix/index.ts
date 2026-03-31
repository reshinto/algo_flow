import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { rotateMatrix } from "./sources/rotate-matrix.ts?fn";
import { generateRotateMatrixSteps } from "./step-generator";
import type { RotateMatrixInput } from "./step-generator";
import { rotateMatrixEducational } from "./educational";

import typescriptSource from "./sources/rotate-matrix.ts?raw";
import pythonSource from "./sources/rotate-matrix.py?raw";
import javaSource from "./sources/RotateMatrix.java?raw";

function executeRotateMatrix(input: RotateMatrixInput): number[][] {
  const matrixCopy = input.matrix.map((row) => [...row]);
  return rotateMatrix(matrixCopy) as number[][];
}

const rotateMatrixDefinition: AlgorithmDefinition<RotateMatrixInput> = {
  meta: {
    id: ALGORITHM_ID.ROTATE_MATRIX!,
    name: "Rotate Matrix 90°",
    category: CATEGORY.MATRICES!,
    technique: "transformation",
    description:
      "Rotate an n×n matrix 90° clockwise in-place using transpose then reverse rows — O(n²) time, O(1) space",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
  },
  execute: executeRotateMatrix,
  generateSteps: generateRotateMatrixSteps,
  educational: rotateMatrixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(rotateMatrixDefinition);
