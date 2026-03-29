/**
 * Subarray Product Less Than K algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { subarrayProductLessThanK } from "./sources/subarray-product-less-than-k.ts?fn";
import { generateSubarrayProductSteps } from "./step-generator";
import { subarrayProductLessThanKEducational } from "./educational";

import typescriptSource from "./sources/subarray-product-less-than-k.ts?raw";
import pythonSource from "./sources/subarray-product-less-than-k.py?raw";
import javaSource from "./sources/SubarrayProductLessThanK.java?raw";

interface SubarrayProductInput {
  inputArray: number[];
  threshold: number;
}

const subarrayProductDefinition: AlgorithmDefinition<SubarrayProductInput> = {
  meta: {
    id: ALGORITHM_ID.SUBARRAY_PRODUCT_LESS_THAN_K!,
    name: "Subarray Product < K",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "A variable sliding window technique that counts all contiguous subarrays whose product is strictly less than a threshold",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [10, 5, 2, 6, 1, 3],
      threshold: 100,
    },
  },
  execute: (input: SubarrayProductInput) =>
    subarrayProductLessThanK(input.inputArray, input.threshold),
  generateSteps: generateSubarrayProductSteps,
  educational: subarrayProductLessThanKEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(subarrayProductDefinition);
