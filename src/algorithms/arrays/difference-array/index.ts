/**
 * Difference Array (Range Update) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { differenceArray } from "./sources/difference-array.ts?fn";
import { generateDifferenceArraySteps } from "./step-generator";
import { differenceArrayEducational } from "./educational";

import typescriptSource from "./sources/difference-array.ts?raw";
import pythonSource from "./sources/difference-array.py?raw";
import javaSource from "./sources/DifferenceArray.java?raw";

interface DifferenceArrayInput {
  arrayLength: number;
  updates: number[][];
}

const differenceArrayDefinition: AlgorithmDefinition<DifferenceArrayInput> = {
  meta: {
    id: ALGORITHM_ID.DIFFERENCE_ARRAY!,
    name: "Difference Array (Range Update)",
    category: CATEGORY.ARRAYS!,
    description:
      "Applies multiple range updates in O(1) each using a difference array, then reconstructs the result in O(n) via prefix sum",
    timeComplexity: {
      best: "O(n + q)",
      average: "O(n + q)",
      worst: "O(n + q)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      arrayLength: 8,
      updates: [
        [1, 4, 3],
        [2, 6, -1],
        [0, 3, 2],
      ],
    },
  },
  execute: (input: DifferenceArrayInput) => differenceArray(input.arrayLength, input.updates),
  generateSteps: generateDifferenceArraySteps,
  educational: differenceArrayEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(differenceArrayDefinition);
