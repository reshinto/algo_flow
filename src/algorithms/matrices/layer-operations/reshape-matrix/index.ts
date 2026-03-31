import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { reshapeMatrix } from "./sources/reshape-matrix.ts?fn";
import { generateReshapeMatrixSteps } from "./step-generator";
import type { ReshapeMatrixInput } from "./step-generator";
import { reshapeMatrixEducational } from "./educational";

import typescriptSource from "./sources/reshape-matrix.ts?raw";
import pythonSource from "./sources/reshape-matrix.py?raw";
import javaSource from "./sources/ReshapeMatrix.java?raw";

function executeReshapeMatrix(input: ReshapeMatrixInput): number[][] {
  return reshapeMatrix(input.matrix, input.targetRows, input.targetCols) as number[][];
}

const reshapeMatrixDefinition: AlgorithmDefinition<ReshapeMatrixInput> = {
  meta: {
    id: ALGORITHM_ID.RESHAPE_MATRIX!,
    name: "Reshape Matrix",
    category: CATEGORY.MATRICES!,
    technique: "layer-operations",
    description:
      "Reshape a matrix to different dimensions while preserving row-major element order — O(m × n) time, O(1) extra space",
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
        [5, 6, 7, 8],
      ],
      targetRows: 4,
      targetCols: 2,
    },
  },
  execute: executeReshapeMatrix,
  generateSteps: generateReshapeMatrixSteps,
  educational: reshapeMatrixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(reshapeMatrixDefinition);
