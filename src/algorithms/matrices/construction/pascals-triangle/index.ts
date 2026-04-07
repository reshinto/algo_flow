import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pascalsTriangle } from "./sources/pascals-triangle.ts?fn";
import { generatePascalsTriangleSteps } from "./step-generator";
import type { PascalsTriangleInput } from "./step-generator";
import { pascalsTriangleEducational } from "./educational";

import typescriptSource from "./sources/pascals-triangle.ts?raw";
import pythonSource from "./sources/pascals-triangle.py?raw";
import javaSource from "./sources/PascalsTriangle.java?raw";
import rustSource from "./sources/pascals-triangle.rs?raw";
import cppSource from "./sources/PascalsTriangle.cpp?raw";
import goSource from "./sources/pascals-triangle.go?raw";

function executePascalsTriangle(input: PascalsTriangleInput): number[][] {
  return pascalsTriangle(input.numRows) as number[][];
}

const pascalsTriangleDefinition: AlgorithmDefinition<PascalsTriangleInput> = {
  meta: {
    id: ALGORITHM_ID.PASCALS_TRIANGLE!,
    name: "Pascal's Triangle",
    category: CATEGORY.MATRICES!,
    technique: "construction",
    description:
      "Build Pascal's Triangle row by row — each inner cell is the sum of two cells above — O(n²) time, O(1) extra space",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      numRows: 5,
    },
  },
  execute: executePascalsTriangle,
  generateSteps: generatePascalsTriangleSteps,
  educational: pascalsTriangleEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pascalsTriangleDefinition);
