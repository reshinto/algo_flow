/**
 * Maximum Product Subarray algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { maxProductSubarray } from "./sources/max-product-subarray.ts?fn";
import { generateMaxProductSubarraySteps } from "./step-generator";
import { maxProductSubarrayEducational } from "./educational";

import typescriptSource from "./sources/max-product-subarray.ts?raw";
import pythonSource from "./sources/max-product-subarray.py?raw";
import javaSource from "./sources/MaxProductSubarray.java?raw";

interface MaxProductSubarrayInput {
  inputArray: number[];
}

const maxProductSubarrayDefinition: AlgorithmDefinition<MaxProductSubarrayInput> = {
  meta: {
    id: ALGORITHM_ID.MAX_PRODUCT_SUBARRAY!,
    name: "Maximum Product Subarray",
    category: CATEGORY.ARRAYS!,
    technique: "kadane-subarray",
    description:
      "Finds the contiguous subarray with the largest product by tracking both maximum and minimum running products to handle negative-number sign flips",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [2, 3, -2, 4, -1, 2],
    },
  },
  execute: (input: MaxProductSubarrayInput) => maxProductSubarray(input.inputArray),
  generateSteps: generateMaxProductSubarraySteps,
  educational: maxProductSubarrayEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(maxProductSubarrayDefinition);
