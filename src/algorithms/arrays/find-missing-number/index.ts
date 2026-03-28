/**
 * Find Missing Number (XOR) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findMissingNumber } from "./sources/find-missing-number.ts?fn";
import { generateFindMissingNumberSteps } from "./step-generator";
import { findMissingNumberEducational } from "./educational";

import typescriptSource from "./sources/find-missing-number.ts?raw";
import pythonSource from "./sources/find-missing-number.py?raw";
import javaSource from "./sources/FindMissingNumber.java?raw";

interface FindMissingNumberInput {
  inputArray: number[];
}

const findMissingNumberDefinition: AlgorithmDefinition<FindMissingNumberInput> = {
  meta: {
    id: ALGORITHM_ID.FIND_MISSING_NUMBER!,
    name: "Find Missing Number (XOR)",
    category: CATEGORY.ARRAYS!,
    description:
      "XOR-based linear scan that finds the one missing number in an array containing values from 0 to n — pairs cancel, leaving only the absent value",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [3, 0, 1],
    },
  },
  execute: (input: FindMissingNumberInput) => findMissingNumber(input.inputArray),
  generateSteps: generateFindMissingNumberSteps,
  educational: findMissingNumberEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(findMissingNumberDefinition);
