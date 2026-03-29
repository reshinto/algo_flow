/**
 * First Missing Positive algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { firstMissingPositive } from "./sources/first-missing-positive.ts?fn";
import { generateFirstMissingPositiveSteps } from "./step-generator";
import { firstMissingPositiveEducational } from "./educational";

import typescriptSource from "./sources/first-missing-positive.ts?raw";
import pythonSource from "./sources/first-missing-positive.py?raw";
import javaSource from "./sources/FirstMissingPositive.java?raw";

interface FirstMissingPositiveInput {
  inputArray: number[];
}

const firstMissingPositiveDefinition: AlgorithmDefinition<FirstMissingPositiveInput> = {
  meta: {
    id: ALGORITHM_ID.FIRST_MISSING_POSITIVE!,
    name: "First Missing Positive",
    category: CATEGORY.ARRAYS!,
    technique: "cyclic-sort",
    description:
      "Finds the smallest positive integer absent from the array in O(n) time and O(1) space by placing each valid value at its corresponding index then scanning for the first mismatch",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    },
  },
  execute: (input: FirstMissingPositiveInput) => firstMissingPositive(input.inputArray),
  generateSteps: generateFirstMissingPositiveSteps,
  educational: firstMissingPositiveEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(firstMissingPositiveDefinition);
