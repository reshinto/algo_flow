/**
 * Rotate Array (Cyclic Replacement) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { rotateArrayCyclic } from "./sources/rotate-array-cyclic.ts?fn";
import { generateRotateArrayCyclicSteps } from "./step-generator";
import { rotateArrayCyclicEducational } from "./educational";

import typescriptSource from "./sources/rotate-array-cyclic.ts?raw";
import pythonSource from "./sources/rotate-array-cyclic.py?raw";
import javaSource from "./sources/RotateArrayCyclic.java?raw";

interface RotateArrayCyclicInput {
  inputArray: number[];
  rotateCount: number;
}

const rotateArrayCyclicDefinition: AlgorithmDefinition<RotateArrayCyclicInput> = {
  meta: {
    id: ALGORITHM_ID.ROTATE_ARRAY_CYCLIC!,
    name: "Rotate Array (Cyclic)",
    category: CATEGORY.ARRAYS!,
    description:
      "An O(n) O(1)-space rotation that directly places each element at its rotated destination by following displacement cycles",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    },
  },
  execute: (input: RotateArrayCyclicInput) =>
    rotateArrayCyclic(input.inputArray, input.rotateCount),
  generateSteps: generateRotateArrayCyclicSteps,
  educational: rotateArrayCyclicEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(rotateArrayCyclicDefinition);
