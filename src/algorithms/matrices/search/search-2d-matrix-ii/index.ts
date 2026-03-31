import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { search2DMatrixII } from "./sources/search-2d-matrix-ii.ts?fn";
import { generateSearch2DMatrixIISteps } from "./step-generator";
import type { Search2DMatrixIIInput } from "./step-generator";
import { search2DMatrixIIEducational } from "./educational";

import typescriptSource from "./sources/search-2d-matrix-ii.ts?raw";
import pythonSource from "./sources/search-2d-matrix-ii.py?raw";
import javaSource from "./sources/Search2DMatrixII.java?raw";

function executeSearch2DMatrixII(input: Search2DMatrixIIInput): boolean {
  return search2DMatrixII(input.matrix, input.target) as boolean;
}

const search2DMatrixIIDefinition: AlgorithmDefinition<Search2DMatrixIIInput> = {
  meta: {
    id: ALGORITHM_ID.SEARCH_2D_MATRIX_II!,
    name: "Search a 2D Matrix II",
    category: CATEGORY.MATRICES!,
    technique: "search",
    description:
      "Staircase search from top-right corner of a row-and-column sorted matrix — O(m + n) time, O(1) space",
    timeComplexity: {
      best: "O(1)",
      average: "O(m + n)",
      worst: "O(m + n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30],
      ],
      target: 5,
    },
  },
  execute: executeSearch2DMatrixII,
  generateSteps: generateSearch2DMatrixIISteps,
  educational: search2DMatrixIIEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(search2DMatrixIIDefinition);
