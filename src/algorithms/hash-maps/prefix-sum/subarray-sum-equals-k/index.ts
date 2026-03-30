import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { CATEGORY } from "@/utils/constants";

import { subarraySumEqualsK } from "./sources/subarray-sum-equals-k.ts?fn";
import { generateSubarraySumEqualsKSteps } from "./step-generator";
import type { SubarraySumEqualsKInput } from "./step-generator";
import { subarraySumEqualsKEducational } from "./educational";

import typescriptSource from "./sources/subarray-sum-equals-k.ts?raw";
import pythonSource from "./sources/subarray-sum-equals-k.py?raw";
import javaSource from "./sources/SubarraySumEqualsK.java?raw";

function executeSubarraySumEqualsK(input: SubarraySumEqualsKInput): number {
  return subarraySumEqualsK(input.numbers, input.target) as number;
}

const subarraySumEqualsKDefinition: AlgorithmDefinition<SubarraySumEqualsKInput> = {
  meta: {
    id: "subarray-sum-equals-k-hashmap",
    name: "Subarray Sum Equals K (Hash Map)",
    category: CATEGORY.HASH_MAPS!,
    technique: "prefix-sum",
    description:
      "Count contiguous subarrays whose elements sum to a target in O(n) using prefix sums stored in a hash map",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [1, 1, 1], target: 2 },
  },
  execute: executeSubarraySumEqualsK,
  generateSteps: generateSubarraySumEqualsKSteps,
  educational: subarraySumEqualsKEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(subarraySumEqualsKDefinition);
