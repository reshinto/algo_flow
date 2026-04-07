import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { antiDiagonalTraversal } from "./sources/anti-diagonal-traversal.ts?fn";
import { generateAntiDiagonalTraversalSteps } from "./step-generator";
import type { AntiDiagonalTraversalInput } from "./step-generator";
import { antiDiagonalTraversalEducational } from "./educational";

import typescriptSource from "./sources/anti-diagonal-traversal.ts?raw";
import pythonSource from "./sources/anti-diagonal-traversal.py?raw";
import javaSource from "./sources/AntiDiagonalTraversal.java?raw";
import rustSource from "./sources/anti-diagonal-traversal.rs?raw";
import cppSource from "./sources/AntiDiagonalTraversal.cpp?raw";
import goSource from "./sources/anti-diagonal-traversal.go?raw";

function executeAntiDiagonalTraversal(input: AntiDiagonalTraversalInput): number[] {
  return antiDiagonalTraversal(input.matrix) as number[];
}

const antiDiagonalTraversalDefinition: AlgorithmDefinition<AntiDiagonalTraversalInput> = {
  meta: {
    id: ALGORITHM_ID.ANTI_DIAGONAL_TRAVERSAL!,
    name: "Anti-Diagonal Traversal",
    category: CATEGORY.MATRICES!,
    technique: "traversal",
    description:
      "Traverse a 2D matrix along anti-diagonals where row + col is constant — O(m × n) time, O(1) extra space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
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
  execute: executeAntiDiagonalTraversal,
  generateSteps: generateAntiDiagonalTraversalSteps,
  educational: antiDiagonalTraversalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(antiDiagonalTraversalDefinition);
