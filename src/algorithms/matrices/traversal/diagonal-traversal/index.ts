import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { diagonalTraversal } from "./sources/diagonal-traversal.ts?fn";
import { generateDiagonalTraversalSteps } from "./step-generator";
import type { DiagonalTraversalInput } from "./step-generator";
import { diagonalTraversalEducational } from "./educational";

import typescriptSource from "./sources/diagonal-traversal.ts?raw";
import pythonSource from "./sources/diagonal-traversal.py?raw";
import javaSource from "./sources/DiagonalTraversal.java?raw";
import rustSource from "./sources/diagonal-traversal.rs?raw";
import cppSource from "./sources/DiagonalTraversal.cpp?raw";
import goSource from "./sources/diagonal-traversal.go?raw";

function executeDiagonalTraversal(input: DiagonalTraversalInput): number[] {
  return diagonalTraversal(input.matrix) as number[];
}

const diagonalTraversalDefinition: AlgorithmDefinition<DiagonalTraversalInput> = {
  meta: {
    id: ALGORITHM_ID.DIAGONAL_TRAVERSAL!,
    name: "Diagonal Traversal",
    category: CATEGORY.MATRICES!,
    technique: "traversal",
    description:
      "Traverse a 2D matrix along each anti-diagonal (top-right to bottom-left) using a closed-form start-position formula — O(m × n) time, O(1) extra space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
    },
  },
  execute: executeDiagonalTraversal,
  generateSteps: generateDiagonalTraversalSteps,
  educational: diagonalTraversalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(diagonalTraversalDefinition);
