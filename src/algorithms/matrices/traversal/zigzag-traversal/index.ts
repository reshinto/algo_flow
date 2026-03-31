import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { zigzagTraversal } from "./sources/zigzag-traversal.ts?fn";
import { generateZigzagTraversalSteps } from "./step-generator";
import type { ZigzagTraversalInput } from "./step-generator";
import { zigzagTraversalEducational } from "./educational";

import typescriptSource from "./sources/zigzag-traversal.ts?raw";
import pythonSource from "./sources/zigzag-traversal.py?raw";
import javaSource from "./sources/ZigzagTraversal.java?raw";

function executeZigzagTraversal(input: ZigzagTraversalInput): number[] {
  return zigzagTraversal(input.matrix) as number[];
}

const zigzagTraversalDefinition: AlgorithmDefinition<ZigzagTraversalInput> = {
  meta: {
    id: ALGORITHM_ID.ZIGZAG_TRAVERSAL!,
    name: "Zigzag Traversal",
    category: CATEGORY.MATRICES!,
    technique: "traversal",
    description:
      "Traverse a 2D matrix in alternating diagonal directions — even diagonals upward, odd diagonals downward — O(m × n) time, O(1) extra space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
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
  execute: executeZigzagTraversal,
  generateSteps: generateZigzagTraversalSteps,
  educational: zigzagTraversalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(zigzagTraversalDefinition);
