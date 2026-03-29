import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { spiralOrder } from "./sources/spiral-order.ts?fn";
import { generateSpiralOrderSteps } from "./step-generator";
import type { SpiralOrderInput } from "./step-generator";
import { spiralOrderEducational } from "./educational";

import typescriptSource from "./sources/spiral-order.ts?raw";
import pythonSource from "./sources/spiral-order.py?raw";
import javaSource from "./sources/SpiralOrder.java?raw";

function executeSpiralOrder(input: SpiralOrderInput): number[] {
  return spiralOrder(input.matrix) as number[];
}

const spiralOrderDefinition: AlgorithmDefinition<SpiralOrderInput> = {
  meta: {
    id: ALGORITHM_ID.SPIRAL_ORDER!,
    name: "Spiral Order",
    category: CATEGORY.MATRICES!,
    technique: "traversal",
    description:
      "Traverse a 2D matrix in clockwise spiral order using four shrinking boundary pointers — O(m × n) time, O(1) extra space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
    },
  },
  execute: executeSpiralOrder,
  generateSteps: generateSpiralOrderSteps,
  educational: spiralOrderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(spiralOrderDefinition);
