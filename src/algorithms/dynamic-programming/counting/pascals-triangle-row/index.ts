import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pascalsTriangleRow } from "./sources/pascals-triangle-row.ts?fn";
import { generatePascalsTriangleRowSteps } from "./step-generator";
import { pascalsTriangleRowEducational } from "./educational";

import typescriptSource from "./sources/pascals-triangle-row.ts?raw";
import pythonSource from "./sources/pascals-triangle-row.py?raw";
import javaSource from "./sources/PascalsTriangleRow.java?raw";

interface PascalsTriangleInput {
  rowIndex: number;
}

const pascalsTriangleRowDefinition: AlgorithmDefinition<PascalsTriangleInput> = {
  meta: {
    id: ALGORITHM_ID.PASCALS_TRIANGLE_ROW!,
    name: "Pascal's Triangle Row (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "counting",
    description:
      "A bottom-up dynamic programming approach that computes the n-th row of Pascal's Triangle in O(n) space by iterating right-to-left over a single DP array",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { rowIndex: 8 },
  },
  execute: (input: PascalsTriangleInput) => pascalsTriangleRow(input.rowIndex),
  generateSteps: generatePascalsTriangleRowSteps,
  educational: pascalsTriangleRowEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(pascalsTriangleRowDefinition);
