import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { twoSum } from "./sources/two-sum.ts?fn";
import { generateTwoSumSteps } from "./step-generator";
import type { TwoSumInput } from "./step-generator";
import { twoSumEducational } from "./educational";

import typescriptSource from "./sources/two-sum.ts?raw";
import pythonSource from "./sources/two-sum.py?raw";
import javaSource from "./sources/TwoSum.java?raw";

function executeTwoSum(input: TwoSumInput): [number, number] {
  return twoSum(input.numbers, input.target) as [number, number];
}

const twoSumDefinition: AlgorithmDefinition<TwoSumInput> = {
  meta: {
    id: ALGORITHM_ID.TWO_SUM!,
    name: "Two Sum",
    category: CATEGORY.HASH_MAPS!,
    description:
      "Find two indices whose values sum to the target in O(n) time using a hash map for O(1) complement lookups",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [2, 7, 11, 15], target: 9 },
  },
  execute: executeTwoSum,
  generateSteps: generateTwoSumSteps,
  educational: twoSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(twoSumDefinition);
