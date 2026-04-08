import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sumOfSubarrayMinimums } from "./sources/sum-of-subarray-minimums.ts?fn";
import { generateSumOfSubarrayMinimumsSteps } from "./step-generator";
import type { SumOfSubarrayMinimumsInput } from "./step-generator";
import { sumOfSubarrayMinimumsEducational } from "./educational";

import typescriptSource from "./sources/sum-of-subarray-minimums.ts?raw";
import pythonSource from "./sources/sum-of-subarray-minimums.py?raw";
import javaSource from "./sources/SumOfSubarrayMinimums.java?raw";
import rustSource from "./sources/sum-of-subarray-minimums.rs?raw";
import cppSource from "./sources/SumOfSubarrayMinimums.cpp?raw";
import goSource from "./sources/sum-of-subarray-minimums.go?raw";

function executeSumOfSubarrayMinimums(input: SumOfSubarrayMinimumsInput): number {
  return sumOfSubarrayMinimums(input.arr) as number;
}

const sumOfSubarrayMinimumsDefinition: AlgorithmDefinition<SumOfSubarrayMinimumsInput> = {
  meta: {
    id: ALGORITHM_ID.SUM_OF_SUBARRAY_MINIMUMS!,
    name: "Sum of Subarray Minimums",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "monotonic-stack",
    description:
      "Compute the sum of minimums of all contiguous subarrays using a monotonic increasing stack to determine each element's left and right contribution boundaries",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { arr: [3, 1, 2, 4] },
  },
  execute: executeSumOfSubarrayMinimums,
  generateSteps: generateSumOfSubarrayMinimumsSteps,
  educational: sumOfSubarrayMinimumsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(sumOfSubarrayMinimumsDefinition);
