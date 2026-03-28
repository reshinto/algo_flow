/**
 * Single Number (XOR) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { singleNumber } from "./sources/single-number.ts?fn";
import { generateSingleNumberSteps } from "./step-generator";
import { singleNumberEducational } from "./educational";

import typescriptSource from "./sources/single-number.ts?raw";
import pythonSource from "./sources/single-number.py?raw";
import javaSource from "./sources/SingleNumber.java?raw";

interface SingleNumberInput {
  inputArray: number[];
}

const singleNumberDefinition: AlgorithmDefinition<SingleNumberInput> = {
  meta: {
    id: ALGORITHM_ID.SINGLE_NUMBER!,
    name: "Single Number (XOR)",
    category: CATEGORY.ARRAYS!,
    description:
      "XOR-based linear scan that finds the one element appearing only once when all others appear exactly twice — duplicate pairs cancel, leaving the unique value",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [4, 1, 2, 1, 2],
    },
  },
  execute: (input: SingleNumberInput) => singleNumber(input.inputArray),
  generateSteps: generateSingleNumberSteps,
  educational: singleNumberEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(singleNumberDefinition);
