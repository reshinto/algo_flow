import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lisMemoization } from "./sources/lis-memoization.ts?fn";
import { generateLisMemoizationSteps } from "./step-generator";
import { lisMemoizationEducational } from "./educational";

import typescriptSource from "./sources/lis-memoization.ts?raw";
import pythonSource from "./sources/lis-memoization.py?raw";
import javaSource from "./sources/LisMemoization.java?raw";

interface LISInput {
  sequence: number[];
}

const lisMemoizationDefinition: AlgorithmDefinition<LISInput> = {
  meta: {
    id: ALGORITHM_ID.LIS_MEMOIZATION!,
    name: "Longest Increasing Subsequence (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "subsequence",
    description:
      "A top-down dynamic programming approach that uses recursion with a memoization cache to find the length of the longest strictly increasing subsequence",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { sequence: [10, 9, 2, 5, 3, 7, 101, 18] },
  },
  execute: (input: LISInput) => lisMemoization(input.sequence),
  generateSteps: generateLisMemoizationSteps,
  educational: lisMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(lisMemoizationDefinition);
