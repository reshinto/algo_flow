/**
 * Prefix Sum (Range Query) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { prefixSum } from "./sources/prefix-sum.ts?fn";
import { generatePrefixSumSteps } from "./step-generator";
import { prefixSumEducational } from "./educational";

import typescriptSource from "./sources/prefix-sum.ts?raw";
import pythonSource from "./sources/prefix-sum.py?raw";
import javaSource from "./sources/PrefixSum.java?raw";

interface PrefixSumInput {
  inputArray: number[];
  queries: number[][];
}

const prefixSumDefinition: AlgorithmDefinition<PrefixSumInput> = {
  meta: {
    id: ALGORITHM_ID.PREFIX_SUM!,
    name: "Prefix Sum (Range Query)",
    category: CATEGORY.ARRAYS!,
    technique: "prefix-sum",
    description:
      "A preprocessing technique that builds a cumulative sum array in O(n), enabling any range sum query to be answered in O(1) time",
    timeComplexity: {
      best: "O(n) build + O(1) query",
      average: "O(n) build + O(1) query",
      worst: "O(n) build + O(1) query",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [
        [1, 3],
        [0, 4],
        [2, 5],
      ],
    },
  },
  execute: (input: PrefixSumInput) => prefixSum(input.inputArray, input.queries),
  generateSteps: generatePrefixSumSteps,
  educational: prefixSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(prefixSumDefinition);
