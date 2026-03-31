import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { search2DMatrix } from "./sources/search-2d-matrix.ts?fn";
import { generateSearch2DMatrixSteps } from "./step-generator";
import type { Search2DMatrixInput } from "./step-generator";
import { search2DMatrixEducational } from "./educational";

import typescriptSource from "./sources/search-2d-matrix.ts?raw";
import pythonSource from "./sources/search-2d-matrix.py?raw";
import javaSource from "./sources/Search2DMatrix.java?raw";

function executeSearch2DMatrix(input: Search2DMatrixInput): boolean {
  return search2DMatrix(input.matrix, input.target) as boolean;
}

const search2DMatrixDefinition: AlgorithmDefinition<Search2DMatrixInput> = {
  meta: {
    id: ALGORITHM_ID.SEARCH_2D_MATRIX!,
    name: "Search a 2D Matrix",
    category: CATEGORY.MATRICES!,
    technique: "search",
    description:
      "Binary search a row-sorted matrix by treating it as a virtual 1D array — O(log(m × n)) time, O(1) space",
    timeComplexity: {
      best: "O(1)",
      average: "O(log(m × n))",
      worst: "O(log(m × n))",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      target: 3,
    },
  },
  execute: executeSearch2DMatrix,
  generateSteps: generateSearch2DMatrixSteps,
  educational: search2DMatrixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(search2DMatrixDefinition);
