import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { spiralMatrixII } from "./sources/spiral-matrix-ii.ts?fn";
import { generateSpiralMatrixIISteps } from "./step-generator";
import type { SpiralMatrixIIInput } from "./step-generator";
import { spiralMatrixIIEducational } from "./educational";

import typescriptSource from "./sources/spiral-matrix-ii.ts?raw";
import pythonSource from "./sources/spiral-matrix-ii.py?raw";
import javaSource from "./sources/SpiralMatrixII.java?raw";
import rustSource from "./sources/spiral-matrix-ii.rs?raw";
import cppSource from "./sources/SpiralMatrixII.cpp?raw";
import goSource from "./sources/spiral-matrix-ii.go?raw";

function executeSpiralMatrixII(input: SpiralMatrixIIInput): number[][] {
  return spiralMatrixII(input.matrixSize) as number[][];
}

const spiralMatrixIIDefinition: AlgorithmDefinition<SpiralMatrixIIInput> = {
  meta: {
    id: ALGORITHM_ID.SPIRAL_MATRIX_II!,
    name: "Spiral Matrix II",
    category: CATEGORY.MATRICES!,
    technique: "construction",
    description:
      "Generate an n×n matrix filled with elements 1 to n² in clockwise spiral order — O(n²) time, O(1) extra space",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      matrixSize: 4,
    },
  },
  execute: executeSpiralMatrixII,
  generateSteps: generateSpiralMatrixIISteps,
  educational: spiralMatrixIIEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(spiralMatrixIIDefinition);
