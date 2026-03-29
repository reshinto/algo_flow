/**
 * Rotate Array (Reversal Method) registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { rotateArray } from "./sources/rotate-array.ts?fn";
import { generateRotateArraySteps } from "./step-generator";
import { rotateArrayEducational } from "./educational";

import typescriptSource from "./sources/rotate-array.ts?raw";
import pythonSource from "./sources/rotate-array.py?raw";
import javaSource from "./sources/RotateArray.java?raw";

interface RotateArrayInput {
  inputArray: number[];
  rotateCount: number;
}

const rotateArrayDefinition: AlgorithmDefinition<RotateArrayInput> = {
  meta: {
    id: ALGORITHM_ID.ROTATE_ARRAY!,
    name: "Rotate Array (Reversal)",
    category: CATEGORY.ARRAYS!,
    technique: "rotation",
    description:
      "An O(n) in-place rotation using three reversals: reverse the whole array, reverse the first k elements, then reverse the rest",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 2, 3, 4, 5, 6, 7],
      rotateCount: 3,
    },
  },
  execute: (input: RotateArrayInput) => rotateArray(input.inputArray, input.rotateCount),
  generateSteps: generateRotateArraySteps,
  educational: rotateArrayEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(rotateArrayDefinition);
